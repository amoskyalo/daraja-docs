import { Box, InputLabel, InputAdornment, IconButton, TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const TextInputField = ({ label, isPassword = false, ...props }: TextFieldProps & { isPassword?: boolean }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Box>
            <InputLabel sx={{ mb: 0.5, fontSize: 14 }}>{label}</InputLabel>
            <TextField
                fullWidth
                {...props}
                type={isPassword && !showPassword ? 'password' : 'text'}
                size="small"
                slotProps={{
                    input: {
                        endAdornment: isPassword ? (
                            <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                    },
                }}
            />
        </Box>
    );
};
