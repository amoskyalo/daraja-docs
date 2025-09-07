import { GridColDef, GridRowId, DataGrid } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from '@/hooks/useSearchParams';
import DataGridActions from '@/components/datagrid/datagrid-actions';
import DeleteDialog from '@/components/dialogs/dlete-dialog';
import { GridProps, QueryParams } from '@/types/datagrid';
import { MenuDialog } from '@/components/dialogs/menu-dialog';
import { Box, ListItemIcon, ListItemText, MenuItem, Stack } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import DataGridToolbar from '@/components/datagrid/datagrd-toolbar';
import DataGridFooter from '@/components/datagrid/datagrid-footer';
import { utils } from '@/utils';

declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        onAdd?: () => void;
        onFilter?: () => void;
        showSearch?: boolean;
        renderAdditionalButtons?: () => React.ReactNode;
    }
}

const GridModel = <TData, TParams>(props: GridProps<TData, TParams>) => {
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
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        if (record) {
            const updatedRecord = rows?.find((item: any) => item.id === record.id);
            setRecord(updatedRecord);
        }
    }, [rows, record]);

    const handleDelete = () => {
        setDeleteLoading(true);
        // deleteRecord({
        //     variables: { url: deleteApi, id },
        //     ...utils.onComplete({
        //         successCallback: () => {
        //             refetch();
        //             setId(null);
        //         },
        //     }),
        // });
    };

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
                              ...(!actions.includes('custom')
                                  ? [
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
                                    ]
                                  : [
                                        <Stack
                                            key="actions"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setRecord(row);
                                            }}
                                        >
                                            {renderCustomOption?.({ id, row })}
                                        </Stack>,
                                    ]),
                          ],
                      },
                  ]
                : []),
        ],
        [columns, hasActions, actionsWidth, actions, renderCustomOption],
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
                        filterMode="server"
                        filterDebounceMs={2000}
                        getRowClassName={({ indexRelativeToCurrentPage }) =>
                            indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
                        }
                        slots={{ footer, ...(!hideToolbar && { toolbar: DataGridToolbar }) }}
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
                    />
                </Box>

                <DeleteDialog
                    open={Boolean(id)}
                    onCancel={() => setId(null)}
                    loading={deleteLoading}
                    onOkay={handleDelete}
                />

                <MenuDialog anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                    {options?.map(({ name, icon, onClick }) => (
                        <MenuItem
                            key={name}
                            color="error"
                            sx={{ color: name.toLowerCase() === 'delete' ? red[900] : 'default' }}
                            onClick={() => {
                                if (name.toLowerCase() === 'delete') {
                                    setAnchorEl(null);
                                    setId(record.id);
                                } else {
                                    setAnchorEl(null);
                                    onClick(record);
                                }
                            }}
                        >
                            {icon && <ListItemIcon>{icon}</ListItemIcon>}
                            <ListItemText color="error">{name}</ListItemText>
                        </MenuItem>
                    ))}
                </MenuDialog>
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

export default GridModel;
