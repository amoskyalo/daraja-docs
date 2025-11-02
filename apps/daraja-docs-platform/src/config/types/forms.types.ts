import { FormikProps } from 'formik';
import { TextFieldProps, SelectProps } from '@mui/material';

type OTPField = {
    type: "otp";
    name: string;
    length: number;
};

type MinMax = {
    num_type: "min_max";
    min: number;
    max: number;
};

type Min = {
    num_type: "min";
    min: number;
};

type Max = {
    num_type: "max";
    max: number;
};

type Default = {
    num_type: "default";
};

type NumberField = { name: string; type: "number" } & (MinMax | Min | Max | Default);

type OtherFields = {
    type: "email" | "password" | "array" | "string" | "phone_number";
    name: string;
};

type YupExtension = {
    extend?: (schema: any) => any;
};

export type FieldTypes = { errorMessage?: string } & (OTPField | OtherFields | NumberField) & YupExtension;

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
