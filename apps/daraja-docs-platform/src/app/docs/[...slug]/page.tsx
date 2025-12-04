import { getDocumentationBySlug, getAllDocumentationSlugs } from '../../../shared/lib/mdx';
import { DocumentationContent } from '../../../features/documentation';
import type { Metadata } from 'next';
import { SIDENAVITEMS } from '../../../config';
import { notFound } from 'next/navigation';

interface DocsPageProps {
    params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
    const slugs = await getAllDocumentationSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

export default async function DocsPage({ params }: Readonly<DocsPageProps>) {
    const param = await params;
    const doc = await getDocumentationBySlug(param.slug);

    if (!doc) {
        notFound();
    }

    const ITEMS = SIDENAVITEMS.filter((el) => el.segment);
    const currentPath = `/docs/${param.slug.join('/')}`;
    const currentDoc = ITEMS.findIndex((item: any) => item.segment === currentPath);
    const prevDoc = ITEMS[currentDoc - 1];
    const nextDoc = ITEMS[currentDoc + 1];

    return <DocumentationContent doc={doc} prevDoc={prevDoc} nextDoc={nextDoc} hideTabs />;
}

export async function generateMetadata({ params }: Readonly<DocsPageProps>): Promise<Metadata> {
    const param = await params;
    const doc = await getDocumentationBySlug(param.slug);
    
    if (!doc) {
        return {
            title: 'Page Not Found',
            description: 'The requested documentation page could not be found.',
        };
    }
    
    return {
        title: `${doc.frontMatter?.title || 'Documentation'} | Daraja API Docs`,
        description: doc.frontMatter?.description || 'Safaricom Daraja API documentation',
        openGraph: {
            title: doc.frontMatter?.title || 'Documentation',
            description: doc.frontMatter?.description || 'Safaricom Daraja API documentation',
            type: 'article',
        },
    };
}
