import {EditFields} from './edit-fields.model';
import {EditOutputField} from './edit-output-field.model';

/**
 * Model class WorkArea
 * Path: screenbean/procclmxcptchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmxcptchrg::WorkArea
 * Legacy Mapping: WORK-AREA
 */
export class WorkArea {
  editOutputField = new EditOutputField();
  editFields = new EditFields();
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
}
