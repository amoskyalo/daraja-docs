import { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ResponseUI from './ResponseUI';
import { PlaygroundHeader, PlaygroundControls, FieldGroup } from './playground-parts';

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
        <Box sx={{ backgroundColor: 'action.hover', mt: 2, borderRadius: 3, overflow: 'hidden' }}>
            <PlaygroundHeader />

            <Box sx={{ px: 2, pb: 2 }}>
                <PlaygroundControls method={apiSpecsYaml.info.method} url={apiSpecsYaml.info.url} onSend={handleSend} />

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
                            <FieldGroup
                                key={field.label}
                                label={field.label}
                                inputs={field.inputs}
                                fieldKey={field.key}
                                fieldValues={fieldValues[field.key] || {}}
                                onFieldChange={(fieldName, value) => handleFieldChange(field.key, fieldName, value)}
                            />
                        ))}
                    </Grid>

                    <Grid size={5} sx={{ paddingTop: 3 }}>
                        <ResponseUI requests={requests} languages={languages} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
