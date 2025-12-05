import { Box, Stack, Typography } from '@mui/material';
import SegmentIcon from '@mui/icons-material/Segment';
import { TocInteractive } from '../client/TocInteractive';
import type { HeadingItem } from '../../../../utils/extractTableOfContents';

interface TableOfContentsProps {
    headings: HeadingItem[];
}

export const TableOfContents = ({ headings }: Readonly<TableOfContentsProps>) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: '66px',
                height: 'calc(100vh - 66px)',
                overflowY: 'auto',
                py: 3,
                px: 2,
                width: '100%',
            }}
        >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <SegmentIcon fontSize="small" />
                <Typography variant="body2" fontWeight="bold">
                    On this page
                </Typography>
            </Stack>

            <TocInteractive headings={headings} />
        </Box>
    );
};
