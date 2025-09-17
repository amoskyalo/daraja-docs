import React from 'react';
import { Box, Stack, Tooltip, Typography, Menu, MenuItem } from '@mui/material';
import { MarkdownComponents } from '@/features/markdown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const curl = `\`\`\`javascript
let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Authorization", "Bearer vQ48zB7cR9YHRNXAcpd0OuE7OTyK");

fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
  method: 'POST',
  headers,
  body: JSON.stringify({
    "BusinessShortCode": 174379,
    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjUwOTE3MjE1MjQx",
    "Timestamp": "20250917215241",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": 1,
    "PartyA": 254708374149,
    "PartyB": 174379,
    "PhoneNumber": 254708815490,
    "CallBackURL": "https://mydomain.com/path",
    "AccountReference": "CompanyXLTD",
    "TransactionDesc": "Payment of X" 
  })
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log(error));
\`\`\``;

const response = `\`\`\`json
{
    "MerchantRequestID": "9ba0-4845-bf5b-e11eb4372da61920",
    "CheckoutRequestID": "ws_CO_17092025215242150708815490",
    "ResponseCode": "0",
    "ResponseDescription": "Success. Request accepted for processing",
    "CustomerMessage": "Success. Request accepted for processing"
}
\`\`\``;

const ResponseUI = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Stack spacing={4}>
                <Box sx={{ borderRadius: 2, backgroundColor: 'action.hover' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1, px: 1.5 }}>
                        <Typography variant="body2" fontWeight={500}>
                            Request
                        </Typography>

                        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ flex: 1 }} gap={1}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                gap={0.5}
                                onClick={handleClick}
                                sx={{
                                    cursor: 'pointer',
                                    borderRadius: 1,
                                    paddingX: 0.5,
                                    paddingY: 0.25,
                                    '&:hover': { backgroundColor: 'action.selected', color: 'primary.main' },
                                }}
                            >
                                <Typography variant="body2" sx={{ fontSize: 13 }}>
                                    Javascript
                                </Typography>
                                <Stack direction="column" alignItems="center">
                                    <KeyboardArrowUpIcon sx={{ fontSize: 13, mt: 0 }} />
                                    <KeyboardArrowDownIcon sx={{ fontSize: 13, mt: -0.8 }} />
                                </Stack>
                            </Stack>
                            <Tooltip title="Explain with AI">
                                <AutoAwesomeIcon sx={{ fontSize: 15, cursor: 'pointer', mr: 1 }} />
                            </Tooltip>
                            <Tooltip title="Copy">
                                <ContentCopyIcon
                                    sx={{ fontSize: 14, cursor: 'pointer' }}
                                    onClick={() => navigator.clipboard.writeText(curl)}
                                />
                            </Tooltip>
                        </Stack>
                    </Stack>
                    <MarkdownComponents message={curl} maxHeight="100%" borderRadius="8px !important" />
                </Box>

                <Box sx={{ borderRadius: 2, backgroundColor: 'action.hover' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1, px: 1.5 }}>
                        <Typography variant="body2" fontWeight={500}>
                            Response
                        </Typography>

                        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ flex: 1 }} gap={1}>
                            <Tooltip title="Explain with AI">
                                <AutoAwesomeIcon sx={{ fontSize: 15, cursor: 'pointer', mr: 1 }} />
                            </Tooltip>

                            <Tooltip title="Copy">
                                <ContentCopyIcon
                                    sx={{ fontSize: 14, cursor: 'pointer' }}
                                    onClick={() => navigator.clipboard.writeText(curl)}
                                />
                            </Tooltip>
                        </Stack>
                    </Stack>
                    <MarkdownComponents message={response} />
                </Box>
            </Stack>

            <Menu
                anchorEl={anchorEl}
                id="theme-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            minWidth: 200,
                            maxHeight: 200,
                            border: 1,
                            borderColor: 'divider',
                            mt: 0.5,
                            elevation: '0 !important',
                            boxShadow: 'none !important',
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {[
                    { label: 'Javascript', value: 'javascript' as const },
                    { label: 'Python', value: 'python' as const },
                    { label: 'cURL', value: 'curl' as const },
                    { label: 'Java', value: 'java' as const },
                    { label: 'C#', value: 'csharp' as const },
                    { label: 'C++', value: 'cpp' as const },
                    { label: 'Go', value: 'go' as const },
                    { label: 'Rust', value: 'rust' as const },
                    { label: 'PHP', value: 'php' as const },
                    { label: 'Ruby', value: 'ruby' as const },
                    { label: 'Swift', value: 'swift' as const },
                    { label: 'Kotlin', value: 'kotlin' as const },
                    { label: 'TypeScript', value: 'typescript' as const },
                ].map((item) => (
                    <Box sx={{ px: 1 }} key={item.value}>
                        <MenuItem
                            sx={{ px: 1, borderRadius: 2, '&.Mui-selected': { backgroundColor: 'action.hover' } }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" fontWeight={500}>
                                    {item.label}
                                </Typography>
                            </Box>
                        </MenuItem>
                    </Box>
                ))}
            </Menu>
        </>
    );
};

export default ResponseUI;
