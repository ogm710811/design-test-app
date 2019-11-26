import { MapAttStaffWeek } from './map-att-staff-week.model';
import { MapInputData } from './map-input-data.model';
import { MapProdStaffWeek } from './map-prod-staff-week.model';

/**
 * Model class OperStat
 * Path: screenbean/operstat
 * Model: com::uhc::aarp::fox::domain::screenbean::operstat::OperStat
 */
export class OperStat {
  m95cmnd = '';
  m95mem1 = '';
  m95mem2 = '';
  m95mem3 = '';
  m95cno1 = '';
  m95cno2 = '';
  m95cno3 = '';
  m95cno4 = '';
  m95cno5 = '';
  m95cno6 = '';
  m95com1 = '';
  m95com2 = '';
  m95bdat = '';
  m95edat = '';
  m95lsit = '';
  m95site = '';
  m95ldiv = '';
  m95div = '';
  m95lloc = '';
  m95loc = '';
  m95last = '';
  m95lpst = '';
  m95tohr = '';
  m95toav = '';
  m95topa = '';
  m95tonp = '';
  m95todb = '';
  m95tosp = '';
  m95toqr = '';
  m95rvno = '';
  m95err1 = '';
  m95pfk = '';
  mapAttStaffWeeks: MapAttStaffWeek[] = [new MapAttStaffWeek(), new MapAttStaffWeek(), new MapAttStaffWeek(), new MapAttStaffWeek(), new MapAttStaffWeek(), new MapAttStaffWeek(), new MapAttStaffWeek()];
  mapProdStaffWeeks: MapProdStaffWeek[] = [new MapProdStaffWeek(), new MapProdStaffWeek(), new MapProdStaffWeek(), new MapProdStaffWeek(), new MapProdStaffWeek(), new MapProdStaffWeek(), new MapProdStaffWeek(), ];
  mapInputDatas: MapInputData[] = [];
}
