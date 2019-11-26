import {TableColumnKind} from '@fox/shared';
import {HospSnfFoxSingleSelect} from './proc-clm-hosp-snf-select-single.model';

export class HospSnfFoxTable {
  key: string;
  headerText: string;
  kind: TableColumnKind;
  inputType?: string;
  dropDownOptions?: HospSnfFoxSingleSelect[];
}
