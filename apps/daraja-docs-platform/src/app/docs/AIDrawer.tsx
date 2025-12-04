'use client';

import { useAIContext } from '../../shared/context';
import { PromptDialog } from '../../features/AI';

export const AIDrawer = () => {
    const { drawerOpen, setDrawerOpen, conversation, question, setQuestion, loading, handleKeyPress } = useAIContext();

    if (!drawerOpen) return null;

    return (
        <PromptDialog
            conversation={conversation}
            question={question}
            loading={loading}
            handleKeyPress={handleKeyPress}
            setQuestion={setQuestion}
            setDrawerOpen={setDrawerOpen}
        />
    );
};
