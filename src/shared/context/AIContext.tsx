'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { snackbarToast } from '../components';

export interface AIContextType {
    question: string;
    setQuestion: (question: string) => void;
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    conversation: Conversation[];
    setConversation: (conversation: Conversation[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    handleKeyPress: (e: React.KeyboardEvent) => void;
    handleAIRequest: (input?: string) => void;
    handleSendRequest: () => void;
}

export interface AIProviderProps {
    children: React.ReactNode;
}

interface Conversation {
    type: 'user' | 'assistant';
    message: string;
}

export const AIContext = createContext<AIContextType>({
    question: '',
    setQuestion: () => {},
    drawerOpen: false,
    setDrawerOpen: () => {},
    conversation: [],
    setConversation: () => {},
    loading: false,
    setLoading: () => {},
    handleKeyPress: () => {},
    handleAIRequest: () => {},
    handleSendRequest: () => {},
});

export const AppAIProvider = ({ children }: Readonly<AIProviderProps>) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [conversation, setConversation] = useState<Conversation[]>([]);
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAIRequest = async (input?: string) => {
        const user_question = input ?? question;
        if (!user_question.trim() || loading) return;

        setConversation((prev) => [...prev, { type: 'user', message: user_question }]);
        const currentQuestion = user_question;
        setQuestion('');
        setLoading(true);

        try {
            const res = await fetch('/api/ask-docs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: currentQuestion }),
            });

            const data = await res.json();

            if (data.error) {
                snackbarToast.error(data.error, { vertical: 'top', horizontal: 'right' });
                const prevConversation = [...conversation];
                prevConversation.pop();
                setConversation(prevConversation);
            } else {
                setConversation((prev) => [...prev, { type: 'assistant', message: data.answer }]);
                const conversationElement = document.getElementById('conversation');
                if (conversationElement) {
                    conversationElement.scrollTo({ top: conversationElement.scrollHeight, behavior: 'smooth' });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            snackbarToast.error('Sorry, there was an error processing your question.');
        } finally {
            setLoading(false);
        }
    };

    const handleSendRequest = () => {
        if (!question.trim()) return;
        setDrawerOpen(true);
        handleAIRequest();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendRequest();
        }
    };

    const value = useMemo(
        () => ({
            question,
            setQuestion,
            drawerOpen,
            setDrawerOpen,
            conversation,
            setConversation,
            loading,
            setLoading,
            handleKeyPress,
            handleAIRequest,
            handleSendRequest,
        }),
        [question, drawerOpen, conversation, loading],
    );

    return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

export const useAIContext = () => {
    const context = useContext(AIContext);
    if (!context) {
        throw new Error('useAIContext must be used within a AIProvider');
    }
    return context;
};
