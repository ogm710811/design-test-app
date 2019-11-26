import {Dfhcommarea, DialModeCommLinkArea} from '@fox/shared';
import {RPDMAA1} from './rpdmaa1.model';
import {WorkStorage} from './work-storage.model';

export class Container {
  dfhcommarea = new Dfhcommarea();
  workStorage = new WorkStorage();
  screenBean = new RPDMAA1();
  dialmodecommlinkarea = new DialModeCommLinkArea();
}
