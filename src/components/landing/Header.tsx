'use client';

import { useState, useEffect } from 'react';
import { Button, IconButton } from '@mui/material';
import { useTheme } from '@/theme/ThemeProvider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SunnyIcon from '@mui/icons-material/Sunny';
import Link from 'next/link';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const router = useRouter();

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    }, []);

    const handleLogin = () => {
        router.push('/auth/login');
    };

    return (
        <header className="sticky top-0 z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/30 dark:border-slate-700/30 shadow-2xl">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="ml-[-16]">
                    <Image
                        src="/images/logo-dark.png"
                        alt="logo"
                        width={170}
                        height={100}
                        priority
                        style={{ objectFit: 'cover' }}
                    />
                </Link>

                <div className="flex items-center space-x-0">
                    <IconButton
                        size="small"
                        sx={{  border: 1, borderColor: 'divider', borderRadius: 2, height: '36px', width: '36px' }}
                        onClick={() => toggleTheme()}
                    >
                        <SunnyIcon fontSize="small" color="primary" />
                    </IconButton>

                    <Button
                        onClick={handleLogin}
                        variant="contained"
                        color="primary"
                        sx={{
                            textTransform: 'none',
                            height: '32px',
                            marginLeft: '20px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: 'medium',
                        }}
                    >
                        Login
                    </Button>
                </div>
            </nav>
        </header>
    );
}
