import { Contact } from '../shared/model/contact.model';

export class SetInitialContacts {
  static readonly type = '[App] Set Initial Contacts';
  constructor(public payload: Contact[]) {}
}

export class AddContact {
  static readonly type = '[App] Add Contact';
  constructor(public payload: Contact) {}
}

export class EditContact {
  static readonly type = '[App] Edit Contact';
  constructor(public payload: Contact) {}
}

export class UpdateContact {
  static readonly type = '[Contact] Update';
  constructor(public payload: Contact) {}
}
