export const authResolvers = {
    mutations: {
        login: async (parent: any, args: any, { dataSources }: any) => {
            const payload = {
                EmailOrUsername: args.payload.email,
                password: btoa(args.payload.password),
            };

            console.log(args.payload);

            const response = await dataSources.darajaService.postDataSource({
                api: 'Login/',
                body: payload,
            });

            const token = JSON.parse(response);

            return token;
        },
    },
};
