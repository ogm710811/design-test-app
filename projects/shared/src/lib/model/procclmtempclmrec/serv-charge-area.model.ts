import {DrugsChargeArea} from './drugs-charge-area.model';
import {ExceptChargeArea} from './except-charge-area.model';
import {HomeHlthOutHosChrgArea} from './home-hlth-out-hos-chrg-area.model';
import {MedicalChargeArea} from './medical-charge-area.model';
import {NursingChargeArea} from './nursing-charge-area.model';

/**
 * Model class ServChargeArea
 * Path: bean/procclmtempclmrec
 * Model: com::uhc::aarp::fox::domain::bean::procclmtempclmrec::ServChargeArea
 * Legacy Mapping: T-SERV-CHARGE-AREA
 */
export class ServChargeArea {
  medicalChargeArea = new MedicalChargeArea();
  nursingChargeArea = new NursingChargeArea();
  drugsChargeArea = new DrugsChargeArea();
  homeHlthOutHosChrgArea = new HomeHlthOutHosChrgArea();
  exceptChargeArea = new ExceptChargeArea();
}
