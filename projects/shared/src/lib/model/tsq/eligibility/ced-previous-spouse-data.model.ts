import {CedPsd1ErisaInfo} from './ced-psd1-erisa-info.model';
import {CedPsd1MedicaidSuspension} from './ced-psd1-medicaid-suspension.model';
import {CedPsd1PlansBody} from './ced-psd1-plans-body.model';

/**
 * Model class CedPreviousSpouseData
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::CedPreviousSpouseData
 * Legacy Mapping: CED-PREVIOUS-SPOUSE-DATA
 */
export class CedPreviousSpouseData {
  cedPsd1ItemName = '';
  cedPsd1InsuredCode = '';
  cedPsd1LastName = '';
  cedPsd1FirstName = '';
  cedPsd1MiddleInitial = '';
  cedPsd1TitleCode = '';
  cedPsd1NameSuffix = '';
  cedPsd1GenderCode = '';
  cedPsd1BirthDate = '';
  cedPsd1LanguageInd = '';
  cedPsd1MedPartbElectionDt = '';
  cedPsd1McnNumber = '';
  cedPsd1McnNoType = '';
  cedPsd1AcfInd = '';
  cedPsd1InsTermReason = '';
  cedPsd1InsTermDate = '';
  cedPsd1ContCovStartDate = '';
  cedPsd1ContCovStopDate = '';
  cedPsd1PlansBody = new CedPsd1PlansBody();
  cedPsd1MedicaidSuspension = new CedPsd1MedicaidSuspension();
  cedPsd1ErisaDates = 0;
  cedPsd1ErisaInfos: CedPsd1ErisaInfo[] = [];
}
