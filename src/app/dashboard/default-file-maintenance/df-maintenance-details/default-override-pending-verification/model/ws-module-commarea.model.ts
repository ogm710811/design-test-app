import { OpcommSelLevPos } from './opcomm-sel-lev-pos.model';
import { OpcommVerifs } from './opcomm-verifs.model';

/**
 * Model class WsModuleCommarea
 * Path: screenbean/dfltovrdpendverfservice
 * Model: com::uhc::aarp::fox::domain::screenbean::dfltovrdpendverfservice::WsModuleCommarea
 * Legacy Mapping: WS-MODULE-COMMAREA
 */
export class WsModuleCommarea {
  dfhMapSaveArea = '';
  dfhLinkageSwitch = '';
  opcommPos = 0;
  opcommCnt = 0;
  opcommSelIons = '';
  opcommSelIonsN = 0;
  opcommSelDiv = '';
  opcommSelLoc = '';
  opcommSelLevPos = new OpcommSelLevPos();
  opcommSelTem = '';
  opcommOverflowInd = '';
  opcommVerifs = new OpcommVerifs();
}
