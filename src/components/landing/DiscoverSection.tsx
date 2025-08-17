'use client';

import { Button } from '@mui/material';
import { Code, CheckCircle, Database, Settings, Globe, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DiscoverSection() {
    const router = useRouter();

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-24">
            <div className="absolute inset-0 opacity-10">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                    }}
                ></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 text-white relative z-10">
                        <div className="space-y-6">
                            <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                                Discover Your Way To Success
                            </h2>
                            <p className="text-xl text-blue-100 leading-relaxed">
                                SasaPay empowers you to make collections and disburse money in a simple, secure,
                                and seamless way. Whether you are in search of a comprehensive payment solutions
                                or another choice of payment for your business, we have you covered.
                            </p>
                        </div>

                        <div className="pt-4">
                            <Button
                                variant="outlined"
                                disableElevation
                                sx={{
                                    color: 'white',
                                    borderColor: 'white',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    borderWidth: '2px',
                                }}
                                onClick={() => router.push('/auth/signup')}
                            >
                                SIGN UP NOW
                            </Button>
                        </div>
                    </div>

                    <div className="relative lg:h-96 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-80 h-80">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl shadow-2xl flex items-center justify-center rotate-6 animate-pulse">
                                    <Code size={48} className="text-white" />
                                    <span className="absolute -top-2 -right-2 text-xs font-bold text-white bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                                        API
                                    </span>
                                </div>

                                <div
                                    className="absolute top-4 right-8 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl shadow-xl flex items-center justify-center -rotate-12 animate-bounce"
                                    style={{ animationDelay: '0.5s' }}
                                >
                                    <CheckCircle size={32} className="text-white" />
                                </div>

                                <div
                                    className="absolute bottom-8 left-4 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-400 rounded-2xl shadow-xl flex items-center justify-center rotate-12 animate-bounce"
                                    style={{ animationDelay: '1s' }}
                                >
                                    <Database size={36} className="text-white" />
                                </div>

                                <div
                                    className="absolute top-8 left-8 w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full shadow-lg flex items-center justify-center rotate-45 animate-spin"
                                    style={{ animationDuration: '8s' }}
                                >
                                    <Settings size={24} className="text-white" />
                                </div>

                                <div
                                    className="absolute bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-xl shadow-lg flex items-center justify-center -rotate-6 animate-pulse"
                                    style={{ animationDelay: '1.5s' }}
                                >
                                    <Globe size={28} className="text-white" />
                                </div>

                                <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm animate-ping"></div>
                                <div
                                    className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-cyan-400/30 rounded-full backdrop-blur-sm animate-ping"
                                    style={{ animationDelay: '2s' }}
                                ></div>
                                <div
                                    className="absolute top-3/4 left-3/4 w-4 h-4 bg-purple-400/40 rounded-full backdrop-blur-sm animate-ping"
                                    style={{ animationDelay: '3s' }}
                                ></div>

                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <Sparkles size={20} className="text-blue-300 animate-pulse" />
                                </div>
                                <div className="absolute -bottom-4 right-1/3">
                                    <Sparkles
                                        size={16}
                                        className="text-cyan-300 animate-pulse"
                                        style={{ animationDelay: '1s' }}
                                    />
                                </div>
                                <div className="absolute top-1/4 -right-4">
                                    <Sparkles
                                        size={18}
                                        className="text-purple-300 animate-pulse"
                                        style={{ animationDelay: '2s' }}
                                    />
                                </div>

                                <div
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-blue-400/20 rounded-full animate-spin"
                                    style={{ animationDuration: '20s' }}
                                ></div>
                                <div
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-cyan-400/10 rounded-full animate-spin"
                                    style={{ animationDuration: '30s', animationDirection: 'reverse' }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}