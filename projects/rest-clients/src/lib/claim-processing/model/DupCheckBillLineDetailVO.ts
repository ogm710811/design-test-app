export interface DupCheckBillLineDetailVO {
  bilMcareHospDays2?: any;
  bilMcareHospIhd?: any;
  bilNdcNum?: any;
  claimId?: any;  // chKey
  lineKey?: any;
  lineType?: any;
  rxDosFromDt?: any;
  rxDosToDt?: any;
  rxChargeAmt?: any;
  rxNdcNum?: any;
  clmIcn?: any;
  claimNum?: any;
  profDosFromDt?: any;
  profDosToDt?: any;
  profChargeAmt?: any;
  profCoinsAmt?: any;
  profMcareDedAmt?: any;
  profCptCd?: any;
  profModCd1?: any;
  profModCd2?: any;
  profModCd3?: any;
  profModCd4?: any;
  hospDosFromDt?: any;
  hospDosToDt?: any;
  hospFacilityCd?: any;
  hospFrequencyCd?: any;
  hospMcareHospDays2?: any;
  hospMcareHspIhd?: any;
  bilCoinsAmt?: any;
  bilPartBDedAmt?: any;
  bilCptCd?: any;
  bilModCd1?: any;
  bilModCd2?: any;
  bilModCd3?: any;
  bilModCd4?: any;
  bilFacilityCd?: any;
  bilFrequencyCd?: any;
  chargeKeyType?: any; // chargeType at the claim level, but need to put at the bill line level too.
  billLineHistoryKey?: any; // blh_key from the bil_hist2 table to send to GetBillLineService.
  billLineKeyAcctPartNum?: any; // blh_key and acct part num value fields received from GetDuplicate_Search service.
  billLineType?: any; // lineType in the bill line level
  chargeKey?: any;
  bilDosFromDt?: any;
  bilDosToDt?: any;
  bilChargeAmt?: any;
}
