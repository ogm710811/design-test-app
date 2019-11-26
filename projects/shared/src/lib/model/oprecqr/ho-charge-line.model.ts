/**
 * Model class HoChargeLine
 * Path: oprecqr
 * Model: com::uhc::aarp::fox::domain::oprecQR::HoChargeLine
 * Legacy Mapping: HO-CHARGE-LINE
 */
export class HoChargeLine {
  hoProvTin = '';
  hoProvName = '';
  hoProvType = '';
  hoProvKey = 0;
  hoAcceptCode1 = '';
  hoAcceptCode2 = '';
  hoServFromDate = new Date();
  hoServToDate = new Date();
  hoServiceDays = 0;
  hoPreExistInd = '';
  hoEligCharge = 0;
  hoIcuFromDate = new Date();
  hoIcuToDate = new Date();
  hoIcuDays = 0;
  hoDateOfSurgery = new Date();
  hoMedIhd = '';
  hoMedDaysArea = '';
  hoDischargeInd = '';
  hoSnfDay18 = 0;
  hoSnfDay120 = 0;
  hoSnfDay9150 = 0;
  hoSnfDay21100 = 0;
  hoSnfOver150Days = 0;
  hoSnfOver100 = 0;
  hoExclPlan1 = '';
  hoExclPlan2 = '';
  hoPrevConsider = '';
  hoPossDup = '';
}
