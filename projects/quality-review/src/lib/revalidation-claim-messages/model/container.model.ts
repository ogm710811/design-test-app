import {Dfhcommarea} from '@fox/shared';
import {QltyRvwRvldClmMsg} from './qlty-rvw-rvld-clm-msg.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/qltyrvwrvldclmmsg
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvldclmmsg::Container
 */
export class Container {
  qltyRvwRvldClmMsg = new QltyRvwRvldClmMsg();
  dfhcommarea = new Dfhcommarea();
  workStorage = new WorkStorage();
  redirectTo = '';
}
