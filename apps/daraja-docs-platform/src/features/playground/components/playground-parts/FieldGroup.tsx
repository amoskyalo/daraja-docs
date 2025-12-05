import { Box, Stack, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FieldInput } from './FieldInput';

interface FieldGroupProps {
    label: string;
    inputs: {
        label: string;
        type: string;
        required: boolean;
        description: string;
        value: string;
        placeholder: string;
    }[];
    fieldKey: string;
    fieldValues: Record<string, string>;
    onFieldChange: (fieldName: string, value: string) => void;
}

export const FieldGroup = ({ label, inputs, fieldKey, fieldValues, onFieldChange }: FieldGroupProps) => {
    return (
        <Box sx={{ borderRadius: 2, border: 1, borderColor: 'divider', py: 1, mt: 2, px: 2 }}>
            <Stack
                direction="row"
                alignItems="center"
                sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, cursor: 'pointer' }}
                gap={0.5}
            >
                <KeyboardArrowRightIcon color="disabled" sx={{ fontSize: 22 }} />
                <Typography variant="body2" fontWeight={600}>
                    {label}
                </Typography>
            </Stack>

            {inputs.map((input, index) => {
                const isLast = index === inputs.length - 1;

                return (
                    <Box key={input.label} sx={{ borderBottom: isLast ? 0 : 1, borderColor: 'divider' }}>
                        <FieldInput
                            {...input}
                            value={fieldValues[input.label] || input.value}
                            onChange={(value) => onFieldChange(input.label, value)}
                        />
                    </Box>
                );
            })}
        </Box>
    );
};
