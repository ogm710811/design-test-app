import {ReferenceValueVO} from '@fox/rest-clients';

export const importActionDropDown: ReferenceValueVO[] = [
  {
    id: 1, description: 'Retrieve Claim Notes', code: 'R', activeFlag: 'Y'
  },
  {
    id: 2, description: 'Update Claim Notes', code: 'U', activeFlag: 'Y'
  },
  {
    id: 3, description: 'Payment Report', code: 'P', activeFlag: 'Y'
  },
  {
    id: 4, description: 'Cancel Report', code: 'C', activeFlag: 'Y'
  }
];
