import { ClaimNumber } from './claim-number.model';
/**
 * Model class TenClaimLines
 * Path: screenbean/eobrepl
 * Model: com::uhc::aarp::fox::domain::screenbean::eobrepl::TenClaimLines
 * Legacy Mapping: FILLER
 */
export class TenClaimLines {
  repInd = '';
  claimNumberL = 0;
  claimNumberA = '';
  claimNumber = new ClaimNumber();
  eobType = '';
  clStatus = '';
  stDate = '';
  serviceFromDate = '';
  serviceToDate = '';
  benAmount = '';
  assigned = '';
  combined = '';
}
