import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'zipCode'})
export class ZipCodePipe implements PipeTransform {

  transform(records: Array<any>, args?: any): any {
    if (!records) {
      return records;
    }
    if (records.toString().length === 9) {
      return records.toString().slice(0, 5) + '-' + records.toString().slice(5);
    } else if (records.toString().length === 5) {
      return records.toString();
    } else {
      return records;
    }
  }
}
