import {Dfhcommarea} from '@fox/shared';
import {ProcClmMedSupPtBChrgB} from './proc-clm-med-sup-pt-bchrg-b.model';
import {ScreenSaveArea} from './screen-save-area.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/procclmmedsupptbchrgb
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmmedsupptbchrgb::Container
 */
export class Container {
  workStorage = new WorkStorage();
  dfhcommarea = new Dfhcommarea();
  screenSaveArea = new ScreenSaveArea();
  procClmMedSupPtBChrgB = new ProcClmMedSupPtBChrgB();
}
