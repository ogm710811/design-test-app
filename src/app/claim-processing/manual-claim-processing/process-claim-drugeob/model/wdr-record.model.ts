import {WdrBenLnTSQ} from './wdr-ben-ln-tsq.model';
import {WdrChrgLnTSQ} from './wdr-chrg-ln-tsq.model';

/**
 * Model class WdrRecord
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::WdrRecord
 * Legacy Mapping: WDR-RECORD
 */
export class WdrRecord {
  wdrChargeLn = new WdrChrgLnTSQ();
  wdrBenefitLine = new WdrBenLnTSQ();
}
