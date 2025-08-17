'use client';

import { useEffect } from 'react';
import { FormikProps, Form } from 'formik';
import { Stack, Grid, Button, CircularProgress, Box, Typography } from '@mui/material';
import { utils } from '@/utils';
import { SelectFieldInput } from '@/components/inputs/SelectFieldInput';
import TextFeldInput from '@/components/inputs/TextFeldInput';
import { useQueryGet } from '@/hooks/useQueryGet';
import { useSearchParams } from '@/hooks/useSearchParams';
import { OTPInput } from '@/components/inputs/OTPInput';

type Scope = Array<{ id: string; name: string }>;

export const CreateApplicationForm = ({ formik, loading }: { formik: FormikProps<any>; loading: boolean }) => {
    const { values, setFieldError, errors } = formik;
    const { data: scopes } = useQueryGet<Scope, any>({ url: 'getScopes', options: { refetchOnWindowFocus: false } });
    const { getParam } = useSearchParams();

    useEffect(() => {
        if (values.environment === 'PRODUCTION' && values.account_number === '600980') {
            setFieldError('account_number', 'Account no. 600980 is not allowed for production environment');
        } else if (errors.account_number === 'Account no. 600980 is not allowed for production environment') {
            setFieldError('account_number', undefined);
        }
    }, [values.environment, values.account_number, setFieldError, errors.account_number]);

    const verify = getParam('verify');

    console.log(values);

    return (
        <Form>
            <Stack spacing={3} sx={{ padding: 3 }}>
                {!verify && (
                    <>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <SelectFieldInput
                                    label="Application Environment"
                                    options={[
                                        { label: 'Sandbox', value: 'SANDBOX' },
                                        { label: 'Production', value: 'PRODUCTION' },
                                    ]}
                                    placeholder="Select Environment"
                                    {...utils.getFormikFieldProps({ formik, field: 'environment' })}
                                />
                            </Grid>

                            <Grid size={6}>
                                <SelectFieldInput
                                    label="Application Scope"
                                    options={scopes?.data.map((scope: any) => ({
                                        label: scope.name,
                                        value: scope.id,
                                    }))}
                                    placeholder="Select Scope"
                                    {...utils.getFormikFieldProps({ formik, field: 'scope_id', })}
                                />
                            </Grid>
                        </Grid>
                        <TextFeldInput
                            name="name"
                            label="Application Name"
                            placeholder="Application Name"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: '44px',
                                },
                            }}
                            {...utils.getFormikFieldProps({ formik, field: 'name' })}
                        />
                        <TextFeldInput
                            label="Account Number"
                            placeholder="Account Number"
                            disabled={values.environment === 'SANDBOX'}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: '44px',
                                },
                            }}
                            {...utils.getFormikFieldProps({ formik, field: 'account_number' })}
                        />
                        <TextFeldInput
                            label="Callback URL"
                            placeholder="Callback URL"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: '44px',
                                },
                            }}
                            {...utils.getFormikFieldProps({ formik, field: 'callback_url' })}
                        />
                    </>
                )}

                {verify && (
                    <Box>
                        <Typography variant="body2">
                            Enter verification OTP sent to your email to complete this process
                        </Typography>
                        <OTPInput
                            sx={{ '& .MuiOutlinedInput-root': { height: '44px' } }}
                            {...utils.getFormikFieldProps({ formik, field: 'otp', isOTP: true })}
                            length={6}
                        />
                    </Box>
                )}

                <Button
                    sx={{
                        height: 40,
                        padding: '0 16px',
                        textTransform: 'none',
                        color: 'white',
                        width: 'max-content',
                    }}
                    variant="contained"
                    type="submit"
                    fullWidth={false}
                    disableElevation
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    disabled={loading}
                >
                    Create Application
                </Button>
            </Stack>
        </Form>
    );
};
