import {Dfhcommarea} from '@fox/shared';
import {ScreenMap} from './setqltytmplt/screen-map.model';
import {WsModuleCommarea} from './wsmodulecommarea/ws-module-commarea.model';

/**
 * Model class Container
 * Path: screenbean/setqltytmpltservice
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltytmpltservice::Container
 */
export class Container {
  dfhcommarea = new Dfhcommarea();
  screenMap = new ScreenMap();
  wsModuleCommarea = new WsModuleCommarea();
  eibaid = '';
}
