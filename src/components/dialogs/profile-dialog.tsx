import { Divider, MenuItem, MenuList, ListItemIcon, ListItemText, Box } from '@mui/material';
import { UserPen, LogOut } from 'lucide-react';
import { handleRemoveSession } from '@/functions/serverActions';
import { useRouter } from 'next/navigation';

export const ProfileDialog = () => {
    const router = useRouter();

    return (
        <Box sx={{ boxShadow: 3 }}>
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <UserPen size={20} />
                    </ListItemIcon>
                    <ListItemText>My Profile</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        handleRemoveSession();
                        router.push('/auth/login');
                    }}
                >
                    <ListItemIcon>
                        <LogOut size={20} />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </MenuList>
        </Box>
    );
};
