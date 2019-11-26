import { OvCautions } from './ov-cautions.model';

/**
 * Model class OvAuthorityLimits
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::OvAuthorityLimits
 * Legacy Mapping: OV-AUTHORITY-LIMITS
 */
export class OvAuthorityLimits {
  ovDeceasedInsureds = '';
  ovExceptionScreen = '';
  ovForeignProvider = '';
  ovPaymentAdjustments = '';
  ovWaiverOfPremium = '';
  ovMedsuppLtrExhausted = '';
  ovAllPlansInd = '';
  ovClaimAggregate = 0;
  filler1 = '';
  ovPeriodOfStay = 0;
  ovSnfConfinement = 0;
  ovPdnFirstPayment = '';
  ovPdnShifts = 0;
  ovPdnUAndPBenefits = 0;
  ovCautions: OvCautions[] = [];
}
