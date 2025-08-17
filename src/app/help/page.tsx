'use client';

import React from 'react';
import { Container, Typography, Box, Stack, InputLabel, Button } from '@mui/material';
import TextFeldInput from '@/components/inputs/TextFeldInput';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';

const Help = () => {
    return (
        <Box>
            <Header />
            <Container maxWidth="md" sx={{ paddingY: 4 }}>
                <Typography variant="h4">Submit an issue</Typography>
                <Typography variant="body1">
                    If you have any issues or questions, please submit them below. Please be as detailed as possible
                    when reporting your issue for faster service.
                </Typography>

                <Stack spacing={4} sx={{ mt: 4 }}>
                    <TextFeldInput label="Your email address" placeholder="your@email.com" />
                    <TextFeldInput label="Subject" placeholder="Subject" />
                    <Box>
                        <InputLabel
                            sx={{
                                mb: 1,
                                fontWeight: 'medium',
                                color: 'text.primary',
                                opacity: 0.9,
                            }}
                        >
                            Description
                        </InputLabel>
                        <ReactQuill theme="snow" />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Please enter the details of your request. A member of our support staff will respond as soon
                            as possible.
                        </Typography>
                    </Box>
                    <Button variant="contained" sx={{ maxWidth: 'max-content' }}>Submit</Button>
                </Stack>
            </Container>
            <Footer />
        </Box>
    );
};

export default Help;
