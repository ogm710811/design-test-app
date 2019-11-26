/**
 * Model class AddrHistElement
 * Path: bean/tsq/address
 * Model: com::uhc::aarp::fox::domain::bean::tsq::address::AddrHistElement
 * Legacy Mapping: ADDR-HIST-ELEMENT
 */
export class AddrHistElement {
  addrHistState = '';
  addrHistStartDate = '';
  addrHistStopDate = '';
  addrHistCaution60Ind = '';
  addrHistExceptTos: string[] = [];
  addrHistExceptPlanGrs: string[] = [];
}
