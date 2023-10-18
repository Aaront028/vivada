import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of,Observable } from 'rxjs';
import { switchMap,catchError, map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Store } from '@ngxs/store';
import { SetInitialContacts } from '../../state/app.actions';
import { tap } from 'rxjs/operators';


// Define the Contact interface
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  cursor: string; // Add this line if 'cursor' is a required field
}

@Injectable({
  providedIn: 'root',
})

export class GraphqlService {
  constructor(private apollo: Apollo, private store: Store) {}

  

  // Example query
  getSomeData(): Observable<{ contacts: Contact[] }> {
    return this.apollo
      .watchQuery<{ contacts: Contact[] }>({
        query: gql`
          query GetContacts {
            contacts {
              id
              name
              email
              phone
            }
          }
        `,
      })
      .valueChanges.pipe(
        map((result) => result.data || { contacts: [] }),
        tap((data) => {
          // Dispatch an action to set the initial state
          this.store.dispatch(new SetInitialContacts(data.contacts)); 
        })
      );
  }
  addContact(name: string, email: string, phone: string): Observable<Contact | undefined> {
    // console.log('Adding contact:', { name, email, phone });
  
    return this.apollo
      .mutate<{ insert_contacts_one: Contact }>({
        mutation: gql`
          mutation AddContact($name: name!, $email: String!, $phone: String!) {
            insert_contacts_one(object: { name: $name, email: $email, phone: $phone }) {
              id
              name
              email
              phone
            }
          }
        `,
        variables: {
          name,
          email,
          phone,
        },
      })
      .pipe(
        map((result) => {
          // console.log('Add result:', result);
  
          const addedContact = result.data?.insert_contacts_one;
  
          if (addedContact) {
            console.log('Contact added successfully');
  
            // Trigger the subscription update
            this.triggerContactSubscriptionUpdate();
  
            return addedContact;
          } else {
            // console.error('Error adding contact');
            return undefined;
          }
        }),
        catchError((error) => {
          // console.error('Error in addContact:', error);
          return of(undefined);
        })
      );
  }
  
  
  updateContact(updatedContact: any): Observable<Contact | undefined> {
    console.log("Inside updatedContact", updatedContact);
    return this.apollo
      .mutate<{ updateContact: Contact }>({
        mutation: gql`
          mutation UpdateTodo($id: Int!, $name: name!, $email: String! ) {
            update_contacts(
              where: { id: { _eq: $id } }
              _set: { name: $name, email: $email }
            ) {
              affected_rows
              returning {
                id
                name
                email
              }
            }
          }
        `,
        variables: {
          id: updatedContact.id,
          name: updatedContact.name,
          email: updatedContact.email,
        },
      })
      .pipe(
        switchMap(() => {
          // Trigger the subscription update
          this.triggerContactSubscriptionUpdate();
         
          return this.contactSubscription();
        }),
        map((contacts) => contacts && contacts[0])
      );
  }
  
  deleteContact(contactId: string): Observable<{ id: string } | undefined> {
    // console.log('Deleting contact with id:', contactId);
  
    return this.apollo
      .mutate<{ delete_contacts: { affected_rows: number } }>({
        mutation: gql`
          mutation DeleteContact($id: Int) {
            delete_contacts(where: { id: { _eq: $id } }) {
              affected_rows
              returning {
                id
              }
            }
          }
        `,
        variables: {
          id: parseInt(contactId, 10), // Convert to integer if needed
        },
      })
      .pipe(
        map((result) => {
          console.log('Delete result:', result);
  
          if (result.data?.delete_contacts?.affected_rows) {
            console.log('Contact deleted successfully');
  
            // Trigger the subscription update
            this.triggerContactSubscriptionUpdate();
  
            return { id: contactId };
          } else {
            console.error('Error deleting contact');
            return undefined;
          }
        }),
        catchError((error) => {
          console.error('Error in deleteContact:', error);
          return of(undefined);
        })
      );
  }
  
  // Add a method to trigger contact subscription update
  private triggerContactSubscriptionUpdate(): void {
    this.apollo.getClient().reFetchObservableQueries();
  }
  contactSubscription(): Observable<Contact[]> {
    const initialCursor = {
      id: 0, // Set an appropriate initial value based on your data
    };
  
    return this.apollo
      .subscribe<{ contacts_stream: Contact[] }>({
        query: gql`
          subscription($initialCursor: contacts_stream_cursor_value_input!) {
            contacts_stream(batch_size: 10, cursor: { initial_value: $initialCursor, ordering: ASC }) {
              id
              name
              email
              phone
              cursor: id
            }
          }
        `,
        variables: {
          initialCursor,
        },
      })
      .pipe(
        map((result) => result.data?.contacts_stream || []),
        catchError((error) => {
          console.error('Subscription error:', error);
          return of([]);
        })
      );
  }
  
  
  

  // Method to trigger contact subscription update
  triggerUpdate(): void {
    this.triggerContactSubscriptionUpdate();
  }
}
