import { array, string, object, number, Schema } from 'yup';
import { FieldTypes, GetFormikFieldPropsArgs } from '../../config/types';
import { useResponsiveness } from '../hooks/useResponsiveness';
import { GridColDef } from '@mui/x-data-grid';
import { isValidPhoneNumber, validatePhoneNumberLength, AsYouType } from 'libphonenumber-js';

export const utils = {
    getValidationSchema(args: Array<FieldTypes>) {
        function getFieldValidationType(field: FieldTypes) {
            let schema: Schema;

            switch (field.type) {
                case 'email':
                    schema = string()
                        .email()
                        .required(field.errorMessage ?? 'Email is required');
                    break;
                case 'password':
                    schema = string().required(field.errorMessage ?? 'Password is required');
                    break;
                case 'array':
                    schema = array()
                        .of(string())
                        .required(field.errorMessage ?? 'Array is required');
                    break;
                case 'otp':
                    schema = string()
                        .length(field.length, `Your OTP must be exactly ${field.length} digits long`)
                        .required(field.errorMessage ?? 'Please enter the OTP code to continue');
                    break;
                case 'number':
                    if (field.num_type === 'min_max') {
                        schema = number()
                            .required(field.errorMessage ?? 'Field is required')
                            .min(field.min, `Value cannot be less than ${field.min}`)
                            .max(field.max, `Value cannot be more than ${field.max}`);
                    } else if (field.num_type === 'min') {
                        schema = number()
                            .required(field.errorMessage ?? 'Field is required')
                            .min(field.min, `Value cannot be less than ${field.min}`);
                    } else if (field.num_type === 'max') {
                        schema = number()
                            .required(field.errorMessage ?? 'Field is required')
                            .max(field.max, `Value cannot be more than ${field.max}`);
                    } else {
                        schema = number().required(field.errorMessage ?? 'Field is required');
                    }
                    break;
                case 'phone_number':
                    schema = string()
                        .required(field.errorMessage ?? 'Phone number is required')
                        .typeError('Invalid phone number')
                        .test('isValid', 'Invalid phone number', (value) => isValidPhoneNumber(String(value), 'KE'))
                        .test(
                            'isValidLength',
                            'Invalid phone number length',
                            (value) => validatePhoneNumberLength(String(value), 'KE') === undefined
                        );
                    break;
                default:
                    schema = string().required(field.errorMessage ?? 'Field is required');
            }

            if (field.extend) {
                schema = field.extend(schema);
            }

            return schema;
        }

        const schema = args.reduce<Record<string, ReturnType<typeof getFieldValidationType>>>((acc, arg) => {
            acc[arg.name] = getFieldValidationType(arg);
            return acc;
        }, {});

        return object().shape(schema);
    },

    getFormikFieldProps<Type>(args: GetFormikFieldPropsArgs<Type>): any {
        const { formik, field, isOTP } = args;
        const { errors, touched, getFieldProps, setFieldValue } = formik;

        const formField = String(field);

        const error = touched[field] && Boolean(errors[field]);
        const helperText = touched[field] && (errors[field] as any);

        const handleOTPChange = (value: string) => {
            setFieldValue(formField, value);
        };

        const commonProps = {
            error,
            helperText,
        };

        if (field === 'phoneNumber' || field === 'phone_number') {
            const error = Boolean(errors[field]);
            const helperText = errors[field] as any;

            const handlePhoneChange = (phoneData: any) => {
                const { value, code, phone } = phoneData;
                const startIndex = String(phone).length > 4 ? 2 : 1;
                const formatedValue = new AsYouType(code).input(phone + value);
                const finalValue = String(formatedValue).split(' ').slice(startIndex).join(' ');

                setFieldValue(formField, {
                    ...phoneData,
                    value: finalValue,
                });
            };

            const phoneValue = (formik.values[field] || { phone: '', code: '', value: '' }) as {
                phone: string;
                code: string;
                value: string;
            };

            const displayValue = phoneValue.value || '';

            return {
                onChange: handlePhoneChange,
                value: displayValue,
                helperText: helperText?.value,
                error,
            };
        }

        if (isOTP) {
            return {
                onChange: handleOTPChange,
                ...commonProps,
            };
        }

        return {
            ...commonProps,
            ...getFieldProps(formField),
        };
    },

    customizeGridColumns(columns: (GridColDef & { mobileWidth?: number })[], numbered?: boolean): GridColDef[] {
        const { isDesktop, isMiniTablet, isMobile, isTablet } = useResponsiveness();

        function getColumnDimensions(mobileWidth: number | undefined, width: number | undefined) {
            if (isDesktop) return { flex: 1 };
            if (width) return { width };
            if ((isMobile || isMiniTablet || isTablet) && mobileWidth) return { width: mobileWidth };
            return { flex: 1 };
        }

        return [
            ...(numbered ? [{ field: 'no', headerName: 'No.', width: 50, sortable: false }] : []),
            ...columns.map(({ mobileWidth, width, valueGetter: fn, field, ...rest }) => {
                const valueGetter =
                    typeof fn === 'function'
                        ? fn
                        : (__: any, row: any) => (row[field] && row[field] !== '' ? row[field] : '--');

                return {
                    ...rest,
                    ...getColumnDimensions(mobileWidth, width),
                    valueGetter,
                    field,
                };
            }),
        ];
    },

    isDefaultPagination(param: string, value: any) {
        return (param === 'start' && value === 1) || (param === 'limit' && value === 10) || value === 'all';
    },

    formatters() {
        const lowerCaseString = (str: string) => {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };

        const formatDate = (date: Date | string | number, hideTime = false) => {
            const defaultOptions: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                ...(hideTime ? {} : { hour: '2-digit', minute: '2-digit' }),
            };
            return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
        };

        const formatCurrency = (currency: string, amount: number | string) => {
            const numericAmount = typeof amount === 'string' ? Number.parseFloat(amount) : amount;
            const options: Intl.NumberFormatOptions = {
                currency,
                style: 'currency',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            };
            return new Intl.NumberFormat('en-US', options).format(numericAmount);
        };

        const formatPhoneNumber = (phoneNumber: string) => {
            return `254${phoneNumber.replaceAll(' ', '')}`;
        };

        return {
            lowerCaseString,
            formatDate,
            formatCurrency,
            formatPhoneNumber,
        };
    },
};
