import {Dfhcommarea} from '@fox/shared';
import {QltyRvwVol} from './qlty-rvw-vol.model';
import {WorkStorage} from './work-storage.model';
import {WsCommarea} from './ws-commarea.model';

/**
 * Model class Container
 * Path: screenbean/qltyrvwvol
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwvol::Container
 */
export class Container {
  screenBean = new QltyRvwVol();
  workStorage = new WorkStorage();
  dfhCommArea = new Dfhcommarea();
  wsCommarea = new WsCommarea();
}
