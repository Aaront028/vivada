import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Claim } from '../../../model/claim.model';
import { AppState, AppStateModel } from '../../../../state/app.state';
import { UpdateClaim } from '../../../../state/app.actions';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.scss']
})
export class ClaimDetailsComponent {
  editing: boolean = false;
  editedTitle: string = '';
  editedDescription: string = '';
 
  @Input() isEditing: boolean = false;
  

  ngOnChanges() {

    if (this.claim) {
      console.log('Input Claim:', this.claim);
    }
  }

  
  constructor(private store: Store) {}
  @Input() claim: Claim = new Claim('', '', '');
  @Input() circle: any;
  @Select(AppState) appState$: Observable<AppStateModel> | undefined;
  @Output() claimUpdated = new EventEmitter<Claim>();

  calculateRows(): number {
    
    const lineCount = this.editedDescription.split('\n').length;
    const minRows = 3;
    const maxRows = 10;
    console.log(Math.min(Math.max(lineCount, minRows), maxRows))
    return Math.min(Math.max(lineCount, minRows), maxRows);
  }

  startEditing() {
    this.editing = true;
    this.editedTitle = this.claim.title;
    this.editedDescription = this.claim.description;
  }


  stopEditing() {
    console.log('stopEditing function called');
    console.log('Original claim:', this.claim);
    
    // Construct the updated claim object based on your logic
    const updatedClaim: Claim = {
      id: this.claim.id,
      title: this.editedTitle,
      description: this.editedDescription,

    };
  
    console.log('Edited Claim:', updatedClaim);
  
    // Add a log for debugging
    console.log('Before conditional check:', {
      'claim.name': this.claim.title,
      'editedName': this.editedTitle,
      'claim.description': this.claim.description,
      'editedDescription': this.editedDescription,
    });
  
    if (
      this.claim.title !== this.editedTitle ||
      this.claim.description !== this.editedDescription
    ) {
      console.log('Condition is true');
      // Dispatch the UpdateClaim action with the updatedClaim
      console.log('Before dispatch:', updatedClaim);
  
      try {
        this.store.dispatch(new UpdateClaim(updatedClaim));
        console.log('Dispatch successful');
      } catch (error) {
        console.error('Dispatch error:', error);
      }
  
      console.log('After dispatch');
      // Emit the updated claim
      this.claimUpdated.emit(updatedClaim);
    } else {
      console.log('Condition is false');
    }
  
    console.log('After conditional check');
    console.log('End of stopEditing function');
  }
  
  
  getCircleTitle(circle: any): string {
    try {
      const parsedCircle = JSON.parse(circle.title);
      return parsedCircle.label;
    } catch (error) {
      console.error('Error parsing circle title:', error);
      return '';
    }
  }
}
