import { getDocumentationBySlug } from '@/shared/lib/mdx';
import { Container, Stack, Typography } from '@mui/material';
import { NAVTABS } from '@/config';
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

    const slug = param.slug;

    const currentPath = `/apis/${slug.join('/')}`;
    const currentDoc = NAVTABS[1].items.findIndex((item: any) => item.segment === currentPath);
    const prevDoc = NAVTABS[1].items[currentDoc - 1];
    const nextDoc = NAVTABS[1].items[currentDoc + 1];

    return <ContentsContainer doc={doc} prevDoc={prevDoc} nextDoc={nextDoc} />;
}

export async function generateMetadata({ params }: Readonly<DocsPageProps>): Promise<Metadata> {
    const param = await params;
    const doc = await getDocumentationBySlug(param.slug);
    return {
        title: doc?.frontMatter?.title || 'Documentation',
        description: doc?.frontMatter?.description || 'Documentation page',
    };
}
