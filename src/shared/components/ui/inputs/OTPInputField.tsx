import { TextField, Stack, InputLabel, FormHelperText } from '@mui/material';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { OTPFieldProps } from '@/config/types/forms.types';

export const OTPInputField = ({ length, label, size, error, helperText, onChange, ...rest }: OTPFieldProps) => {
    const totalLength = useMemo(() => length ?? 4, [length]);
    const [otp, setOtp] = useState<string[]>(() => Array(totalLength).fill(''));
    const [focusedIndex, setFocusedIndex] = useState<number>(0);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const inputSize = size ?? 'small';
    const inputWidth = inputSize === 'small' ? '40px' : '56px';

    const handleChange = useCallback(
        (index: number, value: string) => {
            const sanitizedValue = value.slice(-1);

            setOtp((prev) => {
                const newOtp = [...prev];
                newOtp[index] = sanitizedValue;
                return newOtp;
            });

            if (sanitizedValue !== '') {
                if (index !== totalLength - 1) {
                    inputRefs.current[index + 1]?.focus();
                    setFocusedIndex(index + 1);
                } else {
                    inputRefs.current[index]?.blur();
                    setFocusedIndex(0);
                }
            } else if (index !== 0) {
                inputRefs.current[index - 1]?.focus();
                setFocusedIndex(index - 1);
            }
        },
        [totalLength],
    );

    useEffect(() => {
        if (typeof onChange === 'function') {
            const timeoutId = setTimeout(() => {
                onChange(otp.join(''));
            }, 50);
            return () => clearTimeout(timeoutId);
        }
    }, [otp, onChange]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;
            const focusedInputEmpty = !otp[focusedIndex];
            const isFirstInput = focusedIndex === 0;
            const isLastInput = focusedIndex === totalLength - 1;
            const arrowLeftIndex = focusedIndex - 1;
            const arrowRightIndex = focusedIndex + 1;

            if (key === 'ArrowLeft') {
                if (isFirstInput) {
                    e.preventDefault();
                    return;
                }

                const leftInput = inputRefs.current[arrowLeftIndex];
                if (leftInput) {
                    leftInput.focus();
                    setTimeout(() => {
                        leftInput.setSelectionRange(1, 1);
                    }, 0);
                    setFocusedIndex(arrowLeftIndex);
                }
            } else if (key === 'ArrowRight' && !focusedInputEmpty && !isLastInput) {
                const rightInput = inputRefs.current[arrowRightIndex];
                if (rightInput) {
                    rightInput.focus();
                    setFocusedIndex(arrowRightIndex);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [focusedIndex, otp, totalLength]);

    return (
        <Stack spacing={1}>
            <InputLabel
                sx={{
                    fontWeight: 'medium',
                    color: 'text.primary',
                    opacity: 0.9,
                }}
            >
                {label}
            </InputLabel>

            <Stack direction="row" spacing={2}>
                {Array.from({ length: totalLength }).map((_, index) => (
                    <TextField
                        key={index}
                        value={otp[index] || ''}
                        size={inputSize}
                        error={error}
                        placeholder="-"
                        inputRef={(ref) => ref && (inputRefs.current[index] = ref)}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onClick={(e) => e.currentTarget.blur()}
                        slotProps={{
                            htmlInput: {
                                maxLength: 1,
                                style: { textAlign: 'center' },
                            },
                            input: {
                                style: {
                                    width: inputWidth,
                                    pointerEvents: index !== 0 && !otp[index - 1] ? 'none' : 'auto',
                                },
                            },
                        }}
                        {...rest}
                    />
                ))}
            </Stack>
            {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
        </Stack>
    );
};
