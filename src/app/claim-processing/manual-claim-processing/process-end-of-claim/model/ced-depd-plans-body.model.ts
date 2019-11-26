import { CedDepdPlEntry } from './ced-depd-pl-entry.model';

/**
 * Model class CedDepdPlansBody
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedDepdPlansBody
 * Legacy Mapping: CED-DEPD-PLANS-BODY
 */
export class CedDepdPlansBody {
  cedDepdBenefitModInd = '';
  cedDepdPlCounter = 0;
  cedDepdPlEntrys: CedDepdPlEntry[] = [];
}
