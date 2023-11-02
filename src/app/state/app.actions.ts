import { Claim } from '../shared/model/claim.model';

export class SetInitialClaims {
  static readonly type = '[App] Set Initial Claim';
  constructor(public payload: Claim[]) {}
}

export class AddClaim {
  static readonly type = '[App] Add Claim';
  constructor(public payload: Claim) {}
}

export class EditClaim {
  static readonly type = '[App] Edit Claim';
  constructor(public payload: Claim) {}
}

export class UpdateClaim {
  static readonly type = '[Claim] Update';
  constructor(public payload: Claim) {}
}
