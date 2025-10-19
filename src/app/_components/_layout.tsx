'use client';

import { Stack, Box, LinearProgress } from '@mui/material';
import {
    AuthContextProvider,
    VersionManagerContextProvider,
    useAIContext,
    AppAIProvider,
    AppThemeProvider,
    ApolloClientProvider,
} from '@/shared/context';
import { SnackbarContainer } from '@/shared/components/ui/snackbar';
import { PromptDialog } from '@/features/AI';
import { Suspense } from 'react';
import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { drawerOpen, setDrawerOpen, conversation, question, setQuestion, loading, handleKeyPress } = useAIContext();
    return (
        <AppThemeProvider>
            <Suspense fallback={<LinearProgress />}>
                <ApolloClientProvider>
                    <AuthContextProvider>
                        <AppAIProvider>
                            <VersionManagerContextProvider>
                                <SnackbarContainer />
                                <Stack
                                    id="layout"
                                    direction="column"
                                    sx={{
                                        height: 'calc(100vh)',
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                        position: 'relative',
                                    }}
                                >
                                    <Header />
                                    <Box sx={{ flex: 1 }}>{children}</Box>

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
                        </AppAIProvider>
                    </AuthContextProvider>
                </ApolloClientProvider>
            </Suspense>
        </AppThemeProvider>
    );
};

export default Layout;
