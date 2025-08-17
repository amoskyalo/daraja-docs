'use client';

import { useState } from 'react';
import { Button } from '@mui/material';
import { ArrowRight, Copy, Check, Code2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    const codeExample = `$ch = curl_init('https://sandbox.sasapay.app/oauth/v1/generate?grant_type=client_credentials');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Basic ' . base64_encode('YOUR_CLIENT_ID:YOUR_CLIENT_SECRET')
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
echo json_decode($response);`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeExample);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <main className="flex-1 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="space-y-10 animate-fade-in-up">
                        <div className="space-y-4">
                            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                <Code2 size={16} className="mr-2" />
                                SasaPay Developers
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-black leading-tight">
                                <span className="text-slate-900 dark:text-white drop-shadow-sm">
                                    Secure and simple money transfers made easy.
                                </span>
                            </h1>
                        </div>

                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-medium">
                            Whether you need a{' '}
                            <span className="text-blue-600 dark:text-blue-400 font-medium">
                                comprehensive payment solution
                            </span>{' '}
                            for your business or are looking for an
                            <span className="text-blue-600 dark:text-blue-400 font-medium">
                                {' '}
                                alternative payment method
                            </span>{' '}
                            we have you covered
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={() => router.push('/dashboard/apis')}
                            >
                                Explore our APIs
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                endIcon={<ArrowRight size={20} />}
                                onClick={() => router.push('/docs/getting-started')}
                            >
                                View Documentation
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="group bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 font-mono text-sm overflow-x-auto shadow-2xl hover:shadow-3xl transition-all duration-500 border border-slate-700/50 hover:border-blue-500/30 cursor-pointer">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg"></div>
                                    <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-lg"></div>
                                    <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg"></div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={handleCopy}
                                        className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-all duration-200 group/copy"
                                        title={copied ? 'Copied!' : 'Copy code'}
                                    >
                                        {copied ? (
                                            <Check size={16} className="text-green-400" />
                                        ) : (
                                            <Copy
                                                size={16}
                                                className="group-hover/copy:scale-110 transition-transform"
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="text-green-400 space-y-1 group-hover:scale-105 transition-transform duration-300">
                                <div className="hover:bg-slate-700/30 px-2 py-1 rounded transition-colors cursor-pointer">
                                    <span className="text-purple-400">$ch</span> ={' '}
                                    <span className="text-yellow-400">curl_init</span>(
                                    <span className="text-green-300">
                                        &apos;https://sandbox.sasapay.app/oauth/v1/generate?grant_type=client_credentials&apos;
                                    </span>
                                    );
                                </div>
                                <div className="hover:bg-slate-700/30 px-2 py-1 rounded transition-colors cursor-pointer">
                                    <span className="text-yellow-400">curl_setopt</span>(
                                    <span className="text-purple-400">$ch</span>,{' '}
                                    <span className="text-blue-400">CURLOPT_HTTPHEADER</span>, [
                                </div>
                                <div className="hover:bg-slate-700/30 px-2 py-1 rounded transition-colors cursor-pointer ml-4">
                                    <span className="text-green-300">&apos;Authorization: Basic &apos;</span> .{' '}
                                    <span className="text-yellow-400">base64_encode</span>(
                                    <span className="text-green-300">
                                        &apos;YOUR_CLIENT_ID:YOUR_CLIENT_SECRET&apos;
                                    </span>
                                    )
                                </div>
                                <div className="hover:bg-slate-700/30 px-2 py-1 rounded transition-colors cursor-pointer">
                                    ]);
                                </div>
                                <div className="hover:bg-slate-700/30 px-2 py-1 rounded transition-colors cursor-pointer">
                                    <span className="text-yellow-400">curl_setopt</span>(
                                    <span className="text-purple-400">$ch</span>,{' '}
                                    <span className="text-blue-400">CURLOPT_SSL_VERIFYPEER</span>,{' '}
                                    <span className="text-red-400">false</span>);
                                </div>
                                <div className="hover:bg-slate-700/30 px-2 py-1 rounded transition-colors cursor-pointer">
                                    <span className="text-purple-400">$response</span> ={' '}
                                    <span className="text-yellow-400">curl_exec</span>(
                                    <span className="text-purple-400">$ch</span>);
                                </div>
                                <div className="hover:bg-slate-700/30 px-2 py-1 rounded transition-colors cursor-pointer">
                                    <span className="text-red-400">echo</span>{' '}
                                    <span className="text-yellow-400">json_decode</span>(
                                    <span className="text-purple-400">$response</span>);
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
