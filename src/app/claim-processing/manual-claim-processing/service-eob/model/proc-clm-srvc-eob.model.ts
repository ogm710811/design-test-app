import {ServiceBillLines} from './service-bill-lines.model';

/**
 * Model class ProcClmSrvcEob
 * Path: screenbean/procclmsrvceob
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmsrvceob::ProcClmSrvcEob
 * Legacy Mapping: SERVICE-EOB-MAP
 */
export class ProcClmSrvcEob {
  wholeName = '';
  serviceBillLines: ServiceBillLines[] = [];
  maxAmtAssignee = '';
  irsBuwAmt = '';
  subTotal = '';
  assigneeAdj = '';
  adjClmNum = '';
  adjustment = '';
  assgneeTotBene = '';
  totalBene = '';
  errLine = '';
  membNumber = '';
  assoc = '';
  m33cmnd = '';
  m33mem1 = '';
  m33mem2 = '';
  m33mem3 = '';
  m33cno1 = '';
  m33cno2 = '';
  m33cno3 = '';
  m33cno4 = '';
  m33cno5 = '';
  m33cno6 = '';
  m33com1 = '';
  m33com2 = '';
}
