import {RefundDateFormatPipe} from './refund-date-format.pipe';

const pipe = new RefundDateFormatPipe();
describe('Refund Date Format Pipe', () => {
  it('Convert utc format to mmddyy', () => {

    expect(pipe.transform('Fri May 17 00:00:00 UTC 2019', 'MMDDYY')).toEqual('051719');
  });
  it('Convert utc format to mmddyy', () => {
    expect(pipe.transform('Fri May 17 00:00:00 UTC 2019')).toEqual('05/17/2019');
  });
  it('Convert utc format to mmddyy', () => {
    expect(pipe.transform('Fri May 17 00:00:00 UTC 2019', 'MM-DD-YY')).toEqual('05-17-19');
  });

  it('Proper ddmmyy format', () => {
    expect(pipe.transform('01/02/2019', 'MMDDYY')).toEqual('010219');
  });

  it('Proper ddmmyy format', () => {
    expect(pipe.transform('02/20/2019', 'MMDDYY')).toEqual('022019');
  });

  it('Proper ddmmyy format', () => {
    expect(pipe.transform('31022019')).toEqual(false);
  });

  it('Proper ddmmyy format', () => {
    expect(pipe.transform('30132019')).toEqual(false);
  });
});
