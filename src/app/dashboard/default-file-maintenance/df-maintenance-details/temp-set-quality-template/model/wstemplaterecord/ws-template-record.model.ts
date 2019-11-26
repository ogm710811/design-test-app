import { WsSqtCautions } from './ws-sqt-cautions.model';
import { WsSqtCombinations } from './ws-sqt-combinations.model';
import { WsSqtLetterTable } from './ws-sqt-letter-table.model';
import { WsSqtMessage } from './ws-sqt-message.model';

/**
 * Model class WsTemplateRecord
 * Path: screenbean/setqltytmpltservice/wstemplaterecord
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltytmpltservice::wstemplaterecord::WsTemplateRecord
 * Legacy Mapping: WS-TEMPLATE-RECORD
 */
export class WsTemplateRecord {
  wsCvPvInd = '';
  wsTempMaintIons = 0;
  wsTempMaintDate = 0;
  wsTemplateNum = 0;
  wsSqtMessages: WsSqtMessage[] = [];
  wsSqtCautions: WsSqtCautions[] = [];
  wsSqtLetterTables: WsSqtLetterTable[] = [];
  wsSqtCombinations: WsSqtCombinations[] = [];
  wsSqtAdminHistory = 0;
  wsSqtPayToSpecPayee = 0;
  wsSqtCorporate = 0;
  wsSqtPays = 0;
  wsSqtNopays = 0;
  wsSqtSpecMemo = 0;
  wsSqtNewDoctor = 0;
  wsSqtNewHospital = 0;
  wsSqtSplitClaim = 0;
  wsSqtBenExtensions = 0;
  wsSqtPdn1stPay = 0;
  wsSqtAsdHospPayPct = 0;
  wsSqtAsdHospPayAmt = 0;
  wsSqtAsdPayPct = 0;
  wsSqtAsdPayAmt = 0;
  wsSqtNonAsdHospPayPct = 0;
  wsSqtNonAsdHospPayAmt = 0;
  wsSqtNonAsdPayPct = 0;
  wsSqtNonAsdPayAmt = 0;
  wsSqtExceptionScreen = 0;
  wsSqtLettersPct = 0;
  wsSqtCommPct = 0;
  wsSqtRevalDisbPct = 0;
  wsSqtRevalSuspPct = 0;
  wsSqtRevalAmt = 0;
  wsSqtDeceasedInsPct = 0;
  wsSqtPaymentAdjustPct = 0;
  wsSqtMedsuppLtrExhPct = 0;
  wsSetQualityTemplComb = '';
  wsSqtUpdateType = '';
}
