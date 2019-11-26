/**
 * Created by jxie4 on 4/15/19.
 */
import {PotentialDuplicateDetailsVO} from './potential-duplicate-details-vo';

export class BillLinesVO {
  lineKey = '';
  lineType = '';
  rxDosFromDt = '';
  rxDosToDt = '';
  rxChargeAmt = '';
  rxNdcNum = '';
  clmIcn = '';
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
  hospMcareHospIhd = '';
  claimNum = '';
  bilDosFromDt = '';
  bilDosToDt = '';
  bilNdcNum = '';
  bilCoinsAmt = '';
  bilPartBDedAmt = '';
  bilCptCd = '';
  bilModCd1 = '';
  bilModCd2 = '';
  bilModCd3 = '';
  bilModCd4 = '';
  bilFrequencyCd = '';
  bilFacilityCd = '';
  bilMcareHospDays2 = '';
  bilMcareHospIhd = '';
  potentialDuplicateBillLines: PotentialDuplicateDetailsVO[] = [];
}
