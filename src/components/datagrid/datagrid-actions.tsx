import { GridActionsCellItem } from '@mui/x-data-grid';
import { DataGridActionsProps } from '@/types/datagrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { JSX } from 'react';

const DataGridActions = ({ onEdit, onDelete, onOptions, actions = ['edit', 'delete'] }: DataGridActionsProps) => {
    const actionComponents: {
        name: 'edit' | 'delete' | 'options';
        component: () => JSX.Element;
    }[] = [
        {
            name: 'edit' as const,
            component: () => (
                <GridActionsCellItem key="edit" label="Edit" icon={<EditIcon color="success" />} onClick={onEdit} />
            ),
        },
        {
            name: 'delete' as const,
            component: () => (
                <GridActionsCellItem
                    key="delete"
                    label="Delete"
                    icon={<DeleteIcon color="error" />}
                    onClick={onDelete}
                />
            ),
        },
        {
            name: 'options' as const,
            component: () => (
                <GridActionsCellItem
                    key="options"
                    label="options"
                    icon={<MoreVertIcon color="primary" />}
                    onClick={onOptions}
                />
            ),
        },
    ].filter(({ name }) => actions.includes(name));

    return actionComponents.map(({ component }) => component());
};

export default DataGridActions;
