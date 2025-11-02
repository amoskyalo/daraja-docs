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
};

export const baseButtonStyles = {
    root: {
        textTransform: 'none' as const,
        borderRadius: borderRadius,
        transition: 'all 0.2s ease-in-out',
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
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    minHeight: '40px',
                    boxShadow: '0 0 0 0px transparent',
                    transition: 'box-shadow 0.2s ease-in-out, border-color 0.15s ease-in-out',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                    },
                    '&.Mui-focused': {
                        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.23), 0 0 0 4px rgba(0, 0, 0, 0.1) !important',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent !important',
                        borderWidth: '1px !important',
                    },
                },
                notchedOutline: {
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                    borderWidth: '1px',
                    transition: 'border-color 0.15s ease-in-out',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                },
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
        MuiMenu: {
            styleOverrides: {
                paper: {
                    elevation: 0,
                    borderRadius,
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
            default: '#000000',
            paper: '#000000',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
    },
    typography: baseTypography,
    components: {
        ...baseComponents,
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    minHeight: '40px',
                    boxShadow: '0 0 0 0px transparent',
                    transition: 'box-shadow 0.2s ease-in-out, border-color 0.15s ease-in-out',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&.Mui-focused': {
                        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.23), 0 0 0 4px rgba(255, 255, 255, 0.1) !important',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent !important',
                        borderWidth: '1px !important',
                    },
                },
                notchedOutline: {
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    borderWidth: '1px',
                    transition: 'border-color 0.15s ease-in-out',
                },
            },
        },
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
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
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
        MuiMenu: {
            styleOverrides: {
                paper: {
                    elevation: 0,
                    borderRadius,
                },
            },
        },
    },
});
