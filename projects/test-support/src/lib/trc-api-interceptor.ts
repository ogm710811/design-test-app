import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';

@Injectable()
export class TrcApiTestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const matchResult = req.url.match(/api\/trc\/\d+/);
    if (matchResult && matchResult.length > 0 && req.method === 'DELETE') {
      return observableOf(new HttpResponse({
        status: 204,
        statusText: 'No Content',
        url: req.url
      }));
    }
    return next.handle(req);
  }
}
