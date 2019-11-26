import { CedPid1PlEntry } from './ced-pid1-pl-entry.model';

/**
 * Model class CedPid1PlansBody
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedPid1PlansBody
 * Legacy Mapping: CED-PID1-PLANS-BODY
 */
export class CedPid1PlansBody {
  cedPid1MdDisabledInd = '';
  cedPid1BenefitModInd = '';
  cedPid1PlCounter = 0;
  cedPid1PlEntrys: CedPid1PlEntry[] = [];
}
