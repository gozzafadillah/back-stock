import { split, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "https://outgoing-snake-72.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "SAfvSKPDYLMhCtDNZKjRo5KM85nsLBiFYSrBWGNBq7yKuxsLwX4Z8dHuvY6QsKqu",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://outgoing-snake-72.hasura.app/v1/graphql",
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "SAfvSKPDYLMhCtDNZKjRo5KM85nsLBiFYSrBWGNBq7yKuxsLwX4Z8dHuvY6QsKqu",
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
