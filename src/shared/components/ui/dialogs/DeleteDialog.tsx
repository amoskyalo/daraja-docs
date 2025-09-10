import {
    Dialog,
    Button,
    DialogTitle,
    DialogActions,
    DialogContent,
    CircularProgress,
    DialogContentText,
    Stack,
} from '@mui/material';
import { DeleteDialogProps } from '../types/dialog.types';

export const DeleteDialog = (props: DeleteDialogProps) => {
    const { open, loading, onCancel, onOkay, dialogTitle, contentText, onCancelButtonText, onOkayButtonText } = props;

    const handleCancel = () => {
        if (!loading) {
            onCancel();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            maxWidth="xs"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{dialogTitle ?? 'Delete item?'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {contentText ?? 'Are you sure you want to delete this item? This action is irreversible!'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={2} sx={{ pb: 2, px: 2 }}>
                    <Button disabled={loading} onClick={onCancel} size="small" disableElevation>
                        {onCancelButtonText ?? 'Cancel'}
                    </Button>
                    <Button
                        onClick={onOkay}
                        autoFocus
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={14} color="inherit" /> : ''}
                        color="error"
                        variant="contained"
                        size="small"
                        disableElevation
                    >
                        {onOkayButtonText ?? 'Delete'}
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};
