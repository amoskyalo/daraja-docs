'use client';

import { Box, Typography, Button, Link, Stack, CircularProgress } from '@mui/material';
import { TextInputField } from '@/shared/components';
import { Formik, Form } from 'formik';
import { utils } from '@/shared/utils';
import { initialValues, validationSchema, useLogin } from './services';

export default function LoginPage() {
    const { handleLogin, loading } = useLogin();

    return (
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
            <Formik
                validateOnBlur={false}
                initialValues={initialValues}
                onSubmit={(values) => handleLogin(values)}
                validationSchema={validationSchema}
            >
                {(formik) => (
                    <Box sx={{ width: { xs: '100%', sm: 375 }, borderRadius: 4, p: { md: 4, xs: 3 } }}>
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'text.primary',
                                    textAlign: 'center',
                                }}
                            >
                                Account Login
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 3,
                                    color: 'text.secondary',
                                    textAlign: 'center',
                                    opacity: 0.8,
                                }}
                            >
                                Enter your email or username and password to login
                            </Typography>
                        </Box>

                        <Box sx={{ width: '100%' }}>
                            <Form>
                                <Box sx={{ mb: 2 }}>
                                    <TextInputField
                                        fullWidth
                                        size="small"
                                        type="email"
                                        label="E-mail or username"
                                        placeholder="Enter your email address or username"
                                        {...utils.getFormikFieldProps({ formik, field: 'email' })}
                                    />
                                </Box>

                                <Box sx={{ mb: 1 }}>
                                    <TextInputField
                                        fullWidth
                                        size="small"
                                        type="password"
                                        label="Password"
                                        placeholder="Enter your password"
                                        isPassword
                                        {...utils.getFormikFieldProps({ formik, field: 'password' })}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        mb: 3,
                                    }}
                                >
                                    <Link
                                        href="/auth/forget-password"
                                        sx={{
                                            color: 'primary.main',
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        Forgot password?
                                    </Link>
                                </Box>

                                <Button
                                    startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
                                    type="submit"
                                    fullWidth
                                    size="small"
                                    variant="contained"
                                    sx={{ height: 40 }}
                                    disabled={loading}
                                >
                                    Login
                                </Button>

                                <Box sx={{ textAlign: 'center', mt: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Don&apos;t have an account?{' '}
                                        <Link
                                            sx={{
                                                color: 'primary.main',
                                                textDecoration: 'none',
                                                fontWeight: 'medium',
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                },
                                            }}
                                            href="/auth/signup"
                                        >
                                            Go to Sign up
                                        </Link>
                                    </Typography>
                                </Box>
                            </Form>
                        </Box>
                    </Box>
                )}
            </Formik>
        </Stack>
    );
}
