import {DayTable} from './day-table.model';
import {EndOfMonth} from './end-of-month.model';
import {Filler181} from './filler181.model';
import {HoldServiceFromDateYm} from './hold-service-from-date-ym.model';
import {HoldServiceFromDate} from './hold-service-from-date.model';
import {HoldServiceToDateYm} from './hold-service-to-date-ym.model';
import {HoldServiceToDate} from './hold-service-to-date.model';
import {LesDayTable} from './les-day-table.model';
import {SaveBillFromMdy} from './save-bill-from-mdy.model';
import {SaveBillFromYmd} from './save-bill-from-ymd.model';
import {SaveBillToMdy} from './save-bill-to-mdy.model';
import {SaveBillToYmd} from './save-bill-to-ymd.model';
import {WsAbrBillFromDateJul} from './ws-abr-bill-from-date-jul.model';
import {WsAbrBillToDateJul} from './ws-abr-bill-to-date-jul.model';
import {WsCurrentDate} from './ws-current-date.model';
import {WsTosFromDateJulian} from './ws-tos-from-date-julian.model';
import {WsTosToDateJulian} from './ws-tos-to-date-julian.model';
/**
 * Model class WsJulianDateFields
 * Path: screenbean/procclmtos/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmtos::beansWs::WsJulianDateFields
 * Legacy Mapping: WS-JULIAN-DATE-FIELDS
 */
export class WsJulianDateFields {
  endOfMonth = new EndOfMonth();
  wsJulDate = 0;
  dayTable = new DayTable();
  lesDayTable = new LesDayTable();
  wsAbrBillFromDateJul = new WsAbrBillFromDateJul();
  wsAbrBillFromDateJulNum = 0;
  wsAbrBillToDateJul = new WsAbrBillToDateJul();
  wsAbrBillToDateJulNum = 0;
  saveBillFromMdy = new SaveBillFromMdy();
  saveBillToMdy = new SaveBillToMdy();
  saveBillFromYmd = new SaveBillFromYmd();
  saveBillToYmd = new SaveBillToYmd();
  wsTosFromDateJulian = new WsTosFromDateJulian();
  wsTosFromDateJulianNum = 0;
  wsTosToDateJulian = new WsTosToDateJulian();
  wsTosToDateJulianNum = 0;
  holdServiceFromDate = new HoldServiceFromDate();
  holdServiceToDate = new HoldServiceToDate();
  holdServiceFromDateYm = new HoldServiceFromDateYm();
  holdServiceToDateYm = new HoldServiceToDateYm();
  wsCurrentDate = new WsCurrentDate();
  microfilmFekJulianDate = 0;
  filler181 = new Filler181();
}
