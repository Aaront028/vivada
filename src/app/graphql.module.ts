import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
// service.ts
import * as dotenv from 'dotenv';
dotenv.config();

// Your service logic
const uri = process.env['API_URL'] || 'default-api-url';
const adminSecret = process.env['HASURA_ADMIN_SECRET'] || 'default-admin-secret';

// const uri = environment.apiUrl;
// const adminSecret = environment.hasuraAdminSecret;

console.log("URI", uri);
console.log("Admin Secret", adminSecret);


export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // Create HttpHeaders
  const headers = new HttpHeaders().set('x-hasura-admin-secret', adminSecret);

  // HTTP Link
  const http = httpLink.create({
    uri,
    headers,
  });

  // WebSocket Link
  const ws = new WebSocketLink({
    uri: uri.replace('http', 'ws'), // Adjust the WebSocket URL accordingly
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
