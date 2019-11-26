import {ChargeLineVO} from './charge-line-vo.model';
import {DupCheckBillLineDetailsVO} from './duplicate-check-bill-line-details-vo.model';

export class DuplicateBillLinesForChargeVO extends ChargeLineVO {
  potentialDuplicateBillLines: DupCheckBillLineDetailsVO[] = [];
}
