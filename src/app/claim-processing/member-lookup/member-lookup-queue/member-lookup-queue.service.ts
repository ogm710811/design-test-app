import {Injectable} from '@angular/core';
import {DashboardApi, QueueTotalVO} from '@fox/rest-clients';
import {Observable} from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class MemberLookupService {

  total: number;
  totalBypass: number;
  myBypass: number;
  agesix: number;
  agefive: number;
  agefour: number;
  agethree: number;

  constructor(private dashApi: DashboardApi) {
  }

  totalMainBypassQueue(userid?: string): Observable<QueueTotalVO> {
    return this.dashApi.queueTotal(uuid());
  }

}
