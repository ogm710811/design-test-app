import {LeReInfoTable} from './le-re-info-table.model';

/**
 * Model class LeRePlanTable
 * Path: bean/tsq/tobtsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::tobtsq::LeRePlanTable
 * Legacy Mapping: LE-RE-PLAN-TABLE
 */
export class LeRePlanTable {
  leReInfoTables: LeReInfoTable[] = [];
  leRePlan = '';
  leRePlanEffectDate = 0;
  leRePlanTermDate = 0;
  leReProductType = '';
  leReSystemId = '';
  leReCounter = 0;
}
