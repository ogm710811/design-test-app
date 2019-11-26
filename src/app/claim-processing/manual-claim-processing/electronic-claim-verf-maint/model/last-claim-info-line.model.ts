import {LastClaimNumber} from './last-claim-number.model';

/**
 * Model class LastClaimInfoLine
 * Path: screenbean/ecverfmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::ecverfmnt::LastClaimInfoLine
 * Legacy Mapping: LAST-CLAIM-INFO-LINE
 */
export class LastClaimInfoLine {
  filler14 = '';
  lastClaimFunction = '';
  lastClaimNumber = new LastClaimNumber();
  filler19 = '';
}
