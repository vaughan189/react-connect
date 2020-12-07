import React from 'react';
import './App.css';
import Index from './components/Index';
import { withRouter } from "react-router-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from 'apollo-link-ws';
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: { reconnect: true },
});

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql', // Apollo Server is served from port 4000
  headers: {
      "keep-alive": "true"
  }
})

const terminatingLink = split(({ query }: any) => {
  const definition = getMainDefinition(query);
  return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription')
},
  wsLink,
  uploadLink
);

const link = ApolloLink.from([terminatingLink]);
const cache = new InMemoryCache();
export const client = new ApolloClient({link, cache});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Index />
      </div>
    </ApolloProvider>
  );
}

export default withRouter(App);
