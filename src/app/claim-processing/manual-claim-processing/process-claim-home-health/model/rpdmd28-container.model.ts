import {Dfhcommarea} from '@fox/shared';
import {ScreenSaveArea} from './screen-save-area.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Rpdmd28Container
 * Path: screenbean/procclmhhcoohfgncov
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhhcoohfgncov::Rpdmd28Container
 */
export class Rpdmd28Container {
  workStorage = new WorkStorage();
  screen = new ScreenSaveArea();
  dfhcommarea = new Dfhcommarea();
}
