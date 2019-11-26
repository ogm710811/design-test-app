import {DupCheckBillLineDetailVO} from '@fox/rest-clients';

export class DupCheckBillLineDetailsVO implements DupCheckBillLineDetailVO {
  bilMcareHospDays2 = '';
  bilMcareHospIhd = '';
  bilNdcNum = '';
  claimId = '';  // chKey
  lineKey = '';
  lineType = '';
  rxDosFromDt = '';
  rxDosToDt = '';
  rxChargeAmt = '';
  rxNdcNum = '';
  clmIcn = '';
  claimNum = '';
  profDosFromDt = '';
  profDosToDt = '';
  profChargeAmt = '';
  profCoinsAmt = '';
  profMcareDedAmt = '';
  profCptCd = '';
  profModCd1 = '';
  profModCd2 = '';
  profModCd3 = '';
  profModCd4 = '';
  hospDosFromDt = '';
  hospDosToDt = '';
  hospFacilityCd = '';
  hospFrequencyCd = '';
  hospMcareHospDays2 = '';
  hospMcareHspIhd = '';
  bilCoinsAmt = '';
  bilPartBDedAmt = '';
  bilCptCd = '';
  bilModCd1 = '';
  bilModCd2 = '';
  bilModCd3 = '';
  bilModCd4 = '';
  bilFacilityCd = '';
  bilFrequencyCd = '';
  chargeKeyType = ''; // chargeType at the claim level, but need to put at the bill line level too.
  billLineHistoryKey = ''; // blh_key from the bil_hist2 table to send to GetBillLineService.
  billLineKeyAcctPartNum = ''; // blh_key and acct part num value fields received from GetDuplicate_Search service.
  billLineType = ''; // lineType in the bill line level
  chargeKey = '';
  bilDosFromDt = '';
  bilDosToDt = '';
  bilChargeAmt = '';
}
