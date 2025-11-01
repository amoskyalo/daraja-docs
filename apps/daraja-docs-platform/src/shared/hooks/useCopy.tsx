'use client';

import React, { useState, useEffect } from 'react';

export const useCopyToClipboard = () => {
    const [copied, setCopied] = useState(false);

    const extractText = (node: React.ReactNode): string => {
        if (typeof node === 'string' || typeof node === 'number') {
            return String(node);
        }
        if (Array.isArray(node)) {
            return node.map(extractText).join('');
        }
        if (React.isValidElement(node)) {
            return extractText((node.props as any).children);
        }
        return '';
    };

    function Copy(text: string) {
        navigator.clipboard
            .writeText(text)
            .then(() => console.log('Code copied'))
            .catch((err) => console.error('Failed to copy:', err))
            .finally(() => setCopied(true));
    }

    const handleCopyCode = (children: React.ReactNode) => {
        let codeToCopy = '';

        if (React.isValidElement(children)) {
            const preElement = children as any;
            const codeElement = preElement.props?.children;

            if (React.isValidElement(codeElement)) {
                const codeChildren = (codeElement.props as any)?.children;
                codeToCopy = extractText(codeChildren);
            }
        }

        if (!codeToCopy.trim()) {
            console.warn('No code text found to copy');
            return;
        }

        Copy(codeToCopy);
    };

    useEffect(() => {
        if (copied) {
            setTimeout(() => setCopied(false), 2000);
        }
    }, [copied]);

    return { copied, Copy, handleCopyCode };
};
