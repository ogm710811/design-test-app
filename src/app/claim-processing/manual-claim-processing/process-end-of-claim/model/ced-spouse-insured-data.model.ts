import { CedSid1ErisaInfo } from './ced-sid1-erisa-info.model';
import { CedSid1MedicaidSuspension } from './ced-sid1-medicaid-suspension.model';
import { CedSid1PlansBody } from './ced-sid1-plans-body.model';

/**
 * Model class CedSpouseInsuredData
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedSpouseInsuredData
 * Legacy Mapping: CED-SPOUSE-INSURED-DATA
 */
export class CedSpouseInsuredData {
  cedSid1ItemName = '';
  cedSid1InsuredCode = '';
  cedSid1LastName = '';
  cedSid1FirstName = '';
  cedSid1MiddleInitial = '';
  cedSid1TitleCode = '';
  cedSid1NameSuffix = '';
  cedSid1GenderCode = '';
  cedSid1BirthDate = '';
  cedSid1LanguageInd = '';
  cedSid1MedPartbElectionDt = '';
  cedSid1McnNumber = '';
  cedSid1McnNoType = '';
  cedSid1AcfInd = '';
  cedSid1InsTermReason = '';
  cedSid1InsTermDate = '';
  cedSid1ContCovStartDate = '';
  cedSid1ContCovStopDate = '';
  cedSid1PlansBody = new CedSid1PlansBody();
  cedSid1MedicaidSuspension = new CedSid1MedicaidSuspension();
  cedSid1ErisaDates = 0;
  cedSid1ErisaInfos: CedSid1ErisaInfo[] = [];
}
