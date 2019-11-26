import {CompasReplyArea} from './compas-reply-area.model';
import {HouseholdAddressHistory} from './household-address-history.model';
import {McnlMedicareNumberList} from './mcnl-medicare-number-list.model';

/**
 * Model class EligibilityIoArea
 * Path: screenbean/commcontrolendcomm
 * Model: com::uhc::aarp::fox::domain::screenbean::commcontrolendcomm::EligibilityIoArea
 * Legacy Mapping: ELIGIBILITY-IO-AREA
 */
export class EligibilityIoArea {
  compasReplyArea = new CompasReplyArea();
  householdAddressHistory = new HouseholdAddressHistory();
  mcnlMedicareNumberList = new McnlMedicareNumberList();
  commandIndicator = '';
  segmentIndicator = '';
  requestProgramId = '';
  requestSequenceNum = 0;
  primaryKey = 0;
  primMcnSocialSecurityNum = '';
  primMcnBeneficiaryId = '';
  filler1 = '';
  returnCd = '';
  returnMsg = '';
  errCondition = '';
  ceTsqPrefix = '';
  ceTsqAccount = '';
  ceTsqEibtaskn = 0;
}
