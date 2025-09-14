import { SelectFieldProps } from '@/config/types/forms.types';
import { Select, InputLabel, FormHelperText, MenuItem, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 250,
            overflow: 'auto',
        },
        elevation: 7,
    },
};

export const SelectInputField = (props: SelectFieldProps) => {
    const { size: inputSize, label, error, options = [], helperText, children, placeholder, ...otherProps } = props;

    const size = inputSize ?? 'small';

    function getLabel(selected: any) {
        return options.find((el) => el.value === selected)?.label;
    }

    return (
        <Stack>
            <InputLabel>{label}</InputLabel>
            <Select
                error={error}
                fullWidth
                size={size}
                MenuProps={MenuProps}
                displayEmpty
                {...(placeholder && {
                    renderValue: (selected: unknown) => {
                        if (!selected) {
                            return <Typography sx={{ fontSize: 16, color: grey[500] }}>{placeholder}</Typography>;
                        }
                        return getLabel(selected) as React.ReactNode;
                    },
                })}
                {...otherProps}
            >
                {options.length > 0
                    ? options.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                              {option.label}
                          </MenuItem>
                      ))
                    : children}
            </Select>
            {helperText && (
                <FormHelperText error sx={{ pl: 2 }}>
                    {helperText}
                </FormHelperText>
            )}
        </Stack>
    );
};
