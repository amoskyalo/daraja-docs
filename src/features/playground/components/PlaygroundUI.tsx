import { Box, Button, Stack, Typography, Grid, alpha, TextField, Tooltip } from '@mui/material';
import ResponseUI from './ResponseUI';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const requiredFields = [
    {
        label: 'Headers',
        inputs: [
            {
                label: 'Authorization',
                description: 'Bearer authentication header of the form Bearer is your auth token.',
                placeholder: 'Enter bearer token',
                required: true,
                type: 'string',
            },
        ],
    },
    {
        label: 'Body',
        inputs: [
            {
                label: 'Content',
                type: 'string',
                description:
                    'The content to extract and process into a document. This can be a URL to a website, a PDF, an image, or a video.',
                placeholder: 'Enter content',
                required: true,
            },
            {
                label: 'Content type',
                type: 'string',
                description: 'Optional tag this document should be containerized by.',
                placeholder: 'Enter content type',
            },
        ],
    },
    {
        label: 'Query Parameters',
        inputs: [
            {
                label: 'Merchant Code',
                type: 'string',
                description: 'The merchant code of the merchant.',
                placeholder: 'Enter merchant code',
                required: true,
            },
        ],
    },
];

export const PlaygroundUI = () => {
    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={2}>
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
                    <Typography sx={{ opacity: 0.9 }} variant="body1" fontWeight={500}>
                        Playground
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
                        py: 0.5,
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
                            px: 0.5,
                            fontWeight: 600,
                            mr: 1,
                        }}
                        variant="body2"
                        color="white"
                    >
                        GET
                    </Typography>
                    <Tooltip title="https://sandbox.safaricom.co.ke">
                        <Typography color="primary" fontWeight={500}>{`{BASE_URL}`}</Typography>
                    </Tooltip>
                    <Typography sx={{ opacity: 0.9 }} variant="body1">
                        /oauth/v1/generate?grant_type=client_credential
                    </Typography>
                </Stack>

                <Button variant="contained" sx={{ paddingLeft: '8px', paddingY: '4px', paddingRight: '3px' }}>
                    Send
                    <PlayArrowIcon fontSize="small" />
                </Button>
            </Stack>

            <Grid container>
                <Grid size={7}>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" fontWeight={600}>
                            Authorization API
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Gives you a time bound access token to call allowed APIs.
                        </Typography>
                    </Box>

                    {requiredFields.map((field) => (
                        <Box
                            sx={{ borderRadius: 2, border: 1, borderColor: 'divider', py: 1, mt: 2, px: 2 }}
                            key={field.label}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, cursor: 'pointer' }}
                                gap={0.5}
                            >
                                <KeyboardArrowRightIcon color="disabled" sx={{ fontSize: 22 }} />
                                <Typography variant="body2" fontWeight={600}>
                                    {field.label}
                                </Typography>
                            </Stack>

                            {field.inputs.map((input, index) => {
                                const isLast = index === field.inputs.length - 1;

                                return (
                                    <Grid
                                        container
                                        sx={{ paddingY: 2, borderBottom: isLast ? 0 : 1, borderColor: 'divider' }}
                                        spacing={1}
                                        key={input.label}
                                    >
                                        <Grid size={6}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {input.label}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {`<${input.type}>`}
                                                </Typography>
                                                {input?.required && (
                                                    <Typography
                                                        variant="body2"
                                                        color="error"
                                                        sx={{
                                                            paddingTop: 0.1,
                                                            paddingBottom: 0.2,
                                                            paddingX: 0.7,
                                                            borderRadius: 1,
                                                            fontSize: 12,
                                                            backgroundColor: (theme) =>
                                                                alpha(theme.palette.error.main, 0.2),
                                                        }}
                                                    >
                                                        required
                                                    </Typography>
                                                )}
                                            </Stack>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                {input.description}
                                            </Typography>
                                        </Grid>

                                        <Grid size={6}>
                                            <TextField
                                                placeholder={input.placeholder}
                                                variant="standard"
                                                size="small"
                                                fullWidth
                                                slotProps={{
                                                    input: {
                                                        style: {
                                                            height: '34px',
                                                            fontSize: '14px',
                                                        },

                                                        disableUnderline: true,
                                                    },
                                                    htmlInput: {
                                                        style: {
                                                            padding: 0,
                                                        },
                                                    },
                                                }}
                                                sx={{ border: 1, borderColor: 'divider', borderRadius: 2, paddingX: 1 }}
                                            />
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Box>
                    ))}
                </Grid>

                <Grid size={5} sx={{padding: 2}}>
                    <ResponseUI />
                </Grid>
            </Grid>
        </Box>
    );
};
