'use client';

import { Box, Typography, Button, Link as MuiLink, CircularProgress, Grid } from '@mui/material';
import Link from 'next/link';
import TextFeldInput from '@/components/inputs/TextFeldInput';
import { Formik, Form } from 'formik';
import { utils } from '@/utils';
import { userSignupService, initialValues, validationSchema } from './services';
import PhoneNumberInput from '@/components/inputs/phoneNumberInput';

export default function SignupPage() {
    const { onSubmit, loading } = userSignupService();

    return (
        <Formik
            validateOnBlur={false}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <Box sx={{ width: 350 }}>
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: 'text.primary',
                                textAlign: 'center',
                            }}
                        >
                            Create an Account
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 2,
                                fontWeight: 'medium',
                                color: 'text.primary',
                                textAlign: 'center',
                            }}
                        >
                            Create your developer account to get started with our APIs
                        </Typography>
                    </Box>

                    <Box sx={{ width: '100%' }}>
                        <Form>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <TextFeldInput
                                        label="First name"
                                        placeholder="Enter first name"
                                        {...utils.getFormikFieldProps({ formik, field: 'first_name' })}
                                    />
                                </Grid>

                                <Grid size={6}>
                                    <TextFeldInput
                                        label="Last name"
                                        placeholder="Enter last name"
                                        {...utils.getFormikFieldProps({ formik, field: 'last_name' })}
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ my: 2 }}>
                                <PhoneNumberInput
                                    poperWidth={350}
                                    label="Phone number"
                                    {...utils.getFormikFieldProps({ formik, field: 'phone_number' })}
                                />
                            </Box>

                            <Box sx={{ my: 2 }}>
                                <TextFeldInput
                                    label="E-mail"
                                    placeholder="Enter your email address"
                                    {...utils.getFormikFieldProps({ formik, field: 'email' })}
                                />
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <TextFeldInput
                                    label="Password"
                                    placeholder="Enter your password"
                                    isPassword
                                    {...utils.getFormikFieldProps({ formik, field: 'password' })}
                                />
                            </Box>

                            <Button
                                disabled={loading}
                                type="submit"
                                fullWidth
                                size="large"
                                variant="contained"
                                sx={{ height: 40 }}
                                startIcon={loading ? <CircularProgress size={20} /> : null}
                            >
                                Register now
                            </Button>

                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Already have an account?{' '}
                                    <Link href="/auth/login" passHref>
                                        <MuiLink
                                            sx={{
                                                color: 'primary.main',
                                                textDecoration: 'none',
                                                fontWeight: 'medium',
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                },
                                            }}
                                        >
                                            Log in
                                        </MuiLink>
                                    </Link>
                                </Typography>
                            </Box>
                        </Form>
                    </Box>
                </Box>
            )}
        </Formik>
    );
}
