import {StringUtils} from '../../../services/string-utils.service';
import {EditFields} from './edit-fields.model';
import {EditInputField} from './edit-input-field.model';
import {EditOutputField} from './edit-output-field.model';

/**
 * Model class CompressScreenAmt
 * Path: screenbean/procclmdrugeobservice/compressscreenamt
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::compressscreenamt::CompressScreenAmt
 * Legacy Mapping: AMOUNT-COMPRESS
 */
export class CompressScreenAmt {
  editInputField = new EditInputField();
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
  decimalInd = 'N';
  validCharInd = 'N';
  compressErrorInd = 'N';

  public isDecimalAlreadyEntered(): boolean {
    let decimalAlreadyEntered = false;
    let initValue: string = '';
    initValue = 'Y';
    decimalAlreadyEntered = StringUtils.trim(this.decimalInd) === initValue;
    return decimalAlreadyEntered;
  }

  public setDecimalAlreadyEntered(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.decimalInd = initValue;
  }

  public isValidCharEntered(): boolean {
    let validCharEntered = false;
    let initValue: string = '';
    initValue = 'Y';
    validCharEntered = StringUtils.trim(this.validCharInd) === initValue;
    return validCharEntered;
  }

  public setValidCharEntered(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.validCharInd = initValue;
  }

  public isCompressError(): boolean {
    let compressError = false;
    let initValue: string = '';
    initValue = 'Y';
    compressError = StringUtils.trim(this.compressErrorInd) === initValue;
    return compressError;
  }

  public setCompressError(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.compressErrorInd = initValue;
  }
}
