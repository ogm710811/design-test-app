import {Component, OnInit} from '@angular/core';
import {DashboardApi, QueueBySourceVO, QueueData} from '@fox/rest-clients';
import {map} from 'rxjs/operators';
import * as uuid from 'uuid';

@Component({
  selector: 'fox-queue-info-table',
  templateUrl: './queue-info-table.component.html',
  styleUrls: ['./queue-info-table.component.css']
})
export class QueueInfoTableComponent implements OnInit {

  queueData: QueueData[] = [];

  constructor(private dashboardAPI: DashboardApi) {
  }

  ngOnInit(): void {
    this.dashboardAPI.queueBySource(uuid()).pipe(
      map((queueBySource: QueueBySourceVO) => queueBySource.source))
      .subscribe(
        (items: QueueData[]) => {
          this.queueData = items || [];
        },
        () => {
          this.queueData = [];
        });
  }

  claimCountForSourceAndAge(source: 'all' | 'clearinghouse' | 'paper' | 'non_paper' | 'cms', age: 'total' | 'bypass' | '>6' | number): number {

    const qdForSource: QueueData[] = this.queueData.filter((qd: QueueData) => {
      if (source === 'all') {
        return true;
      }
      if (source === 'paper') {
        return ((qd.source || '').toLowerCase() === source) || ((qd.source  || '').toLowerCase() === 'pfk');
      }
      return (qd.source || '').toLowerCase() === source;
    });

    if (age === 'total') {
      return qdForSource.map(qd => qd.claimCount || 0).reduce((a, b) => a + b, 0);
    } else if (age === 'bypass') {
      return qdForSource.filter(qd => (qd.age || '').toLowerCase() === age).map(qd => qd.claimCount || 0).reduce((a, b) => a + b, 0);
    } else if (age === '>6') {
      return qdForSource.filter(qd => {
        const qdAge: number = parseInt(qd.age || '', 10);
        if (isNaN(qdAge)) {
          return false;
        } else if (qdAge > 6) {
          return true;
        }
        return false;
      }).map(qd => qd.claimCount || 0).reduce((a, b) => a + b, 0);
    } else {
      return qdForSource.filter(qd => {
        const qdAge: number = parseInt(qd.age || '', 10);
        if (isNaN(qdAge)) {
          return false;
        } else if (qdAge === age) {
          return true;
        }
        return false;
      }).map(qd => qd.claimCount || 0).reduce((a, b) => a + b, 0);
    }
  }
}
