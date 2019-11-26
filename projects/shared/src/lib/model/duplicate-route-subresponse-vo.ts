/**
 * Created by jxie4 on 4/11/19.
 */

import {DupCheckDupBillLineVO} from './dupcheck-dupbillline-vo.model';

export class DuplicateSubResponseVO {
  billLineKey = '';
  dupIndicator = '';
  duplicateBillLines: DupCheckDupBillLineVO[] = [];
}
