export type APIResponse<TData> = {
    status: boolean;
    message: string;
    data: TData;
};

export type MutationParams<TData, TParams> = {
    data?: TData;
    params?: TParams;
    url: string;
    id?: string | number | null;
};

export type GetParams<TData, TParams> = {
    url: string;
    params?: TParams;
    id?: string | number | null;
};
