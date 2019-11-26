import {EditFields} from './edit-fields.model';
import {EditInputField} from './edit-input-field.model';
import {EditOutputField} from './edit-output-field.model';

/**
 * Model class CompressScreenAmt
 * Path: screenbean/procclmmedsuppartbeob
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmmedsuppartbeob::CompressScreenAmt
 * Legacy Mapping: AMOUNT-COMPRESS
 */
export class CompressScreenAmt {
  editOutputField = new EditOutputField();
  editFields = new EditFields();
  editField10 = 0;
  editReturnCode = '';
  leftFields = 0;
  validLeftFieldLen = 0;
  posAfterDecimal = 0;
  editField6Pos = 0;
  editField7Pos = 0;
  editField8Pos = 0;
  editField9Pos = 0;
  editField10Pos = 0;
  inputFieldLen = 0;
  editSub = 0;
  outputSub = 0;
  saveSub = 0;
  compressSub = 0;
  decimalInd = '';
  validCharInd = '';
  compressErrorInd = '';
  editField6 = 0;
  editField7 = 0;
  editField8 = 0;
  editField9 = 0;
  editinputField = new EditInputField();
}
