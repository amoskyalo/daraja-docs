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

export type DataGridActionsProps = {
    actions?: Array<'edit' | 'delete' | 'options' | 'custom'>;
    onEdit?: () => void;
    onDelete?: () => void;
    onOptions?: (args: any) => void;
};

export type QueryParams = {
    searchkey: string;
    limit: number;
    start: number;
};
