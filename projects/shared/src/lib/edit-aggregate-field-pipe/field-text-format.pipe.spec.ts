import {FieldTextFormatPipe} from './field-text-format.pipe';

const pipe = new FieldTextFormatPipe();

describe('Format Edit Aggregate Field Pipe', () => {
  it('Should Return ER when er passed', () => {
    expect(pipe.transform('er')).toEqual('ER');
  });
  it('Should Return Er when Er passed', () => {
    expect(pipe.transform('Er')).toEqual('Er');
  });
  it('Should Return eR when eR passed', () => {
    expect(pipe.transform('eR')).toEqual('Er');
  });
  it('Should Return Er (title case) when ER passed', () => {
    expect(pipe.transform('ER')).toEqual('Er');
  });
  it('Should Return Her when her is passed', () => {
    expect(pipe.transform('her')).toEqual('Her');
  });
  it('Should Return AARP when aarp is passed', () => {
    expect(pipe.transform('aarp')).toEqual('AARP');
  });
  it('Should Transform mid-string aarp to AARP', () => {
    expect(pipe.transform('I am an aarp member')).toEqual('I am an AARP member');
  });
  it('Should Title Case a normal string alone', () => {
    expect(pipe.transform('This is Bob')).toEqual('This Is Bob');
  });
});
