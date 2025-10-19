'use client';

import { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Grid } from '@mui/material';
import { TextInputField, SelectInputField } from '@/shared/components';
import { useSearchParams } from '@/shared/hooks';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const steps = ['Business details', 'Contact person details', 'Admin requirements'];
const businessCategories = [
    { value: 'auto-vehicle', label: 'Auto & Vehicle' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'finance', label: 'Finance' },
    { value: 'health-fitness', label: 'Health & Fitness' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'other', label: 'other' },
];

export const SignUpForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { setParams } = useSearchParams();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ maxWidth: '75%', minWidth: '75%', mx: 'auto' }}>
            <Button startIcon={<KeyboardBackspaceIcon />} onClick={() => setParams({ tab: null })} sx={{ mb: 1 }}>
                Back
            </Button>
            <Box>
                <Typography variant="h5" fontWeight={600}>
                    Sign Up
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Fill in the form below to sign up for the Mini Program.
                </Typography>
            </Box>

            <Stepper activeStep={activeStep} sx={{ mt: 4 }}>
                {steps.map((label) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextInputField label="Business name" placeholder="Enter business name" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SelectInputField
                        label="Business category"
                        options={businessCategories}
                        placeholder="Select business category"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextInputField
                        label="M-Pesa short code"
                        helperText="Business Shortcode (Store number/Head office/Paybill/B2C)."
                        placeholder="Enter M-Pesa short code"
                        sx={{ '& .MuiFormHelperText-root': { ml: '0px !important' } }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextInputField
                        label="M-Pesa username"
                        helperText="Username given to login into the M-Pesa portal."
                        placeholder="Enter M-Pesa username"
                        sx={{ '& .MuiFormHelperText-root': { ml: '0px !important' } }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextInputField label="Company website" placeholder="Enter company website" />
                </Grid>
                <Grid size={6}>
                    <TextInputField label="About your mini app" placeholder="About your mini app" />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {activeStep > 0 && (
                    <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                        Back
                    </Button>
                )}
                <Box sx={{ flex: '1 1 auto' }} />

                <Button onClick={handleNext} variant="contained" size="small" sx={{ borderRadius: 1 }}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </Box>
    );
};
