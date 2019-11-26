import {Dfhcommarea} from '@fox/shared';
import {ScreenBean} from './screen-bean.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/qltyrvwrvldmiscinfo
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvldmiscinfo::Container
 */
export class Container {
  dfhCommarea = new Dfhcommarea();
  screenBean = new ScreenBean();
  workStorage = new WorkStorage();
  redirectTo = '';
  nextClaimNumber: number = 0;
}
