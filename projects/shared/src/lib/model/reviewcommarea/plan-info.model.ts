import {PEffDateR} from './peff-date-r.model';
import {PExTermDateR} from './pex-term-date-r.model';
import {PPlanCodeData} from './pplan-code-data.model';

/**
 * Model class PlanInfo
 * Path: bean/reviewcommarea
 * Model: com::uhc::aarp::fox::domain::bean::reviewcommarea::PlanInfo
 * Legacy Mapping: PLAN-INFO
 */
export class PlanInfo {
  pplanCodeData = new PPlanCodeData();
  peffDate = 0;
  peffDateR = new PEffDateR();
  ptermDate = 0;
  pexTermDate = 0;
  pexTermDateR = new PExTermDateR();
  ptermReason = '';
}
