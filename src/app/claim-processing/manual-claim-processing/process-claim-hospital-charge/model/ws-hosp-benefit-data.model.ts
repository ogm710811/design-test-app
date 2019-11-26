import {WsHospBenefitLine} from './ws-hosp-benefit-line.model';

/**
 * Model class WsHospBenefitData
 * Path: screenbean/procclmhospchrg/hospchargedata
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhospchrg::hospChargeData::WsHospBenefitData
 * Legacy Mapping: WS-HOSP-BENEFIT-DATA
 */
export class WsHospBenefitData {
  wsHospBenefitLines: WsHospBenefitLine[] = [];
}
