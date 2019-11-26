import {CmnctSuspSegPO, CmnctSuspSegMicroReqPO, OperatorFilePO, RvwCmnctHistCommonArea} from '@fox/shared';
import {Rpdmb56} from './rpdmb56.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Rpdmb56Container
 * Path: screenbean/rvwcmncthistmisc
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwcmncthistmisc::Rpdmb56Container
 */
export class Rpdmb56Container {
  screenbean = new Rpdmb56();
  commonArea = new RvwCmnctHistCommonArea();
  workStorage = new WorkStorage();
  cmnctSuspSegPO = new CmnctSuspSegPO();
  operatorRecordPO = new OperatorFilePO();
  CmnctSuspSegMicroReqPO = new CmnctSuspSegMicroReqPO();
}
