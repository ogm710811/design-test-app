import {CedDepdPlEntry} from './ced-depd-pl-entry.model';

/**
 * Model class CedDepdPlansBody
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::CedDepdPlansBody
 * Legacy Mapping: CED-DEPD-PLANS-BODY
 */
export class CedDepdPlansBody {
  cedDepdBenefitModInd = '';
  cedDepdPlCounter = 0;
  cedDepdPlEntrys: CedDepdPlEntry[] = [];
}
