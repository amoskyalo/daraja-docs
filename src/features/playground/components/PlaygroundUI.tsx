import { Box, Button, Stack, Typography, Grid, alpha, TextField, Tooltip } from '@mui/material';
import ResponseUI from './ResponseUI';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState, useEffect } from 'react';

interface ApiSpecsYaml {
    headers?: {
        properties: Record<string, any>;
    };
    body?: {
        properties: Record<string, any>;
    };
    parameters?: {
        properties: Record<string, any>;
    };
    info: {
        title: string;
        method: string;
        url: string;
    };
}

interface FieldInput {
    label: string;
    type: string;
    required: boolean;
    description: string;
    value: string;
    placeholder: string;
}

interface RequiredField {
    label: string;
    key: string;
    inputs: FieldInput[];
}

interface FieldValues {
    [fieldType: string]: {
        [fieldName: string]: string;
    };
}

export const PlaygroundUI = ({ apiSpecsYaml }: { apiSpecsYaml: ApiSpecsYaml }) => {
    const [requests, setRequests] = useState<any>(null);
    const [languages, setLanguages] = useState<any[]>([]);
    const [fieldValues, setFieldValues] = useState<FieldValues>({});

    const requiredFields = [
        {
            label: 'Headers',
            key: 'headers',
            inputs: [
                ...Object.entries(apiSpecsYaml.headers?.properties || {}).map(([name, props]: [string, any]) => ({
                    label: name,
                    type: props.type,
                    required: props.required,
                    description: props.description ?? '',
                    value: props.value ?? '',
                    placeholder: props.placeholder ?? '',
                })),
            ],
        },
        {
            label: 'Body',
            key: 'body',
            inputs: [
                ...Object.entries(apiSpecsYaml.body?.properties || {}).map(([name, props]: [string, any]) => ({
                    label: name,
                    type: props.type,
                    required: props.required,
                    description: props.description ?? '',
                    value: props.value ?? '',
                    placeholder: props.placeholder ?? '',
                })),
            ],
        },
        {
            label: 'Query Parameters',
            key: 'queryParameters',
            inputs: [
                ...Object.entries(apiSpecsYaml.parameters?.properties || {}).map(([name, props]: [string, any]) => ({
                    label: name,
                    type: props.type,
                    required: props.required,
                    description: props.description ?? '',
                    value: props.value ?? '',
                    placeholder: props.placeholder ?? '',
                })),
            ],
        },
    ];

    const handleFieldChange = (fieldType: string, fieldName: string, value: string): void => {
        setFieldValues((prev) => ({
            ...prev,
            [fieldType]: {
                ...prev[fieldType],
                [fieldName]: value,
            },
        }));
    };

    const buildRequestData = () => {
        const headers: Record<string, string> = {};
        const body: Record<string, string> = {};
        const queryParams: Record<string, string> = {};

        requiredFields.forEach((field) => {
            field.inputs.forEach((input) => {
                const value = fieldValues[field.key]?.[input.label] || input.value;
                if (value) {
                    if (field.key === 'headers') {
                        headers[input.label] = value;
                    } else if (field.key === 'body') {
                        body[input.label] = input.type === 'number' ? Number(value) : value;
                    } else if (field.key === 'queryParameters') {
                        queryParams[input.label] = value;
                    }
                }
            });
        });

        let url = apiSpecsYaml.info.url;
        if (Object.keys(queryParams).length > 0) {
            const queryString = new URLSearchParams(queryParams).toString();
            url += `?${queryString}`;
        }

        return {
            method: apiSpecsYaml.info.method,
            url: url,
            headers: headers,
            body: Object.keys(body).length > 0 ? body : undefined,
        };
    };

    const handleSend = async () => {
        try {
            const requestData = buildRequestData();

            const codeResponse = await fetch('/api/request-snippet-generator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const data = await codeResponse.json();
            setRequests(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const getLanguages = async () => {
            const response = await fetch('/api/request-snippet-generator', {
                method: 'GET',
            });
            const data = await response.json();
            setLanguages(data.languages);
        };
        getLanguages();
    }, []);

    return (
        <Box>
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
                    <Typography sx={{ opacity: 0.9 }} variant="body1" fontWeight={500}>
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
                        {apiSpecsYaml.info.method}
                    </Typography>
                    <Tooltip title="https://sandbox.safaricom.co.ke">
                        <Typography color="primary" fontWeight={500}>{`{BASE_URL}`}</Typography>
                    </Tooltip>
                    <Typography sx={{ opacity: 0.9 }} variant="body1">
                        {apiSpecsYaml.info.url?.replace('https://sandbox.safaricom.co.ke', '')}
                    </Typography>
                </Stack>

                <Button onClick={handleSend} variant="contained" sx={{ paddingY: '4px', paddingX: '8px' }}>
                    Simulate
                </Button>
            </Stack>

            <Grid spacing={2} container>
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
                                        spacing={2}
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
                                                value={fieldValues[field.key]?.[input.label] || input.value}
                                                onChange={(e) =>
                                                    handleFieldChange(field.key, input.label, e.target.value)
                                                }
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

                <Grid size={5} sx={{ paddingTop: 3 }}>
                    <ResponseUI requests={requests} languages={languages} />
                </Grid>
            </Grid>
        </Box>
    );
};
