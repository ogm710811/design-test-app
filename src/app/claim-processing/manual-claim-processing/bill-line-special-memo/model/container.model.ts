/**
 * Model class Container
 * Path: screenbean/blspecmemo
 * Model: com::uhc::aarp::fox::domain::screenbean::blspecmemo::Container
 */
import {Dfhcommarea} from '@fox/shared';
import {BLSpecMemo} from './blspec-memo.model';
import {WorkStorage} from './work-storage.model';

export class Container {
  workstorage = new WorkStorage();
  dfhcommarea = new Dfhcommarea();
  screen = new BLSpecMemo();
}
