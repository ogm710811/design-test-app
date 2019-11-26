import {DateFormatPipe} from './date-format.pipe';

const pipe = new DateFormatPipe();

describe('Format Date Pipe', () => {
  it('Should Return `null` when `null` is passed', () => {
    expect(pipe.transform(null)).toEqual(null);
  });
  it('Should Add a Trailing Slash to 2 Digits', () => {
    expect(pipe.transform('11')).toEqual('11/');
  });
  it('Should Remove Slashes and Consider Only Digits', () => {
    expect(pipe.transform('1/2')).toEqual('12/');
  });
  it('Should Handle MM/DD/YYYY Format', () => {
    expect(pipe.transform('02172018')).toEqual('02/17/2018');
  });
});
