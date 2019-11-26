import {OperatorFilePO} from '@fox/shared';
import {WsInputArea} from './ws-input-area.model';
import {WsName} from './ws-name.model';
import {WsOutputArea} from './ws-output-area.model';

/**
 * Model class WorkStorage
 * Path: screenbean/opermntmenuservice
 * Model: com::uhc::aarp::fox::domain::screenbean::opermntmenuservice::WorkStorage
 * Legacy Mapping: WORK-AREAS
 */

export class WorkStorage {
  wsCommCommLength = 0;
  wsIonsId = 0;
  wsCompareIons = '';
  wsComSecurity = '';
  wsDivision = '';
  wsLocation = 0;
  wsName = new WsName();
  wsInputArea = new WsInputArea();
  wsOutputArea = new WsOutputArea();
  validNameInd = '';
  blankInd = '';
  sub = 0;
  inSub = 0;
  outSub = 0;
  operatorRecList: OperatorFilePO[] = [];
}
