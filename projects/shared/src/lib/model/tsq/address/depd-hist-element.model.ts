/**
 * Model class DepdHistElement
 * Path: bean/tsq/address
 * Model: com::uhc::aarp::fox::domain::bean::tsq::address::DepdHistElement
 * Legacy Mapping: DEPD-HIST-ELEMENT
 */
export class DepdHistElement {
  depdHistState = '';
  depdHistStartDate = '';
  depdHistStopDate = '';
  depdHistCaution60Ind = '';
  depdHistExceptTos: string[] = [];
  depdHistExceptPlanGrs: string[] = [];
}
