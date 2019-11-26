import {CommComm, Dfhcommarea, OperInfoCmnArea} from '@fox/shared';
import {Rpdma73o} from './rpdma73o.model';
import {SearchOperValue} from './search-oper-value.model';
import {WorkStorage} from './work-storage.model';
import {WsModuleCommarea} from './ws-module-commarea.model';

/**
 * Model class Container
 * Path: screenbean/operauthlimit
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthlimit::Container
 */
export class Container {
  workstorage = new WorkStorage();
  dfhcommarea = new Dfhcommarea();
  commcom = new CommComm();
  rpdma73o = new Rpdma73o();
  operinfocmnarea = new OperInfoCmnArea();
  wsmodulecommarea = new WsModuleCommarea();
  searchopervalue = new SearchOperValue();
}
