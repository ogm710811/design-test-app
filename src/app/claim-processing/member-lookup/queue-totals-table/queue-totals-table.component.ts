import {Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DashboardApi, QueueTotalData} from '@fox/rest-clients';
import {LoginService, TokenCheckService} from '@fox/shared';
import {interval as observableInterval, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import * as uuid from 'uuid';

@Component({
  selector: 'fox-queue-totals-table',
  templateUrl: './queue-totals-table.component.html',
  styleUrls: ['./queue-totals-table.component.css']
})
export class QueueTotalsTableComponent implements OnChanges, OnInit, OnDestroy {

  @Input() user?: string;
  tableRowRefreshTimer: Subscription;
  isRefreshedToken: Subscription;

  private queueTotals: QueueTotalData[] = [];

  constructor(
    private dashSvc: DashboardApi,
    private ngZone: NgZone,
    private tokeCheckService: TokenCheckService,
    private loginService: LoginService
  ) {
    this.ngZone.runOutsideAngular(() => {
      this.tableRowRefreshTimer = observableInterval(10000).subscribe(() => {
        this.ngZone.run(() => {
          this.isRefreshedToken = this.loginService.isTokenRefreshed$.subscribe(
            data => {
              if (data) {
                this.fetchQueueTotals(this.user);
              }
            }
          );
          this.isRefreshedToken.unsubscribe();
        });
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.user) {
      this.fetchQueueTotals(this.user);
    }
  }

  ngOnInit(): void {
    this.fetchQueueTotals(this.user);
  }

  ngOnDestroy(): void {
    this.tableRowRefreshTimer.unsubscribe();
    if (this.isRefreshedToken) {
      this.isRefreshedToken.unsubscribe();
    }
  }

  queueTotalsForQueueTypeAndAge(queueType: 'main' | 'bypass',
                                age: 'total' | 'bypass' | 'age>6' | 'age6' | 'age5' | 'age4' |
                                  'age3' | 'age2' | 'age1' | 'age0'): number {
    return this.queueTotals
      .filter(qt => (qt.type || '').toLowerCase() === queueType)
      .filter(qt => (qt.age || '').toLowerCase() === age)
      .map(qt => qt.claimCount || 0)
      .reduce((a, b) => a + b, 0);
  }

  fetchQueueTotals(selectedUser?: string): void {
    this.dashSvc.queueTotal(uuid(), selectedUser).pipe(map(totalsObj => totalsObj.queueTotals || [])).subscribe(
      (qts: QueueTotalData[]) => {
        this.queueTotals = qts;
      }, (err) => {
        this.queueTotals = [];
      });
  }

}
