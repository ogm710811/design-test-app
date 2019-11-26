// import { QltyInfoPO } from '../../common/pos/qlty-info-po.model';
import { GridReport } from './grid-report.model';
import { QualityErrorCommArea } from './quality-error-comm-area.model';
import { QualityFileRecord } from './quality-file-record.model';
import { WsChcWorkArea } from './ws-chc-work-area.model';
import { WsCompFields } from './ws-comp-fields.model';
import { WsDisplayFields } from './ws-display-fields.model';
import { WsErrorFields } from './ws-error-fields.model';
import { WsErrorsReasons } from './ws-errors-reasons.model';
import { WsIndicatorFields } from './ws-indicator-fields.model';
import { WsRecordsLayout } from './ws-records-layout.model';

/**
 * Model class WorkStorage
 * Path: screenbean/qltyrvwrvlderrrvw
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrrvw::WorkStorage
 */
export class WorkStorage {
  wsDisplayFields = new WsDisplayFields();
  wsRecordsLayout = new WsRecordsLayout();
  wsCompFields = new WsCompFields();
  wsErrorsReasons = new WsErrorsReasons();
  qualityFileRecord = new QualityFileRecord();
  qualityErrorCommArea = new QualityErrorCommArea();
  wsChcWorkArea = new WsChcWorkArea();
  qltyInfos = [];
  wsIndicatorFields = new WsIndicatorFields();
  gridReports: GridReport[] = [];
  qeDatep = new Date();
  wsErrorFields = new WsErrorFields();
}
