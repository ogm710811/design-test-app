import { StringUtils } from '../../services/string-utils.service';
import { EditFields } from './edit-fields.model';
import { EditOutputField } from './edit-output-field.model';

/**
 * Model class CompressScreenAmt
 * Path: screenbean/qltyrvwoperstat
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwoperstat::CompressScreenAmt
 * Legacy Mapping: COPY-AMTCOMPD
 */
export class CompressScreenAmt {
  editOutputField = new EditOutputField();
  editFields = new EditFields();
  editFields6 = '';
  editFields7 = '';
  editFields8 = '';
  editFields9 = '';
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
  editInpuputField = new EditOutputField();

  public isDecimalAlreadyEntered(): boolean {
    let decimalAlreadyEntered = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    decimalAlreadyEntered = StringUtils.trim(this.decimalInd) === initValue;
    return decimalAlreadyEntered;
  }

  public setDecimalAlreadyEntered(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.decimalInd = initValue;
  }

  public isValidCharEntered(): boolean {
    let validCharEntered = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    validCharEntered = StringUtils.trim(this.validCharInd) === initValue;
    return validCharEntered;
  }

  public setValidCharEntered(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.validCharInd = initValue;
  }

  public isCompressError(): boolean {
    let compressError = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    compressError = StringUtils.trim(this.compressErrorInd) === initValue;
    return compressError;
  }

  public setCompressError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.compressErrorInd = initValue;
  }
}
