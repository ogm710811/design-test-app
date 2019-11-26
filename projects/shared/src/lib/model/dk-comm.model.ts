import {DOBR} from './dobr.model';
import {PlanInfo} from './plan-info.model';

/**
 * Model class DkComm
 * Path: bean/reviewcommarea
 * Model: com::uhc::aarp::fox::domain::bean::reviewcommarea::DkComm
 * Legacy Mapping: DK-COMM
 */
export class DkComm {
  naMECompressed = '';
  adDRCompressed = '';
  ciTYCompressed = '';
  doBR = new DOBR();
  planInfoCtr = 0;
  planInfos: PlanInfo[] = [];
  notFoundInd = '';
  noPayLetterInd = '';
  suspendedClaimNoBills = '';
  deletedClaimNoBills = '';
  noBillsFnd = '';
  noOprec = '';
  sexInd = '';
  spouseFirstName = '';
  gracePeriodInd = '';
  languageInd = '';
  filler52 = '';
}
