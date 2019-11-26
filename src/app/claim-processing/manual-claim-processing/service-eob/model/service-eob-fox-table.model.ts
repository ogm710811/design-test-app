import {TableColumnKind} from '@fox/shared';
import {ServiceEobFoxSingleSelect} from './service-eob-select-single.model';

export class ServiceEobFoxTable {
  key: string;
  headerText: string;
  kind: TableColumnKind;
  inputType?: string;
  dropDownOptions?: ServiceEobFoxSingleSelect[];
}
