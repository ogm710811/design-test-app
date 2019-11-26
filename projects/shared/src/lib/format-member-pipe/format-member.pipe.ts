/**
 * fox-claims
 *
 * NOTE:
 * This pipe class is used to convert the member profile number
 * to '123456789 1 1' format
 */
import {SlicePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'formatMember'})
export class FormatMemberPipe extends SlicePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value) {
      return;
    }
    const strValue = value.toString();
    const membershipNumber = super.transform(strValue, 0, 9);
    const associationId = super.transform(strValue, 9, 10);
    const householdId = super.transform(strValue, 10);
    return membershipNumber + '  ' + associationId + '  ' + householdId;
  }
}
