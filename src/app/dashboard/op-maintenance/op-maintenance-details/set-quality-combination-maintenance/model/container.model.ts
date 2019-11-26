import {Dfhcommarea} from '@fox/shared';
import {Rpdma78} from '../model/rpdma78.model';
import {WorkStorage} from '../model/work-storage.model';
import {WsModuleCommarea} from '../model/ws-module-commarea.model';

/**
 * Model class Container
 * Path: screenbean/setqltycomb
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltycomb::Container
 */
export class Container {
  workStorage = new WorkStorage();
  wsModuleCommarea = new WsModuleCommarea();
  screenBean = new Rpdma78();
  dfhCommArea = new Dfhcommarea();
}
