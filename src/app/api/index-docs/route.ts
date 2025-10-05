import { getDocumentationBySlug } from '@/shared/lib/mdx';
import fs from 'fs';
import { getAllDocPaths } from '@/features/documentation';
import { NextResponse } from 'next/server';
import { client } from '@/shared/lib/ai';
interface IndexingResponse {
    success: boolean;
}

export async function POST(): Promise<NextResponse<IndexingResponse>> {
    try {
        const docPaths = getAllDocPaths();

        for (const pathArray of docPaths) {
            try {
                const doc = await getDocumentationBySlug(pathArray);

                if (doc) {
                    const mdxContent = fs.readFileSync(`./documentation/v2/${pathArray.join('/')}.mdx`, 'utf-8');

                    await client.memories.add({
                        content: mdxContent,
                        containerTag: pathArray.join('/'),
                        metadata: {
                            fileName: pathArray.join('/'),
                            fileType: 'mdx',
                            uploadedAt: new Date().toISOString(),
                        },
                    });

                    console.log('Successfully indexed document');
                } else {
                    console.log(`Could not load: docs/${pathArray.join('/')}`);
                }
            } catch (error) {
                const errorMsg = `Error processing ${pathArray.join('/')}: ${error instanceof Error ? error.message : String(error)}`;
                console.error(errorMsg);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully indexed documents',
        });
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
