import {NcChPpEntry} from './nc-ch-pp-entry.model';
import {NcTos} from './nc-tos.model';
/**
 * Model class NcChargeLn
 * Path: screenbean/procclmnursingchrgservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnursingchrgservice::NcChargeLn
 * Legacy Mapping: NC-CHARGE-LN
 */
export class NcChargeLn {
  ncScreenNum = 0;
  ncRendProvName = '';
  ncRendProvNpi = 0;
  ncTos = new NcTos();
  ncServiceFromDate = 0;
  ncServiceToDate = 0;
  ncNoOfShifts = 0;
  ncNoOfHours = 0;
  ncChargeAmt = 0;
  ncPreExistingInd = '';
  ncPrevConsideredPlans: string[] = [];
  ncPossibleDup = '';
  ncDupInd = '';
  ncCptCode = '';
  ncMod1 = '';
  ncMod2 = '';
  ncMod3 = '';
  ncMod4 = '';
  ncIcdPtr1 = 0;
  ncIcdPtr2 = 0;
  ncIcdPtr3 = 0;
  ncIcdPtr4 = 0;
  ncNoPayPlanCode = '';
  ncNoPayInd = 0;
  ncPpCnt = 0;
  ncChPpEntrys: NcChPpEntry[] = [];
}
