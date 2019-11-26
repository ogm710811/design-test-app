import {Filler80} from './filler80.model';
import {Filler81} from './filler81.model';
/**
 * Model class WsSrtBpPlanLine
 * Path: screenbean/procclmnursingchrgservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnursingchrgservice::WsSrtBpPlanLine
 * Legacy Mapping: WS-SRT-BP-PLAN-LINE
 */
export class WsSrtBpPlanLine {
  wsSrtBpPlanCode = '';
  wsSrtBpTos = '';
  wsSrtBpStartDate = 0;
  filler80 = new Filler80();
  wsSrtBpEndDate = 0;
  filler81 = new Filler81();
  wsSrtBpAggrShifts = 0;
  wsSrtBpShiftMax = 0;
}
