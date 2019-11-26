import {WsCriticalErrorMessage} from './ws-critical-error-message.model';

/**
 * Model class WsLegalEntityReFields
 * Path: screenbean/procclmhospchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhospchrg::WsLegalEntityReFields
 * Legacy Mapping: WS-LEGAL-ENTITY-RE-FIELDS
 */
export class WsLegalEntityReFields {
  wsBlFromDate = 0;
  wsPackPlanEffDate = 0;
  wsPackBlFromDate = 0;
  wsUnpackFromDate = 0;
  wsPlanEffDate = 0;
  wsPlanEffDateCcyymmdd = 0;
  wsBenefitPlan = '';
  wsHospitalLe = '';
  wsHospitalReinsur = '';
  wsHospitalFinLe = '';
  wsHospitalFinReinsur = '';
  lerPlanMatchIndFlag = '';
  lerDateMatchIndFlag = '';
  hospitalLegalEntityIndFlag = '';
  legalEntityDateIndFlag = '';
  wsCriticalErrorMessage = new WsCriticalErrorMessage();
  wsLegalEntityError = '';
  wsMembershipNumber = 0;
}
