import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit
} from '@angular/core';
import {Router} from '@angular/router';
import {
  claimProcessingRoutePathManualClaimIntake,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathTypeOfService,
  Dfhcommarea,
  HeaderMaintenanceService,
  HeaderRightItem,
  homeRoutePathRoot,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  ProcClmHospChrg,
  ProcClmHospChrgDateOfAccidentLine,
  ProcClmHospChrgLatestBen,
  ProcClmHospChrgMapLines1,
  ProcClmHospChrgMapLines2,
  ProcClmHospChrgRelatedLines,
  TableColumnKind,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {CurrentStatisticsRightComponent} from '../../../dashboard/current-statistics/current-statistics-right/current-statistics-right.component';
import {ProcClmElig} from '../process-claim-eligibility/model/proc-clm-elig.model';
import {Container} from './model/container.model';
import {Rpdmb37} from './model/rpdmb37.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::mendofclaim::mendofclaimScreen::mendofclaimScreen
 */
@Component({
  selector: 'fox-app-mendofclaim-screen',
  templateUrl: './process-end-of-claim.component.html',
  styleUrls: ['./process-end-of-claim.component.css']
})
export class MendofclaimScreenComponent implements OnInit, AfterViewChecked {
  screen = new Rpdmb37();
  common = new Dfhcommarea();
  container = new Container();
  procClmElig = new ProcClmElig();
  isHeaderSet: boolean = false;
  processedclaimtabledata: any = [];
  resultCurrentSortKey: string = 'plan';
  resultSortDirection: any = 'ASC';
  processedclaimtablecolumns: any = [
    {
      key: 'type',
      headerText: 'Type',
      kind: TableColumnKind.Text,
      sortKey: 'type',
    },
    {
      key: 'claimnumber',
      headerText: 'Claim #',
      kind: TableColumnKind.Text,
      sortKey: 'claimnumber',
      preImage: 'claim-grey.svg',
    },
    {
      key: 'sequence',
      headerText: ' ',
      kind: TableColumnKind.Text,
    }
  ];

  public constructor(
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    protected headerMaintenance: HeaderMaintenanceService,
    private pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {

  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    const container = new Container();
    let data: any = undefined;
    let rpd06o17Container = new Container();
    this.screen = rpd06o17Container.rpdmb37;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    rpd06o17Container = await this.mendOfClaimServiceMainProcess(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screen = rpd06o17Container.rpdmb37;
    this.common = rpd06o17Container.dfhCommArea;
    this.container = rpd06o17Container;
    this.processedclaimtabledata = [];
    for (let i = 1; i <= 9; i++) {
      const processedclaimobject: any = {};
      processedclaimobject['type'] = this.screen['m37typ' + i];
      processedclaimobject['claimnumber'] = this.screen['m37cln' + i];
      processedclaimobject['sequence'] = this.screen['m37seq' + i];
      if (processedclaimobject['claimnumber'] && processedclaimobject['claimnumber'].length > 0) {
        this.processedclaimtabledata.push(processedclaimobject);
      }
    }
    if (this.screen.m37err) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m37err);
    }
    return true;
  }

  async exitEventClick(): Promise<boolean> {
    this.router.navigate([homeRoutePathRoot]);
    return true;
  }

  async splitEventClick(): Promise<boolean> {
    let data: any = undefined;
    const screenProcClmHospChrg = new ProcClmHospChrg();
    const procClmHospChrgMapLines1: ProcClmHospChrgMapLines1[] = [];
    const procClmHospChrgMapLines2: ProcClmHospChrgMapLines2[] = [];
    const procClmHospChrgLatestBen = new ProcClmHospChrgLatestBen();
    const procClmHospChrgRelatedLines = new ProcClmHospChrgRelatedLines();
    const procClmHospChrgDateOfAccidentLine = new ProcClmHospChrgDateOfAccidentLine();
    data = this.transferSrv.getData();
    this.common.processClaimCommarea.splitClaimInd = 'Y';
    this.common.processClaimCommarea.pluAssign = '';
    this.common.screenProcClmHospChrg = screenProcClmHospChrg;
    this.common.screenProcClmHospChrg.mapLines1s = procClmHospChrgMapLines1;
    this.common.screenProcClmHospChrg.mapLines2s = procClmHospChrgMapLines2;
    this.common.screenProcClmHospChrg.latestBens = procClmHospChrgLatestBen;
    this.common.screenProcClmHospChrg.latestRealtedLines = procClmHospChrgRelatedLines;
    this.common.screenProcClmHospChrg.latestDoas = procClmHospChrgDateOfAccidentLine;
    this.common.processClaimCommarea.hcChargeLineCtr = 0;
    this.common.exBasicClaimSeg.totClmCtr = 1;
    data['common'] = this.common;
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    return true;
  }

  async nextEventClick(): Promise<boolean> {
    this.procClmElig.m21err1 = '';
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathManualClaimIntake]);
    return true;
  }

  ngAfterViewChecked(): void {
    if (!this.isHeaderSet) {
      this.isHeaderSet = true;
      this.pageHeaderService.customTitle = 'End of Claim';
      this.pageHeaderService.headerRightItem = new HeaderRightItem(
        CurrentStatisticsRightComponent,
        {},
        this.componentFactoryResolver,
        this.injector);
    }
  }

  private mendOfClaimServiceMainProcess(dfhcommarea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/mendofclaim/mendofclaimservice/mainprocess', JSON.stringify(dfhcommarea), options);
  }

  /**
   * Back end calls pf2Exit
   */
  private mendOfClaimServicePf2Exit(rpd06o17Container: Container): Observable<void> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<void>('/api/manual/adjudication/services/mendofclaim/mendofclaimservice/pf2exit', JSON.stringify(rpd06o17Container), options);
  }
}
