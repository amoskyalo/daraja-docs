import { FormikProps } from 'formik';
import { TextFieldProps, SelectProps } from '@mui/material';

type OTPField = {
    type: 'otp';
    name: string;
    length: number;
};

type OtherFields = {
    type: 'email' | 'password' | 'string' | 'url' | 'phoneNumber';
    name: string;
};

export type FieldTypes = { errorMessage?: string } & (OTPField | OtherFields);

export type GetFormikFieldPropsArgs<Type> = {
    formik: FormikProps<Type>;
    field: keyof Type;
    isOTP?: boolean;
};

export type OTPFieldProps = Omit<TextFieldProps, 'onChange'> & {
    length?: number;
    onChange?: (arg: string | number) => void;
};

export type SelectFieldProps = SelectProps & {
    options?: { value: string | number; label: string }[];
    children?: React.ReactNode;
    helperText?: string | boolean;
    placeholder?: string;
};
