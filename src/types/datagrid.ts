import { DataGridProps, GridColDef } from '@mui/x-data-grid';
import { ReactNode } from 'react';
import { urls } from '@/api/urls';

export type DataGridToolbarProps = {
    onAdd?: () => void;
    onFilter?: () => void;
    showSearch?: boolean;
    renderAdditionalButtons?: () => React.ReactNode;
};

export type DataGridFooterProps = {
    loading?: boolean;
    count?: number;
};

export type DataGridRowEditActionsProps = {
    id: string | number;
    isEditMode: boolean;
    saving?: boolean;
    handleSaveClick: (arg: string | number) => void;
    handleCancelClick: (arg: string | number) => void;
    handleEditClick: (arg: string | number) => void;
    handleDeleteClick: (arg: string | number) => void;
};

export type DataGridActionsProps = {
    actions?: Array<'edit' | 'delete' | 'options' | 'custom'>;
    onEdit?: () => void;
    onDelete?: () => void;
    onOptions?: (args: any) => void;
};

export type GridProps<TData, TParams> = Omit<DataGridProps, 'columns'> &
    DataGridToolbarProps &
    DataGridFooterProps & {
        openFormOnNewPage?: boolean;
        hasNew?: boolean;
        hasActions?: boolean;
        apiConfig: {
            getApi: keyof typeof urls;
            deleteApi?: keyof typeof urls;
        };
        columns: (GridColDef & { mobileWidth?: number })[];
        params?: TParams;
        dataKey?: keyof TData;
        actions?: Array<'edit' | 'delete' | 'options' | 'custom'>;
        options?: { name: string; onClick: (args: any) => void; icon?: ReactNode }[];
        actionsWidth?: number;
        hideToolbar?: boolean;
        searchParams?: string[];
        renderAddButton?: () => React.ReactNode;
        renderCustomOption?: (args: { id: string; row: any }) => ReactNode;
    };

export type QueryParams = {
    searchkey: string;
    limit: number;
    start: number;
};
