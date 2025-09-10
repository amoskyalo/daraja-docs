import { ReactNode } from 'react';

export type MDXElementProps = {
    children?: ReactNode;
    className?: string;
    href?: string;
    src?: string;
    alt?: string;
    [key: string]: any;
};

export interface ApiEndpointProps {
    method: string;
    endpoint: string;
    description?: string;
}

export interface ResponseExampleProps {
    children?: ReactNode;
}

export interface CodeExampleProps {
    children?: ReactNode;
    title?: string;
}

export interface LinkProps {
    href: string;
    method: string;
}

export interface NoteProps {
    type?: 'error' | 'info' | 'success' | 'warning' | 'alert' | 'tip';
    children?: ReactNode;
}
