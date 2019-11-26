import { ComBenefitModControl } from './com-benefit-mod-control.model';
import { ComErrorMessage } from './com-error-message.model';
import { ComMapCommandLine } from './com-map-command-line.model';
import { ComSecurityCodes } from './com-security-codes.model';
import { CommandLine } from './command-line.model';

/**
 * Model class CommComm
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::CommComm
 * Legacy Mapping: COMM-COMM
 */
export class CommComm {
  comIonsId = '';
  comIonsIdRedef = 0;
  comLocation = 0;
  comDivision = 0;
  comDivisionR = '';
  comPosition = '';
  comAuthorityLevel = 0;
  comLastName = '';
  comFirstName = '';
  comTitle = '';
  comActualLevel = 0;
  comOperatorReadInd = '';
  comFullTime = '';
  comOpstatHoursUpdated = '';
  comElevatedQ = '';
  comLPlansExcluded = '';
  comLbPlanExcluded = '';
  comJulianDate = 0;
  comSecurityCodes = new ComSecurityCodes();
  comBenefitModControl = new ComBenefitModControl();
  comLetterTypeInd = '';
  comLetterCounter = 0;
  comClaimAsgn = '';
  comOldMembershipId = 0;
  comOthrReturnModule = '';
  comMapCommandLine = new ComMapCommandLine();
  commandLine = new CommandLine();
  comCurrentMemNo = 0;
  comErrorMessage = new ComErrorMessage();
  comReturnModule = '';
  comTsRecInd = '';
  comTsRecLength = 0;
  comEndReturnModule = '';
  comPalsTsRecInd = '';
  comPalsTsRecLength = 0;
  comSaveCommand = '';
  comSubmitCompLtr = '';
  comPalsEndReturnModule = '';
  comPurgeModuleInd = '';
  comPurgeCallInd = '';
  comCurrentDate = 0;
  cfmSignoffInd = '';
  comLesTsRecInd = '';
  comRchCommTsInd = '';
  comEmployeeSecurity = '';
  menuInd = '';
  tsCommarea = '';
  comOthrTsRecInd = '';
  comOthrTsRecLength = 0;
  comLastTsInd = '';
  comChmTsRecInd = '';
  comChmTsRecLength = 0;
  comLesTsRecLength = 0;
  comClaimStatus = '';
  comRegion = '';
}
