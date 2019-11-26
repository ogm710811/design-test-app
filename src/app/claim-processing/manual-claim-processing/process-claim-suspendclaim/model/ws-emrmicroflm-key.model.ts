import {WsEMRSequence} from './ws-emrsequence.model';

/**
 * Model class WsEMRMicroflmKey
 * Path: screenbean/procclmsuspendclm
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmsuspendclm::WsEMRMicroflmKey
 * Legacy Mapping: WS-E-M-R-MICROFLM-KEY
 */
export class WsEMRMicroflmKey {
  wsEMRJulianDate = 0;
  wsEMRLocation = 0;
  wsEMRCartridge = 0;
  wsEMRSequences: WsEMRSequence[] = [];
  wsEMROperatorIons = 0;
  wsEMRLastMaintDate = 0;
}
