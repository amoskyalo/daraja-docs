import { getDocumentationBySlug } from '../../../shared/lib/mdx';
import { Box, Container, Typography } from '@mui/material';
import { ContentsContainer } from '../../../features/documentation';
import type { Metadata } from 'next';
import { SIDENAVITEMS } from '../../../config';

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

    const ITEMS = SIDENAVITEMS.filter((el) => el.segment);
    const currentPath = `/docs/${param.slug.join('/')}`;
    const currentDoc = ITEMS.findIndex((item: any) => item.segment === currentPath);
    const prevDoc = ITEMS[currentDoc - 1];
    const nextDoc = ITEMS[currentDoc + 1];

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
