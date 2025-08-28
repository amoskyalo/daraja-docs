'use client';

import { createTheme, Theme } from '@mui/material/styles';

interface Colors {
    primary: {
        main: string;
    };
    secondary: {
        main: string;
    };
}

export const colors = {
    primary: {
        main: '#00A651', // Safaricom green
    },
    secondary: {
        main: '#FFFFFF', // Safaricom white
    },
};

const borderRadius = 8;

const baseTypography = {
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

const baseButtonStyles = {
    root: {
        height: '44px',
        padding: '8px 16px',
        textTransform: 'none' as const,
        borderRadius: borderRadius,
        fontWeight: 600,
        fontSize: '0.875rem',
        transition: 'all 0.2s ease-in-out',
        // '&:hover': {
        //     transform: 'translateY(-1px)',
        // },
    },
    containedPrimary: {
        backgroundColor: colors.primary.main,
        color: '#ffffff',
        // '&:hover': {
        //     backgroundColor: '#0284c7',
        //     boxShadow: '0 8px 25px rgba(3, 159, 224, 0.3)',
        // },
    },
    containedSecondary: {
        background: 'linear-gradient(45deg, #ef4444 0%, #dc2626 100%)',
        color: '#ffffff',
        // '&:hover': {
        //     background: 'linear-gradient(45deg, #dc2626 0%, #b91c1c 100%)',
        //     boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)',
        // },
    },
    outlined: {
        borderWidth: 2,
        '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(3, 159, 224, 0.04)',
        },
    },
    text: {
        '&:hover': {
            backgroundColor: 'rgba(3, 159, 224, 0.04)',
        },
    },
};

const baseComponents = {
    MuiButton: {
        styleOverrides: baseButtonStyles,
        defaultProps: {
            disableElevation: true,
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                //borderRadius: borderRadius * 2,
            },
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
                    height: '44px',
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
};

export const lightTheme: Theme = createTheme({
    palette: {
        mode: 'light',
        primary: colors.primary,
        secondary: colors.secondary,
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            primary: '#1E293B',
            secondary: '#64748B',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
    },
    typography: baseTypography,
    components: {
        ...baseComponents,
        MuiPaper: {
            styleOverrides: {
                ...baseComponents.MuiPaper.styleOverrides,
                root: {
                    ...baseComponents.MuiPaper.styleOverrides.root,
                    boxShadow: "0",
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
                ...baseComponents.MuiPaper.styleOverrides,
                root: {
                    ...baseComponents.MuiPaper.styleOverrides.root,
                    boxShadow: "0",
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
    },
});