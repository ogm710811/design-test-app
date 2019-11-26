import {NioChPpEntry} from './nio-ch-pp-entry.model';
import {NioTos} from './nio-tos.model';
/**
 * Model class NioChargeLn
 * Path: screenbean/procclmnursingchrgservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnursingchrgservice::NioChargeLn
 * Legacy Mapping: NIO-CHARGE-LN
 */
export class NioChargeLn {
  nioScreenNum = 0;
  nioRendProvName = '';
  nioRendProvNpi = 0;
  nioTos = new NioTos();
  nioServiceFromDate = 0;
  nioServiceToDate = 0;
  nioNoOfShifts = 0;
  nioNoOfHours = 0;
  nioChargeAmt = 0;
  nioPreExistingInd = '';
  nioPrevConsideredPlans: string[] = [];
  nioPossibleDup = '';
  nioDupInd = '';
  nioCptCode = '';
  nioMod1 = '';
  nioMod2 = '';
  nioMod3 = '';
  nioMod4 = '';
  nioIcdPtr1 = 0;
  nioIcdPtr2 = 0;
  nioIcdPtr3 = 0;
  nioIcdPtr4 = 0;
  nioNoPayPlanCode = '';
  nioNoPayInd = 0;
  nioPpCnt = 0;
  nioChPpEntrys: NioChPpEntry[] = [];
}
