import {LowerCasePipe, TitleCasePipe} from '@angular/common';
import {HttpHeaders} from '@angular/common/http';
import {Injectable, Optional} from '@angular/core';
import {Configuration} from '@fox/rest-clients';
import {transCompleted} from '../default-maintenance-menu.constants/default-maintenance-menu.constants';
import {MessageBoxService} from '../message-box/message-box.service';
import {MessageBoxType} from '../message-box/message-box-type.enum';
import {
  InfoMessages,
  SuccessMessages,
  WarningMessages
} from '../default-maintenance-msgs.model/default-maintenance-msgs.model';

@Injectable({
  providedIn: 'root'
})
export class OpMaintenanceService {

  public configuration = new Configuration();
  public defaultHeaders = new HttpHeaders();

  constructor(protected lowerCasePipe: LowerCasePipe,
              protected titleCasePipe: TitleCasePipe,
              private messageBoxService: MessageBoxService,
              @Optional() configuration: Configuration) {
    if (configuration) {
      this.configuration = configuration;
    }
  }

  displayMessageBox(actualMsg: string, expectedMsg: string): void {
    let errorMsg = actualMsg.trim();
    const msgType = (errorMsg.indexOf(expectedMsg) !== -1) ? MessageBoxType.ACTIVE : MessageBoxType.ERROR;
    errorMsg = errorMsg.substr(0, 1) + this.lowerCasePipe.transform(errorMsg.substr(1));
    this.messageBoxService.addMessageBox(errorMsg, msgType, ' ');
  }

  displayMessage(actualMsg: string): void {
    let msg = actualMsg.trim();
    msg = msg.substr(0, 1) + this.lowerCasePipe.transform(msg.substr(1));

    if (Object.values(SuccessMessages).includes(actualMsg) || actualMsg.indexOf(transCompleted) !== -1) {
      this.messageBoxService.addMessageBox('Success', MessageBoxType.SUCCESS, msg);
    } else if (Object.values(InfoMessages).includes(actualMsg)) {
      this.messageBoxService.addMessageBox('Information', MessageBoxType.ACTIVE, msg);
    } else if (Object.values(WarningMessages).includes(actualMsg)) {
      this.messageBoxService.addMessageBox('Warning', MessageBoxType.ACTIVE, msg);
    } else {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, msg);
    }
  }

  getHeader(): HttpHeaders {
    let headers = this.defaultHeaders;

    // authentication (OAuth2) required
    // oauth required
    if (this.configuration.accessToken) {
      const accessToken = typeof this.configuration.accessToken === 'function'
        ? this.configuration.accessToken()
        : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'application/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];

    const httpHeaderContentType: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpHeaderContentType !== undefined) {
      headers = headers.set('Content-Type', httpHeaderContentType);
    }

    return headers;
  }
}
