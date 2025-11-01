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

function getApiSpecs() {
    if (!cachedApiSpecs) {
        const apiSpecs = fs.readFileSync(apiSpecsDirectory, 'utf8');
        cachedApiSpecs = YAML.parse(apiSpecs);
    }
    return cachedApiSpecs;
}

export const getDocumentationBySlug = cache(async (slug: string[]) => {
    const v2Path = path.join(v2Directory, `${slug.join('/')}.mdx`);
    const v3Path = path.join(v3Directory, `${slug.join('/')}.mdx`);

    if (!fs.existsSync(v2Path)) {
        return null;
    }

    const hasV3 = fs.existsSync(v3Path);

    const v2Docs = fs.readFileSync(v2Path, 'utf8');
    const { content: v2Content, data: frontMatter } = grayMatter(v2Docs);

    const options = {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypePrism, { ignoreMissing: true, aliases: { mdx: 'markdown' } }]],
        },
    } as any;

    const v2Serialized = await serialize(v2Content, options);

    let v3: Documentation['docs']['v3'] = null;

    if (hasV3) {
        const v3Docs = fs.readFileSync(v3Path, 'utf8');
        const { content: v3Content } = grayMatter(v3Docs);
        v3 = {
            serializedDocs: await serialize(v3Content, options),
            rawContent: v3Content,
        };
    }

    return {
        apiSpecsYaml: getApiSpecs(),
        frontMatter,
        docs: {
            v2: {
                serializedDocs: v2Serialized,
                rawContent: v2Content,
            },
            v3,
        },
    };
});
