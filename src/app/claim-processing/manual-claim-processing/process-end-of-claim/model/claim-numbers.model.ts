import { ScClaimNo } from './sc-claim-no.model';

/**
 * Model class ClaimNumbers
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::ClaimNumbers
 * Legacy Mapping: CLAIM-NUMBERS
 */
export class ClaimNumbers {
  scSuspA = '';
  scSusp = '';
  scTypeA = '';
  scType = '';
  scClaimNoA = '';
  scClaimNo = new ScClaimNo();
}
