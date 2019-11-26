import {Pipe, PipeTransform} from '@angular/core';

// Replace Underscore with Space
@Pipe({name: 'removeUnderscore'})
export class RemoveUnderscorePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.replace(/_/g, ' ');
  }
}
