import {GraphQLClient} from 'graphql-request';
import {tokenModule} from '@/store/modules/Token';

const url = 'https://picross.aifedespaix.com/';

export const graphqlClient = new GraphQLClient(url, {
  headers: {
    Authorization: tokenModule.token,
  },
});
