import {CommComm, OvPayCmnArea} from '@fox/shared';

/**
 * Model class OvpaymentCommonArea
 * Path: screenbean/ovpaymnt
 * Model: com::uhc::aarp::fox::domain::screenbean::ovpaymnt::OvpaymentCommonArea
 */
export class OvpaymentCommonArea {
  commComm = new CommComm();
  ovPayCmnArea = new OvPayCmnArea();
  eibTermId = '';
  errorCodeSel = '';
}
