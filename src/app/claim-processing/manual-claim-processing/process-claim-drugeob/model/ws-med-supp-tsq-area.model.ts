import {WsMedSupTsqRecMedcrSuplChrgBenLnTSQ} from './ws-med-sup-tsq-rec-medcr-supl-chrg-ben-ln-tsq.model';
import {WsMedSuppChargeLine} from './ws-med-supp-charge-line.model';

/**
 * Model class WsMedSuppTsqArea
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::WsMedSuppTsqArea
 * Legacy Mapping: WS-MED-SUPP-TSQ-AREA
 */
export class WsMedSuppTsqArea {
  wsMedSuppTsqRec = new WsMedSupTsqRecMedcrSuplChrgBenLnTSQ();
  wsMedSuppChargeLines: WsMedSuppChargeLine[] = [];
}
