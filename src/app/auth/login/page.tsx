'use client';

import { useState } from 'react';
import { Box, Typography, Button, Checkbox, FormControlLabel, Link as MuiLink, CircularProgress } from '@mui/material';
import Link from 'next/link';
import TextFeldInput from '@/components/inputs/TextFeldInput';
import { Formik, Form } from 'formik';
import { utils } from '@/utils';
import { initialValues, validationSchema, userLoginService } from './services';

export default function LoginPage() {
    const [rememberMe, setRememberMe] = useState(false);
    const { onLoginSubmit, loading } = userLoginService();

    return (
        <Formik
            validateOnBlur={false}
            initialValues={initialValues}
            onSubmit={onLoginSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <Box sx={{ width: 375, borderRadius: 4, p: 4 }}>
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: 'text.primary',
                                textAlign: 'center',
                            }}
                        >
                            Welcome Back
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
                            Enter your credentials to log in to your developer account
                        </Typography>
                    </Box>

                    <Box sx={{ width: '100%' }}>
                        <Form>
                            <Box sx={{ mb: 2 }}>
                                <TextFeldInput
                                    fullWidth
                                    type="email"
                                    label="E-mail"
                                    placeholder="Enter your email address"
                                    {...utils.getFormikFieldProps({ formik, field: 'email' })}
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <TextFeldInput
                                    fullWidth
                                    type="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                    isPassword
                                    {...utils.getFormikFieldProps({ formik, field: 'password' })}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label="Remember me"
                                />
                                <MuiLink
                                    href="/auth/forget-password"
                                    sx={{
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        fontWeight: 'medium',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Forgot password?
                                </MuiLink>
                            </Box>

                            <Button
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                                type="submit"
                                fullWidth
                                size="small"
                                variant="contained"
                                sx={{ height: 40 }}
                            >
                                Log in
                            </Button>

                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Don&apos;t have an account?{' '}
                                    <Link href="/auth/signup" passHref>
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
                                            Sign up
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
