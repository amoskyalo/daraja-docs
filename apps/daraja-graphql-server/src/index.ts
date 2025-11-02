import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs } from './typeDefs';
import { DataSource } from './datasources';
import { resolvers } from './resolvers';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';

dotenv.config();

const hashnode_base_url = process.env.HASHNODE_APIS_BASE_URL;
const dev_to_base_url = process.env.DEVTO_APIS_BASE_URL;
const github_base_url = process.env.GITHUB_BASE_URL;
const github_token = process.env.GITHUB_API_KEY;
const base_url = process.env.BASE_URL;

async function startApolloServer(typeDefs: any, resolvers: any) {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    console.log(base_url)

    app.use(
        cors({
            origin: "*",
            credentials: false,
        }),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const token = req?.headers?.authorization;
                return {
                    dataSources: {
                        darajaService: new DataSource({
                            baseURL: base_url as any,
                            token: token as any,
                        }),
                        hashnodeService: new DataSource({
                            baseURL: hashnode_base_url as any,
                            token: token as any,
                        }),
                        devToService: new DataSource({
                            baseURL: dev_to_base_url as any,
                            token: token as any,
                        }),
                        githubService: new DataSource({
                            baseURL: github_base_url as any,
                            token: github_token as any,
                        }),
                    },
                    token,
                };
            },
        })
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000`);
}

startApolloServer(typeDefs, resolvers);
