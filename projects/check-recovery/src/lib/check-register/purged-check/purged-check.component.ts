import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {ResourceOfPurgeCheckVO, ResourceOfCheckSummaryVO} from '@fox/rest-clients';
import {CommonService, TableColumnKind} from '@fox/shared';
import {CheckRecoveryService} from '../../shared/check-recovery.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'fox-purged-check',
  templateUrl: './purged-check.component.html',
  styleUrls: ['./purged-check.component.css']
})
export class PurgedCheckComponent implements OnInit, AfterViewInit {
  purgeDetails: ResourceOfPurgeCheckVO = new ResourceOfPurgeCheckVO();

  dataSource = new MatTableDataSource();
  displayedColumns =
    [
      {
        key: 'accountNumber',
        headerText: 'Member #',
        kind: TableColumnKind.MemberItem,
        border: false,
        preImage: 'member-blue.svg',
        sortKey: 'accountNumber'
      },
      {
        key: 'claimNumber',
        headerText: 'Claim #',
        kind: TableColumnKind.Text,
        border: false,
        preImage: 'claim-grey.svg',
        sortKey: 'claimNumber'

      },
      {
        key: 'checkAmount',
        headerText: 'Claim Amount',
        kind: TableColumnKind.Currency,
        border: false,
        sortKey: 'checkAmount'
      }

    ];
  purgedCheckListData: ResourceOfCheckSummaryVO[] = [];

  dataLength = 0;
  currentPage = 0;
  lastPageIndex = 0;
  pageSize = 5;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginatorObj?: MatPaginator;
  checkId: Params = [];
  sub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private checkSvc: CheckRecoveryService, private commonSvc: CommonService, private router: Router) {
    this.lastPageIndex = this.pageSize;
  }

  ngAfterViewInit(): void {
    if (this.paginatorObj) {
      this.dataSource.paginator = this.paginatorObj;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      if (params['checkArguments']) {
        this.checkId = params['checkArguments'];
        this.getPurgedDetail(+this.checkId);

      }
    });
  }

  init(checkSeries: string, checkNumber: number, issueDate: string): void {
    if (checkSeries && checkNumber && issueDate) {

      this.checkSvc.getCheck('check_series', 0, checkSeries, checkNumber, issueDate, '', 0, 0).subscribe(resDataA => {
        if (resDataA && resDataA._embedded && resDataA._embedded.items) {
          this.processDataForTable(resDataA._embedded.items);
        }
      });

    }
  }

  getPurgedDetail(checkId: number): void {
    this.checkSvc.getPurgeCheck(checkId).subscribe(res => {
      this.purgeDetails = res;
      const checkSeries: string = this.purgeDetails.checkSeries ? this.purgeDetails.checkSeries : '';
      const checkNumber: number = this.purgeDetails.checkNumber ? this.purgeDetails.checkNumber : 0;
      const issueDate: string = this.purgeDetails.issueDate ? this.purgeDetails.issueDate : '';
      this.init(checkSeries, checkNumber, issueDate);
    });
  }

  processDataForTable(data: ResourceOfCheckSummaryVO[]): void {
    data.forEach((element) => {
      const zeroField = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let numberLength = 0;
      if (element && element.accountNumber) {
        numberLength = element.accountNumber.toString().length;
      }
      zeroField.splice(0, numberLength);
      element.accountNumber = zeroField.join('') + element.accountNumber;
    });
    this.purgedCheckListData = data;
    this.dataLength = this.purgedCheckListData.length;
  }

  goBack(): void {
    this.commonSvc.isBack = true;
    this.router.navigate(['/check-recovery/find-check-register']);
  }

}
