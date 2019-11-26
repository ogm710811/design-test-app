import {IcdCodeDescriptionPO} from '@fox/shared';
import {IcdKey} from './icd-key.model';
import {IcdRecord} from './icd-record.model';
import {MapLines} from './map-lines.model';
import {WorkAreas} from './work-areas.model';

/**
 * Model class WorkStorage
 * Path: screenbean/rvwicdservice
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwIcdService::WorkStorage
 */
export class WorkStorage {
  icdKey = new IcdKey();
  workArea = new WorkAreas();
  eicdCode = '';
  icdRecord = new IcdRecord();
  icdCodeDes = new IcdCodeDescriptionPO();
  mapCommandLine = '';
  codePos: string[] = [];
  mapLines: MapLines[] = [];
  icdticdcd = new IcdCodeDescriptionPO();
  icdCd = new IcdCodeDescriptionPO();
}
