import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { GraphQLModule } from './graphql.module'; // import the GraphQLModule
// import { AppState } from './state/app.state'; 
// import { NgxsModule } from '@ngxs/store';
// import { GraphqlService } from '@app/services/graphql.service';

// import { AppComponent } from './app.component';
// import { ContactsComponent } from './contacts/contacts.component';
// import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
// import { HeaderComponent } from './header/header.component';


// @NgModule({
//   declarations: [
//     AppComponent,
//     ContactsComponent,
//     ContactDetailsComponent,
//     HeaderComponent
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule,
//     HttpClientModule,
//     GraphQLModule,
//     NgxsModule.forRoot([AppState]),
//   ],
//   providers: [
//     GraphqlService,
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
