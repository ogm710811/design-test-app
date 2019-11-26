import {TableColumnKind} from './table-column';

export const testColumnData = [
  {
    headerText: 'Hospital - Medicare',
    colSpanValue: '5',
    border: true
  },
  {
    headerText: '',
    colSpanValue: '1',
    border: true
  },
  {
    headerText: '',
    colSpanValue: '1',
    border: true
  },
  {
    headerText: 'SNF - Medicare',
    colSpanValue: '3',
    border: true
  },
  {
    headerText: 'Excluded',
    colSpanValue: '2',
    border: true
  },
  {
    headerText: '',
    colSpanValue: '1',
    border: true
  },
  {
    headerText: '',
    colSpanValue: '1',
    border: true
  },
  {
    headerText: '',
    colSpanValue: '1',
    border: true
  }
];

export const testHospitalInputColumns: any[] = [
  {
    key: 'ihd',
    headerText: '1',
    boarder: false,
    kind: TableColumnKind.Input,
    inputType: 'text'
  },
  {
    key: 'ho2',
    headerText: '2-60',
    boarder: false,
    kind: TableColumnKind.Input,
    inputType: 'text'
  },
  {
    key: 'ho6',
    headerText: '61-90',
    boarder: false,
    kind: TableColumnKind.Input,
    inputType: 'text'
  },
  {
    key: 'hog',
    headerText: '>90',
    boarder: false,
    kind: TableColumnKind.Input,
    inputType: 'text'
  },
  {
    key: 'ltr',
    headerText: 'Ltr',
    boarder: false,
    kind: TableColumnKind.Input,
    inputType: 'text'
  },
  {
    key: 'chg',
    headerText: 'Eligible Charge',
    isDoubleLine: true,
    border: false,
    kind: TableColumnKind.Input,
    inputType: 'fox-currency'
  },
  {
    key: 'opt',
    headerText: 'Letter Opt',
    isDoubleLine: true,
    border: false,
    kind: TableColumnKind.Input,
    inputType: 'text'
  },
  {
    key: 'sn1',
    headerText: '1-20',
    boarder: false,
    kind: TableColumnKind.Input,
    inputType: 'text'
  },
  {
    key: 'sn2',
    headerText: '21-100',
    boarder: false,
    kind: TableColumnKind.Input,
    inputType: 'text'
  },
  {
    key: 'sng',
    headerText: '>100',
    boarder: false,
    kind: TableColumnKind.Input,
    inputType: 'text'
  },
  {
    key: 'ex1',
    headerText: 'Plan1',
    boarder: false,
    kind: TableColumnKind.Input,
    inputType: 'text'
  },
  {
    key: 'ex2',
    headerText: 'Plan2',
    boarder: false,
    kind: TableColumnKind.Input,
    inputType: 'text'
  },
  {
    key: 'dcb',
    headerText: 'Dischrge Recovery',
    border: false,
    isDoubleLine: true,
    kind: TableColumnKind.Input,
    inputType: 'text'
  },
  {
    key: 'noPayInd',
    headerText: 'NoPay Indicator',
    border: false,
    isDoubleLine: true,
    kind: TableColumnKind.Input,
    inputType: 'text'
  },
  {
    key: 'noPayPln',
    headerText: 'NoPay Plan',
    border: false,
    isDoubleLine: true,
    kind: TableColumnKind.Input,
    inputType: 'text'
  }
];
