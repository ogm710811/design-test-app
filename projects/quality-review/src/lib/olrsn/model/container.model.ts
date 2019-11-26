import {Dfhcommarea} from '@fox/shared';
import {QltyRvwVolRsn} from './qlty-rvw-vol-rsn.model';
import {WorkStorage} from './work-storage.model';
import {WsCommarea} from './ws-commarea.model';

/**
 * Model class Container
 * Path: screenbean/qltyrvwvolrsn
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwvolrsn::Container
 */
export class Container {
  screenBean = new QltyRvwVolRsn();
  workStorage = new WorkStorage();
  dfhcommarea = new Dfhcommarea();
  wsCommarea = new WsCommarea();
}
