import {DaChargeLine} from './da-charge-line.model';
import {ExtraTempFields} from './extra-temp-fields.model';
import {MippaAdditionalFields} from './mippa-additional-fields.model';
import {TempOprecRecord} from './temp-oprec-record.model';

/**
 * Model class ProcClmTempClmRec
 * Path: bean/procclmtempclmrec
 * Model: com::uhc::aarp::fox::domain::bean::procclmtempclmrec::ProcClmTempClmRec
 * Legacy Mapping: THE-TEMP-OPREC-RECORD
 */
export class ProcClmTempClmRec {
  temporaryOprecRecord = new TempOprecRecord();
  claimNo = 0;
  ionsId = 0;
  extraTempFields = new ExtraTempFields();
  mippaAdditionalFields = new MippaAdditionalFields();
  additionalTempFields = '';
  daChargeLines: DaChargeLine[] = [];
}
