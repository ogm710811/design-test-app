import {ServiceBillLines} from './service-bill-lines.model';

/**
 * Model class MedSuppEobMap
 * Path: screenbean/procclmmedsuppartbeob
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmmedsuppartbeob::MedSuppEobMap
 * Legacy Mapping: MED-SUPP-EOB-MAP
 */
export class MedSuppEobMap {
  mapCommandLine = '';
  wholeNameL = 0;
  wholeNameA = '';
  wholeName = '';
  accountNoL = 0;
  accountNoA = '';
  serviceBillLines: ServiceBillLines[] = [];
  maxAmtAssigneeL = 0;
  maxAmtAssigneeA = '';
  maxAmtAssignee = '';
  maxAmtAssignee9 = 0;
  irsBuwAmtL = 0;
  irsBuwAmtA = '';
  irsBuwAmt = '';
  irsBuwAmt9 = 0;
  subTotalL = 0;
  subTotalA = '';
  subTotal = '';
  subTotal9 = 0;
  assigneeAdjL = 0;
  assigneeAdjA = '';
  assigneeAdj = '';
  assigneeAdj9 = 0;
  adjClmNumL = 0;
  adjClmNumA = '';
  adjClmNum = '';
  adjustmentL = 0;
  adjustmentA = '';
  adjustment = '';
  adjustment9 = 0;
  assgneeTotBeneL = 0;
  assgneeTotBeneA = '';
  assgneeTotBene = '';
  assgneeTotBene9 = 0;
  totalBeneL = 0;
  totalBeneA = '';
  totalBene = '';
  totalBene9 = 0;
  errLineL = 0;
  errLineA = '';
  errLine = '';
  membNumber = '';
  assoc = '';
}
