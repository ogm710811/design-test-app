import {ABRBillsArea} from './abrbills-area.model';

/**
 * Model class CmnIOWrkArea
 * Path: screenbean/procclmdrugeobservice/cmniowrkarea
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::cmniowrkarea::CmnIOWrkArea
 * Legacy Mapping: WS-BILLS-AREA
 */
export class CmnIOWrkArea {
  wcioIonsId = 0;
  wcioLocation = 0;
  wcioSubSystemInd = '';
  wcommand = '';
  wsegmentId = '';
  wnewBasicKey = 0;
  wreturnCde = '';
  wreturnMessage = '';
  werrorCondition = '';
  waction = 0;
  abRBillsArea = new ABRBillsArea();
  wmemIdKey = 0;
  wassocKey = '';
  winsuredCodeKey = '';
  wdbFileInd = '';
  wdbFileKey = 0;
  wdbRecNbr = 0;
  filler3 = '';
}
