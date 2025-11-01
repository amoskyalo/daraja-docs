import { mergeTypeDefs } from '@graphql-tools/merge';
import { Blogs } from './_blogs';
import { Respositories } from './_respositories';
import { Auth } from './_auth';
import { Apps } from './_apps';

const types = [Blogs, Respositories, Auth, Apps];

export const typeDefs = mergeTypeDefs(types);
