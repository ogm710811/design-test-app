import {Dfhcommarea} from '@fox/shared';
import {ReportFileRecord} from './report-file-record.model';
import {Rpdmb96} from './rpdmb96.model';
import {WsCommarea} from './ws-commarea.model';
import {WsCompFields} from './ws-comp-fields.model';
import {WsDisplayFields} from './ws-display-fields.model';
import {WsErrorFields} from './ws-error-fields.model';
import {WsIndicatorFields} from './ws-indicator-fields.model';
import {WsScreenDate} from './ws-screen-date.model';

/**
 * Model class Container
 * Path: screenbean/qltyrvwrvlderrmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrmenu::Container
 */
export class Container {
  dfhCommarea = new Dfhcommarea();
  wsCommarea = new WsCommarea();
  wsCompFields = new WsCompFields();
  wsDisplayFields = new WsDisplayFields();
  wsErrorFields = new WsErrorFields();
  wsIndicatorFields = new WsIndicatorFields();
  reportFileRecord = new ReportFileRecord();
  wsScreenDate = new WsScreenDate();
  rpdmb96 = new Rpdmb96();
  redirectTo = '';
}
