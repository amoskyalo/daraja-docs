import { Grid } from '@mui/material';
import { ContentRenderer } from '../client/content-renderer';
import { TableOfContents } from '../../../table-of-contents';
import { extractTableOfContents } from '../../../../utils/extractTableOfContents';

interface DocumentationContentProps {
    doc: any;
    prevDoc?: any;
    nextDoc?: any;
    hideTabs?: boolean;
}

export const DocumentationContent = ({ doc, prevDoc, nextDoc, hideTabs }: DocumentationContentProps) => {
    // Extract table of contents from the default or v2 version
    const defaultVersion = doc.docs.v2 || Object.values(doc.docs)[0];
    const tableOfContentsData = extractTableOfContents(defaultVersion.rawContent);

    return (
        <Grid
            id="docs-container"
            container
            sx={{
                height: '100%',
                position: 'relative',
                flex: 1,
                pl: { xs: 0, md: 0, lg: 4 },
                pt: 1,
            }}
        >
            <Grid
                size={{ xs: 12, md: 8.5 }}
                sx={{
                    pb: 4,
                    pl: { xs: 3, md: 1, lg: 0 },
                    pr: { xs: 3, md: 2 },
                    position: 'relative',
                }}
            >
                <ContentRenderer doc={doc} prevDoc={prevDoc} nextDoc={nextDoc} hideTabs={hideTabs} />
            </Grid>

            <Grid
                id="table-of-contents"
                size={{ xs: 0, md: 3.5 }}
                sx={{
                    py: 2,
                    display: { xs: 'none', md: 'block' },
                }}
            >
                <TableOfContents headings={tableOfContentsData} />
            </Grid>
        </Grid>
    );
};
