import {Dfhcommarea} from '@fox/shared';
import {IcdCodeMnt} from './icd-code-mnt.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/icdcodemnt
 * Model: com::uhc::aarp::fox::domain::screenbean::icdcodemnt::Container
 */
export class Container {
  screenBean = new IcdCodeMnt();
  workStorage = new WorkStorage();
  dfhCommArea = new Dfhcommarea();
}
