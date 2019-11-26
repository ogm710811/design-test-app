import {Rpdma1bMapLine} from './rpdma1b-map-line.model';

/**
 * Model class Ovpayrefundhist
 * Path: screenbean/ovpayrefundhist
 * Model: com::uhc::aarp::fox::domain::screenbean::ovpayrefundhist::Ovpayrefundhist
 * Legacy Mapping: MAP-LINE
 */
export class Ovpayrefundhist {
  ma1bName = '';
  ma1bPageno = '';
  ma1bAcct = '';
  ma1bClno = '';
  ma1bStat = '';
  ma1bProp = '';
  ma1bImop = '';
  ma1bErrmsg = '';
  mapLines: Rpdma1bMapLine[] = [];
}
