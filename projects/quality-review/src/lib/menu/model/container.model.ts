import {Dfhcommarea} from '@fox/shared';
import {QltyRvwRvldMenu} from './qlty-rvw-rvld-menu.model';
import {WorkArea} from './work-area.model';

/**
 * Model class Container
 * Path: screenbean/qltyrvwrvldmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyRvwRvldMenu::Container
 */
export class Container {
  wscommonarea = new Dfhcommarea();
  workStorage = new WorkArea();
  screenBean = new QltyRvwRvldMenu();
  redirectTo = '';
  nextClaimNumber: number = 0;
}
