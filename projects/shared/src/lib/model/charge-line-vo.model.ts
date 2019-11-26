import {ChargeLineVO as ChargeLineIF} from '@fox/rest-clients';

export class ChargeLineVO implements ChargeLineIF {
  facilityCode = '';
  dateOfServiceTo = '';
  deductibleIhd = '';
  medicareCoinsurance = '';
  modifier1 = '';
  modifier2 = '';
  medicareDeductible = '';
  modifier3 = '';
  modifier4 = '';
  coinsurance = '';
  dateOfServiceFrom = '';
  billedAmount = '';
  frequencyCode = '';
  icn = '';
  chargeAmount = '';
  ndcNum = '';
  cptCode = '';
  memberNumber = '';
  insuredCode = '';
  associationCode = '';
  typeOfService = '';
}
