export type MenuDialogProps = {
    anchorEl: null | HTMLElement;
    setAnchorEl: (anchorEl: null | HTMLElement) => void;
    children: React.ReactNode;
};

export type DeleteDialogProps = {
    open: boolean;
    loading: boolean;
    dialogTitle?: string;
    contentText?: string;
    onOkayButtonText?: string;
    onCancelButtonText?: string;
    onCancel: () => void;
    onOkay: () => void;
};