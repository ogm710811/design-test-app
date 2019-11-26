import {CommComm} from '@fox/shared';
import {QualityErrorCommArea} from './quality-error-comm-area.model';

/**
 * Model class WsCommarea
 * Path: screenbean/qltyrvwrvlderrrvw
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrrvw::WsCommarea
 * Legacy Mapping: WS-COMMAREA
 */
export class WsCommarea {
  commComm = new CommComm();
  mapSaveArea = '';
  linkageSwitch = '';
  qualityErrorCommArea = new QualityErrorCommArea();
}
