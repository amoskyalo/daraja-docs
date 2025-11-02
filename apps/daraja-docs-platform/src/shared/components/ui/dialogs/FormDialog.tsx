import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Stack, Tooltip } from "@mui/material";
import { FormDialogProps } from "../types";
import CloseIcon from "@mui/icons-material/Close";

export const FormDialog = (props: FormDialogProps) => {
    const { dialogTitle, children, maxWidth, onClose, showBottomBorder, ...rest } = props;

    return (
        <Dialog
            {...rest}
            maxWidth={maxWidth ?? "xs"}
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ padding: 0 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ pl: 3, pr: 2, py: 1.5, borderBottom: showBottomBorder ? 1 : 0, borderColor: "divider" }}
                >
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {dialogTitle}
                    </Typography>
                    <Tooltip title="Close">
                        <IconButton onClick={(e) => onClose?.(e, "backdropClick")} size="small">
                            <CloseIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};