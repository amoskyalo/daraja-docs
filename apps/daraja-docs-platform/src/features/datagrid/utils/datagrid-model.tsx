import { GridColDef, GridRowId, DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from '../../../shared/hooks/useSearchParams';
import { GridProps, QueryParams } from '../../../config/types/datagrid.types';
import { Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { DataGridToolbar } from '../components/datagrid-toolbar';
import { DataGridFooter } from '../components/datagrid-footer';
import { DataGridActions } from '../components/datagrid-actions';
import { utils } from '../../../shared/utils';
declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        onAdd?: () => void;
        onFilter?: () => void;
        showSearch?: boolean;
        renderAdditionalButtons?: () => React.ReactNode;
    }
}

export const GridModel = <TData, TParams>(props: GridProps<TData, TParams>) => {
    const {
        params,
        options,
        columns,
        onFilter,
        openFormOnNewPage,
        renderCustomOption,
        renderAdditionalButtons,
        hasNew = true,
        showSearch = true,
        searchParams = [],
        hasActions = true,
        actionsWidth = 100,
        hideToolbar = false,
        checkboxSelection = true,
        actions = ['edit', 'delete'],
        rows,
        ...otherProps
    } = props;

    const { setParams, getSearchParams } = useSearchParams();

    const { limit, page, searchKey, ...rest } = getSearchParams(['limit', 'page', 'searchKey', ...searchParams]) as any;

    const queryparams = {
        limit: parseInt(limit ?? '10'),
        page: parseInt(page ?? '1'),
        ...params,
        ...(searchKey && { searchKey }),
        ...rest,
    } as TParams & QueryParams;

    const [id, setId] = useState<GridRowId | null>(null);
    const [record, setRecord] = useState<any>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [formOpen, setFormOpen] = useState(false);

    const updatedColumns: (GridColDef & { mobileWidth?: number })[] = useMemo(
        () => [
            ...columns,
            ...(hasActions
                ? [
                      {
                          field: 'actions',
                          headerName: 'Actions',
                          type: 'actions' as const,
                          width: actionsWidth,
                          getActions: ({ id, row }: any) => [
                              ...(actions.includes('custom')
                                  ? [
                                        <Stack
                                            key="actions"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setRecord(row);
                                            }}
                                        >
                                            {renderCustomOption?.({ id, row })}
                                        </Stack>,
                                    ]
                                  : [
                                        <DataGridActions
                                            key="actions"
                                            actions={actions}
                                            onDelete={() => setId(id)}
                                            onEdit={() => {
                                                setRecord(row);
                                                setFormOpen(true);
                                            }}
                                            onOptions={(event: any) => {
                                                setAnchorEl(event.currentTarget);
                                                setRecord(row);
                                            }}
                                        />,
                                    ]),
                          ],
                      },
                  ]
                : []),
        ],
        [columns, hasActions, actionsWidth, actions, renderCustomOption]
    );

    const reset = () => {
        setFormOpen(false);
        if (record) {
            setRecord(null);
        }
    };

    // const totalNumberOfPages = response?.data?.totalCount ? Math.ceil(response?.data?.totalCount / limit) : 1;
    const footer = () => <DataGridFooter loading={false} count={10} />;

    return {
        render: () => (
            <>
                <Box sx={{ borderRadius: 2 }}>
                    <DataGrid
                        {...otherProps}
                        disableRowSelectionOnClick
                        disableColumnMenu={true}
                        columns={utils.customizeGridColumns(updatedColumns)}
                        rows={rows}
                        getRowId={(row) => row?.id ?? row?.order_id ?? row?.no}
                        checkboxSelection={checkboxSelection}
                        onFilterModelChange={({ quickFilterValues }) =>
                            setParams({ searchKey: quickFilterValues?.[0] })
                        }
                        filterMode="client"
                        filterDebounceMs={2000}
                        getRowClassName={({ indexRelativeToCurrentPage }) =>
                            indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
                        }
                        slots={{ footer, toolbar: DataGridToolbar }}
                        slotProps={{
                            toolbar: {
                                onFilter,
                                showSearch,
                                renderAdditionalButtons,
                                ...(hasNew && {
                                    onAdd: () => {
                                        setFormOpen(true);
                                    },
                                }),
                            },
                        }}
                        sx={{
                            '&>.MuiDataGrid-main': {
                                '& .MuiDataGrid-columnHeader': {
                                    backgroundColor: grey[50],
                                },
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    fontWeight: '600',
                                },
                                '& .MuiDataGrid-columnHeader:focus': {
                                    outline: 'none',
                                    border: 'none',
                                },
                                '& .MuiDataGrid-columnHeader:focus-within': {
                                    outline: 'none !important',
                                },
                            },
                            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                                outline: 'none !important',
                            },
                            borderColor: 'transparent',
                        }}
                        showToolbar={true}
                    />
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={Boolean(anchorEl)}
                    onClose={() => {
                        setAnchorEl(null);
                        setRecord(null as any);
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                minWidth: 140,
                                overflow: 'visible',
                                border: 1,
                                borderColor: 'divider',
                                mt: 0.5,
                                borderRadius: 2,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {options?.map((item) => (
                        <Box
                            sx={{
                                paddingX: 1,
                                borderTop: item.error ? 1 : 0,
                                borderColor: 'divider',
                                pt: item.error ? 0.5 : 0,
                                mt: item.error ? 1 : 0,
                            }}
                            key={item.name}
                        >
                            <MenuItem
                                onClick={() => {
                                    setAnchorEl(null);
                                    item.onClick?.(record);
                                }}
                                sx={{
                                    px: 1,
                                    borderRadius: 2,
                                    color: item.error ? 'error.main' : 'inherit',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                                disabled={typeof item.disabled === 'function' ? item.disabled(record) : item.disabled}
                            >
                                {item.icon &&
                                    React.cloneElement(item.icon as any, {
                                        stroke: 'currentColor',
                                        size: 16,
                                    })}
                                <Typography variant="body2" color={item.error ? 'error.main' : 'inherit'}>
                                    {item.name}
                                </Typography>
                            </MenuItem>
                        </Box>
                    ))}
                </Menu>
            </>
        ),
        reset,
        setId,
        record,
        formOpen,
        setRecord,
        queryparams,
        setFormOpen,
    };
};
