import {Dfhcommarea} from '@fox/shared';
import {ScreenBean} from './screen-bean.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/procclmsuspendclm
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmsuspendclm::Container
 */
export class Container {
  workstorage = new WorkStorage();
  dfhcomm = new Dfhcommarea();
  screenBean = new ScreenBean();
}
