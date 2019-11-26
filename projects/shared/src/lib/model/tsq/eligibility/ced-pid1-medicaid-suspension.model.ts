import {CedPid1MsEntry} from './ced-pid1-ms-entry.model';

/**
 * Model class CedPid1MedicaidSuspension
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::CedPid1MedicaidSuspension
 * Legacy Mapping: CED-PID1-MEDICAID-SUSPENSION
 */
export class CedPid1MedicaidSuspension {
  cedPid1MsCounter = 0;
  cedPid1MsEntrys: CedPid1MsEntry[] = [];
}
