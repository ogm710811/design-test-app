import {Injectable} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
import {
  memberInformationRoutePathProviderSearch,
  memberInformationRoutePathRoot,
  memberInformationUrlPrefixProviderProfile
} from '@fox/shared';
import {LoginReduxState} from '@fox/state-management';
import {ProviderSearchResultSet} from './provider-search-result.model';
import {ProviderSearchParameterModel} from './provider-serach-parameter.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderSearchService {
  parametersUsed: ProviderSearchParameterModel[] = [];
  savedProviderSearchResult: Array<ProviderSearchResultSet> = [];
  providerPageSize: number = 10;
  providerDataLengthInput: number = 2;
  providerPageTotal: number = 5;
  currentProviderPage: number = 0;

  loginState: Observable<boolean> = new Observable();

  constructor(private store: Store<LoginReduxState>, private router: Router) {
    this.loginState = store.select('loggedIn');
    this.loginState.subscribe(loggedIn => {
      if (!loggedIn) {
        this.resetService();
      }
    });

    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationEnd) {

        // Clear the cache after navigating to the page other than queue selection
        if (!(ev.url.indexOf(memberInformationUrlPrefixProviderProfile) >= 0
          || ev.url.indexOf(memberInformationRoutePathRoot + '/' + memberInformationRoutePathProviderSearch) >= 0)) {
          this.resetService();
        }
      }
    });
  }

  resetService(): void {
    this.savedProviderSearchResult = [];
    this.parametersUsed = [];
    this.providerPageSize = 10;
    this.providerDataLengthInput = 2;
    this.providerPageTotal = 5;
    this.currentProviderPage = 0;
  }
}
