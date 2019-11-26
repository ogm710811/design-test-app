import {ABRBillsArea} from './abrbills-area.model';

/**
 * Model class WsBillsArea
 * Path: screenbean/procclmhospchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhospchrg::WsBillsArea
 * Legacy Mapping: WS-BILLS-AREA
 */
export class WsBillsArea {
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
  abRBillsArea = new ABRBillsArea();
}
