import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module'; 
import { AppState } from './state/app.state'; 
import { NgxsModule } from '@ngxs/store';
import { GraphqlService } from './services/graphql.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
  ],
  providers: [GraphqlService],
  bootstrap: [AppComponent]
})
export class AppModule { }


