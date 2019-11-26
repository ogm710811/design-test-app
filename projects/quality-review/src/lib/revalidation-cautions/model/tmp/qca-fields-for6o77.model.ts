import { StringUtils } from '../../../services/string-utils.service';

/**
 * Model class QcaFieldsFor6o77
 * Path: screenbean/qltyrvwrvldcauti/tmp
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::tmp::QcaFieldsFor6o77
 * Legacy Mapping: QCA-FIELDS-FOR-6O77
 */
export class QcaFieldsFor6o77 {
  qcaScreenNo = 0;
  qcaChrgScreenNo = 0;
  qcaChargeFromDate = 0;
  qcaChargeToDate = 0;
  qcaMoreDupsInd = '';
  qcaBillAs: string[] = [];
  qcaNumOfDups: number[] = [];

  public isQcaMoreDups(): boolean {
    let qcaMoreDups = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    qcaMoreDups = StringUtils.trim(this.qcaMoreDupsInd) === initValue;
    return qcaMoreDups;
  }

  public setQcaMoreDups(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.qcaMoreDupsInd = initValue;
  }
}
