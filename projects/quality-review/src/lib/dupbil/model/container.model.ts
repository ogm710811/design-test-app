import {Dfhcommarea} from '@fox/shared';
import {QltyRvwRvldDupBil} from './qlty-rvw-rvld-dup-bil.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/qltyrvwrvlddupbil
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyRvwRvldDupBil::Container
 */
export class Container {
  screenBean = new QltyRvwRvldDupBil();
  dfhcommarea = new Dfhcommarea();
  workStorage = new WorkStorage();
  redirectTo = '';
}
