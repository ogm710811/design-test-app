import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Event as RouterEvent, NavigationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {CategoryVO, PagedResourcesOfResourcesOfWorkQueueVO} from '@fox/rest-clients';
import {Observable} from 'rxjs';
import {workQueueRoutePathQueueSelection} from '@fox/shared';
import {LoginReduxState} from '@fox/state-management';

@Injectable({
  providedIn: 'root'
})
export class QueueSelectionService {
  results?: PagedResourcesOfResourcesOfWorkQueueVO;
  pageNumber?: number;
  pageSize?: number;
  loginState: Observable<boolean>;
  searchControl: FormGroup;
  private categoryOptionList: CategoryVO[] = [];

  constructor(private fb: FormBuilder, private store: Store<LoginReduxState>, private router: Router) {

    this.searchControl = fb.group({
      workType: fb.control(''),
      category: fb.control(''),
      queueType: fb.control('')
    });
    this.loginState = store.select('loggedIn');
    this.loginState.subscribe(loggedIn => {
      if (!loggedIn) {
        this.resetVariables();
      }
    });

    this.router.events.subscribe((ev: RouterEvent) => {
      if (ev instanceof NavigationEnd) {

        // Clear the cache after navigating to the page other than queue selection
        if (ev.url.indexOf(workQueueRoutePathQueueSelection) === -1) {
          this.resetVariables();
        }
      }
    });
  }

  setCategoryOptionList(categoryList: CategoryVO[]): void {
    this.categoryOptionList = categoryList;
  }

  getCategoryOptionList(): CategoryVO[] {
    return this.categoryOptionList;
  }

  resetVariables(): void {
    this.results = {};
    this.pageNumber = 0;
    this.pageSize = 10;
    this.searchControl.reset();
  }
}
