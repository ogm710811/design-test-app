import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  PagedResourcesOfResourceOfDepositVO,
  PagedResourcesOfResourceOfTreasuryReconciliationSummaryVO
} from '@fox/rest-clients';
import {Observable} from 'rxjs';
import {LoginReduxState} from '@fox/state-management';
import {FindDepositFormModel} from './find-deposit-form/find-deposit-form.model';
import {FindTrcFormModel} from './find-trc-form/find-trc-form.model';

@Injectable({
  providedIn: 'root'
})
export class FindDepositTrcService {

  loginState: Observable<boolean> = new Observable();
  lastPressed: number = 0;
  trcFormValues: FindTrcFormModel = new FindTrcFormModel();

  depositPageSize: number = 0;
  depositFormValuesCache: FindDepositFormModel = new FindDepositFormModel();
  depositSearchResultCache: PagedResourcesOfResourceOfDepositVO = new PagedResourcesOfResourceOfDepositVO();
  showDepositCache = false;

  trcPageSize: number = 0;
  trcFormValuesCache: FindTrcFormModel = new FindTrcFormModel();
  trcSearchResultCache: PagedResourcesOfResourceOfTreasuryReconciliationSummaryVO = new PagedResourcesOfResourceOfTreasuryReconciliationSummaryVO();
  showTrcCache = false;

  constructor(private store: Store<LoginReduxState>) {
    this.loginState = store.select('loggedIn');
    this.loginState.subscribe(loggedIn => {
      if (!loggedIn) {
        this.resetDepositVariables();
      }
    });
  }

  resetDepositVariables(): void {
    this.depositSearchResultCache = {};
    this.depositFormValuesCache = new FindDepositFormModel();
    this.trcSearchResultCache = {};
    this.trcFormValuesCache = new FindTrcFormModel();
  }

}
