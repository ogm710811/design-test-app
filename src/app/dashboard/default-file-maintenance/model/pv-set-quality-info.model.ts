import { PvSqCautionTable } from './pv-sq-caution-table.model';
import { PvSqLetterTable } from './pv-sq-letter-table.model';
import { PvSqMessageTable } from './pv-sq-message-table.model';

/**
 * Model class PvSetQualityInfo
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::PvSetQualityInfo
 * Legacy Mapping: PV-SET-QUALITY-INFO
 */
export class PvSetQualityInfo {
  pvSqAdminHistory = 0;
  pvSqPayToSpecPayee = 0;
  pvSqCorporate = 0;
  pvSqPays = 0;
  pvSqNopays = 0;
  pvSqSpecMemo = 0;
  pvSqNewDoctor = 0;
  pvSqNewHospital = 0;
  pvSqSplitClaim = 0;
  pvSqBenExtensions = 0;
  pvSqPdn1stPay = 0;
  pvSqAsdHospPayPct = 0;
  pvSqAsdHospPayAmt = 0;
  pvSqAsdPayPct = 0;
  pvSqAsdPayAmt = 0;
  pvSqNonAsdHospPayPct = 0;
  pvSqNonAsdHospPayAmt = 0;
  pvSqNonAsdPayPct = 0;
  pvSqNonAsdPayAmt = 0;
  pvSqExceptionScreen = 0;
  pvSqLettersPct = 0;
  pvSqCommPct = 0;
  pvSqRevalDisbPct = 0;
  pvSqRevalSuspPct = 0;
  pvSqRevalAmt = 0;
  pvSqDeceasedInsPct = 0;
  pvSqPaymentAdjustPct = 0;
  pvSqMedsuppLtrExhPct = 0;
  filler4 = '';
  pvSqMessageTable = new PvSqMessageTable();
  pvSqCautionTable = new PvSqCautionTable();
  pvSqLetterTable = new PvSqLetterTable();
}
