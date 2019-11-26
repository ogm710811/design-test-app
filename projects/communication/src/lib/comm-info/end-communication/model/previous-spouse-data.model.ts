import {PsMstrPlanSeg} from './ps-mstr-plan-seg.model';

/**
 * Model class PreviousSpouseData
 * Path: screenbean/commcontrolendcomm
 * Model: com::uhc::aarp::fox::domain::screenbean::commcontrolendcomm::PreviousSpouseData
 * Legacy Mapping: PREVIOUS-SPOUSE-DATA
 */
export class PreviousSpouseData {
  psMstrPlanSeg = new PsMstrPlanSeg();
  psUpwardPtr = 0;
  psInsCode = '';
  psSurname = '';
  psFirstName = '';
  psMi = '';
  psTitle = '';
  psBirthdate = 0;
  psSex = '';
  psLanguageInd = '';
  psTermDate = 0;
  psTermReason = '';
  psMcnNumberType = '';
  psAcfIndicator = '';
  psPartbElectionDateNum = 0;
  psPartbElectionDate = '';
  psMcnSocialSecurityNum = '';
  psMcnBeneficiaryId = '';
}
