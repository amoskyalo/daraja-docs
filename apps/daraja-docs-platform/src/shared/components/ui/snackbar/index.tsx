'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Alert } from '@mui/material';
import MUISnackbar from '@mui/material/Snackbar';
import { Callback, CallbackArgs, Positions, SnackbarProps } from '../types';

const snackbarEvents = {
    callBacks: [] as Array<Callback>,

    on(callback: Callback) {
        this.callBacks.push(callback);
    },

    off(callback: Callback) {
        this.callBacks = this.callBacks.filter((call) => call !== callback);
    },

    trigger(data: CallbackArgs) {
        this.callBacks.forEach((callback) => callback(data));
    },
};

export const snackbarToast = {
    success(message: string, position?: Positions) {
        snackbarEvents.trigger({ message, position, severity: 'success' });
    },

    error(message: string, position?: Positions) {
        snackbarEvents.trigger({ message, position, severity: 'error' });
    },

    info(message: string, position?: Positions) {
        snackbarEvents.trigger({ message, position, severity: 'info' });
    },

    warning(message: string, position?: Positions) {
        snackbarEvents.trigger({ message, position, severity: 'warning' });
    },
};

export const Snackbar = ({ message, severity, open, onClose, position, autoHideDuration = 6000 }: SnackbarProps) => {
    return (
        <MUISnackbar
            sx={{ zIndex: 999999 }}
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={position}
        >
            <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </MUISnackbar>
    );
};

export const SnackbarContainer = () => {
    const [snackbarData, setSnackbarData] = useState<CallbackArgs | null>(null);

    const onClose = useCallback(() => {
        setSnackbarData(null);
    }, []);

    useEffect(() => {
        const handleEvents = (data: CallbackArgs) => {
            setSnackbarData(data);
        };

        snackbarEvents.on(handleEvents);

        return () => snackbarEvents.off(handleEvents);
    }, []);

    useEffect(() => {
        if (!open) return;
        const timer = setTimeout(onClose, 6000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        snackbarData && (
            <Snackbar
                position={snackbarData.position ?? { vertical: 'top', horizontal: 'center' }}
                message={snackbarData.message}
                severity={snackbarData.severity}
                onClose={onClose}
                open={snackbarData !== null}
            />
        )
    );
};
