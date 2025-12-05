import { Stack, TextField, Typography, alpha, Grid } from '@mui/material';

interface FieldInputProps {
    label: string;
    type: string;
    required: boolean;
    description: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
}

export const FieldInput = ({ label, type, required, description, value, placeholder, onChange }: FieldInputProps) => {
    return (
        <Grid container sx={{ paddingY: 2 }} spacing={2}>
            <Grid size={6}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body1" fontWeight={500}>
                        {label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`<${type}>`}
                    </Typography>
                    {required && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{
                                paddingTop: 0.1,
                                paddingBottom: 0.2,
                                paddingX: 0.7,
                                borderRadius: 1,
                                fontSize: 12,
                                backgroundColor: (theme) => alpha(theme.palette.error.main, 0.2),
                            }}
                        >
                            required
                        </Typography>
                    )}
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {description}
                </Typography>
            </Grid>

            <Grid size={6}>
                <TextField
                    placeholder={placeholder}
                    variant="standard"
                    size="small"
                    fullWidth
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
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
                    sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 2,
                        paddingX: 1,
                    }}
                />
            </Grid>
        </Grid>
    );
};
