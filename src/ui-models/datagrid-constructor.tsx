import { GridProps } from '@/types/datagrid';
import GridModel from './datagrid-model';

export const gridConstructor = class<TData, TParams> {
    public config: {
        grid: GridProps<TData, TParams>;
    };

    constructor(config: { grid: GridProps<TData, TParams> }) {
        this.config = config;
    }

    grid() {
        return GridModel({ ...this.config.grid });
    }
};
