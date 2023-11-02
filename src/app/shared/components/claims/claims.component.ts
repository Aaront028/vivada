import { Component, Input, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Claim } from '../../model/claim.model'
import { GraphqlService } from '../../services/graphql.service';
import { Observable } from 'rxjs';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent {
  selectedClaim: Claim | null = null;
  addBtnClicked: boolean = false;
  isEditing: boolean = false;

  newClaimTitle = '';
  newClaimDescription = '';
  data$!: Observable<any>;

  claims: Claim[] = [];

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private graphqlService: GraphqlService,
    private languageService: LanguageService,
    )
    {
      this.languageService.setCurrentLanguage(locale);
    }

    login() {
    }

    logout() {
   }

    isLoggedIn() {
    }

  ngOnInit(): void {
    this.data$ = this.graphqlService.getSomeData();
    this.data$.subscribe(data => console.log("hello",data));

    this.graphqlService.claimSubscription().subscribe({
      next: (data) => {
        // Handle the updated data, e.g., update your claims list
        this.claims = data;
      },
      error: (error) => {
        console.error('Subscription error:', error);
      },
    });
    
  }

  toggleDetails(claim: Claim): void {
    console.log('Selected Claim:', claim);
    
    if (this.selectedClaim === claim) {
      this.selectedClaim = null;
    } else {
      this.selectedClaim = claim;
    }
  }
  addClaim() {
    console.log("This is the addCLaim with this.newClaimTitle: ",this.newClaimTitle);
    this.graphqlService.addClaim(
      this.newClaimTitle,
      this.newClaimDescription
    ).subscribe({
      next: (addedClaim) => {
        console.log("added claims", addedClaim);
        if (addedClaim) {
          console.log('Claim added successfully:', addedClaim);
          // Clear the form fields after successful addition
          this.newClaimTitle = '';
          this.newClaimDescription = '';

        } else {
          console.error('Error adding claim');
        }
      },
      error: (error) => {
        console.error('Add claim error:', error);
      },
    });
  }
  
  updateClaim(updatedClaim: Claim): void {
    this.graphqlService.updateClaim(updatedClaim)
      .subscribe({
        next: (result) => console.log(result),
        error: (error) => console.log(error)
  
      });
  }
  
  
  
  addNewClaimBtn() {
    this.addBtnClicked = !this.addBtnClicked;
  }

  ifEditing() {
    this.isEditing = !this.isEditing;
  }

 

deleteClaim(claim: Claim): void {
  console.log("This is inside the claims component with deleteClaim()");

  if (this.selectedClaim) {
    this.graphqlService.deleteClaim(this.selectedClaim.id)
      .subscribe(result => {
        console.log('Mutation result:', result);
      });
  }

  if (this.selectedClaim === claim) {
    this.selectedClaim = null;
  }
}

}
