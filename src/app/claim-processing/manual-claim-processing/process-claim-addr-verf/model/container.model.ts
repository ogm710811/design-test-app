import {Dfhcommarea} from '@fox/shared';
import {Screen} from './screen.model';
import {WorkStorage} from './work-storage.model';

export class Container {
  dfhcommarea = new Dfhcommarea();
  screen = new Screen();
  workstorage = new WorkStorage();
}
