
import React from 'react';

import Stack from './routes/stack'
import { AppRegistry } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
const gql = require('graphql-tag')


const { createUploadLink } = require('apollo-upload-client')


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
  link: createUploadLink({uri:'http://3.121.231.129/graphql'}),
  cache: new InMemoryCache(),
 
});
client.mutate


 
export default  function App()
{
  // try {
  //   const result = await Expo.Google.logInAsync({
  //     androidClientId:
  //       "958107754062-7k7462lh98jto3u4cgthcm9f31jbikmv.apps.googleusercontent.com",
  //     //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
  //     scopes: ["profile", "email"]
  //   })
  // }
  //   catch (e) {
  //     console.log("error", e)
  //   }



  return (
    <ApolloProvider client={client}>
      <Stack/>
    </ApolloProvider>
   

  );
 

}
AppRegistry.registerComponent('Cam', () => App);

