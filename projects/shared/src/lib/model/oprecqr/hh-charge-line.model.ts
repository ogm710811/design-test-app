/**
 * Model class HhChargeLine
 * Path: oprecqr
 * Model: com::uhc::aarp::fox::domain::oprecQR::HhChargeLine
 * Legacy Mapping: HH-CHARGE-LINE
 */
export class HhChargeLine {
  hhServiceCode = '';
  hhTypeCode = '';
  hhProvName = '';
  hhServFromDt = new Date();
  hhServToDt = new Date();
  hhNoServices = 0;
  hhEligCharge = 0;
  hhPreExistInd = '';
  hhPrevConsider = '';
  hhPossDup = '';
}
