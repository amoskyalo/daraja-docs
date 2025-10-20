'use client';

import { Container, Stack, Box } from '@mui/material';
import { useAIContext } from '@/shared/context';
import { PromptDialog } from '@/features/AI';
import LeftNav from '../_components/LeftNav';

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
    const { drawerOpen, setDrawerOpen, conversation, question, setQuestion, loading, handleKeyPress } = useAIContext();

    return (
        <Container maxWidth="lg" sx={{ px: '0px !important', flex: 1 }}>
            <Stack direction="row">
                <LeftNav />
                <Box sx={{ flex: 1, overflow: 'hidden' }}>{children}</Box>
            </Stack>

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
        </Container>
    );
};

export default DocsLayout;
