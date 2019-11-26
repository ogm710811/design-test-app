import {HttpHeaders} from '@angular/common/http';
import {Injectable, Optional} from '@angular/core';
import {Configuration} from '@fox/rest-clients';

@Injectable({
  providedIn: 'root'
})
export class HeaderMaintenanceService {

  public configuration = new Configuration();
  public defaultHeaders = new HttpHeaders();

  constructor(@Optional() configuration: Configuration) {
    if (configuration) {
      this.configuration = configuration;
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
