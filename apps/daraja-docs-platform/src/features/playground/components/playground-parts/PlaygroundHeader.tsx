import { Stack, Typography } from '@mui/material';
import CodeTwoToneIcon from '@mui/icons-material/CodeTwoTone';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const PlaygroundHeader = () => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
                mb: 2,
                py: 1.2,
                px: 2,
                backgroundColor: 'action.selected',
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                sx={{ border: 1, borderColor: 'text.primary', padding: 0.2, borderRadius: '50%' }}
            >
                <CodeTwoToneIcon sx={{ fontSize: 14 }} />
            </Stack>
            <Typography variant="body2">Daraja Console</Typography>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                    height: 18,
                    width: 18,
                    backgroundColor: 'error.main',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transform: 'rotate(45deg)',
                }}
            >
                <ArrowLeftIcon sx={{ fontSize: 18, color: 'white', mr: -0.7 }} />
                <ArrowRightIcon sx={{ fontSize: 18, color: 'white', ml: -0.7 }} />
            </Stack>
        </Stack>
    );
};
