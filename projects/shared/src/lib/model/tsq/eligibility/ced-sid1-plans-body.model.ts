import {CedSid1PlEntry} from './ced-sid1-pl-entry.model';

/**
 * Model class CedSid1PlansBody
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::CedSid1PlansBody
 * Legacy Mapping: CED-SID1-PLANS-BODY
 */
export class CedSid1PlansBody {
  cedSid1SdDisabledInd = '';
  cedSid1BenefitModInd = '';
  cedSid1PlCounter = 0;
  cedSid1PlEntrys: CedSid1PlEntry[] = [];
}
