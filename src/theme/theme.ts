'use client';

import { createTheme } from '@mui/material/styles';

export const colors = {
    primary: {
        main: '#00A651', // Safaricom green
    },
    secondary: {
        main: '#FFFFFF', // Safaricom white
    },
};

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: colors.primary,
        secondary: colors.secondary,
        background: {
            default: '#121212',
            paper: '#121212',
        },
        text: {
            primary: '#1E293B',
            secondary: '#64748B',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
        fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
        h1: {
            fontWeight: 800,
            fontSize: '3.5rem',
        },
        h2: {
            fontWeight: 700,
            fontSize: '2.5rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '2rem',
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    height: '44px',
                    padding: '0 16px',
                    textTransform: 'none',
                },
                containedPrimary: {
                    backgroundColor: '#00A651',
                },
                containedSecondary: {
                    backgroundColor: '#FFFFFF',
                    color: '#00A651',
                    border: '1px solid #00A651',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        height: '44px',
                    },
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: colors.primary,
        secondary: colors.secondary,
        background: {
            default: '#121212',
            paper: '#121212',
        },
        text: {
            primary: '#F1F5F9',
            secondary: '#94A3B8',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
    },
    typography: {
        fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
        h1: {
            fontWeight: 800,
            fontSize: '3.5rem',
        },
        h2: {
            fontWeight: 700,
            fontSize: '2.5rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '2rem',
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    height: 38,
                    padding: '0 16px',
                    textTransform: 'none',
                    color: 'white',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        height: '44px',
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                // root: {
                //     opacity: 0.8,
                // },
            },
        },
    },
});

export default lightTheme;