import {RepTabClaim} from './rep-tab-claim.model';

/**
 * Model class EobReplCmnArea
 * Path: bean
 * Model: com::uhc::aarp::fox::domain::bean::EobReplCmnArea
 * Legacy Mapping: REP-COMMAREA
 */
export class EobReplCmnArea {
  claimAcctInd = '';
  repClaimNumber = 0;
  repAcctNumber = 0;
  insHonorTitle = '';
  screenNum = 0;
  pf3Ind = '';
  pf4Ind = '';
  lineCnt = 0;
  replaceToInd = '';
  repTabCtr = 0;
  repTabClaims: RepTabClaim[] = [];
  insSurname = '';
  insFirstName = '';
  insMidInitial = '';
  insAddrLine1 = '';
  insAddrLine2 = '';
  insCity = '';
  insState = '';
  insZip = '';
}
