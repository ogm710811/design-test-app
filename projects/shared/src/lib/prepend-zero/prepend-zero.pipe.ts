import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'prependZero'})
export class PrependZeroPipe implements PipeTransform {
  transform(records: number = 0, length: number = 9): string {
    return records.toString().padStart(length, '0');
  }
}
