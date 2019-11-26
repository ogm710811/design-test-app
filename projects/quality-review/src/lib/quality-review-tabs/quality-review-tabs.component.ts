import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PageHeaderService} from '@fox/shared';
import {Subscription} from 'rxjs';

@Component({
  selector: 'fox-page-header-demo',
  templateUrl: './quality-review-tabs.component.html'
})
export class QualityReviewTabsComponent implements OnInit, OnDestroy {
  currentNavChangeSubscription: Subscription = new Subscription();

  constructor(
    public pageHeaderService: PageHeaderService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pageHeaderService.tabs = ['Misc Info', 'Cautions', 'Duplicates', 'Claim Messages', 'Bill Line Messages'];
    this.pageHeaderService.currentNav = 1;
    this.currentNavChangeSubscription = this.pageHeaderService.currentNavChange.subscribe((currentNav: any) => {
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.currentNavChangeSubscription.unsubscribe();
  }

}
