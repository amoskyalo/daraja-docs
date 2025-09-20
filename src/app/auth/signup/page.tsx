'use client';

import { Box, Typography, Button, Link as MuiLink, Grid, Stack } from '@mui/material';
import { TextInputField, PhoneInputField } from '@/shared/components';
import { Formik, Form } from 'formik';
import { utils } from '@/shared/utils';

export default function SignupPage() {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100dvh', position: 'relative' }}
        >
            <Formik
                validateOnBlur={false}
                initialValues={{
                    first_name: '',
                    last_name: '',
                    phone_number: '',
                    email: '',
                    username: '',
                }}
                onSubmit={(values) => console.log(values)}
            >
                {(formik) => (
                    <Box sx={{ width: 400, borderRadius: 4, p: 4 }}>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'text.primary',
                                    textAlign: 'center',
                                }}
                            >
                                Create an Account
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    mb: 2,
                                    px: 2,
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
                                        <TextInputField
                                            label="First name"
                                            placeholder="Enter first name"
                                            {...utils.getFormikFieldProps({ formik, field: 'first_name' })}
                                        />
                                    </Grid>

                                    <Grid size={6}>
                                        <TextInputField
                                            label="Last name"
                                            placeholder="Enter last name"
                                            {...utils.getFormikFieldProps({ formik, field: 'last_name' })}
                                        />
                                    </Grid>
                                </Grid>

                                <Box sx={{ my: 2 }}>
                                    <PhoneInputField
                                        poperWidth={350}
                                        label="Phone number"
                                        placeholder="700 000 000"
                                        {...utils.getFormikFieldProps({ formik, field: 'phone_number' })}
                                    />
                                </Box>

                                <Box sx={{ my: 2 }}>
                                    <TextInputField
                                        label="E-mail"
                                        placeholder="Enter your email address"
                                        {...utils.getFormikFieldProps({ formik, field: 'email' })}
                                    />
                                </Box>

                                <Box sx={{ mb: 4 }}>
                                    <TextInputField
                                        label="Username"
                                        placeholder="Enter your username"
                                        {...utils.getFormikFieldProps({ formik, field: 'username' })}
                                    />
                                </Box>

                                <Button type="submit" fullWidth size="large" variant="contained" sx={{ height: 40 }}>
                                    Register
                                </Button>

                                <Box sx={{ textAlign: 'center', mt: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Already have an account?{' '}
                                        <MuiLink
                                            sx={{
                                                color: 'primary.main',
                                                textDecoration: 'none',
                                                fontWeight: 'medium',
                                            }}
                                            href="/auth/login"
                                        >
                                            Log in
                                        </MuiLink>
                                    </Typography>
                                </Box>
                            </Form>
                        </Box>
                    </Box>
                )}
            </Formik>

            <Stack sx={{ position: 'absolute', bottom: 2, left: 0, width: '100%' }}>
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', width: '50%', mx: 'auto' }}>
                    By clicking register, you accept Safaricom <MuiLink href="#">terms and conditions</MuiLink> concerning this application.
                </Typography>
            </Stack>
        </Stack>
    );
}
