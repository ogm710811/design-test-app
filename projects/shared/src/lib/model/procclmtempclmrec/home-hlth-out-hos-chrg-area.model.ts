import {HomeHealthChargeLine} from './home-health-charge-line.model';

/**
 * Model class HomeHlthOutHosChrgArea
 * Path: bean/procclmtempclmrec
 * Model: com::uhc::aarp::fox::domain::bean::procclmtempclmrec::HomeHlthOutHosChrgArea
 * Legacy Mapping: T-HOME-HLTH-OUT-HOS-CHRG-AREA
 */
export class HomeHlthOutHosChrgArea {
  thhChargeLines: HomeHealthChargeLine[] = [];
  thhPattPara2 = '';
  thhExclPlan2 = '';
  thhIcdCodes: string[] = [];
  thhExclPlan1 = '';
  thhBenePay = '';
  thhPattPara1 = '';
}
