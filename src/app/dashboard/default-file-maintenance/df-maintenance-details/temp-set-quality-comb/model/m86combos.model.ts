import { M86tFromDate } from './m86t-from-date.model';
import { M86tToDate } from './m86t-to-date.model';

/**
 * Model class M86combos
 * Path: screenbean/setqltycombovrd
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltycombovrd::M86combos
 * Legacy Mapping: M86COMBOS
 */
export class M86combos {
  m86tLineNo = '';
  m86tPct = '';
  m86tState = '';
  m86tPlan = '';
  m86tTos = '';
  m86tFromDate = new M86tFromDate();
  m86tToDate = new M86tToDate();
  m86tCaution = '';
  m86tAcceptCode = '';
}
