import {OvpaymentCommonArea} from '../../model/ovpayment-common-area.model';
import {OvpayErrCodes} from './ovpay-err-codes.model';
import {WsErrCodes} from './ws-err-codes.model';

/**
 * Model class WorkStorage
 * Path: screenbean/ovpayerrorcodes
 * Model: com::uhc::aarp::fox::domain::screenbean::ovpayerrorcodes::WorkStorage
 * Legacy Mapping: WORK-AREAS
 */
export class WorkStorage {
  selectionErrorInd = '';
  lastDisplayInd = '';
  firstDisplayInd = '';
  sub = 0;
  wsResponseCode = 0;
  wsResp = 0;
  provnoteTsqResp = 0;
  wsErrCodes: WsErrCodes[] = [];
  ovpayerrcode = new OvpayErrCodes();
  common = new OvpaymentCommonArea();
}
