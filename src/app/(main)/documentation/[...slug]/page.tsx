import { getDocumentationBySlug } from '@/shared/lib/mdx';
import { Box, Container, Typography } from '@mui/material';
import { NAVTABS } from '@/config/constants/routes';
import { ContentsContainer } from '@/features/documentation';
import type { Metadata } from 'next';

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

    const currentPath = `/documentation/${param.slug.join('/')}`;
    const currentDoc = NAVTABS[0].items.findIndex((item: any) => item.segment === currentPath);
    const prevDoc = NAVTABS[0].items[currentDoc - 1];
    const nextDoc = NAVTABS[0].items[currentDoc + 1];

   return <ContentsContainer doc={doc} prevDoc={prevDoc} nextDoc={nextDoc} hideTabs />;
}

export async function generateMetadata({ params }: Readonly<DocsPageProps>): Promise<Metadata> {
    const param = await params;
    const doc = await getDocumentationBySlug(param.slug);
    return {
        title: doc?.frontMatter?.title || 'Documentation',
        description: doc?.frontMatter?.description || 'Documentation page',
    };
}
