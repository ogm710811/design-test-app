import {PsPlanTable} from './ps-plan-table.model';

/**
 * Model class PreviousSpouseData
 * Path: bean/compas
 * Model: com::uhc::aarp::fox::domain::bean::compas::PreviousSpouseData
 * Legacy Mapping: PREVIOUS-SPOUSE-DATA
 */
export class PreviousSpouseData {
  psInsCode = '';
  psSurname = '';
  psFirstName = '';
  psMi = '';
  psTitle = '';
  psBirthdate = '';
  psSex = '';
  psLanguageInd = '';
  psTermDate = 0;
  psTermReason = '';
  psMcnNumberType = '';
  psAcfIndicator = '';
  psPartbElectionDateNum = '';
  filler7 = '';
  psIdNo = 0;
  psTypeCase = 0;
  psMcnSocialSecurityNum = '';
  psMcnBeneficiaryId = '';
  psPlanCtr = 0;
  psPlanTable: PsPlanTable[] = [];
}
