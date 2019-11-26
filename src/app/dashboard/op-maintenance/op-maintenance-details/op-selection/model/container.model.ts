import {CommComm, Dfhcommarea, OperInfoCmnArea} from '@fox/shared';
import {Rpdma71} from './rpdma71.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/operselection
 * Model: com::uhc::aarp::fox::domain::screenbean::operselection::Container
 */
export class Container {
  workStorage = new WorkStorage();
  dfhCommonArea = new Dfhcommarea();
  commcomm = new CommComm();
  operinfocmnarea = new OperInfoCmnArea();
  rpdma71 = new Rpdma71();
}
