import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateContact } from './app.actions';
import { Contact } from '../model/contact.model';

export class AppStateModel {
  contacts: Contact[] =[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    contacts: [],
  },
})
export class AppState {
  @Action(UpdateContact)
  updateContact(ctx: StateContext<AppStateModel>, action: UpdateContact) {
    console.log('UpdateContact Action Dispatched', action.payload);

    const state = ctx.getState();
    const updatedContact = action.payload;

    console.log("updatedContacts", updatedContact);
    // Find the index of the contact to update by comparing ids
    const index = state.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
        // Update the contact in the array
        const updatedContacts = [...state.contacts];
        updatedContacts[index] = updatedContact;

        // Update the state with the new contacts array
        ctx.patchState({
            contacts: updatedContacts,
        });

        console.log('Contact updated. New state:', ctx.getState());
    } else {
        console.error('Contact not found for update. State:', state, 'Contact:', updatedContact);
    }
}



}

