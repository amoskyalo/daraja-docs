import { Toolbar } from '@mui/x-data-grid';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { Plus, ListFilter } from 'lucide-react';
import { DataGridToolbarProps } from '../types';

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
                            startIcon={<Plus />}
                            disableElevation
                            size={showSearch ? 'small' : 'large'}
                            variant="contained"
                            onClick={onAdd}
                        >
                            New
                        </Button>
                    )}
                </Box>
            }
        />
    );
};
