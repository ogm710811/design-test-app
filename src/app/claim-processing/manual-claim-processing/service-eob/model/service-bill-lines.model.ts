/**
 * Model class ServiceBillLines
 * Path: screenbean/procclmsrvceob
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmsrvceob::ServiceBillLines
 * Legacy Mapping: SERVICE-BILL-LINES
 */
export class ServiceBillLines {
  plan: string;
  providerName: string;
  noOfServ: string;
  charge: string;
  covExp: string;
  dedSatisfied: string;
  copayAmt: string;
  benefit: string;
  assignInd: string;
  serviceCode: string;
  typeCode: string;
  dos1: string;
  dos2: string;
  validateFdos: string;
  validateTdos: string;
  dateOfService?: string;
  serialNo?: number;
}
