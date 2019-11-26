import {Filler12} from './filler12.model';
import {Filler3} from './filler3.model';
import {Filler6} from './filler6.model';
import {Filler7} from './filler7.model';
import {Filler8} from './filler8.model';
import {Filler9} from './filler9.model';
/**
 * Model class TCSClaimTable
 * Path: screenbean/procclmnursingchrgservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnursingchrgservice::TCSClaimTable
 * Legacy Mapping: T-C-S-CLAIM-TABLE
 */
export class TCSClaimTable {
  tcSUpwardPtr = 0;
  filler1 = new Filler12();
  tcSBasicPtr = 0;
  tcSClaimKey = 0;
  tcSServiceFromDate = 0;
  tcSServiceToDate = 0;
  filler3 = new Filler3();
  tcSStatus = '';
  tcSClaimNumberPacs = 0;
  tcSOperatorId = 0;
  tcSOperatorIdR = '';
  tcSAssgnProvKey = 0;
  tcSAssigneeMaxAmt = 0;
  tcSAssignAdjustAmt = 0;
  tcSDateProcessed = 0;
  filler6 = new Filler6();
  tcSDateCompleted = 0;
  filler7 = new Filler7();
  tcSBenefitSubtotal = 0;
  tcSPayAdjustAmt = 0;
  tcSDateToQuality = 0;
  filler8 = new Filler8();
  tcSEobType = '';
  tcSNoPayInd = '';
  tcSMiscInd = '';
  tcSLastMaintDate = 0;
  filler9 = new Filler9();
  tcSSuspendRefNotePtr = '';
  tcSClaimMiscPtr = 0;
  tcSNextClaimPtr = 0;
  tcSBillPtr = 0;
  tcSClaimNotePtr = 0;
  tcSDenialMsgInd = '';
}
