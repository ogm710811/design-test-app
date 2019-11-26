import {
  Dfhcommarea,
  OperDfltCmnArea
} from '@fox/shared';
import {CommComm} from '../../../model/comm-comm.model';
import {OperdefMiscFields} from './operdef-misc-fields.model';
import {Rpdma66} from './rpdma66.model';
import {WorkStorage} from './work-storage.model';
import {WsModuleCommarea} from './ws-module-commarea.model';

/**
 * Model class Container
 * Path: screenbean/dfltovrdpendverfservice
 * Model: com::uhc::aarp::fox::domain::screenbean::dfltovrdpendverfservice::Container
 */
export class Container {
  workStorage = new WorkStorage();
  dfhCommonArea = new Dfhcommarea();
  rpdma66 = new Rpdma66();
  commcomm = new CommComm();
  operdefmiscfields = new OperdefMiscFields();
  operdfltcmnarea = new OperDfltCmnArea();
  wsModuleCommarea = new WsModuleCommarea();
}
