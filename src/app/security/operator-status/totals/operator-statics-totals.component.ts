import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  Dfhcommarea,
  HeaderMaintenanceService,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  securityRoutePathReviewOperatorStatistics,
  securityRoutePathRoot,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {Container} from './models/container.model';
import {Rpdma98} from './models/rpdma98.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::operstattotals::operstattotals::operstattotals
 */
@Component({
  selector: 'fox-operator-statics-totals',
  templateUrl: './operator-statics-totals.component.html',
  styleUrls: ['./operator-statics-totals.component.css']
})
export class OperatorStaticsTotalsComponent implements OnInit {
  screen = new Rpdma98();
  common = new Dfhcommarea();
  columnsProcessClaim?: Object;
  tableDataProcessClaim: TableDataProcessClaim[] = [];
  resultsProcessClaim?: TableDataProcessClaim[];
  columnsQualityReview?: Object;
  tableDataQualityReview: TableDataQualityReview[] = [];
  resultsQualityReview: TableDataQualityReview[];

  public constructor(protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     private pageHeaderService: PageHeaderService,
                     protected headerMaintenance: HeaderMaintenanceService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.pageHeaderService.customTitle = 'Operator Statistics Location Totals';

    this.operStatTotalsServiceOnload(this.common).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      this.screen = container.screenbean;

      this.tableDataProcessClaim = this.setTableDataProcessClaim(this.screen, 'Pays', 'm98cpay', 'm98spay', 'm98qpay', 'm98tpay');
      this.tableDataProcessClaim.push(this.setTableDataProcessClaim(this.screen, 'No Pays', 'm98cnpa', 'm98snpa', 'm98qnpa', 'm98tnpa')[0]);
      this.tableDataProcessClaim.push(this.setTableDataProcessClaim(this.screen, 'Disbursed', 'm98cdis', 'm98sdis', 'm98qdis', 'm98tdis')[0]);
      this.tableDataProcessClaim.push(this.setTableDataProcessClaim(this.screen, 'Suspended', 'm98csus', 'm98ssus', 'm98qsus', '')[0]);
      this.tableDataProcessClaim.push(this.setTableDataProcessClaim(this.screen, 'To Quality', 'm98cqty', 'm98sqty', '', '')[0]);
      this.tableDataProcessClaim.push(this.setTableDataProcessClaim(this.screen, 'Aborted', 'm98cabt', '', '', '')[0]);
      this.tableDataProcessClaim.push(this.setTableDataProcessClaim(this.screen, 'No Found', 'm98nfnd', '', '', '')[0]);

      this.columnsProcessClaim = Object.keys(this.tableDataProcessClaim[0]).map( (column, index) => {
        return {
          key: column,
          header: column,
          border: false
        };
      });

      this.tableDataProcessClaim.push({
        Current: (+this.screen.m98cpay + +this.screen.m98cnpa + +this.screen.m98cdis + +this.screen.m98csus + +this.screen.m98cqty + +this.screen.m98cabt + +this.screen.m98nfnd).toString(),
        Quality: (+this.screen.m98qpay + +this.screen.m98qnpa + +this.screen.m98qdis + +this.screen.m98qsus).toString(),
        'Process Claim': 'Total Hours',
        Suspense: (+this.screen.m98spay + +this.screen.m98snpa + +this.screen.m98sdis + +this.screen.m98ssus + +this.screen.m98sqty).toString(),
        Total: (+this.screen.m98tpay + +this.screen.m98tnpa + +this.screen.m98tdis).toString()
      });

      this.resultsProcessClaim = this.tableDataProcessClaim;

      this.tableDataQualityReview = this.setTableDataQualityReview(this.screen, '# Reviewed', 'm98qnr', '', '', '');
      this.tableDataQualityReview.push(this.setTableDataQualityReview(this.screen, '# Suspended', 'm98qcs', '', '', '')[0]);
      this.tableDataQualityReview.push(this.setTableDataQualityReview(this.screen, 'Errors Removed', 'm98qcr', '', '', '')[0]);
      this.tableDataQualityReview.push(this.setTableDataQualityReview(this.screen, 'Errors Changed', 'm98qcc', '', '', '')[0]);
      this.tableDataQualityReview.push(this.setTableDataQualityReview(this.screen, 'Express', 'm98expr', '', '', '')[0]);

      this.columnsQualityReview = Object.keys(this.tableDataQualityReview[0]).map( (column, index) => {
        return {
          key: column,
          header: column,
          border: false
        };
      });

      this.tableDataQualityReview.push({
        Current: (+this.screen.m98qnr + +this.screen.m98qcs + +this.screen.m98qcr + +this.screen.m98qcc + +this.screen.m98expr).toString(),
        Quality: '',
        'Quality Review': 'Total Hours',
        Suspense: '',
        Total: ''
      });

      this.resultsQualityReview = this.tableDataQualityReview;
    });
  }

  /**
   * Event action CancelEventClick
   */
  CancelEventClick(): void {
    const container = new Container();
    let retContainer = new Container();
    const result = new Container();
    container.screenbean = this.screen;
    container.dfhCommArea = this.common;
    this.operStatTotalsServiceShowFreshMap(container).subscribe(resp => {
      retContainer = resp;
      this.screen = container.screenbean;
      this.common = container.dfhCommArea;
    });
  }

  /**
   * Event action EnterEventClick
   */
  EnterEventClick(): void {
    let container = new Container();

    container.screenbean = this.screen;

    container.dfhCommArea = this.common;
    this.operStatTotalsServiceScreenDataEntered(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean;
      this.common = container.dfhCommArea;
      this.router.navigate(['/security/review-operator-statistics']);
    });
  }

  /**
   * Event action PF1EventClick
   */
  PF1EventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.screenbean = this.screen;

    container.dfhCommArea = this.common;
    this.operStatTotalsServiceReturnControl(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean;
      this.common = container.dfhCommArea;
      if (this.common.callingProgram === 'RPD05O95') {
        this.common.callingProgram = 'RPD05O98';
        data = this.transferSrv.getData();
        data['common'] = this.common;
        this.router.navigate(['/operstat']);
      }
      if (this.common.callingProgram === 'RPD05O97') {
        this.router.navigate([securityRoutePathRoot + '/' + securityRoutePathReviewOperatorStatistics]);
      }
    });
  }

  setTableDataProcessClaim(screen: Rpdma98, process: string, current: string, suspense: string, quality: string, total: string): TableDataProcessClaim[] {
    return [screen].map( res => {
      return {
        'Process Claim': process,
        Current: res[current],
        Suspense: res[suspense],
        Quality: res[quality],
        Total: res[total]
      };
    });
  }

  setTableDataQualityReview(screen: Rpdma98, process: string, current: string, suspense: string, quality: string, total: string): TableDataQualityReview[] {
    return [screen].map( res => {
      return {
        'Quality Review': process,
        Current: res[current],
        Suspense: res[suspense],
        Quality: res[quality],
        Total: res[total]
      };
    });
  }

  private pushAlert(message: string): void {
    if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Operator Statistics Totals', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls onload
   */
  private operStatTotalsServiceOnload(common: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/operstattotals/operstattotalsservice/onload', JSON.stringify(common), options);
  }

  /**
   * Back end calls returnControl
   */
  private operStatTotalsServiceReturnControl(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/operstattotals/operstattotalsservice/returncontrol', JSON.stringify(container), options);
  }

  /**
   * Back end calls screenDataEntered
   */
  private operStatTotalsServiceScreenDataEntered(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/operstattotals/operstattotalsservice/screendataentered', JSON.stringify(container), options);
  }

  /**
   * Back end calls showFreshMap
   */
  private operStatTotalsServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/operstattotals/operstattotalsservice/showfreshmap', JSON.stringify(container), options);
  }
}

interface TableData {
  Quality: string;
  Total: string;
  Suspense: string;
  Current: string;
}

interface TableDataProcessClaim extends TableData {
  'Process Claim': string;
}

interface TableDataQualityReview extends TableData {
  'Quality Review': string;
}
