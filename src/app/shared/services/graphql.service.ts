import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of,Observable } from 'rxjs';
import { switchMap,catchError, map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Store } from '@ngxs/store';
import { SetInitialClaims } from '../../state/app.actions';
import { tap } from 'rxjs/operators';


// Define the Claim interface
interface Claim {
  id: string;
  title: string;
  description: string;
  cursor: string; // Add this line if 'cursor' is a required field
}

@Injectable({
  providedIn: 'root',
})

export class GraphqlService {
  constructor(private apollo: Apollo, private store: Store) {}

  

  // Example query
  getSomeData(): Observable<{ claims: Claim[] }> {
    return this.apollo
      .watchQuery<{ claims: Claim[] }>({
        query: gql`
          query GetClaims {
            claims {
              id
              title
              description
            }
          }
        `,
      })
      .valueChanges.pipe(
        map((result) => result.data || { claims: [] }),
        tap((data) => {
          // Dispatch an action to set the initial state
          this.store.dispatch(new SetInitialClaims(data.claims)); 
        })
      );
  }
 addClaim(title: string, description: string): Observable<Claim | undefined> {
    console .log('Adding Claim:', { title, description});
  
    return this.apollo
      .mutate<{ insert_claims_one: Claim }>({
        mutation: gql`
          mutation AddClaim($title: String!, $description: String!) {
            insert_claims_one(object: { title: $title, description: $description}) {
              id
              title
              description
            }
          }
        `,
        variables: {
          title,
          description,
        },
      })
      .pipe(
        map((result) => {
          console.log('Add result:', result);
  
          const addedClaim = result.data?.insert_claims_one;
  
          if (addedClaim) {
            console.log('Claim added successfully');
  
            // Trigger the subscription update
            this.triggerClaimSubscriptionUpdate();
  
            return addedClaim;
          } else {
            console.error('Error adding claim');
            return undefined;
          }
        }),
        catchError((error) => {
          console.error('Error in addClaim:', error);
          return of(undefined);
        })
      );
  }
  
  
  updateClaim(updatedClaim: any): Observable<Claim | undefined> {
    console.log("Inside updatedClaims", updatedClaim);
    return this.apollo
      .mutate<{ updateClaim: Claim }>({
        mutation: gql`
          mutation UpdateTodo($id: Int!, $title: String!, $description: String! ) {
            update_claims(
              where: { id: { _eq: $id } }
              _set: { title: $title, description: $description }
            ) {
              affected_rows
              returning {
                id
                title
                description
              }
            }
          }
        `,
        variables: {
          id: updatedClaim.id,
          title: updatedClaim.title,
          description: updatedClaim.description,

        },
      })
      .pipe(
        switchMap(() => {
          // Trigger the subscription update
          this.triggerClaimSubscriptionUpdate();
         
          return this.claimSubscription();
        }),
        map((claims) => claims && claims[0])
      );
  }
  
  deleteClaim(claimId: string): Observable<{ id: string } | undefined> {
    // console.log('Deleting claim with id:', claimId);
  
    return this.apollo
      .mutate<{ delete_claims: { affected_rows: number } }>({
        mutation: gql`
          mutation DeleteClaim($id: Int) {
            delete_claims(where: { id: { _eq: $id } }) {
              affected_rows
              returning {
                id
              }
            }
          }
        `,
        variables: {
          id: parseInt(claimId, 10), // Convert to integer if needed
        },
      })
      .pipe(
        map((result) => {
          console.log('Delete result:', result);
  
          if (result.data?.delete_claims?.affected_rows) {
            console.log('Claim deleted successfully');
  
            // Trigger the subscription update
            this.triggerClaimSubscriptionUpdate();
  
            return { id: claimId };
          } else {
            console.error('Error deleting claim');
            return undefined;
          }
        }),
        catchError((error) => {
          console.error('Error in deleteClaim:', error);
          return of(undefined);
        })
      );
  }
  
  // Add a method to trigger claim subscription update
  private triggerClaimSubscriptionUpdate(): void {
    this.apollo.getClient().reFetchObservableQueries();
  }
  claimSubscription(): Observable<Claim[]> {
    const initialCursor = {
      id: 0, // Set an appropriate initial value based on your data
    };
  
    return this.apollo
      .subscribe<{ claims_stream: Claim[] }>({
        query: gql`
          subscription($initialCursor: claims_stream_cursor_value_input!) {
            claims_stream(batch_size: 10, cursor: { initial_value: $initialCursor, ordering: ASC }) {
              id
              title
              description
              cursor: id
            }
          }
        `,
        variables: {
          initialCursor,
        },
      })
      .pipe(
        map((result) => result.data?.claims_stream || []),
        catchError((error) => {
          console.error('Subscription error:', error);
          return of([]);
        })
      );
  }
  
  
  

  // Method to trigger claim subscription update
  triggerUpdate(): void {
    this.triggerClaimSubscriptionUpdate();
  }
}
