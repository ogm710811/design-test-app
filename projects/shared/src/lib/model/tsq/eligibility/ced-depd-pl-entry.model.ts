import {CedDepdBmEntry} from './ced-depd-bm-entry.model';
import {CedDepdPlanLeEntry} from './ced-depd-plan-le-entry.model';

/**
 * Model class CedDepdPlEntry
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::CedDepdPlEntry
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
  cedDepdBmCounter = 0;
  cedDepdPlanCode = '';
  cedDepdPlanInd = '';
  cedDepdBmEntrys: CedDepdBmEntry[] = [];
  cedDepdPlanLeEntrys: CedDepdPlanLeEntry[] = [];
}
