import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any): any {
    if (value === null) {
      return value;
    }

    if (value && value.length > 1 && value.length < 4) {
      value = value.replace(/\//g, '');
      value = value.replace(/(\d{2})/, '$1/');
      return value;
    }

    if (value && value.length > 4) {
      value = value.replace(/\//g, '');
      value = value.replace(/(\d{2})(\d{2})/, '$1/$2/');
      return value;
    }

    return value;
  }
}
