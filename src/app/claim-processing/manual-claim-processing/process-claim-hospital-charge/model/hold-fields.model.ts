import {SortField1} from './sort-field1.model';
import {SortField2} from './sort-field2.model';
import {SortPtifField1} from './sort-ptif-field1.model';
import {SortPtifField2} from './sort-ptif-field2.model';
import {SplitFields1} from './split-fields1.model';
import {SplitFields2} from './split-fields2.model';
import {SplitLineFields} from './split-line-fields.model';

/**
 * Model class HoldFields
 * Path: screenbean/procclmhospchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhospchrg::HoldFields
 * Legacy Mapping: HOLD-FIELDS
 */
export class HoldFields {
  sortField1 = new SortField1();
  sortField2 = new SortField2();
  sortPtifField1 = new SortPtifField1();
  sortPtifField2 = new SortPtifField2();
  holdBillLine = '';
  ndays1 = 0;
  splitFields1 = new SplitFields1();
  splitFields2 = new SplitFields2();
  splitLineFields = new SplitLineFields();
  benFromDate = 0;
  bfromDate = 0;
  btoDate = 0;
  bdays = 0;
  benDays = 0;
}
