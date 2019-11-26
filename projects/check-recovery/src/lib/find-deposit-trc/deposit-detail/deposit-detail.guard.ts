import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DepositDetailComponent} from './deposit-detail.component';

@Injectable({
  providedIn: 'root'
})
export class DepositDetailGuard implements CanDeactivate<DepositDetailComponent> {
  canDeactivate(
    component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (component && !component.showCancelDialog && component.trcDetails &&
      component.trcDetails.action !== component.View && component.trcDetails.action !== component.Empty) {
      component.showCancelDialog = true;
    }

    if (component.showCancelDialog && component.cancelModal) {
      return component.cancelModal.abortOrConfirmCancellation.pipe(map(x => x === 'confirm'));
    }

    return true;
  }
}
