import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatMemberNumber'
})
export class FormatMemberNumber implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return value.replace(/ /g, '').replace(/^(.{9})(.)(.*)$/, '$1 $2 $3').replace(/\s*$/, '');
    }
    return value;
  }
}
