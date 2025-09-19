'use client';

import { createTheme, Theme } from '@mui/material/styles';

export const colors = {
    primary: {
        main: '#00A651',
    },
};

export const borderRadius = 8;

export const baseTypography = {
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
        textTransform: 'none' as const,
    },
};

export const baseButtonStyles = {
    root: {
        textTransform: 'none' as const,
        borderRadius: borderRadius,
        transition: 'all 0.2s ease-in-out',
    },
    containedPrimary: {
        backgroundColor: colors.primary.main,
        color: '#ffffff',
    },
    containedSecondary: {
        background: 'linear-gradient(45deg, #ef4444 0%, #dc2626 100%)',
        color: '#ffffff',
    },
    outlined: {
        borderWidth: 2,
    },
    text: {
        '&:hover': {
            backgroundColor: 'rgba(3, 159, 224, 0.04)',
        },
    },
};

export const baseComponents = {
    MuiButton: {
        styleOverrides: baseButtonStyles,
        defaultProps: {
            disableElevation: true,
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: borderRadius * 2.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                },
            },
        },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    borderRadius: borderRadius,
                },
            },
        },
    },
    MuiSelect: {
        styleOverrides: {
            root: {
                borderRadius: borderRadius,
            },
        },
    },
    MuiIconButton: {
        styleOverrides: {
            root: {
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            },
        },
    },
    MuiMenu: {
        styleOverrides: {
            paper: {
                elevation: 0,
                borderRadius,
            },
        },
    },
};

export const lightTheme: Theme = createTheme({
    palette: {
        mode: 'light',
        primary: colors.primary,
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            primary: '#1E293B',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
    },
    typography: baseTypography,
    components: {
        ...baseComponents,
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0',
                },
            },
            defaultProps: {
                elevation: 0,
            },
        },
        MuiCard: {
            styleOverrides: {
                ...baseComponents.MuiCard.styleOverrides,
                root: {
                    ...baseComponents.MuiCard.styleOverrides.root,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        ...baseComponents.MuiCard.styleOverrides.root['&:hover'],
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                    },
                },
            },
        },
    },
});

export const darkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: colors.primary,
        background: {
            default: '#121212',
            paper: '#121212',
        },
        text: {
            primary: '#F1F5F9',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
    },
    typography: baseTypography,
    components: {
        ...baseComponents,
        MuiButton: {
            ...baseComponents.MuiButton,
            styleOverrides: {
                ...baseButtonStyles,
                root: {
                    ...baseButtonStyles.root,
                    color: '#F1F5F9',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                ...baseComponents.MuiCard.styleOverrides,
                root: {
                    ...baseComponents.MuiCard.styleOverrides.root,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                        ...baseComponents.MuiCard.styleOverrides.root['&:hover'],
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                    },
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    '&::-webkit-scrollbar-track': {
                        background: 'red',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: 'rgba(255, 255, 255, 0.5)',
                    },
                },
            },
        },
    },
});
