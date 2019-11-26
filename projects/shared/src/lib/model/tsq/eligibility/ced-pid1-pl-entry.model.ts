import {CedPid1BmEntry} from './ced-pid1-bm-entry.model';
import {CedPid1PlanLeEntry} from './ced-pid1-plan-le-entry.model';

/**
 * Model class CedPid1PlEntry
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::CedPid1PlEntry
 * Legacy Mapping: CED-PID1-PL-ENTRY
 */
export class CedPid1PlEntry {
  cedPid1PlanCompas = '';
  cedPid1PlanBase = '';
  cedPid1CertState = '';
  cedPid1PlanProductType = '';
  cedPid1PlanProductCategory = '';
  cedPid1PlanStartDate = '';
  cedPid1PlanTermDate = '';
  cedPid1PlanTermReason = '';
  cedPid1PlanConservation = '';
  cedPid1PlanEmployerId = '';
  cedPid1PlanEmployerType = '';
  cedPid1PeSubsidizedStart = '';
  cedPid1PeSubsidizedStop = '';
  cedPid1PlLegalEntryCntr = 0;
  cedPid1BmCounter = 0;
  cedPid1PlanCode = '';
  cedPid1PlanInd = '';
  cedPid1PlanLeEntrys: CedPid1PlanLeEntry[] = [];
  cedPid1BmEntrys: CedPid1BmEntry[] = [];
}
