import { Button, Stack, Tooltip, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface PlaygroundControlsProps {
    method: string;
    url: string;
    onSend: () => void;
}

export const PlaygroundControls = ({ method, url, onSend }: PlaygroundControlsProps) => {
    return (
        <Stack direction="row" alignItems="center" spacing={1.5}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    maxWidth: 250,
                    width: 250,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 2,
                    pl: 1,
                    py: 0.5,
                    pr: 0.5,
                    cursor: 'pointer',
                    backgroundColor: 'action.hover',
                    '&:hover': { backgroundColor: 'action.selected' },
                }}
            >
                <Typography sx={{ opacity: 0.9 }} variant="body2" fontWeight={500}>
                    Select an app
                </Typography>
                <KeyboardArrowDownIcon />
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                sx={{
                    flex: 1,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 2,
                    px: 0.7,
                    py: 0.75,
                    cursor: 'pointer',
                    backgroundColor: 'action.hover',
                    '&:hover': { backgroundColor: 'action.selected' },
                }}
            >
                <Typography
                    sx={{
                        opacity: 0.9,
                        backgroundColor: 'primary.main',
                        borderRadius: 1,
                        px: 1,
                        fontWeight: 500,
                        mr: 1,
                    }}
                    variant="caption"
                    color="white"
                >
                    {method}
                </Typography>
                <Tooltip title="https://sandbox.safaricom.co.ke">
                    <Typography color="primary" fontWeight={500} variant="body2">
                        {`{BASE_URL}`}
                    </Typography>
                </Tooltip>
                <Typography sx={{ opacity: 0.9 }} variant="body2">
                    {url?.replace('https://sandbox.safaricom.co.ke', '')}
                </Typography>
            </Stack>

            <Button onClick={onSend} variant="contained" size="small" sx={{ borderRadius: 2 }}>
                Simulate
            </Button>
        </Stack>
    );
};
