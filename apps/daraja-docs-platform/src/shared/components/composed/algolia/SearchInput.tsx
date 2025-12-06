'use client';

import { CircularProgress, DialogTitle, IconButton, InputAdornment, TextField } from '@mui/material';
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';

interface SearchInputProps {
    query: string;
    loading: boolean;
    onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClose: () => void;
}

export const SearchInput = ({ query, loading, onQueryChange, onClose }: SearchInputProps) => {
    return (
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', px: 0, py: 0 }}>
            <TextField
                autoFocus
                fullWidth
                placeholder="Search documentation..."
                value={query}
                onChange={onQueryChange}
                focused
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                {loading ? <CircularProgress size={18} color="inherit" /> : <SearchIcon />}
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={onClose} size="small">
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { border: 'none' },
                        '&:hover fieldset': { border: 'none' },
                        '&.Mui-focused fieldset': { border: 'none' },
                    },
                }}
            />
        </DialogTitle>
    );
};
