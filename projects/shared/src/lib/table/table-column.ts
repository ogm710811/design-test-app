import {TooltipMenuSettings} from '../fox-tooltip/fox-tooltip-models/tooltip-menu-settings';

export enum TableColumnKind {
  Text, Currency, CurrencyText, Date, Link, IconItem, MemberItem, Input, CheckBox, Dynamic, Images, NextLineText, Badges
}
export interface ColumnSettings {
  // How to format the contents of the column. Falls back to text if not present
  kind: TableColumnKind;
  // The key used to lookup table cell data from the data object.
  key: string;
  // The string that appears in the column header. Falls back to key if not present
  headerText?: string;
  // The key upon which to sort for the object (may be different from object key for server-side sorting
  sortKey?: string;
  // Whether or not to draw a right border on the column.
  border?: string;
  // The image file name which will be displayed before table cell data
  preImage?: string;
  // The Function which returns whether row is checked or not.
  isChecked?: Function;
  // For menu after the main body of the text
  menus?: {
    key?: string,
    title?: string,
    kind: string,
    visible?: (data: any) => boolean,
    disabled?: (data: any) => boolean
  }[];
  // Hide column top header border
  hideHeaderColumnBorder?: boolean;

  images?: {condition: (x: any) => boolean, image: string}[];
  // Tooltip to be displayed on preImage icon
  preImageToolTipKey?: string | TooltipMenuSettings;
  // Options to be provided for Dropdown
  dropDownOptions?: any[];
  // The Key that has to appear as label in dropdown. By Default it will look for 'label'
  dropDownLabel?: string;
  // The key that set to true, shows clear icon in dropdown
  dropDownClearable?: boolean;

  // Options to be disabled
  isDisabled?: false;
  // Options for the length of the input in Tex
  textLength?: 10000;
  // Options for double line
  isDoubleLine?: boolean;
  // Option for css double Line
  hasDoubleLine?: boolean;
  // Option to have a parent table header to mention colspan
  colSpanValue?: string;
  // Option for making row(s) read only Text
  readOnlyRows?: ReadOnlyRow[];
}

export interface StandardColumnSettings extends ColumnSettings {
  kind: TableColumnKind.Currency | TableColumnKind.Date | TableColumnKind.Link | TableColumnKind.IconItem | TableColumnKind.MemberItem | TableColumnKind.CheckBox | TableColumnKind.Text | TableColumnKind.CurrencyText | TableColumnKind.Images | TableColumnKind.Badges;
}
export interface InputColumnSettings extends ColumnSettings {
  kind: TableColumnKind.Input;
  // The type of the fox-input if the type is set to input. Ignored if type is not input. Defaults to text if none is
  // present when type is input
  inputType?: InputType;
  // The name of the formControl key when the type is input
  formControlName?: string;
}

export interface DynamicColumnSetting extends ColumnSettings {
  kind: TableColumnKind.Dynamic;
  dynamicKind: (rowData: any) => TableColumnKind;
}

export type TableColumn = StandardColumnSettings | InputColumnSettings | DynamicColumnSetting;

export interface ReadOnlyRow {
  // Id of the row that should be altered
  rowId: string;
  // Type of row to alter to
  rowType: TableColumnKind;
  // Column Id to be used if there is a column that should use default column configuration
  columnException?: string;
}

export enum InputType {
  DATE = 'fox-date',
  DATERANGE = 'fox-date-range',
  CURRENCY = 'fox-currency',
  MEMBERSHIP = 'fox-membership',
  CLAIM = 'fox-claim',
  PHONE = 'fox-phone',
  DROPDOWN = 'fox-dropdown',
  TEXT = 'text',
  SELECTSINGLE = 'fox-select-single',
  DATEMMYY = 'fox-date-mmyy'
}
