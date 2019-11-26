/**
 * fox-claims
 *
 * NOTE: This pipe class is used in edit-aggregate-current-value.component.
 * it takes the field value to capitalize it,
 * exceptions:
 * if field value = aarp => AARP
 * if field value = er => ER
 */
import {TitleCasePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'fieldFormat'})
export class FieldTextFormatPipe extends TitleCasePipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    if (value.includes('aarp')) {
      return value.replace('aarp', 'AARP');
    } else if (value.charAt(0) === 'e' && value.charAt(1) === 'r') {
      return value.replace('er', 'ER');
    } else if (value.includes('out Of Pocket Aggregates')) {
      return 'Out of Pocket';
    }
    return super.transform(value);
  }
}
