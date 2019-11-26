import {NpioPlanData} from './npio-plan-data.model';
import {NpioTypeOfService} from './npio-type-of-service.model';
/**
 * Model class NpioChargeLn
 * Path: screenbean/procclmnopaychrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnopaychrg::NpioChargeLn
 * Legacy Mapping: NPIO-CHARGE-LN
 */
export class NpioChargeLn {
  npioScreenNum = 0;
  npioRendProvName = '';
  npioRendProvNpi = 0;
  npioServiceFromDate = 0;
  npioServiceToDate = 0;
  npioPlanData = new NpioPlanData();
  npioTypeOfService = new NpioTypeOfService();
  npioChargeAmt = 0;
  npioCptCode = '';
  npioMod1 = '';
  npioMod2 = '';
  npioMod3 = '';
  npioMod4 = '';
  npioIcdPtr1 = 0;
  npioIcdPtr2 = 0;
  npioIcdPtr3 = 0;
  npioIcdPtr4 = 0;
  npioBillProvKey = 0;
  npioNoPayInd = 0;
  npioHaInd = '';
  npioPpCnt = 0;
}
