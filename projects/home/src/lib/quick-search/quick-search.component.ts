import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkBenchApi, WorkQueueReferencesApi} from '@fox/rest-clients';
import {LoginService, TransferSrvService} from '@fox/shared';
import * as  momentConst from 'moment';
import * as uuidConst from 'uuid';
const moment = momentConst;
const uuid = uuidConst;
import {tiles} from '../home.tiles.constants';

@Component({
  selector: 'fox-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.css']
})

export class QuickSearchComponent implements OnInit {

  tiles = tiles;
  workBenchItems: Array<any> = [];
  workBenchItemsService: Array<any> = [];
  visbilityWorkBenchFully = false;
  items?: any;
  isSmallImage: boolean = false;
  season = '';

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     private transferService: TransferSrvService,
                     protected workBenchApi: WorkBenchApi,
                     protected loginService: LoginService,
                     protected workQueueRefence: WorkQueueReferencesApi) {
  }

  ngOnInit(): void {
    this.getSeason();
    this.tiles = tiles;

    this.workBenchApi.getWorkbenchCount(this.loginService.username, uuid()).subscribe((response: any) => {
      this.visbilityWorkBenchFully = (!!response.itemCount) ? (response.itemCount > 0 ? true : false) : false;
      this.items = response;
    });

    this.workBenchApi.retrieveWorkQueueItemByUserId(this.loginService.username, uuid()).subscribe((response: any) => {
      response.forEach((element: any) => {

        this.workBenchItemsService.push({
          idDocument: element.wqiBusinessId,
          dateFormatted: moment(element.createdDate).format('MM/DD/YYYY'),
          description: element.businessIdTypeDesc,
          days: this.calculateDiffDate(new Date(element.createdDate))
        });
      });

      this.workBenchItemsService.sort((right, left): number => {
        if (left.days < right.days) {
          return -1;
        }
        if (left.days > right.days) {
          return 1;
        }
        return 0;
      });

      this.workBenchItems = this.workBenchItemsService;
    });
  }

  sortByClickWorkType(category: string): void {
    switch (category) {
      case 'Correspondence':
        this.workBenchItems = this.workBenchItemsService.filter(x => x.description === 'DCN');
        break;

      case 'Checks':
        this.workBenchItems = this.workBenchItemsService.filter(x => x.description === 'Claim-Number');
        break;

      default:
        this.workBenchItems = this.workBenchItemsService;
    }
  }

  calculateDiffDate(claimsDate: Date): number {
    const currentDate = new Date();
    return Number((Math.abs(currentDate.getTime() - claimsDate.getTime()) / (1000 * 3600 * 24)).toFixed());

  }

  goToAsk(): void {
    window.open('http://askkb/', '_blank');
  }

  goToTraining(): void {
    window.open('https://hubconnect.uhg.com/groups/is-operations-training-and-documentation/projects/my-second-project/activity', '_blank');
  }

  getSeason(): void {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDay();
    if ( month === 0 || month === 1 || month === 11 ) {
      this.season = 'winter';
    }
    if (month === 2) {
      day === 1 ? this.season = 'winter' : this.season = 'spring';
    } else if (month === 3 || month === 4) {
      this.season = 'spring';
    } else if (month > 5 && month <= 7 ) {
      this.season = 'summer';
    } else if (month > 7 && month <= 10 ) {
      this.season = 'fall';
    }
  }
}
