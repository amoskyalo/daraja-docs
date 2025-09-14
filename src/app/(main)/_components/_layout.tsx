'use client';

import { Suspense } from 'react';
import { Container, LinearProgress, Stack } from '@mui/material';
import { useAIContext } from '@/shared/context';
import { PromptDialog } from '@/features/AI';
import Header from './Header';
import LeftNav from './LeftNav';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { drawerOpen, setDrawerOpen, conversation, question, setQuestion, loading, handleKeyPress } = useAIContext();

    return (
        <Suspense fallback={<LinearProgress />}>
            <Stack
                id="layout"
                direction="column"
                sx={{ height: 'calc(100vh)', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}
            >
                <Header />
                <Container maxWidth="lg" sx={{ px: '0px !important', flex: 1 }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ width: '100%', height: '100%', position: 'relative' }}
                    >
                        <LeftNav />

                        {children}
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
        </Suspense>
    );
};

export default DashboardLayout;
