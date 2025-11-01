import { blogsResolvers } from './_blogs';
import { repositoriesResolvers } from './_repositories';
import { authResolvers } from './_auth';
import { appsResolvers } from './_apps';

export const resolvers = {
    Query: {
        ...blogsResolvers.queries,
        ...repositoriesResolvers.queries,
    },
    Mutation: {
        ...authResolvers.mutations,
        ...appsResolvers.mutations,
    },
};
