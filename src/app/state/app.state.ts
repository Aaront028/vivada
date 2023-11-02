import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateClaim } from './app.actions';
import { Claim } from '../shared/model/claim.model';

export class AppStateModel {
  claims: Claim[] =[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    claims: [],
  },
})
export class AppState {
  @Action(UpdateClaim)
  updateClaim(ctx: StateContext<AppStateModel>, action: UpdateClaim) {
    console.log('UpdateClaim Action Dispatched', action.payload);

    const state = ctx.getState();
    const updatedClaim = action.payload;

    console.log("updatedClaims HERE", updatedClaim);
    // Find the index of the claim to update by comparing ids
    const index = state.claims.findIndex(c => c.id === updatedClaim.id);
    if (index !== -1) {
      console.log("updatedClaims IF STATEMENT", updatedClaim);
        // Update the claim in the array
        const updatedClaims = [...state.claims];
        updatedClaims[index] = updatedClaim;

        // Update the state with the new claims array
        ctx.patchState({
            claims: updatedClaims,
        });

        console.log('Claim updated. New state:', ctx.getState());
    } else {
        console.error('Claim not found for update. State:', state, 'Claim:', updatedClaim);
    }
}



}

