import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import { SnackbarContainer } from '@/shared/components/ui/snackbar';
import { ApolloClientProvider, AppThemeProvider, AppAIProvider } from '@/shared/context';
import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Daraja',
    description: '',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <AppAIProvider>
                    <AppThemeProvider>
                        <Suspense fallback={<LinearProgress />}>
                            <SnackbarContainer />
                            <ApolloClientProvider>{children}</ApolloClientProvider>
                        </Suspense>
                    </AppThemeProvider>
                </AppAIProvider>
            </body>
        </html>
    );
}
