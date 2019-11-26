import {BenModVO} from '@fox/rest-clients';

export class InsurancePlanModification {
  benefitModifications: Array<BenModVO> = [];
  planCode: string = '';
}
