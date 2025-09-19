import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import grayMatter from 'gray-matter';
import { JSDOM } from 'jsdom';
import YAML from 'yaml';
import { extractTableOfContents } from '@/features/documentation';

const docsDirectory = path.join(process.cwd(), 'documentation', 'apis');
const apiSpecsDirectory = path.join(process.cwd(), 'api-specs', 'auth.yaml');

export type Frontmatter = {
    title: string;
    description: string;
};

function stripHtml(html: string): string {
    return new JSDOM(html).window.document.body.textContent || '';
}

export async function getDocumentationBySlug(slug: string[]) {
    const fullPath = path.join(docsDirectory, `${slug.join('/')}.mdx`);
    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const apiSpecs = fs.readFileSync(apiSpecsDirectory, 'utf8');
    const apiSpecsYaml = YAML.parse(apiSpecs);
    const { content, data: frontMatter } = grayMatter(fileContents);
    const tableOfContents = extractTableOfContents(content);

    const mdxSource = (await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypePrism, { ignoreMissing: true, aliases: { mdx: 'markdown' } }]],
        },
    })) as any;

    const compiled = mdxSource.compiledSource || '';
    const plainText = stripHtml(compiled);

    return {
        apiSpecsYaml,
        mdxSource,
        plainText,
        frontMatter,
        tableOfContents,
    };
}
