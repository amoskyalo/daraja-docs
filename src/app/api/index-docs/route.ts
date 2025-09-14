import { algoliasearch } from 'algoliasearch';
import { getDocumentationBySlug } from '@/shared/lib/mdx';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

interface DocumentRecord {
    objectID: string;
    title: string;
    content: string;
    description: string;
    url: string;
    category: string;
    // tags: string[];
    section: string;
    slug: string;
    searchableContent: string;
}

interface IndexingResponse {
    success: boolean;
    indexed?: number;
    errors?: number;
    records?: Array<{
        title: string;
        url: string;
        category: string;
    }>;
    algoliaTaskID?: string;
    message?: string;
    error?: string;
    stack?: string;
}

const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!, process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY!);

const MAX_CONTENT_LENGTH = 1000;

function getAllDocPaths(): string[][] {
    const docsDir = path.join(process.cwd(), 'documentation', 'apis');
    const paths: string[][] = [];

    function scanDirectory(dir: string, relativePath: string[] = []): void {
        try {
            const items = fs.readdirSync(dir, { withFileTypes: true });

            items.forEach((item) => {
                if (item.isDirectory()) {
                    scanDirectory(path.join(dir, item.name), [...relativePath, item.name]);
                } else if (item.name.endsWith('.mdx') || item.name.endsWith('.md')) {
                    const fileName = item.name.replace(/\.(mdx|md)$/, '');
                    paths.push([...relativePath, fileName]);
                }
            });
        } catch (error) {
            console.error(`Error scanning directory ${dir}:`, error);
        }
    }

    scanDirectory(docsDir);
    return paths;
}

export async function POST(): Promise<NextResponse<IndexingResponse>> {
    try {
        console.log('Starting documentation indexing...');

        const docPaths = getAllDocPaths();
        const records: DocumentRecord[] = [];

        for (const pathArray of docPaths) {
            try {
                const doc = await getDocumentationBySlug(pathArray);

                if (doc) {
                    const plainTextContent = doc.plainText
                        ? doc.plainText
                              .replace(/```[\s\S]*?```/g, '')
                              .replace(/`([^`]+)`/g, '$1')
                              .replace(/\*\*([^*]+)\*\*/g, '$1')
                              .replace(/\*([^*]+)\*/g, '$1')
                              .replace(/#+\s+/g, '')
                              .replace(/\|[^|\n]*\|/g, '')
                              .replace(/\n+/g, ' ')
                              .trim()
                        : '';

                    const record: DocumentRecord = {
                        objectID: `docs-${pathArray.join('-')}`,
                        title: doc.frontMatter?.title || pathArray[pathArray.length - 1].replace(/-/g, ' '),
                        content: plainTextContent.substring(0, MAX_CONTENT_LENGTH),
                        description: doc.frontMatter?.description || '',
                        url: `/docs/${pathArray.join('/')}`,
                        category: pathArray[0] === 'api' ? 'API Documentation' : 'Documentation',
                        section: pathArray[0] || 'general',
                        slug: pathArray.join('/'),
                        searchableContent: [
                            doc.frontMatter?.title || '',
                            doc.frontMatter?.description || '',
                            plainTextContent.substring(0, MAX_CONTENT_LENGTH),
                        ].join(' '),
                    };

                    records.push(record);
                } else {
                    console.log(`Could not load: docs/${pathArray.join('/')}`);
                }
            } catch (error) {
                const errorMsg = `Error processing ${pathArray.join('/')}: ${error instanceof Error ? error.message : String(error)}`;
                console.error(errorMsg);
            }
        }

        if (records.length > 0) {
            await client.saveObjects({
                indexName: 'documentation',
                objects: records as any,
            });

            console.log('Successfully uploaded to Algolia');

            return NextResponse.json({
                success: true,
                message: 'Successfully indexed documents',
            });
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: 'No documents found to index',
                },
                { status: 400 },
            );
        }
    } catch (error) {
        console.error('Indexing failed:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined,
            },
            { status: 500 },
        );
    }
}

export async function GET(): Promise<NextResponse<IndexingResponse>> {
    try {
        const { results } = await client.search({
            requests: [
                {
                    indexName: 'documentation',
                },
            ],
        });

        console.log(results);

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        );
    }
}
