import {NpPlanData} from './np-plan-data.model';
import {NpTypeOfService} from './np-type-of-service.model';
/**
 * Model class NpChargeLn
 * Path: screenbean/procclmnopaychrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnopaychrg::NpChargeLn
 * Legacy Mapping: NP-CHARGE-LN
 */
export class NpChargeLn {
  npScreenNum = 0;
  npRendProvName = '';
  npRendProvNpi = 0;
  npServiceFromDate = 0;
  npServiceToDate = 0;
  npPlanData = new NpPlanData();
  npTypeOfService = new NpTypeOfService();
  npChargeAmt = 0;
  npCptCode = '';
  npMod1 = '';
  npMod2 = '';
  npMod3 = '';
  npMod4 = '';
  npIcdPtr1 = 0;
  npIcdPtr2 = 0;
  npIcdPtr3 = 0;
  npIcdPtr4 = 0;
  npBillProvKey = 0;
  npNoPayInd = 0;
  npHaInd = '';
  npPpCnt = 0;
}
