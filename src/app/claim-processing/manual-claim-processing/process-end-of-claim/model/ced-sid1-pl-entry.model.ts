import { CedSid1BmEntry } from './ced-sid1-bm-entry.model';
import { CedSid1PlanLeEntry } from './ced-sid1-plan-le-entry.model';

/**
 * Model class CedSid1PlEntry
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedSid1PlEntry
 * Legacy Mapping: CED-SID1-PL-ENTRY
 */
export class CedSid1PlEntry {
  cedSid1PlanCompas = '';
  cedSid1PlanBase = '';
  cedSid1CertState = '';
  cedSid1PlanProductType = '';
  cedSid1PlanProductCategory = '';
  cedSid1PlanStartDate = '';
  cedSid1PlanTermDate = '';
  cedSid1PlanTermReason = '';
  cedSid1PlanConservation = '';
  cedSid1PlanEmployerId = '';
  cedSid1PlanEmployerType = '';
  cedSid1PeSubsidizedStart = '';
  cedSid1PeSubsidizedStop = '';
  cedSid1PlLegalEntryCntr = 0;
  cedSid1PlanLeEntrys: CedSid1PlanLeEntry[] = [];
  cedSid1BmCounter = 0;
  cedSid1BmEntrys: CedSid1BmEntry[] = [];
  cedSid1PlanCode = '';
  cedSid1PlanInd = '';
}
