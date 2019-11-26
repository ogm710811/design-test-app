import {Pipe, PipeTransform} from '@angular/core';

/* Custom Pipe to display more than one value in new line within one column/cell. */
@Pipe({name: 'splitValue'})
export class SplitPipe implements PipeTransform {

  transform(value: any): any {
    const jointString = value.split(',');
    let outString = value;

    // if there are THREE values spereted by ',' then vlaues will be splitted out in three new line
    if (jointString.length === 3) {
      outString = `<b> ${jointString[0]} </b><br/>${jointString[1]}<br/>${jointString[2]}`;
    }
    // if there are TWO values spereted by ',' then vlaues will be splitted out in three new line
    if (jointString.length === 2) {
      outString = `${jointString[0]} <br/>${jointString[1]}`;
    }
    return outString;
  }
}
