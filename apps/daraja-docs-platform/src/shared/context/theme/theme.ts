import { createTheme, Theme } from '@mui/material/styles';

interface Colors {
    primary: {
        main: string;
    };
    secondary: {
        main: string;
    };
}

export const colors: Colors = {
    primary: {
        main: '#00A651',
    },
    secondary: {
        main: '#ab0b1f',
    },
};

const borderRadius = {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    pill: '3.125rem',
};

const baseTypography = {
    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
    fontSize: 14,
    htmlFontSize: 16,
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
        textTransform: 'none' as const,
    },
};

const baseButtonStyles = {
    root: {
        borderRadius: borderRadius.pill,
        textTransform: 'none' as const,
    },
};

const getLightModeButtonStyles = () => ({
    containedSecondary: {
        backgroundColor: '#000000',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#333333',
        },
        '&:disabled': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
            color: 'rgba(0, 0, 0, 0.26)',
        },
    },
});

const getDarkModeButtonStyles = () => ({
    containedSecondary: {
        backgroundColor: '#ffffff',
        color: '#000000',
        '&:hover': {
            backgroundColor: '#e5e5e5',
        },
        '&:disabled': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            color: 'rgba(255, 255, 255, 0.3)',
        },
    },
});

const baseComponents = {
    MuiButton: {
        styleOverrides: baseButtonStyles,
        defaultProps: {
            disableElevation: true,
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: borderRadius.md,
                '&:hover': {
                    transform: 'translateY(-4px)',
                },
            },
        },
    },
    MuiTextField: {
        defaultProps: {
            size: 'small' as const,
        },
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    borderRadius: borderRadius.pill,
                },
            },
        },
    },
    MuiSelect: {
        defaultProps: {
            size: 'small' as const,
        },
        styleOverrides: {
            root: {
                borderRadius: borderRadius.pill,
            },
        },
    },
    MuiIconButton: {
        styleOverrides: {
            root: {
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            },
        },
    },
};

export const lightTheme: Theme = createTheme({
    spacing: 8,
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
        MuiButton: {
            ...baseComponents.MuiButton,
            styleOverrides: {
                ...baseComponents.MuiButton.styleOverrides,
                ...getLightModeButtonStyles(),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    minHeight: '2.5rem',
                    boxShadow: '0 0 0 0 transparent',
                    transition: 'box-shadow 0.2s ease-in-out, border-color 0.15s ease-in-out',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                    },
                    '&.Mui-focused': {
                        boxShadow: '0 0 0 0.0625rem rgba(0, 0, 0, 0.23), 0 0 0 0.25rem rgba(0, 0, 0, 0.1) !important',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent !important',
                        borderWidth: '0.0625rem !important',
                    },
                },
                notchedOutline: {
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                    borderWidth: '0.0625rem',
                    transition: 'border-color 0.15s ease-in-out',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 0.5rem 2rem 0 rgba(31, 38, 135, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(0.75rem)',
                    WebkitBackdropFilter: 'blur(0.75rem)',
                    border: '0.0625rem solid rgba(255, 255, 255, 0.18)',
                    transition: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                ...baseComponents.MuiCard.styleOverrides,
                root: {
                    ...baseComponents.MuiCard.styleOverrides.root,
                    boxShadow: '0 0.625rem 2.5rem rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(0.75rem)',
                    WebkitBackdropFilter: 'blur(0.75rem)',
                    border: '0.0625rem solid rgba(255, 255, 255, 0.18)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        ...baseComponents.MuiCard.styleOverrides.root['&:hover'],
                        boxShadow: '0 1.25rem 3.75rem rgba(0, 0, 0, 0.15)',
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: borderRadius.md,
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    '@media (min-width: 600px)': {
                        minHeight: '3.5rem',
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    elevation: 0,
                    borderRadius: borderRadius.sm,
                    boxShadow: '0 0.5rem 2rem 0 rgba(31, 38, 135, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(0.75rem)',
                    WebkitBackdropFilter: 'blur(0.75rem)',
                    border: '0.0625rem solid rgba(0, 0, 0, 0.08)',
                },
            },
        },
    },
});

export const darkTheme: Theme = createTheme({
    spacing: 8,
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
        MuiButton: {
            ...baseComponents.MuiButton,
            styleOverrides: {
                ...baseComponents.MuiButton.styleOverrides,
                ...getDarkModeButtonStyles(),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    minHeight: '2.5rem',
                    boxShadow: '0 0 0 0 transparent',
                    transition: 'box-shadow 0.2s ease-in-out, border-color 0.15s ease-in-out',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&.Mui-focused': {
                        boxShadow:
                            '0 0 0 0.0625rem rgba(255, 255, 255, 0.23), 0 0 0 0.25rem rgba(255, 255, 255, 0.1) !important',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent !important',
                        borderWidth: '0.0625rem !important',
                    },
                },
                notchedOutline: {
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    borderWidth: '0.0625rem',
                    transition: 'border-color 0.15s ease-in-out',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 0.5rem 2rem 0 rgba(0, 0, 0, 0.37)',
                    backgroundImage: 'none',
                    backgroundColor: 'rgba(30, 41, 59, 0.4)',
                    backdropFilter: 'blur(0.8rem)',
                    WebkitBackdropFilter: 'blur(0.8rem)',
                    border: '0.0625rem solid rgba(255, 255, 255, 0.08)',
                    transition: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                ...baseComponents.MuiCard.styleOverrides,
                root: {
                    ...baseComponents.MuiCard.styleOverrides.root,
                    boxShadow: '0 0.625rem 2.5rem rgba(0, 0, 0, 0.3)',
                    backgroundColor: 'rgba(30, 41, 59, 0.4)',
                    backdropFilter: 'blur(0.8rem)',
                    WebkitBackdropFilter: 'blur(0.8rem)',
                    border: '0.0625rem solid rgba(255, 255, 255, 0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        ...baseComponents.MuiCard.styleOverrides.root['&:hover'],
                        boxShadow: '0 1.25rem 3.75rem rgba(0, 0, 0, 0.4)',
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: borderRadius.md,
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    '@media (min-width: 600px)': {
                        minHeight: '3.5rem',
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    elevation: 0,
                    borderRadius: borderRadius.sm,
                    boxShadow: '0 0.5rem 2rem 0 rgba(0, 0, 0, 0.37)',
                    //backgroundColor: 'rgba(30, 41, 59, 0.85)',
                    backdropFilter: 'blur(0.8rem)',
                    WebkitBackdropFilter: 'blur(0.8rem)',
                    border: '0.0625rem solid rgba(255, 255, 255, 0.08)',
                },
            },
        },
    },
});
