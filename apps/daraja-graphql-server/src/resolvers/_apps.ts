export const appsResolvers = {
    queries: {
        getMyApps: async (_: any, __: any, { dataSources, token }: any) => {
            const response = await dataSources.darajaService.postDataSource({
                api: 'GetApps/',
                body: {
                    token,
                },
            });

            return {
                apps: response[1],
            };
        },
    },

    mutations: {
        createApp: async (_: any, args: any, { dataSources, token }: any) => {
            const response = await dataSources.darajaService.postDataSource({
                api: 'SandboxApps/CreateApp/',
                body: {
                    token,
                    ...args.payload,
                },
            });

            return response.dataset;
        },

        deleteApp: async (_: any, args: any, { dataSources, token }: any) => {
            const body = {
                token,
                AppName: args.AppName,
            };

            console.log(body);
            const response = await dataSources.darajaService.postDataSource({
                api: 'SandboxApps/DeleteApp/',
                body,
            });

            return response;
        },
    },
};
