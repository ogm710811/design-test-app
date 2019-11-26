import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of as observableOf, throwError as observableThrowError} from 'rxjs';
import {
  categoryRefValues,
  urgencyRefValues,
  workSessionValues,
  workTypeRefValues
} from './test.constants';

@Injectable()
export class WqSessionApiTestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url;
    if (url.includes('/api/workqueue/session') && req.method === 'GET') {
      console.log('INTERCEPTED BY SESSION INTERCEPTOR!!!!!!!');
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
      if (url.includes('foxtusr6')) {
        const rOpts = {
          status: 200,
          headers: headers,
          statusText: 'OK',
          body: workSessionValues,
          url: req.url
        };
        return observableOf(new HttpResponse(rOpts));
      }

      const errOpts = {
        status: 404,
        statusText: 'Not Found',
        body: {
          error: 'not_found',
          error_description: 'Not Found'
        },
        url: req.url
      };
      return observableThrowError(new HttpErrorResponse(errOpts));
    }
    return next.handle(req);
  }
}
