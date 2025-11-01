import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';

export type Args = {
    body: any;
    api: string;
    id: string;
    params: any;
};

class DataSource extends RESTDataSource {
    private readonly token: string;

    constructor(options: { token: string; baseURL: string }) {
        super();
        this.baseURL = options.baseURL;
        this.token = options.token ?? "";
    }

    async queryDataSource({ id, api, params }: Omit<Args, 'body'>) {
        const url = id ? `${api}/${id}` : api;

        return this.get(url, { params });
    }

    async postDataSource({ body, api, params, id }: Args) {
        const url = id ? `${api}/${id}` : api;
        return this.post(url, { body, params });
    }

    async updateDataSource({ body, api, id }: Omit<Args, 'params'>) {
        return this.put(`${api}/${id}`, { body });
    }

    async patchDataSource({ body, api, id }: Omit<Args, 'params'>) {
        return this.patch(`${api}/${id}`, { body });
    }

    async customUpdateDataSource({ body, api }: Omit<Args, 'params'>) {
        return this.patch(api, { body });
    }

    async deleteDataSource({ id, api }: Omit<Args, 'body' | 'params'>) {
        const url = `${api}/${id}`;
        return this.delete(url);
    }

    override willSendRequest(path: string, request: AugmentedRequest) {
        request.headers['Authorization'] = `Bearer ${this.token}`;
    }
}

export { DataSource };