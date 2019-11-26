import { QeBeginKey } from './qe-begin-key.model';
import { QeDateTable } from './qe-date-table.model';

/**
 * Model class QualityErrorCommArea
 * Path: screenbean/qltyrvwrvlderrmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrmenu::QualityErrorCommArea
 * Legacy Mapping: QUALITY-ERROR-COMM-AREA
 */
export class QualityErrorCommArea {
  qeDateTables: QeDateTable[] = [];
  qeIonsId = 0;
  qeQrFlag = '';
  qeAllFlag = '';
  qeRepNumber = 0;
  qeBeginKey = new QeBeginKey();
  qeFirstKey = '';
  qeNextKey = '';
  qePageNum = 0;
  qeBeginDate = new Date();
}
