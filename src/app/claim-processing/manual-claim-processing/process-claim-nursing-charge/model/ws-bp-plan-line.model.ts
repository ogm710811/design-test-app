import {WsBpDateLine} from './ws-bp-date-line.model';
import {WsBpDaysBetween} from './ws-bp-days-between.model';
/**
 * Model class WsBpPlanLine
 * Path: screenbean/procclmnursingchrgservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnursingchrgservice::WsBpPlanLine
 * Legacy Mapping: WS-BP-PLAN-LINE
 */
export class WsBpPlanLine {
  wsBpPlanCode = '';
  wsBpPlanType = '';
  wsBpShiftMax = 0;
  wsBpDaysBetween = new WsBpDaysBetween();
  wsBpDaysBetween9 = 0;
  wsBpDateCtr = 0;
  wsBpDateLines: WsBpDateLine[] = [];
}
