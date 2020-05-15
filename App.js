
import React from 'react';

import Stack from './routes/stack'
import { AppRegistry } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';


const httpLink =  new HttpLink({
  uri: 'http://3.121.231.129/graphql',
});
const defaultOptions= {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}


const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions
});
export default function App()
{



  return (
    <ApolloProvider client={client}>
      <Stack/>
    </ApolloProvider>
   

  );
 

}
AppRegistry.registerComponent('Cam', () => App);

