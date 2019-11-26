import { OrigCautionTable } from './orig-caution-table.model';

/**
 * Model class WsOrigAuthInfo
 * Path: screenbean/operauthlimit
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthlimit::WsOrigAuthInfo
 * Legacy Mapping: WS-ORIG-AUTH-INFO
 */
export class WsOrigAuthInfo {
  origOperAuthMaintDate = 0;
  origOperAuthMaintIons = 0;
  origOperProcessDate = 0;
  origDeceasedInsured = '';
  origExceptionScreen = '';
  origForeignProvider = '';
  origPaymentAdjustment = '';
  origWaiverPremium = '';
  origAllPlansInd = '';
  origMedsuppLtrExhausted = '';
  origClaimAggregate = 0;
  origPeriodOfStay = 0;
  origSnfConfinement = 0;
  origPdnFirstPayment = '';
  origPdnShifts = 0;
  origPdnUAndPBenefits = 0;
  origCautionTable = new OrigCautionTable();
}
