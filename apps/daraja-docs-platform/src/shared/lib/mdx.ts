import { serialize } from 'next-mdx-remote/serialize';
import { cache } from 'react';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import grayMatter from 'gray-matter';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';

const v2Directory = path.join(process.cwd(), 'documentation', 'v2');
const v3Directory = path.join(process.cwd(), 'documentation', 'v3');
const apiSpecsDirectory = path.join(process.cwd(), 'documentation', 'api-specs', 'auth.yaml');

export type Frontmatter = {
    title: string;
    description: string;
};

export type Documentation = {
    apiSpecsYaml: any;
    frontMatter: Frontmatter;
    docs: {
        v2: {
            serializedDocs: any;
            rawContent: string;
        };
        v3: {
            serializedDocs: any;
            rawContent: string;
        } | null;
    };
};

let cachedApiSpecs: any = null;
const documentationCache = new Map<string, Documentation>();
const slugsCache = new Set<string[]>();

const MDX_OPTIONS = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [rehypePrism, { 
                ignoreMissing: true, 
                aliases: { mdx: 'markdown' },
                showLineNumbers: false
            }]
        ],
        development: process.env.NODE_ENV === 'development',
        format: 'mdx' as const,
    },
    parseFrontmatter: false,
} as any;

function getApiSpecs() {
    if (!cachedApiSpecs) {
        try {
            const apiSpecs = fs.readFileSync(apiSpecsDirectory, 'utf8');
            cachedApiSpecs = YAML.parse(apiSpecs);
        } catch (error) {
            console.error('Failed to load API specs:', error);
            cachedApiSpecs = {};
        }
    }
    return cachedApiSpecs;
}

export async function getAllDocumentationSlugs(): Promise<string[][]> {
    if (slugsCache.size > 0) {
        return Array.from(slugsCache);
    }

    const slugs: string[][] = [];
    
    function scanDirectory(dir: string, basePath: string[] = []): void {
        try {
            const items = fs.readdirSync(dir, { withFileTypes: true });
            
            for (const item of items) {
                if (item.isDirectory()) {
                    scanDirectory(path.join(dir, item.name), [...basePath, item.name]);
                } else if (item.name.endsWith('.mdx')) {
                    const fileName = item.name.replace('.mdx', '');
                    const slug = [...basePath, fileName];
                    slugs.push(slug);
                    slugsCache.add(slug);
                }
            }
        } catch (error) {
            console.error(`Error scanning directory ${dir}:`, error);
        }
    }
    
    if (fs.existsSync(v2Directory)) {
        scanDirectory(v2Directory);
    }
    
    return slugs;
}

export const getDocumentationBySlug = cache(async (slug: string[]): Promise<Documentation | null> => {
    const cacheKey = slug.join('/');
    
    if (documentationCache.has(cacheKey)) {
        return documentationCache.get(cacheKey)!;
    }
    
    const v2Path = path.join(v2Directory, `${slug.join('/')}.mdx`);
    const v3Path = path.join(v3Directory, `${slug.join('/')}.mdx`);

    if (!fs.existsSync(v2Path)) {
        return null;
    }

    try {
        const hasV3 = fs.existsSync(v3Path);

        const v2Docs = fs.readFileSync(v2Path, 'utf8');
        const { content: v2Content, data: frontMatter } = grayMatter(v2Docs);

        const v2Serialized = await serialize(v2Content, MDX_OPTIONS);

        let v3: Documentation['docs']['v3'] = null;

        if (hasV3) {
            const v3Docs = fs.readFileSync(v3Path, 'utf8');
            const { content: v3Content } = grayMatter(v3Docs);
            v3 = {
                serializedDocs: await serialize(v3Content, MDX_OPTIONS),
                rawContent: v3Content,
            };
        }

        const documentation: Documentation = {
            apiSpecsYaml: getApiSpecs(),
            frontMatter: frontMatter as Frontmatter,
            docs: {
                v2: {
                    serializedDocs: v2Serialized,
                    rawContent: v2Content,
                },
                v3,
            },
        };
        
        documentationCache.set(cacheKey, documentation);
        
        return documentation;
    } catch (error) {
        console.error(`Error processing documentation for ${cacheKey}:`, error);
        return null;
    }
});
