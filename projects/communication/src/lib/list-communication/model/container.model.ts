import {RvwCmnctHistCommonArea} from './rvw-cmnct-hist-common-area.model';
import {RvwCmnctHist} from './rvw-cmnct-hist.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/rvwcmncthist
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwcmncthist::Container
 */
export class Container {
  screenbean = new RvwCmnctHist();
  commonArea = new RvwCmnctHistCommonArea();
  workstorage = new WorkStorage();
}
