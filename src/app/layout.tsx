import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import AppThemeProvider from '@/theme/ThemeProvider';
import { SnackbarContainer } from '@/components/snackbar';
import ApolloClientProvider from '@/context/apollo-context';

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
                <AppThemeProvider>
                    <SnackbarContainer />
                    <ApolloClientProvider>{children}</ApolloClientProvider>
                </AppThemeProvider>
            </body>
        </html>
    );
}
