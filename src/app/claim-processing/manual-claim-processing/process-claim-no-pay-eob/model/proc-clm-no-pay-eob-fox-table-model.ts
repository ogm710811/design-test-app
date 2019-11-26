import {TableColumnKind} from '@fox/shared';
import {EOBFoxSingleSelect} from './proc-clm-no-pay-eob-selection';

export class NoPayEOBFoxTable {
  key: string;
  headerText: string;
  kind: TableColumnKind;
  inputType?: string;
  dropDownOptions?: EOBFoxSingleSelect[];
}
