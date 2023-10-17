import { Component, Input, OnInit } from '@angular/core';
import { Contact } from './model/contact.model';
import { GraphqlService } from './services/graphql.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  newContactName = '';
  newContactEmail = '';
  newContactPhone = '';
  data$!: Observable<any>;

  contacts: Contact[] = [];
  keycloak: any;

  constructor(private graphqlService: GraphqlService) {}


  ngOnInit(): void {
    this.data$ = this.graphqlService.getSomeData();
    this.data$.subscribe(data => console.log("hello",data));

    this.graphqlService.contactSubscription().subscribe({
      next: (data) => {
        // Handle the updated data, e.g., update your contacts list
        this.contacts = data;
      },
      error: (error) => {
        console.error('Subscription error:', error);
      },
    });
    
  }

  toggleDetails(contact: Contact): void {
    console.log('Selected Contact:', contact);
  }

  addContact() {
    this.graphqlService.addContact(
      this.newContactName,
      this.newContactEmail,
      this.newContactPhone
    ).subscribe({
      next: (addedContact) => {
        if (addedContact) {
          console.log('Contact added successfully:', addedContact);
          // Clear the form fields after successful addition
          this.newContactName = '';
          this.newContactEmail = '';
          this.newContactPhone = '';
        } else {
          console.error('Error adding contact');
        }
      },
      error: (error) => {
        console.error('Add contact error:', error);
      },
    });
  }

  

  // contacts.component.ts
updateContact(updatedContact: Contact): void {
  this.graphqlService.updateContact(updatedContact)
    .subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error)

    });
}



  

deleteContact(contact: Contact): void {
  console.log("This is inside the contacts component with deleteContact()");


  //   this.graphqlService.deleteContact(this.selectedContact.id)
  //     .subscribe(result => {
  //       console.log('Mutation result:', result);
  //     });

}

}