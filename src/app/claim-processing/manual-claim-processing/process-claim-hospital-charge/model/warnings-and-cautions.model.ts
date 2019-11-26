import {HrSpanMsg} from './hr-span-msg.model';
import {PESplitMsg} from './pesplit-msg.model';

/**
 * Model class WarningsAndCautions
 * Path: screenbean/procclmhospchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhospchrg::WarningsAndCautions
 * Legacy Mapping: WARNINGS-AND-CAUTIONS
 */
export class WarningsAndCautions {
  hbNopayMsg = '';
  hrNopayMsg = '';
  hrSpanMsg = new HrSpanMsg();
  dateSpanMsg = '';
  postHospExtHospMsg = '';
  peSplitMsg = new PESplitMsg();
  snfChargeMsg = '';
  hrCautionMsg = '';
}
