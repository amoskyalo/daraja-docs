import { DataGridProps, GridColDef } from '@mui/x-data-grid';
import { ReactNode } from 'react';

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

export type GridProps<TData, TParams> = Omit<DataGridProps, 'columns'> &
    DataGridToolbarProps &
    DataGridFooterProps & {
        openFormOnNewPage?: boolean;
        hasNew?: boolean;
        hasActions?: boolean;
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
