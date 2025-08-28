import { getDocumentationBySlug } from '@/lib/mdx';
import { MDXRenderer } from '@/components/mdx/MDXRenderer';
import { Box, Container, Typography } from '@mui/material';
import DocsBottomNavigator from '@/components/docs-bottom-navigator';
import DocsContainer, { MainPanel, SidebarPanel } from '@/components/containers/docs-container';
import TableOfContents from '@/components/table-of-contents';
import type { Metadata } from 'next';
import { apiList } from '@/constants/api-list';

interface DocsPageProps {
    params: Promise<{ slug: string[] }>;
}

export default async function DocsPage({ params }: Readonly<DocsPageProps>) {
    const param = await params;

    const doc = await getDocumentationBySlug(param.slug);

    if (!doc) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="error">
                        Page not found
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        The documentation file could not be found.
                    </Typography>
                </Box>
            </Container>
        );
    }

    const currentDoc = apiList.findIndex((item: any) => item.slug === param.slug.join('/'));
    const prevDoc = apiList[currentDoc - 1] as any;
    const nextDoc = apiList[currentDoc + 1] as any;

    return (
        <DocsContainer>
            <MainPanel slug={param.slug.join('/') ?? ""}>
                {doc.frontMatter?.description && (
                    <Box sx={{ mb: 3, p: 2, backgroundColor: 'action.hover', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {doc.frontMatter.description}
                        </Typography>
                    </Box>
                )}
                <MDXRenderer mdxSource={doc.mdxSource} />
                <DocsBottomNavigator prevDoc={prevDoc} nextDoc={nextDoc} />
            </MainPanel>

            <SidebarPanel>
                <TableOfContents headings={doc.tableOfContents} />
            </SidebarPanel>
        </DocsContainer>
    );
}

export async function generateMetadata({ params }: Readonly<DocsPageProps>): Promise<Metadata> {
    const param = await params;
    const doc = await getDocumentationBySlug(param.slug);
    return {
        title: doc?.frontMatter?.title || 'Documentation',
        description: doc?.frontMatter?.description || 'Documentation page',
    };
}
