'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXComponents } from './MDXComponents';
import { Frontmatter } from '@/lib/mdx';

interface MDXRendererProps {
    mdxSource: MDXRemoteSerializeResult<Record<string, unknown>, Frontmatter>;
}

export function MDXRenderer({ mdxSource }: Readonly<MDXRendererProps>) {
    return <MDXRemote {...mdxSource} components={MDXComponents} />;
}
