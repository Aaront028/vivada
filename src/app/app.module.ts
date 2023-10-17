import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module'; 
import { AppState } from './state/app.state'; 
import { NgxsModule } from '@ngxs/store';
import { GraphqlService } from './services/graphql.service';
//Keycloak imports
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


function initializeKeycloak(keycloak: KeycloakService) {
  console.log("initialized",initializeKeycloak );
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'myrealm',
        clientId: 'myclient'
      },
      initOptions: {
        onLoad: 'login-required',
        flow: 'standard',
    }
    });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GraphQLModule,
    AppRoutingModule,
    NgxsModule.forRoot([AppState]),
    KeycloakAngularModule,
  ],
  providers: [
    GraphqlService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


