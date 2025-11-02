import React from "react";
import { Button, ButtonProps, CircularProgress } from "@mui/material";

export const LoadingButton = ({
    loading,
    ...props
}: ButtonProps & {
    loading: boolean;
}) => {
    return (
        <Button
            {...props}
            startIcon={loading ? <CircularProgress size={14} color="inherit" /> : props.startIcon}
            disabled={loading}
        />
    );
};