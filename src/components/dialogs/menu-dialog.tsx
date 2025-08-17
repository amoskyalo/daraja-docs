import { Menu } from '@mui/material';
import { MenuDialogProps } from '@/types/dialogs';

export const MenuDialog = ({ anchorEl, setAnchorEl, children }: MenuDialogProps) => {
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{
                '& .MuiPaper-root': {
                    marginTop: 2,
                    minWidth: 150,
                },
            }}
        >
            {children}
        </Menu>
    );
};
