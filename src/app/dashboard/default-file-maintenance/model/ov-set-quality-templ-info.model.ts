import { OvSqtCautions } from './ov-sqt-cautions.model';
import { OvSqtLetterTable } from './ov-sqt-letter-table.model';
import { OvSqtMessage } from './ov-sqt-message.model';

/**
 * Model class OvSetQualityTemplInfo
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::OvSetQualityTemplInfo
 * Legacy Mapping: OV-SET-QUALITY-TEMPL-INFO
 */
export class OvSetQualityTemplInfo {
  ovSqtAdminHistory = 0;
  ovSqtPayToSpecPayee = 0;
  ovSqtCorporate = 0;
  ovSqtPays = 0;
  ovSqtNopays = 0;
  ovSqtSpecMemo = 0;
  ovSqtNewDoctor = 0;
  ovSqtNewHospital = 0;
  ovSqtSplitClaim = 0;
  ovSqtBenExtensions = 0;
  ovSqtPdn1stPay = 0;
  ovSqtAsdHospPayPct = 0;
  ovSqtAsdHospPayAmt = 0;
  ovSqtAsdPayPct = 0;
  ovSqtAsdPayAmt = 0;
  ovSqtNonAsdHospPayPct = 0;
  ovSqtNonAsdHospPayAmt = 0;
  ovSqtNonAsdPayPct = 0;
  ovSqtNonAsdPayAmt = 0;
  ovSqtExceptionScreen = 0;
  ovSqtLettersPct = 0;
  ovSqtCommPct = 0;
  ovSqtRevalDisbPct = 0;
  ovSqtRevalSuspPct = 0;
  ovSqtRevalAmt = 0;
  ovSqtDeceasedInsPct = 0;
  ovSqtPaymentAdjustPct = 0;
  ovSqtMedsuppLtrExhPct = 0;
  ovSqtMessages: OvSqtMessage[] = [];
  ovSqtCautions: OvSqtCautions[] = [];
  ovSqtLetterTables: OvSqtLetterTable[] = [];
}
