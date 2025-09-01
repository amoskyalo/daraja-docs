'use client';

import { Formik, Form } from 'formik';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { utils } from '@/utils';
import { useState, useEffect } from 'react';
import { OTPInput } from '@/components/inputs/OTPInput';
import { useRouter } from 'next/navigation';
import { useLoginCredentials } from '@/context/auth-context';
import TextFeldInput from '@/components/inputs/TextFeldInput';

const otpInitialValues = {
    otp: '',
    new_password: '',
};

const ResetPasswordPage = () => {
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const { loginCredentials } = useLoginCredentials();
    const router = useRouter();

    const otpValidationSchema = utils.getValidationSchema([
        {
            name: 'otp',
            type: 'string',
            errorMessage: 'Please enter your OTP',
        },
    ]);

    const handleResendCode = () => {
        setTimer(60);
        setCanResend(false);
    };

    useEffect(() => {
        if (!loginCredentials) {
            router.push('/auth/reset-password');
        }
    }, [loginCredentials]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timer > 0 && !canResend) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [timer, canResend]);

    return (
        <Formik
            validateOnBlur={false}
            initialValues={otpInitialValues}
            onSubmit={(values) => console.log(values)}
            validationSchema={otpValidationSchema}
        >
            {(formik) => (
                <Box sx={{ width: 300 }}>
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: 'text.primary',
                                textAlign: 'center',
                            }}
                        >
                            Reset Password
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 'medium',
                                color: 'text.primary',
                                textAlign: 'center',
                            }}
                        >
                            We&apos;ve sent a verification code to
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 3,
                                fontWeight: 'bold',
                                color: 'primary.main',
                                textAlign: 'center',
                            }}
                        >
                            {loginCredentials?.email}
                        </Typography>
                    </Box>

                    <Box sx={{ width: '100%' }}>
                        <Form>
                            <Box sx={{ mb: 2 }}>
                                <OTPInput
                                    fullWidth
                                    length={6}
                                    label="Reset OTP"
                                    {...utils.getFormikFieldProps({ formik, field: 'otp', isOTP: true })}
                                />
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <TextFeldInput
                                    fullWidth
                                    type="password"
                                    placeholder="Enter your new password"
                                    label="New Password"
                                    isPassword
                                    {...utils.getFormikFieldProps({ formik, field: 'new_password' })}
                                />
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                size="large"
                                variant="contained"
                                sx={{ height: 40 }}
                            >
                                Reset Password
                            </Button>

                            <Box sx={{ textAlign: 'center', mt: 1 }}>
                                {!canResend ? (
                                    <Typography variant="body2" color="text.secondary">
                                        Resend code in {String(Math.floor(timer / 60)).padStart(2, '0')}:
                                        {String(timer % 60).padStart(2, '0')}
                                    </Typography>
                                ) : (
                                    <Typography
                                        variant="body2"
                                        onClick={handleResendCode}
                                        sx={{
                                            color: 'primary.main',
                                            fontWeight: 'medium',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        Resend code
                                    </Typography>
                                )}
                            </Box>
                        </Form>
                    </Box>
                </Box>
            )}
        </Formik>
    );
};

export default ResetPasswordPage;
