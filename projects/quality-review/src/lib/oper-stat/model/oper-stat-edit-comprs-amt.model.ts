import { StringUtils } from '../../services/string-utils.service';
import { StEditFields } from './st-edit-fields.model';
import { StEditInputField } from './st-edit-input-field.model';
import { StEditOutputField } from './st-edit-output-field.model';

/**
 * Model class OperStatEditComprsAmt
 * Path: screenbean/qltyrvwoperstat
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwoperstat::OperStatEditComprsAmt
 * Legacy Mapping: COPY-STFCOMPD
 */
export class OperStatEditComprsAmt {
  stEditInputField = new StEditInputField();
  stEditOutputField = new StEditOutputField();
  stEditFields = new StEditFields();
  stEditFields4 = '';
  stEditFields5 = '';
  stEditFields6 = '';
  stEditFields7 = '';
  stEditFields8 = '';
  stEditField10 = 0;
  stEditReturnCode = '';
  stLeftFields = 0;
  stValidLeftFieldLen = 0;
  stPosAfterDecimal = 0;
  stEditField4Pos = 0;
  stEditField5Pos = 0;
  stEditField6Pos = 0;
  stEditField7Pos = 0;
  stEditField8Pos = 0;
  stEditField10Pos = 0;
  stInputFieldLen = 0;
  stEditSub = 0;
  stOutputSub = 0;
  stSaveSub = 0;
  stCompressSub = 0;
  stDecimalInd = '';
  stValidCharInd = '';
  stCompressErrorInd = '';

  public isStDecimalAlreadyEntered(): boolean {
    let stDecimalAlreadyEntered = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    stDecimalAlreadyEntered = StringUtils.trim(this.stDecimalInd) === initValue;
    return stDecimalAlreadyEntered;
  }

  public setStDecimalAlreadyEntered(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.stDecimalInd = initValue;
  }

  public isStValidCharEntered(): boolean {
    let stValidCharEntered = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    stValidCharEntered = StringUtils.trim(this.stValidCharInd) === initValue;
    return stValidCharEntered;
  }

  public setStValidCharEntered(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.stValidCharInd = initValue;
  }

  public isStCompressError(): boolean {
    let stCompressError = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    stCompressError = StringUtils.trim(this.stCompressErrorInd) === initValue;
    return stCompressError;
  }

  public setStCompressError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.stCompressErrorInd = initValue;
  }
}
