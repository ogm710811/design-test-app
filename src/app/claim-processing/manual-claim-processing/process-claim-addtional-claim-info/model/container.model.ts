import {Dfhcommarea} from '@fox/shared';
import {Rpdmac7} from './rpdmac7.model';
import {WorkStorage} from './work-storage.model';

export class Container {
  workStorage = new WorkStorage();
  dfhCommArea = new Dfhcommarea();
  screenbean = new Rpdmac7();
}
