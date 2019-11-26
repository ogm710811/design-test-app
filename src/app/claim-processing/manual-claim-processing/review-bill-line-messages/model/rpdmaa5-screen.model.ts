import {MapCommandLine} from './map-command-line.model';
import {Rpdmaa5} from './rpdmaa5.model';
import {Rpdmaa5Tab} from './rpdmaa5-tab.model';

export class Rpdmaa5Screen {
  maa5ErrL = 0;
  maa5ErrA = '';
  maa5ErrMsg = '';
  maa5Hdr = '';
  mapCommandLine = new MapCommandLine();
  rpdmaa5 = new Rpdmaa5();
  rpdmaa5Tabs: Rpdmaa5Tab[] = [];
}
