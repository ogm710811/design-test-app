/**
 * Model class EChargeLine
 * Path: oprecqr
 * Model: com::uhc::aarp::fox::domain::oprecQR::EChargeLine
 * Legacy Mapping: E-CHARGE-LINE
 */
export class EChargeLine {
  eplanCode = '';
  eserviceCode = '';
  etypeCode = '';
  eprovName = '';
  eservFromDt = new Date();
  eservToDt = new Date();
  eeligCharge = 0;
  enoServices = 0;
  ededAmt = 0;
  emedPmt = 0;
  epercentPd = 0;
  eprevConsInd = '';
  ebenefit = 0;
  eprevConsider = '';
  epossDup = '';
}
