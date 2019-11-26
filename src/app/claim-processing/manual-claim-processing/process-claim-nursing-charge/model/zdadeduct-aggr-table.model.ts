import {Filler1} from './filler1.model';
import {ZDADeductFields} from './zdadeduct-fields.model';
import {ZDAMedSuppFields} from './zdamed-supp-fields.model';
/**
 * Model class ZDADeductAggrTable
 * Path: screenbean/procclmnursingchrgservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnursingchrgservice::ZDADeductAggrTable
 * Legacy Mapping: Z-D-A-DEDUCT-AGGR-TABLE
 */
export class ZDADeductAggrTable {
  zdAUpwardPtr = 0;
  filler1 = new Filler1();
  zdABasicPtr = 0;
  zdAPlanCode = '';
  zdADeductFields = new ZDADeductFields();
  zdAMedSuppFields = new ZDAMedSuppFields();
  zdALastMaintDate = 0;
  zdANextPtr = 0;
}
