import { Toolbar } from '@mui/x-data-grid';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ListFilter } from 'lucide-react';
import { DataGridToolbarProps } from '../types';
import AddIcon from '@mui/icons-material/Add';

export const DataGridToolbar = ({
    onAdd,
    onFilter,
    showSearch,
    renderAdditionalButtons,
}: Readonly<DataGridToolbarProps>) => {
    return (
        <Toolbar
            render={
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        borderBottom: 1,
                        borderColor: 'divider',
                        padding: '8px',
                    }}
                >
                    {onFilter && (
                        <Tooltip title="filters">
                            <IconButton size="small">
                                <ListFilter size="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {renderAdditionalButtons &&
                        React.isValidElement(renderAdditionalButtons()) &&
                        renderAdditionalButtons()}
                    {onAdd && (
                        <Button
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                borderRadius: 1.5,
                                py: 0.5,
                                pl: 0.5,
                                pr: 1,
                                height: 'max-content !important',
                                gap: 0.5,
                            }}
                            onClick={onAdd}
                            variant="contained"
                        >
                            <AddIcon sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                New
                            </Typography>
                        </Button>
                    )}
                </Box>
            }
        />
    );
};
