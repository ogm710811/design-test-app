import {ClaimNumberRangeFileRecordSequence} from './claim-number-range-file-record-sequence.model';

/**
 * Model class ClaimNumberRangeFileRecord
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::ClaimNumberRangeFileRecord
 * Legacy Mapping: EX-MICROFLM-SEG
 */
export class ClaimNumberRangeFileRecord {
  sequences: ClaimNumberRangeFileRecordSequence[] = [];
  operatorIons = 0;
  lastMaintDate = 0;
  julianDate = 0;
  location = 0;
  cartridge = 0;
}
