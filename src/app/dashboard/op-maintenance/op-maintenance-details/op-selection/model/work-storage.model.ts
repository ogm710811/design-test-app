import { MapSelection } from './map-selection.model';
import { NameInTbl } from './name-in-tbl.model';
import { NameTableOut } from './name-table-out.model';
import { WsNameHold } from './ws-name-hold.model';

/**
 * Model class WorkStorage
 * Path: screenbean/operselection
 * Model: com::uhc::aarp::fox::domain::screenbean::operselection::WorkStorage
 */
export class WorkStorage {
  lastNameLen = 0;
  firstNameLen = 0;
  holdNameLen = 0;
  wsIons = 0;
  wsIonsP = 0;
  wsFileName = '';
  wsSelect = 0;
  wsLocation = 0;
  wsComSecurity = '';
  wsAuthLocation = 0;
  ws1st2Positions = '';
  wsSite = '';
  wsKeyLname = '';
  wsKeyFname = '';
  mapSelections: MapSelection[] = [];
  operatorEofSw = '';
  noMoreRecsSw = '';
  nameSwitch = '';
  lenSwitch = '';
  pf4Switch = '';
  clearSwitch = '';
  pf1FromOtherModSw = '';
  sub = 0;
  subIn = 0;
  subOut = 0;
  subCheck = 0;
  mapSub = 0;
  lastNameIn = '';
  commaIn = '';
  firstNameIn = '';
  ioErrorMsgfile = '';
  notOpenFile = '';
  recordFile = '';
  wsNameHolds: WsNameHold[] = [];
  nameTableOuts: NameTableOut[] = [];
  nameInTbls: NameInTbl[] = [];
  program = '';
}
