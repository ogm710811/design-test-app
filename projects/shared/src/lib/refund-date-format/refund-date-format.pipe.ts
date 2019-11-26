import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'refundDateFormat'
})
export class RefundDateFormatPipe implements PipeTransform {
  transform(value: any, format?: any): any {
    if (!value) {
      return null;
    }
    format = format || 'MM/DD/YYYY';
    const date = moment.utc(value);
    return date.isValid() && date.format(format);
  }
}
