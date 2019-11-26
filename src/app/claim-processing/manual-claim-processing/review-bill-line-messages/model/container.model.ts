import {Dfhcommarea} from '@fox/shared';
import {Rpdmaa5Screen} from './rpdmaa5-screen.model';
import {WorkStorage} from './work-storage.model';

export class Container {
  workStorage = new WorkStorage();
  commonArea = new Dfhcommarea();
  rpdmaa5Screen = new Rpdmaa5Screen();
}
