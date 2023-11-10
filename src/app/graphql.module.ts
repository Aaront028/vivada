import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { environment } from '../environments/environment';


const uri = environment.apiUrl;
environment.testMessage && console.log(environment.testMessage);

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const http = httpLink.create({
    uri,

  });

  const ws = new WebSocketLink({
    uri: uri ? uri.replace("http", "ws") : '',
    options: {
      reconnect: true,
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
