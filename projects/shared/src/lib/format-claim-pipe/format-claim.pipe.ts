/**
 *
 * NOTE:
 * This pipe class is used to convert the claim number '123451234561'
 * to '12345-123456-1' format
 */
import {SlicePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'formatClaim'})
export class FormatClaimPipe extends SlicePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value) {
      return;
    }
    const strValue = value.toString();
    const claimNum1 = super.transform(strValue, 0, 5);
    const claimNum2 = super.transform(strValue, 5, 11);
    const claimNum3 = super.transform(strValue, 11);
    if (value.length > 11) {
      return claimNum1 + '-' + claimNum2 + '-' + claimNum3;
    } else {
      return claimNum1 + '-' + claimNum2;
    }
  }
}
