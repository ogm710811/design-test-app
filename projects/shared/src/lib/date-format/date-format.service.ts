import {Injectable} from '@angular/core';
import * as momentNS from 'moment';

const moment = momentNS;

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  getFormatedDate(inputDate: string): string {
    const dateOfServiceFromFormat = inputDate.slice(0, 2) + '/' + inputDate.slice(2, 4) + '/' + inputDate.slice(4, 6);
    return moment(dateOfServiceFromFormat).format('MM/DD/YY');
  }

  getValidateDate(inputDate1: string): string {
    const validDateFormat = inputDate1.slice(0, 2) + inputDate1.slice(3, 5) + inputDate1.slice(8, 10);
    return validDateFormat;
  }

  getCcyyFormatedDate(inputDate: string): string {
    const dateOfServiceFromFormat = inputDate.slice(0, 2) + '/' + inputDate.slice(2, 4) + '/' + inputDate.slice(4, 6);
    const temp = moment(dateOfServiceFromFormat).format('MM/DD/YYYY');
    return temp;
  }

  getCcyyFormatedDateIE(inputDate: string): string {
    const dateOfServiceFromFormat = inputDate.slice(0, 2) + '/' + inputDate.slice(2, 4) + '/' + inputDate.slice(4, 6);
    return moment(dateOfServiceFromFormat, 'MM/DD/YY').format('MM/DD/YYYY');
  }

  getFormatedDateYYYY(inputDate: string): string {
    let dateOfServiceFromFormat = '';
    const inputDateFirstItem = +inputDate.slice(0, 2);
    if (!isNaN(inputDateFirstItem) && inputDateFirstItem > 80) {
      dateOfServiceFromFormat = inputDate.slice(2, 4) + '/' + inputDate.slice(4, 6) + '/19' + inputDate.slice(0, 2);
    } else {
      dateOfServiceFromFormat = inputDate.slice(2, 4) + '/' + inputDate.slice(4, 6) + '/20' + inputDate.slice(0, 2);
    }

    return dateOfServiceFromFormat;
  }
}
