import {CeTsqName} from './ce-tsq-name.model';
import {CompasReplyArea} from './compas-reply-area.model';
import {CompasRequestArea} from './compas-request-area.model';
import {HouseholdAddressHistory} from './household-address-history.model';
import {McnlMedicareNumberList} from './mcnl-medicare-number-list.model';
import {ReturnStatusArea} from './return-status-area.model';

/**
 * Model class EligibilityIoArea
 * Path: bean/compas
 * Model: com::uhc::aarp::fox::domain::bean::compas::EligibilityIoArea
 * Legacy Mapping: ELIGIBILITY-IO-AREA
 */
export class EligibilityIoArea {
  compasRequestArea = new CompasRequestArea();
  returnStatusArea = new ReturnStatusArea();
  ceTsqName = new CeTsqName();
  compasReplyArea = new CompasReplyArea();
  householdAddressHistory = new HouseholdAddressHistory();
  mcnlMedicareNumberList = new McnlMedicareNumberList();
}
