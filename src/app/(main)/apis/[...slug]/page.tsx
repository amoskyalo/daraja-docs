import { getDocumentationBySlug } from '@/shared/lib/mdx';
import { MDXRenderer } from '@/features/markdown';
import { TableOfContents, DocsBottomNavigator, DocsContainer, MainPanel, SidebarPanel } from '@/features/documentation';
import { Box, Container, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';

interface DocsPageProps {
    params: Promise<{ slug: string[] }>;
}

export default async function DocsPage({ params }: Readonly<DocsPageProps>) {
    const param = await params;

    const doc = await getDocumentationBySlug(param.slug);

    if (!doc) {
        return (
            <Container maxWidth="lg">
                <Stack direction="column" alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        404
                    </Typography>
                    <Typography variant="body1">
                        The documentation file could not be found, or it may have been moved.
                    </Typography>
                </Stack>
            </Container>
        );
    }

    return (
        <DocsContainer>
            <MainPanel>
                {doc.frontMatter?.description && (
                    <Box sx={{ mb: 3, p: 2, backgroundColor: 'action.hover', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {doc.frontMatter.description}
                        </Typography>
                    </Box>
                )}
                <MDXRenderer mdxSource={doc.mdxSource} />
                <DocsBottomNavigator />
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
