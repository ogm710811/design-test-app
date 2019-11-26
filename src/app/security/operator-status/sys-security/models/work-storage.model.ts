import {OperStatCmnArea} from '@fox/shared';
import {MapData} from './map-data.model';
import {ProgramWorkAreas} from './program-work-areas.model';

/**
 * Model class WorkStorage
 * Path: screenbean/operstatsyssecur
 * Model: com::uhc::aarp::fox::domain::screenbean::operstatsyssecur::WorkStorage
 */
export class WorkStorage {
  programWorkAreas = new ProgramWorkAreas();
  screenDate = '';
  operStatCmnArea = new OperStatCmnArea();
  mapCommandLine = '';
  mapProcDate = '';
  mapSite = '';
  mapDiv = '';
  mapLoc = '';
  mapDatas: MapData[] = [];
  mapErrorLine = '';
  mapPf3Field = '';
  mapPf4Field = '';
  caBegDate = 0;
  cntr = 0;
  mapLineSub = 0;
  subFrom = 0;
  subTo = 0;
  subAmount = 0;
  sortCtr1 = 0;
  sortCtr2 = 0;
  sortSub1 = 0;
  sortSub2 = 0;
  sortSub3 = 0;
  clearInd = '';
}
