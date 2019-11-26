import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';

@Injectable()
export class BootstrapApiTestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const matchResult = req.url.includes('uiapi/bootstrap');
    if (matchResult && req.method === 'GET') {
      console.log('RETURNED BOOTSTRAP');
      return observableOf(new HttpResponse({
        status: 200,
        statusText: 'OK',
        url: req.url,
        body: {
          'logoutTimeout': 1800,
          'requestTimeout': 10,
          'connectTimeout': 10,
          'idleTimeout': 1,
          'keepAliveInterval': 3000,
          'enableSso': false,
          'releaseNumber': '10',
          'environmentDescription': 'INT',
          'enabledFeatures': ['F1335'],
          'disabledFeatures': []
        }
      }));
    }
    return next.handle(req);
  }
}
