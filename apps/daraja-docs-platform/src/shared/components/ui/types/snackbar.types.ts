export type Callback = (arg: CallbackArgs) => void;

export type CallbackArgs = {
    message: string;
    severity: 'error' | 'warning' | 'success' | 'info';
    autoHideDuration?: number;
    position?: Positions;
};

export type Positions = {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
};

export type SnackbarProps = CallbackArgs & {
    open: boolean;
    onClose: any;
};
