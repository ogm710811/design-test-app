import {IcdAreaIn} from './icd-area-in.model';
import {IcdIcdtVicdt01b} from './icd-icdt-vicdt01b.model';
import {IcdToFromSvcDts} from './icd-to-from-svc-dts.model';

/**
 * Model class LnkWrkStorageIcdCdDescRecord
 * Path: screenbean/rtrvicd
 * Model: com::uhc::aarp::fox::domain::screenbean::rtrvicd::LnkWrkStorageIcdCdDescRecord
 * Legacy Mapping: DFHCOMMAREA
 */
export class LnkWrkStorageIcdCdDescRecord {
  icdCallingPgm = '';
  icdToFromSvcDts = new IcdToFromSvcDts();
  icdSqlCode = 0;
  icdAreaIn = new IcdAreaIn();
  icdIcdtVicdt01b = new IcdIcdtVicdt01b();
  icdReturnCode = '';
  icdInIcdtErrCodes: string[] = [];
}
