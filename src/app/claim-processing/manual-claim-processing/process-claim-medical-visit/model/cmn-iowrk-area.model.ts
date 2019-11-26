import {AllBillsArea} from './all-bills-area.model';

/**
 * Model class CmnIOWrkArea
 * Path: screenbean/procclmmedvisitchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmmedvisitchrg::CmnIOWrkArea
 * Legacy Mapping: WS-BILLS-AREA
 */
export class CmnIOWrkArea {
  AllBillsArea = new AllBillsArea();
  cioIonsId = 0;
  cioLocation = 0;
  cioSubSystemInd = '';
  command = '';
  segmentId = '';
  basicKey = 0;
  claimBatchNo = '';
  newBasicKey = 0;
  returnCde = '';
  returnMessage = '';
  errorCondition = '';
  action = 0;
}
