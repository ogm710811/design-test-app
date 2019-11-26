import {ABRBillsArea} from './abrbills-area.model';

/**
 * Model class CmnIOWrkArea
 * Path: screenbean/procclmhhcoohfgncov
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhhcoohfgncov::CmnIOWrkArea
 * Legacy Mapping: WS-BILLS-AREA
 */
export class CmnIOWrkArea {
  wcioIonsId = 0;
  wcioLocation = 0;
  wcioSubSystemInd = '';
  wcommand = '';
  wsegmentId = '';
  wbasicKey = 0;
  wclaimBatchNo = '';
  wnewBasicKey = 0;
  wreturnCde = '';
  wreturnMessage = '';
  werrorCondition = '';
  waction = 0;
  wdbFileInd = '';
  wdbFileKey = 0;
  wdbRecNbr = 0;
  filler3 = '';
  wmemIdKey = 0;
  wassocKey = '';
  winsuredCodeKey = '';
  abrBillsArea = new ABRBillsArea();
}
