import { OvSqCautions } from './ov-sq-cautions.model';
import { OvSqLetterTable } from './ov-sq-letter-table.model';
import { OvSqMessage } from './ov-sq-message.model';

/**
 * Model class OvSetQualityInfo
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::OvSetQualityInfo
 * Legacy Mapping: OV-SET-QUALITY-INFO
 */
export class OvSetQualityInfo {
  ovSqAdminHistory = 0;
  ovSqPayToSpecPayee = 0;
  ovSqCorporate = 0;
  ovSqPays = 0;
  ovSqNopays = 0;
  ovSqSpecMemo = 0;
  ovSqNewDoctor = 0;
  ovSqNewHospital = 0;
  ovSqSplitClaim = 0;
  ovSqBenExtensions = 0;
  ovSqPdn1stPay = 0;
  ovSqAsdHospPayPct = 0;
  ovSqAsdHospPayAmt = 0;
  ovSqAsdPayPct = 0;
  ovSqAsdPayAmt = 0;
  ovSqNonAsdHospPayPct = 0;
  ovSqNonAsdHospPayAmt = 0;
  ovSqNonAsdPayPct = 0;
  ovSqNonAsdPayAmt = 0;
  ovSqExceptionScreen = 0;
  ovSqLettersPct = 0;
  ovSqCommPct = 0;
  ovSqRevalDisbPct = 0;
  ovSqRevalSuspPct = 0;
  ovSqRevalAmt = 0;
  ovSqDeceasedInsPct = 0;
  ovSqPaymentAdjustPct = 0;
  ovSqMedsuppLtrExhPct = 0;
  ovSqMessages: OvSqMessage[] = [];
  ovSqCautions: OvSqCautions[] = [];
  ovSqLetterTables: OvSqLetterTable[] = [];
}
