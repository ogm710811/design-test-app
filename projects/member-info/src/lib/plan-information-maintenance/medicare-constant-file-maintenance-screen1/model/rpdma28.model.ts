import { McHospPeriodInfo28 } from './mdcrhospperiodinfo.model';
import { McSnfPrdInfo28 } from './mdcrcsnfprdinfo.model';

/**
 * Model class Rpdma28
 * Path: screenbean/medcrcnstmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::medcrcnstmnt::Rpdma28
 */
export class Rpdma28 {
  m28titl = '';
  m28eddt = '';
  m28stdt = '';
  m28aded = '';
  m28amsg = '';
  m28bded = '';
  m28bmsg = '';
  m28cper = '';
  m28cpem = '';
  m28cpvs = '';
  m28cpvm = '';
  m28bday = '';
  hospPrdInfoList: McHospPeriodInfo28[] = [];
  snfPrdInfoList: McSnfPrdInfo28[] = [];
  m28lst3 = '';
  m28led3 = '';
  m28lco3 = '';
  m28lms3 = '';
  m28lcv3 = '';
  m28err1 = '';
}
