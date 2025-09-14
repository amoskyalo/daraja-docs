import { useState } from 'react';
import {
    TextField,
    Stack,
    InputLabel,
    InputAdornment,
    Menu,
    MenuItem,
    MenuList,
    Box,
    Divider,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import { countries } from '@/config';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const PhoneInputField = ({ label, size, poperWidth, onChange, colorIndex, ...rest }: any) => {
    const [country, setCountry] = useState<any>(countries[0]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleCountryChange = (country: any) => {
        setCountry(country);
        setAnchorEl(null);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.({
            event,
            phone: country.phone,
            code: country.code,
            value: event.target.value,
        });
    };

    const inputSize = size ?? 'small';
    const adornmentSize = inputSize === 'small' ? '40px' : '56px';
    const paddingLeft = inputSize === 'small' ? 1.5 : 2.5;
    const paddingRight = inputSize === 'small' ? 0.5 : 1.5;

    return (
        <Stack spacing={0.5} sx={{ width: '100%' }}>
            <InputLabel>{label}</InputLabel>
            <TextField
                fullWidth
                size={inputSize}
                onChange={handleChange}
                type="tel"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Stack
                                    direction="row"
                                    alignItems={'center'}
                                    onClick={(e) => setAnchorEl(e.currentTarget)}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems={'center'}
                                        spacing={0.5}
                                        sx={{
                                            height: adornmentSize,
                                            paddingLeft,
                                            paddingRight,
                                            marginRight: 1,
                                            cursor: 'pointer',
                                            borderRight: 1,
                                            borderColor: 'divider',
                                        }}
                                    >
                                        <Image
                                            src={`https://flagcdn.com/w20/${country?.code.toLowerCase()}.png`}
                                            alt={country?.label}
                                            width={95}
                                            height={85}
                                            priority
                                        />
                                        <KeyboardArrowDownIcon fontSize="small" />
                                    </Stack>
                                    {country?.phone}
                                </Stack>
                            </InputAdornment>
                        ),
                        style: {
                            paddingLeft: '0px',
                        },
                    },
                }}
                {...rest}
            />

            <Menu
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                open={Boolean(anchorEl)}
                sx={{
                    '& .MuiPaper-root': {
                        marginTop: 1,
                        width: poperWidth ?? undefined,
                        maxHeight: 250,
                    },
                }}
            >
                <Box sx={{ px: 2, py: 0.5 }}>
                    <TextField
                        placeholder="Search country..."
                        variant="standard"
                        slotProps={{ input: { disableUnderline: true, startAdornment: <SearchIcon /> } }}
                        //onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>

                <Divider />

                <MenuList>
                    {countries?.map((country: any) => (
                        <MenuItem key={country.label} onClick={() => handleCountryChange(country)}>
                            <ListItemIcon>
                                <Image
                                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                    alt={country.label}
                                    width={25}
                                    height={15}
                                    priority
                                />
                            </ListItemIcon>
                            <ListItemText>
                                {country.label} ( {country.phone} )
                            </ListItemText>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Stack>
    );
};
