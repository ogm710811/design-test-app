import {CedSid1MsEntry} from './ced-sid1-ms-entry.model';

/**
 * Model class CedSid1MedicaidSuspension
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::CedSid1MedicaidSuspension
 * Legacy Mapping: CED-SID1-MEDICAID-SUSPENSION
 */
export class CedSid1MedicaidSuspension {
  cedSid1MsCounter = 0;
  cedSid1MsEntrys: CedSid1MsEntry[] = [];
}
