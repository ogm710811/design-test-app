import {HospBenLnTSQ} from '../../bean/tsq/hosp-ben-ln-tsq.model';
import {WsHospBenefitLine} from './ws-hosp-benefit-line.model';

/**
 * Model class WsHospTsqArea
 * Path: screenbean/procclmdrugeobservice/hospbenline
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::hospbenline::WsHospTsqArea
 * Legacy Mapping: WS-HOSP-TSQ-AREA
 */
export class WsHospTsqArea {
  wsHospBenefit = new HospBenLnTSQ();
  wsHospBenefitLines: WsHospBenefitLine[] = [];
}
