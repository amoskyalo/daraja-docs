import { Toolbar } from '@mui/x-data-grid';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import React, { isValidElement } from 'react';
import { DataGridToolbarProps } from '../types';
import { DatagridSearchInputField } from '@/shared/components';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
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
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            borderBottom: 1,
                            borderColor: 'divider',
                            padding: '8px',
                            gap: 1,
                        }}
                    >
                        <DatagridSearchInputField />

                        <Button
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1.5,
                                py: 0.5,
                                pl: 0.7,
                                pr: 1,
                                height: 'max-content !important',
                                gap: 0.5,
                            }}
                        >
                            <FilterListIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                Filters
                            </Typography>
                        </Button>

                        {/* <Button
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1.5,
                                py: 0.5,
                                pl: 0.7,
                                pr: 1,
                                height: 'max-content !important',
                                gap: 0.5,
                            }}
                        >
                            <CloudDownloadOutlinedIcon
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: 18,
                                }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                Export
                            </Typography>
                        </Button> */}

                        {renderAdditionalButtons &&
                            isValidElement(renderAdditionalButtons()) &&
                            renderAdditionalButtons()}

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
                                border: 1,
                                borderColor: 'divider',
                            }}
                            onClick={onAdd}
                        >
                            <AddIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                New
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            }
        />
    );
};
