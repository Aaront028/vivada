import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module'; 
import { AppState } from './state/app.state'; 
import { NgxsModule } from '@ngxs/store';
import { GraphqlService } from './services/graphql.service';
import { LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { LanguageService } from './services/language.service';
import { TranslatePipe } from './pipes/translate.pipe';

import localeEn from '@angular/common/locales/en';
import localeHi from '@angular/common/locales/hi';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';

registerLocaleData(localeEn);
registerLocaleData(localeHi);

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
  ],
  providers: [
    GraphqlService,
    LanguageService,
    { provide: LOCALE_ID, useValue: 'en' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


