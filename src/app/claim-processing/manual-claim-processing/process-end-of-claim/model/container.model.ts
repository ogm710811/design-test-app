import {Dfhcommarea} from '@fox/shared';
import {Rpdmb37} from './rpdmb37.model';
import {WorkStorage} from './work-storage.model';

export class Container {
  dfhCommArea = new Dfhcommarea();
  rpdmb37 = new Rpdmb37();
  workStorage = new WorkStorage();
}
