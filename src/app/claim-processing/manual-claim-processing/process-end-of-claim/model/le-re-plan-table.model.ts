import { LeReInfoTable } from './le-re-info-table.model';

/**
 * Model class LeRePlanTable
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::LeRePlanTable
 * Legacy Mapping: LE-RE-PLAN-TABLE
 */
export class LeRePlanTable {
  leRePlan = '';
  leRePlanEffectDate = 0;
  leRePlanTermDate = 0;
  leReProductType = '';
  leReSystemId = '';
  leReCounter = 0;
  leReInfoTables: LeReInfoTable[] = [];
}
