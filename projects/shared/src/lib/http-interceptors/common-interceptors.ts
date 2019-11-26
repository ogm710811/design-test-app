import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import * as uuidNS from 'uuid';
import {ProgressContextService} from '../progress-aware-container/progress-context.service';
import {MessageBoxService} from '../message-box/message-box.service';
import {TokenCheckService} from '../login-service/token-check.service';
import {MessageBoxType} from '../message-box/message-box-type.enum';

const uuid = uuidNS;

@Injectable({
  providedIn: 'root'
})
export class CommonInterceptor implements HttpInterceptor {
  urlSegments: string[] = [];
  urlSegmentsWithoutDefaultMsgs404: string[] = ['docmanagement', 'workqueue/session/new'];
  urlSegmentsWithoutDefaultMsgs400: string[] = ['overpayment/recovery_action'];
  showDefaultMsgs404 = false;
  showDefaultMsgs400 = false;

  tokenSubscription: Subscription = new Subscription();
  newTokenSubscripton: Subscription = new Subscription();

  constructor(private loadingSvc: ProgressContextService,
              private injector: Injector,
              private tokenCheckService: TokenCheckService,
              private messageBoxService: MessageBoxService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let nextReq = req;
    if (!req.headers.has('RequestCorrelationId')) {
      const newHeaders = req.headers.append('RequestCorrelationId', uuid());
      nextReq = req.clone({headers: newHeaders});
    }

    // exclude from error message
    this.urlSegments = nextReq.url.split('/');
    this.showDefaultMsgs404 = this.urlSegmentsWithoutDefaultMsgs404.findIndex(u => u === this.urlSegments[this.urlSegments.length - 1]) === -1;
    this.showDefaultMsgs400 = this.urlSegmentsWithoutDefaultMsgs400.findIndex(u => u === this.urlSegments[this.urlSegments.length - 1]) === -1;
    const nextHandlerResult = next.handle(nextReq).pipe(
      tap(
        () => {
        },
        err => {

          if (err.status === 401) {
            this.tokenSubscription = this.tokenCheckService.isTokenRefreshed$.subscribe(
              data => {
                if (data) {
                  this.messageBoxService.addMessageBox('Error ' + err.status, MessageBoxType.ERROR, 'Correlation ID: ' + nextReq.headers.get('RequestCorrelationId'));
                } else {
                  this.newTokenSubscripton = this.tokenCheckService.newToken$.subscribe(
                    newToken => {
                      req.clone({headers: req.headers.set('Authorization', 'Bearer ' + newToken)});
                      return next.handle(req);
                    });
                }
              });

          }

          if (this.tokenSubscription) {
            this.tokenSubscription.unsubscribe();
          }

          if (this.newTokenSubscripton) {
            this.newTokenSubscripton.unsubscribe();
          }
          if (err.status === 404 && !this.showDefaultMsgs404) {
            this.messageBoxService.addMessageBox('Error ' + err.status, MessageBoxType.ERROR, 'Correlation ID: ' + nextReq.headers.get('RequestCorrelationId'));
          }
          if (err.status === 400 && !this.showDefaultMsgs400) {
            this.messageBoxService.addMessageBox('Error ' + err.status, MessageBoxType.ERROR, 'Correlation ID: ' + nextReq.headers.get('RequestCorrelationId'));
          }
          if (err.status !== 400 && err.status !== 404) {
            this.messageBoxService.addMessageBox('Error ' + err.status, MessageBoxType.ERROR, 'Correlation ID: ' + nextReq.headers.get('RequestCorrelationId'));
          }
          return observableThrowError(err);
        })
    );

    // exclude polling URLs from loading
    return (nextReq.url.includes('api/workqueue/workbench') && nextReq.url.includes('count')) ?
      nextHandlerResult : this.loadingSvc.watch(nextHandlerResult);
  }
}
