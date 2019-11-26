import {Dfhcommarea} from '@fox/shared';
import {OperAuthCombDflt} from './oper-auth-comb-dflt.model';
import {WorkStorage} from './work-storage.model';
import {WsModuleCommarea} from './ws-module-commarea.model';

/**
 * Model class Container
 * Path: screenbean/operauthcombdflt
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthcombdflt::Container
 */
export class Container {
  operAuthCombDflt = new OperAuthCombDflt();
  dfhCommArea = new Dfhcommarea();
  workStorage = new WorkStorage();
  wsModuleCommArea = new WsModuleCommarea();
}
