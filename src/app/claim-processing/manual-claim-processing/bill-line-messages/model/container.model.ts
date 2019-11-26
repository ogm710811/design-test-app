import {Dfhcommarea} from '@fox/shared';
import {Blmessages} from './blmessages.model';
import {WorkStorage} from './work-storage.model';

export class Container {
  screen = new Blmessages();
  workStorage = new WorkStorage();
  commonArea = new Dfhcommarea();
  eibAid = '';
}
