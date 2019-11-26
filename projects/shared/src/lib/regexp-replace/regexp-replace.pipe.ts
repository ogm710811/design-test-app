import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'regexpReplace'
})
export class RegexpReplacePipe implements PipeTransform {

  transform(value: any, searchFor: string, replaceWith: string): any {
    return value.toString().replace(new RegExp(searchFor), replaceWith);
  }

}
