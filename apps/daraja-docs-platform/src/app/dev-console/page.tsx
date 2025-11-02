'use client';

import { Box, Typography, Stack, Container, Chip, IconButton, Tooltip, Radio, Button, alpha } from '@mui/material';
import { useState } from 'react';
import { useApps } from './services';
import { gridConstructor } from '../../features/datagrid';
import { DeleteDialog, StatusButton, TextInputField, LoadingButton } from '@/shared/components/ui';
import { utils } from '@/shared/utils';
import { Eye, ScanBarcode, Trash, Copy, Info } from 'lucide-react';
import { FormDialog } from '@/shared/components/ui/dialogs/FormDialog';
import { useCopyToClipboard } from '@/shared/hooks';
import { Formik, Form } from 'formik';
import { PRODUCTS, DEVCONSOLETABS } from '@/config/constants';

const DashboardPage = () => {
    const { get, mutation } = useApps();
    const { Copy: copyToClipboard, copied } = useCopyToClipboard();

    const [activeTab, setActiveTab] = useState(0);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState<string | null>(null);
    const [formStep, setFormStep] = useState(0);

    const currentTabData = DEVCONSOLETABS[activeTab];

    const { render, record, reset, formOpen } = new gridConstructor({
        grid: {
            columns: [
                { field: 'app', headerName: 'App', width: 200 },
                {
                    field: 'CreatedAt',
                    headerName: 'Created On',
                    width: 150,
                    valueGetter: (__, row) => utils.formatters().formatDate(Number.parseInt(row.CreatedAt), true),
                },
                { field: 'domain', headerName: 'Domain' },
                { field: 'expired', headerName: 'Expired', type: 'boolean', valueGetter: (__, row) => row.expired },
                {
                    field: 'status',
                    headerName: 'Status',
                    renderCell: ({ row }) => <StatusButton status={row.status} />,
                },
                {
                    field: 'products',
                    headerName: 'Total Products',
                    valueGetter: (__, row) => row.products.length,
                    headerAlign: 'center',
                    align: 'center',
                },
                { field: 'ShortCode', headerName: 'Short Code' },
            ],
            rows: get.apps,
            loading: get.loading,
            actions: ['options'],
            options: [
                {
                    name: 'Secrets',
                    icon: <Eye size={16} style={{ marginRight: '4px' }} />,
                    onClick: () => {
                        setOpen(true);
                    },
                },
                {
                    name: 'Products',
                    icon: <ScanBarcode size={16} style={{ marginRight: '4px' }} />,
                    onClick: () => {},
                },
                {
                    name: 'Delete',
                    icon: <Trash size={16} style={{ marginRight: '4px' }} />,
                    onClick: (record) => {
                        setId(record.app);
                    },
                    error: true,
                },
            ],
        },
    }).grid();

    const getValidationSchema = (step: number) => {
        const fields = [
            {
                name: 'AppName',
                type: 'string' as const,
                errorMessage: 'App name is required',
            },
        ];

        if (step === 1) {
            fields.push({
                name: 'products',
                type: 'array' as const,
                errorMessage: 'Please select at least one product',
                extend: (schema: any) => schema.min(1, 'Please select at least one product'),
            } as any);
        }

        return utils.getValidationSchema(fields);
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ px: { xs: 1, md: 0 }, position: 'relative' }}>
                <Stack direction="row" justifyContent="center" sx={{ position: 'sticky', top: '68px', zIndex: 1 }}>
                    <Stack
                        direction="row"
                        alignItems="flex-start"
                        spacing={1}
                        sx={{
                            backgroundColor: (theme) => alpha(theme.palette.warning.main, 0.1),
                            maxWidth: { lg: '60%' },
                            padding: 1,
                            borderRadius: 2,
                            color: 'warning.main',
                        }}
                    >
                        <Info size={16} style={{ marginTop: '1px' }} />
                        <Typography variant="body2" sx={{ fontSize: 13 }}>
                            You&apos;re viewing data from the Daraja 2.0 API. To use Daraja 3.0, visit the new Safaricom
                            Daraja 3.0 platform.
                        </Typography>
                    </Stack>
                </Stack>

                <Box sx={{ mx: 'auto', maxWidth: { md: '85%' } }}>
                    <Box
                        sx={{
                            pt: 3,
                            pb: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="h6" fontWeight={600}>
                                {currentTabData.label}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                {currentTabData.description}
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} mt={3}>
                            {DEVCONSOLETABS.map((tab, index) => {
                                const active = tab.value === activeTab;
                                return (
                                    <Chip
                                        key={tab.value}
                                        icon={tab.icon}
                                        label={index == 0 ? 'Apps' : tab.label}
                                        onClick={() => setActiveTab(tab.value)}
                                        variant={active ? 'filled' : 'outlined'}
                                        sx={(theme) => ({
                                            fontWeight: 500,
                                            border: 'none',
                                            pl: 0.5,
                                            pr: 0.2,
                                            borderRadius: 2,
                                            opacity: active ? 1 : 0.6,
                                        })}
                                    />
                                );
                            })}
                        </Stack>
                    </Box>

                    <Box sx={{ width: '100%', overflow: 'hidden' }}>{render()}</Box>
                </Box>
            </Container>

            <FormDialog
                open={open}
                dialogTitle={record?.app ?? 'App secrets'}
                onClose={() => {
                    reset();
                    setOpen(false);
                }}
            >
                <Stack spacing={2}>
                    {[
                        { label: 'Consumer Key', value: record?.ConsumerKey },
                        { label: 'Consumer Secret', value: record?.ConsumerSecret },
                    ].map((item) => (
                        <TextInputField
                            key={item.label}
                            label={item.label}
                            value={item.value ?? ''}
                            isPassword
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                                            <IconButton edge="end" onClick={() => copyToClipboard(item.value)}>
                                                <Copy size={16} />
                                            </IconButton>
                                        </Tooltip>
                                    ),
                                    readOnly: true,
                                },
                            }}
                        />
                    ))}
                </Stack>
            </FormDialog>

            <FormDialog open={formOpen} dialogTitle="Create new app" onClose={reset}>
                <Formik
                    initialValues={{ AppName: '', products: [] as string[] }}
                    validationSchema={getValidationSchema(formStep)}
                    enableReinitialize
                    onSubmit={({ AppName, products }) => {
                        if (formStep === 0) {
                            setFormStep(1);
                        } else {
                            mutation.handleCreate({
                                payload: {
                                    AppName,
                                    products: PRODUCTS.filter((product) => products.includes(product.name)),
                                },
                                callback: () => {
                                    reset();
                                    setFormStep(0);
                                },
                            });
                        }
                    }}
                >
                    {(formik) => {
                        return (
                            <Form>
                                {formStep === 0 && (
                                    <TextInputField
                                        label="App Name"
                                        placeholder="Enter app name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        {...utils.getFormikFieldProps({ formik, field: 'AppName' })}
                                    />
                                )}

                                {formStep === 1 && (
                                    <Stack spacing={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Select products to enable for this app.
                                        </Typography>

                                        <Stack spacing={1}>
                                            {PRODUCTS.map((product) => {
                                                const isSelected = formik.values.products.includes(product.name);

                                                return (
                                                    <Box
                                                        key={product.name}
                                                        onClick={() => {
                                                            if (isSelected) {
                                                                formik.setFieldValue(
                                                                    'products',
                                                                    formik.values.products.filter(
                                                                        (p) => p !== product.name
                                                                    )
                                                                );
                                                            } else {
                                                                formik.setFieldValue('products', [
                                                                    ...formik.values.products,
                                                                    product.name,
                                                                ]);
                                                            }
                                                        }}
                                                        sx={{
                                                            border: 1,
                                                            borderColor: 'divider',
                                                            backgroundColor: isSelected
                                                                ? 'action.selected'
                                                                : 'transparent',
                                                            p: 1.5,
                                                            borderRadius: 2,
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease-in-out',
                                                            ':hover': {
                                                                backgroundColor: 'action.hover',
                                                            },
                                                        }}
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            justifyContent="space-between"
                                                        >
                                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                                {product.alias}
                                                            </Typography>
                                                            <Radio
                                                                size="small"
                                                                sx={{ margin: 0, padding: 0 }}
                                                                checked={isSelected}
                                                            />
                                                        </Stack>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {product.description}
                                                        </Typography>
                                                    </Box>
                                                );
                                            })}
                                        </Stack>
                                    </Stack>
                                )}
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    sx={{ mt: formStep === 0 ? 3 : 2 }}
                                    spacing={1}
                                >
                                    <Button
                                        variant="text"
                                        sx={{ color: 'text.secondary' }}
                                        onClick={() => setFormStep(formStep - 1)}
                                        disabled={formStep === 0}
                                    >
                                        Back
                                    </Button>
                                    <LoadingButton variant="contained" type="submit" loading={mutation.loading}>
                                        {formStep === 0 ? 'Next' : 'Submit app'}
                                    </LoadingButton>
                                </Stack>
                            </Form>
                        );
                    }}
                </Formik>
            </FormDialog>

            <DeleteDialog
                open={Boolean(id)}
                onCancel={() => setId(null)}
                loading={mutation.loading}
                onOkay={() => {
                    mutation.handleDelete({
                        payload: { AppName: id as string },
                        callback: () => {
                            setId(null);
                        },
                    });
                }}
                dialogTitle="Delete app"
                contentText="Are you sure you want to delete this app? This action cannot be undone."
            />
        </>
    );
};

export default DashboardPage;
