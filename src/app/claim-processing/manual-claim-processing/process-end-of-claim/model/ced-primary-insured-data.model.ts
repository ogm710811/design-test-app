import { CedPid1ErisaInfo } from './ced-pid1-erisa-info.model';
import { CedPid1MedicaidSuspension } from './ced-pid1-medicaid-suspension.model';
import { CedPid1PlansBody } from './ced-pid1-plans-body.model';

/**
 * Model class CedPrimaryInsuredData
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedPrimaryInsuredData
 * Legacy Mapping: CED-PRIMARY-INSURED-DATA
 */
export class CedPrimaryInsuredData {
  cedPid1ItemName = '';
  cedPid1InsuredCode = '';
  cedPid1LastName = '';
  cedPid1FirstName = '';
  cedPid1MiddleInitial = '';
  cedPid1TitleCode = '';
  cedPid1NameSuffix = '';
  cedPid1GenderCode = '';
  cedPid1BirthDate = '';
  cedPid1LanguageInd = '';
  cedPid1MedPartbElectionDt = '';
  cedPid1McnNumber = '';
  cedPid1McnNoType = '';
  cedPid1AcfInd = '';
  cedPid1InsTermReason = '';
  cedPid1InsTermDate = '';
  cedPid1ContCovStartDate = '';
  cedPid1ContCovStopDate = '';
  cedPid1PlansBody = new CedPid1PlansBody();
  cedPid1MedicaidSuspension = new CedPid1MedicaidSuspension();
  cedPid1ErisaDates = 0;
  cedPid1ErisaInfos: CedPid1ErisaInfo[] = [];
}
