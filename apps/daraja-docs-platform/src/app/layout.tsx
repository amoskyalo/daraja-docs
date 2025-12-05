import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'nprogress/nprogress.css';
import Layout from './_components/Layout';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Safaricom Daraja API Documentation',
    description:
        'Daraja is a web platform that offers access to Safaricom and M-PESA APIs that creates a bridge for payment integration to web and mobile apps',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
               <Suspense fallback={<p>Loading</p>}>
                 <Layout>{children}</Layout>
               </Suspense>
            </body>
        </html>
    );
}
