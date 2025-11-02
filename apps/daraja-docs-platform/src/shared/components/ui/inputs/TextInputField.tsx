import { Box, InputLabel, InputAdornment, IconButton, TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const TextInputField = ({
    label,
    isPassword = false,
    slotProps,
    ...props
}: TextFieldProps & { isPassword?: boolean }) => {
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
                        endAdornment:
                            isPassword && !(slotProps?.input as any)?.endAdornment ? (
                                <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </IconButton>
                                </InputAdornment>
                            ) : (
                                (slotProps?.input as any)?.endAdornment
                            ),
                        ...slotProps?.input,
                    },
                    ...slotProps,
                }}
            />
        </Box>
    );
};
