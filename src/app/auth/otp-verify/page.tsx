'use client';

import { Formik, Form } from 'formik';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { utils } from '@/utils';
import { useState, useEffect } from 'react';
import { OTPInput } from '@/components/inputs/OTPInput';
import { useRouter } from 'next/navigation';
import { useLoginCredentials } from '@/context/auth-context';

const otpInitialValues = {
    otp: '',
};

const OtpVerifyPage = () => {
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
            router.push('/auth/login');
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
                <Box sx={{ width: 300, textAlign: 'center' }}>
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: 'text.primary',
                                mb: 1,
                            }}
                        >
                            OTP Verification
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 'medium',
                                color: 'text.primary',
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
                            }}
                        >
                            {loginCredentials?.email}
                        </Typography>
                    </Box>

                    <Box sx={{ width: '100%' }}>
                        <Form>
                            <Box sx={{ mb: 3 }}>
                                <OTPInput
                                    fullWidth
                                    length={6}
                                    {...utils.getFormikFieldProps({ formik, field: 'otp', isOTP: true })}
                                />
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                size="large"
                                variant="contained"
                                sx={{ height: 40 }}
                            >
                                Verify
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

export default OtpVerifyPage;
