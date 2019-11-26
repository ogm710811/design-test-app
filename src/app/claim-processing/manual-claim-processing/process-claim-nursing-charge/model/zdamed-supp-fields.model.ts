import {ZDAMedSuppYearTable} from './zdamed-supp-year-table.model';
import {ZDAMedSuppYearTable2} from './zdamed-supp-year-table2.model';
/**
 * Model class ZDAMedSuppFields
 * Path: screenbean/procclmnursingchrgservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnursingchrgservice::ZDAMedSuppFields
 * Legacy Mapping: Z-D-A-MED-SUPP-FIELDS
 */
export class ZDAMedSuppFields {
  zdATripDate = 0;
  zdATripDeductible = 0;
  zdATripAggregate = 0;
  zdAMedSuppYearTables: ZDAMedSuppYearTable[] = [];
  zdAMedSuppYearTable2s: ZDAMedSuppYearTable2[] = [];
}
