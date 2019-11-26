import { ComExclLocs } from './com-excl-locs.model';

/**
 * Model class ComSetQualityInfo
 * Path: screenbean/setqltyovrd
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltyovrd::ComSetQualityInfo
 * Legacy Mapping: COM-SET-QUALITY-INFO
 */
export class ComSetQualityInfo {
  comSqAdminHistory = 0;
  comSqPayToSpecPayee = 0;
  comSqCorporate = 0;
  comSqAsdHospPayPct = 0;
  comSqAsdHospPayAmt = 0;
  comSqAsdPayPct = 0;
  comSqAsdPayAmt = 0;
  comSqNonAsdHospPayPct = 0;
  comSqNonAsdHospPayAmt = 0;
  comSqNonAsdPayPct = 0;
  comSqNonAsdPayAmt = 0;
  comSqRevalDisbPct = 0;
  comSqRevalSuspPct = 0;
  comSqRevalAmt = 0;
  comMentalFiller = '';
  comMs60Filler = '';
  comExclLocs = new ComExclLocs();
}
