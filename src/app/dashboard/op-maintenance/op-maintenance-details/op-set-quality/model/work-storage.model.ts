// import { OperDfltOvrdCvSqLettersPO } from '../../common/pos/oper-dflt-ovrd-cv-sq-letters-po.model';
// import { OperDfltOvrdPO } from '../../common/pos/oper-dflt-ovrd-po.model';
import {PayNopayPercentFields} from './pay-nopay-percent-fields.model';
import {StoreWholePercent} from './store-whole-percent.model';
import {WsAmountFields} from './ws-amount-fields.model';

/**
 * Model class WorkStorage
 * Path: screenbean/setqlty
 * Model: com::uhc::aarp::fox::domain::screenbean::setqlty::WorkStorage
 */
export class WorkStorage {
  wsLongMsg1 = '';
  wsLongMsg2 = '';
  sub = 0;
  sub1 = 0;
  searchOperLevel = 0;
  searchOperPos = '';
  wsMsgCtr = 0;
  wsMsgDefaultCtr = 0;
  wsCmsgCtr = 0;
  wsCmsgDefaultCtr = 0;
  wsPalCtr = 0;
  wsPalDefaultCtr = 0;
  wsFileName = '';
  wsUnpackAmt = 0;
  wsUnpackPct = 0;
  wsUnpackIons = 0;
  wsUnpackMsg = 0;
  wsUnpackCmsg = 0;
  wsUnpackPals = '';
  compareWsUnpackAmt = 0;
  compareWsUnpackPct = 0;
  compareWsUnpackMsg = 0;
  compareWsUnpackCmsg = 0;
  wsUnpackLocation = 0;
  warningCt = 0;
  wsHoldPct = 0;
  mapHoldAmt = '';
  mapHoldPct = '';
  qjrlRecLen = 0;
  wsLempaLen = 0;
  lempaLen = 0;
  rbaFld = 0;
  warningHold = 0;
  wsResponseCode = 0;
  holdPercntPct = 0;
  holdPercent = '';
  formatPercent = '';
  wsDateArea = 0;
  wsMaintMm = 0;
  wsMaintDd = 0;
  wsMaintYy = 0;
   // operDfltOvrd = new OperDfltOvrdPO();
   // operDfltOvrdCvSqLettersPO = new OperDfltOvrdCvSqLettersPO();
  payNopayPercentFields = new PayNopayPercentFields();
  storeWholePercent = new StoreWholePercent();
  wsAmountFields = new WsAmountFields();
  operCode = '';
  operName = '';
}
