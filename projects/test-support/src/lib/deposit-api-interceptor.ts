import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of as observableOf, throwError as observableThrowError} from 'rxjs';
import {depositDetails, trcs} from './test.constants';

@Injectable()
export class DepositApiTestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url;
    if (url.includes('/api/deposit') && req.method === 'GET') {
      const pathElems = url.split('/');
      const lasPathElem = pathElems[pathElems.length - 1];
      const pathAndArgs = lasPathElem.split('?');
      const depositId = pathAndArgs[0];
      const filteredDets = depositDetails.filter(d => depositId === d.depositDetailId.toString());
      const det = filteredDets && filteredDets.length === 1 ? filteredDets[0] : undefined;
      const filteredTrcs = trcs.filter(t => depositId === t.depositDetailId.toString());

      let rOpts;
      if (det) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        rOpts = {
          status: 200,
          headers: headers,
          statusText: 'OK',
          body: {
            _links: {'me': 'http://me.me'},
            depositDetailId: det.depositDetailId,
            depositCheckClaimId: det.depositCheckClaimId,
            checkId: det.checkId,
            depositAmount: det.depositAmount,
            depositDate: det.depositDate,
            depositStatus: det.depositStatus,
            depositSource: det.depositSource,
            docControlId: det.docControlId,
            treasuryReconciliation: filteredTrcs
          },
          url: req.url
        };
        return observableOf(new HttpResponse(rOpts));
      } else {
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
    }
    return next.handle(req);
  }

}
