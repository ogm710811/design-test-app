import {Dfhcommarea} from '@fox/shared';
import {QltyRvwRvldErrMnt} from './qlty-rvw-rvld-err-mnt.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/qltyrvwrvlderrmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyRvwRvldErrMnt::Container
 * Legacy Mapping: WS-COMMAREA
 */
export class Container {
  screenBean = new QltyRvwRvldErrMnt();
  dfhcommarea = new Dfhcommarea();
  workStorage = new WorkStorage();
  redirectTo = '';
}
