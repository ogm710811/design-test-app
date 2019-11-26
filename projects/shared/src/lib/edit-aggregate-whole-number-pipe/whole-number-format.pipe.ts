/**
 * fox-claims
 *
 * NOTE: This pipe class is used in edit-aggregate-current-value.component.
 * it takes the difference value and check if the value is a whole number,
 * if it is whole number, the result will not display .00
 * if it is a decimal, the result will display .XX
 * added an exception for decimal values, if the decimal value ends in 0 (e.g 23.50)
 * the pipe will remove the last character and will display 23.5.
 */

import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({name: 'wholeNumber'})
export class WholeNumberFormatPipe extends DecimalPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value.toString() === '0') {
      return value;
    } else {
      if (value % 1 === 0) {
        const valueToStr: string = value.toString();
        const valueToStrLength = valueToStr.length;
        const lastChart = valueToStr.charAt(valueToStrLength - 1);
        const secondLastChart = valueToStr.charAt(valueToStrLength - 2);

        if (valueToStr.includes('.')) {
          if (secondLastChart === '0' && lastChart === '0' || secondLastChart === '.' && lastChart === '0') {
            const wholeEndZero = super.transform(value, '1.0-0');
            if (wholeEndZero) {
              return wholeEndZero.toString().replace(/,/g, '');
            }
          }
        } else {
          return value.toString().replace(/,/g, '');
        }
      } else {
        const decimalToStr: string = value.toString();
        const decimalToStrLength = decimalToStr.length;
        const lastChart = decimalToStr.charAt(decimalToStrLength - 1);
        const secondLastChart = decimalToStr.charAt(decimalToStrLength - 2);

        if (decimalToStr.includes('.') && lastChart === '0' && secondLastChart !== '0') {
          const decimalEndZero = super.transform(value, '1.1-1');
          if (decimalEndZero) {
            return decimalEndZero.toString().replace(/,/g, '');
          }
        } else if (decimalToStr.includes('.') && lastChart !== '0' && secondLastChart === '.') {
          const decimal = super.transform(value, '1.1-1');
          if (decimal) {
            return decimal.toString().replace(/,/g, '');
          }
        } else if (decimalToStr.includes('.') && lastChart !== '0' && secondLastChart !== '0') {
          const decimal = super.transform(value, '1.2-2');
          if (decimal) {
            return decimal.toString().replace(/,/g, '');
          }
        } else {
          const decimal = super.transform(value, '1.2-2');
          if (decimal) {
            return decimal.toString().replace(/,/g, '');
          }
        }
      }
    }
  }
}
