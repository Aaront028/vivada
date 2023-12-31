import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
console.log("this is inside the module");

const uri = environment.apiUrl;
const adminSecret = environment.hasuraAdminSecret;
console.log(environment.apiUrl);
console.log("URI",uri);

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // Create HttpHeaders
  const headers = new HttpHeaders().set("x-hasura-admin-secret", adminSecret || '');

  // HTTP Link
  const http = httpLink.create({
    uri,
    headers,
  });

  // WebSocket Link
  const ws = new WebSocketLink({
    uri: uri ? uri.replace("http", "ws") : '', // Adjust the WebSocket URL accordingly
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          'x-hasura-admin-secret': adminSecret,
        },
      },
    },
  });


  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    ws,
    http,
  );

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
