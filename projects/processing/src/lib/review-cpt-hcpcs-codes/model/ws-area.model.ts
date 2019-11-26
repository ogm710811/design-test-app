import { WsBenefits } from './ws-benefits.model';

/**
 * Model class WsArea
 * Path: screenbean/rvwcpthcpcs
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwcpthcpcs::WsArea
 * Legacy Mapping: WS-AREA
 */
export class WsArea {
  commandEnteredInd = '';
  wsText = '';
  wsX = 0;
  wsCheckingMod1 = '';
  wsCheckingMod2 = '';
  wsCheckingMod3 = '';
  wsLen = 0;
  wsLengthCounter = 0;
  wsFieldLength = 0;
  spaceFound = '';
  wsBenefits = new WsBenefits();
}
