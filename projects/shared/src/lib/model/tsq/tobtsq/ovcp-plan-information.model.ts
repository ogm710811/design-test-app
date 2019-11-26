import {OvcpPlanInfoTable} from './ovcp-plan-info-table.model';

/**
 * Model class OvcpPlanInformation
 * Path: bean/tsq/tobtsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::tobtsq::OvcpPlanInformation
 * Legacy Mapping: OVCP-PLAN-INFORMATION
 */
export class OvcpPlanInformation {
  ovcpPlanInfoTables: OvcpPlanInfoTable[] = [];
  ovcpPlanCounter = 0;
  filler5 = '';
}
