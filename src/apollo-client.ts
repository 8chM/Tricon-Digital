import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';

const GRAPHQL_ENDPOINT = import.meta.env.VITE_APPSYNC_URL!;
const API_KEY          = import.meta.env.VITE_APPSYNC_API_KEY!;

const client = new ApolloClient({
  link: createHttpLink({
    uri: GRAPHQL_ENDPOINT,
    headers: {
      'x-api-key': API_KEY,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
export { gql };
