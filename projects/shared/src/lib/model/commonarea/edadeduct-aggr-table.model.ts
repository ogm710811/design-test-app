/**
 * Model class EDADeductAggrTable
 * Path: rpd05040/beans/claimlogicaldb
 * Model: com::uhc::aarp::fox::domain::rpd05040::beans::claimLogicalDB::EDADeductAggrTable
 * Legacy Mapping: E-D-A-DEDUCT-AGGR-TABLE
 */
import {EDADeductFields} from './edadeduct-fields.model';
import {EDAMedSuppFields} from './edamed-supp-fields.model';

export class EDADeductAggrTable {
  edAUpwardPtr = 0;
  edABasicPtr = 0;
  edAPlanCode = '';
  edADeductFields = new EDADeductFields();
  edAMedSuppFields = new EDAMedSuppFields();
  edALastMaintDate = 0;
  edANextPtr = 0;
}
