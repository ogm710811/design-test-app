import {Dfhcommarea} from '@fox/shared';
import {Rpdma91} from './rpdma91.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/setqltytmpltxcls
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltytmpltxcls::Container
 */
export class Container {
  workstorage = new WorkStorage();
  rpdma91o = new Rpdma91();
  cvcomSelection = '';
  cvcomType = '';
  cvcomValue = '';
  cvcomMaintStatus = '';
  cvcomVerifySwitch = '';
  cvcomReturnStatus = '';
  dfhcommarea = new Dfhcommarea();
}
