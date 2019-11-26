import {Clmovpaysel} from './../../model/clmovpaysel.model';
import {OvpaymentCommonArea} from './../../model/ovpayment-common-area.model';
import {WorkStorage} from './../../model/work-storage.model';
import {WsOpFields} from './../../model/ws-op-fields.model';
import {WsOpTsqWorkArea} from './../../model/ws-op-tsq-work-area.model';

/**
 * Model class Container
 * Path: screenbean/clmovpaysel
 * Model: com::uhc::aarp::fox::domain::screenbean::clmovpaysel::Container
 */
export class Container {
  workStorage = new WorkStorage();
  screen = new Clmovpaysel();
  wsOpFields = new WsOpFields();
  wsTsqWorkArea = new WsOpTsqWorkArea();
  commonArea = new OvpaymentCommonArea();
}
