import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GraphQLModule } from './graphql.module'; 
import { AppState } from './state/app.state'; 
import { NgxsModule } from '@ngxs/store';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { GraphqlService } from './shared/services/graphql.service';
import { environment } from 'src/environments/environment';
//language imports
import { LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { LanguageService } from './shared/services/language.service';

import { TranslatePipe } from './shared/pipes/translate.pipe';
import localeEn from '@angular/common/locales/en';
import localeHi from '@angular/common/locales/hi';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';

registerLocaleData(localeEn);
registerLocaleData(localeHi);


function initializeKeycloak(keycloak: KeycloakService) {
  console.log("initialized",initializeKeycloak );
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: environment.realm,
        clientId: environment.clientId
      },
      initOptions: {
        onLoad: 'login-required',
        flow: 'standard',
    }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    LanguageSwitcherComponent,
    TranslatePipe
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


