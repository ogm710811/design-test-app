import {WholeNumberFormatPipe} from './whole-number-format.pipe';

const pipe = new WholeNumberFormatPipe('EN_US');

describe('Format Whole Number Pipe', () => {
  it('Should Return 0 when 0', () => {
    expect(pipe.transform('0')).toEqual('0');
    expect(pipe.transform(0)).toEqual(0);
  });
  it('Should Leave Whole Numbers Alone', () => {
    expect(pipe.transform(21)).toEqual('21');
    expect(pipe.transform('21')).toEqual('21');
  });
  it('Should Leave Whole Numbers With Commas Alone', () => {
    expect(pipe.transform(21000)).toEqual('21000');
    expect(pipe.transform('21000')).toEqual('21000');
  });
  it('Should Leave Whole Numbers With 0s Alone', () => {
    expect(pipe.transform(21.00)).toEqual('21');
    expect(pipe.transform('21.00')).toEqual('21');
  });
  it('Should Truncate And Round Decimal to 2 Chars Round Up', () => {
    expect(pipe.transform(21.38529)).toEqual('21.39');
    expect(pipe.transform('21.38529')).toEqual('21.39');
  });
  it('Should Truncate And Round Decimal to 2 Chars Round Down', () => {
    expect(pipe.transform(21.38429)).toEqual('21.38');
    expect(pipe.transform('21.38429')).toEqual('21.38');
  });
  it('Should Remove Trailing Decimal 0', () => {
    expect(pipe.transform(21.3)).toEqual('21.3');
    expect(pipe.transform('21.30')).toEqual('21.3');
  });
  /*
  it('Should Remove Trailing Decimal 0 With Precision Beyond 2nd Decimal', () => {
    expect(pipe.transform(21.30019)).toEqual('21.3');
    expect(pipe.transform('21.30019')).toEqual('21.3');
  });
  it('Should Round to Whole Number with .000', () => {
    expect(pipe.transform(21.00019)).toEqual('21');
    expect(pipe.transform('21.00019')).toEqual('21');
  });
  */
});
