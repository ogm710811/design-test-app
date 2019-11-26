import {FormatMemberNumber} from './format-member-number.pipe';

const pipe = new FormatMemberNumber();

describe('Format Member Number Pipe', () => {
  it('Should Keep 9 digits untouched', () => {
    expect(pipe.transform('123456789')).toEqual('123456789');
  });
  it('Should Keep 9 of any character untouched', () => {
    expect(pipe.transform('12a45f789')).toEqual('12a45f789');
  });
  it('Should add a space after the 9th digit', () => {
    expect(pipe.transform('1234567891')).toEqual('123456789 1');
  });
  it('Should add a space after the 9th of any character', () => {
    expect(pipe.transform('abcdefghi1')).toEqual('abcdefghi 1');
  });
  it('Should add a space after the 9th & 10th digits', () => {
    expect(pipe.transform('12345678912')).toEqual('123456789 1 2');
  });
  it('Should add a space after the 9th & 10th of any character', () => {
    expect(pipe.transform('abcdefghi12')).toEqual('abcdefghi 1 2');
  });
  it('Should remove spaces', () => {
    expect(pipe.transform(' a b        cde fg    hi1        2  ')).toEqual('abcdefghi 1 2');
  });
  it('Should remove spaces', () => {
    expect(pipe.transform(' a b        cde fg    hi1        2  ')).toEqual('abcdefghi 1 2');
  });
  it('Should return an empty string back itself', () => {
    expect(pipe.transform('')).toEqual('');
  });
});
