import { CedDepdBmEntry } from './ced-depd-bm-entry.model';
import { CedDepdPlanLeEntry } from './ced-depd-plan-le-entry.model';

/**
 * Model class CedDepdPlEntry
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedDepdPlEntry
 * Legacy Mapping: CED-DEPD-PL-ENTRY
 */
export class CedDepdPlEntry {
  cedDepdPlanCompas = '';
  cedDepdPlanBase = '';
  cedDepdCertState = '';
  cedDepdPlanProductType = '';
  cedDepdPlanProductCategory = '';
  cedDepdPlanSponsorDod = '';
  cedDepdPlanStartDate = '';
  cedDepdPlanTermDate = '';
  cedDepdPlanTermReason = '';
  cedDepdPlanConservation = '';
  cedDepdPlLegalEntryCntr = 0;
  cedDepdPlanLeEntrys: CedDepdPlanLeEntry[] = [];
  cedDepdBmCounter = 0;
  cedDepdBmEntrys: CedDepdBmEntry[] = [];
  cedDepdPlanCode = '';
  cedDepdPlanInd = '';
}
