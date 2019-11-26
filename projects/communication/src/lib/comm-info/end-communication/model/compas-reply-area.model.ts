import {ExMstrPlanSeg} from './ex-mstr-plan-seg.model';
import {ExSpousePlanSeg} from './ex-spouse-plan-seg.model';
import {PreviousSpouseData} from './previous-spouse-data.model';

/**
 * Model class CompasReplyArea
 * Path: screenbean/commcontrolendcomm
 * Model: com::uhc::aarp::fox::domain::screenbean::commcontrolendcomm::CompasReplyArea
 * Legacy Mapping: COMPAS-REPLY-AREA
 */
export class CompasReplyArea {
  paidthrudate = '';
  exMstrPlanSeg = new ExMstrPlanSeg();
  exSpousePlanSeg = new ExSpousePlanSeg();
  previousSpouseData = new PreviousSpouseData();
  hiDependentInd = 0;
  ebPrimaryKey = 0;
  ebHonorTitle = 0;
  ebHomeAddrState = '';
  ebHomeAddrZip = '';
  ebHomePhoneNumber = '';
  ebSex = '';
  ebMcnNumberType = '';
  ebAcfIndicator = '';
  ebPartbElectionDateNum = 0;
  ebPartbElectionDate = '';
  ebEmployerAcctInd = '';
  filler4 = '';
  ebSurname = '';
  ebFstName = '';
  ebMidInt = '';
  ebHomeAddrCity = '';
  ebHomeAddrStr1 = '';
  ebHomeAddrStr2 = '';
  ebMcnSocialSecurityNum = '';
  ebMcnBeneficiaryId = '';
  ebMcn1stPosition = '';
  ebMcnRest = '';
  ebBenModIndI = '';
  ebBenModIndS = '';
  ebBenModIndP = '';
  edCorrectionState = '';
  edMemberInsuredCode = 0;
  edMemberDob = 0;
  edMemberLangInd = '';
  edMemberTerminationDate = 0;
  edMemberTerminationCode = '';
  edSpouseInsuredCode = 0;
  edSpouseDob = 0;
  edSpouseLangInd = '';
  edSpouseTerminationDate = 0;
  edSpouseTerminationCode = '';
  edModeChgDate = 0;
  edNetAmount = 0;
  edBirthMemberCc = '';
  edBirthMemberYy = '';
  edBirthMemberMm = '';
  edBirthMemberDd = '';
  edGraceLetterDate = '';
  edGraceStatusInd = '';
  esUpwardPtr = 0;
  esHonorTitle = 0;
  esSex = '';
  esLanguageInd = '';
  esSpouseHistoryPtr = 0;
  esMcnNumberType = '';
  esAcfIndicator = '';
  esPartbElectionDateNum = 0;
  esPartbElectionDate = '';
  esFiller = '';
  esSurname = '';
  esFstName = '';
  esMidInt = '';
  esMcnSocialSecurityNum = '';
  esMcnBeneficiaryId = '';
  eDGrcEnforced = '';
  eDGrcNotEnforced = '';
}
