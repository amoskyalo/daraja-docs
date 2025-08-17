'use client';

import { Box, Typography, Button, CircularProgress, Container, Stack } from '@mui/material';
import TextFeldInput from '@/components/inputs/TextFeldInput';
import { Formik, Form } from 'formik';
import { utils } from '@/utils';
import { forgetPasswordService } from './services';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from 'next/navigation';

const initialValues = {
    email: '',
};

export default function ForgetPasswordPage() {
    const router = useRouter();
    const { requestPasswordReset, loading } = forgetPasswordService();

    const validationSchema = utils.getValidationSchema([
        {
            name: 'email',
            type: 'email',
            errorMessage: 'Please enter a valid email address',
        },
    ]);

    return (
        <Container maxWidth="sm">
            <Button
                sx={{ position: 'absolute', top: 100, left: '35%' }}
                startIcon={<KeyboardBackspaceIcon />}
                onClick={() => router.push('/auth/login')}
            >
                Back to Login
            </Button>

            <Stack justifyContent="center" alignItems="center">
                <Formik
                    validateOnBlur={false}
                    initialValues={initialValues}
                    onSubmit={requestPasswordReset}
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
                                    Forget Password
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
                                    Enter your email address to reset your password
                                </Typography>
                            </Box>

                            <Box sx={{ width: '100%' }}>
                                <Form>
                                    <Box sx={{ mb: 4 }}>
                                        <TextFeldInput
                                            fullWidth
                                            type="email"
                                            placeholder="Enter your email address"
                                            {...utils.getFormikFieldProps({ formik, field: 'email' })}
                                        />
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
                                        Reset Password
                                    </Button>
                                </Form>
                            </Box>
                        </Box>
                    )}
                </Formik>
            </Stack>
        </Container>
    );
}
