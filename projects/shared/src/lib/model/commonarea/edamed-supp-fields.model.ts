import {EDAMedSuppYearTable} from './edamed-supp-year-table.model';
import {EDAMedSuppYearTable2} from './edamed-supp-year-table2.model';

/**
 * Model class EDAMedSuppFields
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::EDAMedSuppFields
 * Legacy Mapping: E-D-A-MED-SUPP-FIELDS
 */
export class EDAMedSuppFields {
  edaTripDeductible = 0;
  edaTripAggregate = 0;
  edaMedSuppYearTables: EDAMedSuppYearTable[] = [];
  edaMedSuppYearTable2s: EDAMedSuppYearTable2[] = [];
  edaTripDate = '';
}
