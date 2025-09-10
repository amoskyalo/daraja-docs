'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXComponents } from './MDXComponents';
import { Frontmatter } from '@/shared/lib/mdx';

interface MDXRendererProps {
    mdxSource: MDXRemoteSerializeResult<Record<string, unknown>, Frontmatter>;
}

export const MDXRenderer = ({ mdxSource }: Readonly<MDXRendererProps>) => {
    return <MDXRemote {...mdxSource} components={MDXComponents as any} />;
}
