import {Dfhcommarea, OperatorFilePO} from '@fox/shared';
import {Rpdma74} from './rpdma74.model';
import {WorkStorage} from './work-storage.model';
import {WsModuleCommarea} from './ws-module-commarea.model';

/**
 * Model class Container
 * Path: screenbean/operauthcomb
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthcomb::Container
 */
export class Container {
  screenBean = new Rpdma74();
  dfhCommArea = new Dfhcommarea();
  workStorage = new WorkStorage();
  wsModuleCommarea = new WsModuleCommarea();
  operatorFileRecord = new OperatorFilePO();
}
