import {WsHospChargeLine} from './ws-hosp-charge-line.model';

/**
 * Model class WsHospChargeData
 * Path: screenbean/procclmhospchrg/hospchargedata
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhospchrg::hospChargeData::WsHospChargeData
 * Legacy Mapping: WS-HOSP-CHARGE-DATA
 */
export class WsHospChargeData {
  wsHospChargeLines: WsHospChargeLine[] = [];
}
