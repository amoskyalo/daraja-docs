'use client';

import { Stack, Container, Box, LinearProgress } from '@mui/material';
import { AuthContextProvider, VersionManagerContextProvider, useAIContext } from '@/shared/context';
import { PromptDialog } from '@/features/AI';
import { Suspense } from 'react';
import Header from './_components/Header';
import LeftNav from './_components/LeftNav';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { drawerOpen, setDrawerOpen, conversation, question, setQuestion, loading, handleKeyPress } = useAIContext();
    return (
        <Suspense fallback={<LinearProgress />}>
            <AuthContextProvider>
                <VersionManagerContextProvider>
                    <Stack
                        id="layout"
                        direction="column"
                        sx={{ height: 'calc(100vh)', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}
                    >
                        <Header />
                        <Container maxWidth="lg" sx={{ px: '0px !important', flex: 1 }}>
                            <Stack direction="row">
                                <LeftNav />

                                <Box sx={{ flex: 1, overflow: 'hidden' }}>{children}</Box>
                            </Stack>
                        </Container>

                        {drawerOpen && (
                            <PromptDialog
                                conversation={conversation}
                                question={question}
                                loading={loading}
                                handleKeyPress={handleKeyPress}
                                setQuestion={setQuestion}
                                setDrawerOpen={setDrawerOpen}
                            />
                        )}
                    </Stack>
                </VersionManagerContextProvider>
            </AuthContextProvider>
        </Suspense>
    );
};

export default Layout;
