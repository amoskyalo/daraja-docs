'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme';

type ThemeType = 'light' | 'dark' | 'system';
export interface ThemeContextType {
    isDark: boolean;
    toggleTheme: (theme: ThemeType) => void;
    currentTheme: ThemeType;
}

export interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    toggleTheme: () => {},
    currentTheme: 'system',
});

export const AppThemeProvider = ({ children }: Readonly<ThemeProviderProps>) => {
    const [isDark, setIsDark] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<ThemeType>('system');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        setIsDark(shouldBeDark);
        document.documentElement.classList.toggle('dark', shouldBeDark);
    }, []);

    const toggleTheme = (theme: ThemeType) => {
        const setLightTheme = () => {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        };

        const setDarkTheme = () => {
            setIsDark(true);
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        };

        if (theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (prefersDark) {
                setDarkTheme();
            } else {
                setLightTheme();
            }

            setCurrentTheme('system');
            return;
        }

        if (theme === 'light') {
            setLightTheme();
            setCurrentTheme('light');
            return;
        }

        if (theme === 'dark') {
            setDarkTheme();
            setCurrentTheme('dark');
        }
    };

    const value = useMemo(() => ({ isDark, toggleTheme, currentTheme }), [isDark, toggleTheme, currentTheme]);

    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
