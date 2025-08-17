'use client';

import {
    Stack,
    Tab,
    Tabs,
    Button,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    TextField,
    InputAdornment,
    Tooltip,
} from '@mui/material';
import { gridConstructor } from '@/ui-models/datagrid-constructor';
import { useSearchParams } from '@/hooks/useSearchParams';
import { Plus, Copy } from 'lucide-react';
import CloseIcon from '@mui/icons-material/Close';
import { utils } from '@/utils';
import { CreateApplicationForm } from './components/Form';
import { Formik } from 'formik';
import { initialValues, applicationsService } from './services';
import { useMemo, useState } from 'react';

const MAPPED_ENVIRONMENT = {
    sandbox: 'SANDBOX',
    production: 'PRODUCTION',
};

const Applications = () => {
    const { createApplication, loading } = applicationsService();
    const { getParam, setParams } = useSearchParams();
    const activeTab = getParam('tab');
    const verify = getParam('verify');

    const [record, setRecord] = useState<any>(null);

    const validationOTP = utils.getValidationSchema([
        { name: 'otp', type: 'otp', length: 6, errorMessage: 'Application OTP is required' },
    ]);

    const validationSchema = useMemo(() => {
        return verify
            ? validationOTP
            : utils.getValidationSchema([
                  { name: 'name', type: 'string', errorMessage: 'Application name is required' },
                  { name: 'environment', type: 'string', errorMessage: 'Application environment is required' },
                  { name: 'scope_id', type: 'string', errorMessage: 'Application scope is required' },
                  { name: 'account_number', type: 'string', errorMessage: 'Application account number is required' },
                  { name: 'callback_url', type: 'url', errorMessage: 'Application callback URL is required' },
                  ...(verify
                      ? [
                            {
                                name: 'otp',
                                type: 'otp' as const,
                                length: 6,
                                errorMessage: 'Application OTP is required',
                            },
                        ]
                      : []),
              ]);
    }, [verify]);

    const { render, formOpen, setFormOpen, refetch } = new gridConstructor({
        grid: {
            columns: [
                { field: 'name', headerName: 'Name', valueGetter: (_, row) => row.application.name },
                {
                    field: 'date_created',
                    headerName: 'Created On',
                    valueGetter: (_, row) => new Date(row.date_created).toLocaleString(),
                },
                { field: 'merchant', headerName: 'Merchant' },
                { field: 'account_number', headerName: 'Account Number', width: 150 },
                { field: 'scope', headerName: 'Scope' },
            ],
            apiConfig: {
                getApi: 'applications',
            },
            actions: ['custom'],
            params: {
                query: MAPPED_ENVIRONMENT[activeTab as 'sandbox' | 'production'],
            },
            renderCustomOption: (args) => {
                return (
                    <Stack direction="row" spacing={2}>
                        <Button
                            onClick={() => {
                                setRecord(args.row);
                            }}
                            sx={{ textTransform: 'none' }}
                        >
                            Show keys
                        </Button>
                    </Stack>
                );
            },
        },
    }).grid();

    const handleSubmit = (values: typeof initialValues) => {
        createApplication({
            values,
            successCallback: () => {
                if (values.environment === 'SANDBOX' || values.otp) {
                    setFormOpen(false);
                    refetch();

                    if (values.otp) {
                        setParams({ verify: undefined });
                    }
                } else {
                    setParams({ verify: 'true' });
                }
            },
        });
    };

    const handleClose = () => {
        setFormOpen(false);
        if (verify) {
            setParams({ verify: undefined });
        }
    };

    return (
        <>
            <Stack sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Tabs
                        value={activeTab}
                        variant="scrollable"
                        scrollButtons="auto"
                        onChange={(event, newValue) => setParams({ tab: newValue })}
                    >
                        <Tab value="sandbox" label="Sandbox Applications" sx={{ textTransform: 'none' }} />
                        <Tab value="production" label="Production Applications" sx={{ textTransform: 'none' }} />
                    </Tabs>

                    <Button
                        onClick={() => setFormOpen(true)}
                        startIcon={<Plus size={16} />}
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: 'none' }}
                    >
                        New Application
                    </Button>
                </Stack>

                <Divider sx={{ mb: 2 }} />

                {render()}
            </Stack>

            <Dialog maxWidth={verify ? 'xs' : 'sm'} fullWidth={!verify} open={formOpen} onClose={handleClose}>
                <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pl: 3, pr: 2, py: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">New Application</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>

                <DialogContent sx={{ padding: 0 }}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                        validateOnBlur={false}
                    >
                        {(formik) => {
                            return <CreateApplicationForm formik={formik} loading={loading} />;
                        }}
                    </Formik>
                </DialogContent>
            </Dialog>

            <Dialog open={!!record} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pl: 3, pr: 2, py: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">{record?.application?.name}</Typography>
                        <IconButton onClick={() => setRecord(null)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>

                <Stack spacing={5} sx={{ px: 3, py: 4 }}>
                    {[
                        { label: 'Client ID', value: record?.application?.client_id },
                        { label: 'Client Secret', value: record?.application?.client_secret },
                    ].map((item) => (
                        <TextField
                            key={item.label}
                            label={item.label}
                            variant="outlined"
                            fullWidth
                            value={item.value ?? ''}
                            focused
                            slotProps={{
                                input: {
                                    readOnly: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Tooltip title={`Copy ${item.label}`}>
                                                <IconButton onClick={() => navigator.clipboard.writeText(item.value)}>
                                                    <Copy size={16} />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: '44px',
                                },
                            }}
                        />
                    ))}
                </Stack>
            </Dialog>
        </>
    );
};

export default Applications;
