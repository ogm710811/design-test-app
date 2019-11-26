import {HttpClient} from '@angular/common/http';
import {AfterViewChecked, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathDefaultFile,
  dashboardRoutePathRoot,
  DateFormatService,
  Dfhcommarea,
  MessageBoxService,
  MessageBoxType,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {filter, map} from 'rxjs/operators';
import {PageHeaderService} from '@fox/shared';
import {OpMaintenanceService} from '@fox/shared';
import {Container} from './model/container.model';
import {Rpdma42} from './model/rpdma42.model';
import {SiteInfo} from './model/site-info.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::setqltytmpltasgn::setqltytmpltasgn::setqltytmpltasgn
 */
@Component({
  selector: 'fox-set-quality-temp-assign',
  templateUrl: './set-quality-template-assignments.component.html',
  styleUrls: ['./set-quality-template-assignments.component.css']
})
export class TemplateAssignmentComponent implements OnInit, AfterViewChecked {
  @ViewChild('inputTable') inputTable: TableComponent;
  screen = new Rpdma42();
  common = new Dfhcommarea();
  container = new Container();
  mutipleMemTableColumns: any[];
  mutipleMemTableData: SiteInfo[] = [];
  lastMaintenanceDate: string;
  buttonStatus: string = ButtonStatus.SUBMIT;
  isModified = false;
  isWorking = false;

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     private requestDate: DateFormatService,
                     public pageHeaderService: PageHeaderService,
                     private opMaintenance: OpMaintenanceService) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let data: any = undefined;
    let container = new Container();
    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.setQltyTmpltAsgnServiceMainRoutine(this.common).subscribe(res => {
      container = res;
      data = this.transferSrv.getData();
      this.screen = container.screenbean;
      this.lastMaintenanceDate = this.requestDate.getCcyyFormatedDateIE(this.screen.m42date.replace(/\//g, ''));
      this.pageHeaderService.customTitle = 'Site Template Assignment';
      this.common = container.dfhCommArea;
      this.container = container;
      this.mutipleMemTableData = this.screen.siteInfos;
      this.mutipleMemTableColumns =
        [
          {
            key: 'm42st',
            headerText: 'Site',
            kind: TableColumnKind.Text,
            border: false
          },
          {
            key: 'm42ct',
            headerText: 'Current Template Assignment',
            kind: TableColumnKind.Text,
            border: false
          },
          {
            key: 'm42nt',
            headerText: 'Next Template Assignment',
            kind: this.screen.m42ntam === '' ? TableColumnKind.Input : TableColumnKind.Text,
            border: false,
            inputType: 'text'
          }
        ];
    });

  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapBackTheData().subscribe(data => {
        this.screen.siteInfos = data;
        this.screen.siteInfos = this.mutipleMemTableData.map((item, index) => {
          if (data.length === this.mutipleMemTableData.length) {
            data[index].m42ct = item.m42ct;
            data[index].m42st = item.m42st;
          }
          return data[index];
        });
      });
    }
  }
  /**
   * Event action CLEAREventClick
   */
  clearEventClick(): void {
    this.inputTable.tableFormGroup.reset();
    let container = new Container();
    container.screenbean = this.screen;
    container.dfhCommArea = this.common;
    this.setQltyTmpltAsgnServiceFirstTimeIn(container).subscribe(res => {
      container = res;
      this.screen = container.screenbean;
      this.common = container.dfhCommArea;
    });
  }

  /**
   * Event action ENTEREventClick
   */
  enterEventClick(): void {
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      this.isWorking = true;
      let data: any = undefined;
      let container = new Container();
      this.setQltyTmpltAsgnServiceScreenInfo(this.container).subscribe(res => {
        container = res;
        this.screen = container.screenbean;
        this.common = container.dfhCommArea;
        this.container = container;
        data = this.transferSrv.getData();
        data['common'] = this.common;
        if (container.dfhCommArea.nextProgram === 'RPD05O82') {
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.resetState();
          this.router.navigate(['/dashboard/operator-default-file']);
        }
        this.buttonStatus = ButtonStatus.FAILED;
        this.resetState();
        this.pushAlert(this.screen.m42err);
      });
    } catch (error) {
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
    }
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = ButtonStatus.SUBMIT, 2500);
  }
  /**
   * Event action F1EventClick
   */
  f1EventClick(): void {
    let data: any = undefined;
    let container = new Container();
    this.setQltyTmpltAsgnServiceReturnToMenu(this.container).subscribe(res => {
      container = res;
      this.screen = container.screenbean;
      this.common = container.dfhCommArea;
      this.container = container;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (container.dfhCommArea.nextProgram === 'RPD05O82') {
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
      }
    });
  }

  /**
   * Event action F3EventClick
   */
  f3EventClick(): void {
    let data: any = undefined;
    let container = new Container();
    this.setQltyTmpltAsgnServiceExclusions(this.container).subscribe(res => {
      container = res;
      this.screen = container.screenbean;
      this.common = container.dfhCommArea;
      this.container = container;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (container.dfhCommArea.nextProgram === 'RPD05O43') {
        this.router.navigate(['/dashboard/set-quality-temp-exc']);
      }
    });
  }

  @HostListener('document:keypress', ['$event']) keyEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !this.isWorking) {
      this.enterEventClick();
    }
  }

  private mapBackTheData(): Observable<SiteInfo[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      filter((data: object): data is {rows: Array<any>} => {
        return data.hasOwnProperty('rows');
      }),
      map((data: {rows: any[]}) => {
        return data.rows.map(results => {
          return {
            m42st: '',
            m42ct: '',
            m42nt: results['m42nt']
          };
        });
      })
    );
  }

  private pushAlert(message: string, type?: string): void {
    if (message && type) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Template Assignment', MessageBoxType.SUCCESS, message);
    } else if (message) {
      window.scrollTo(0, 0);
      if (message.toLocaleUpperCase().includes('PLEASE VERIFY')) {
        this.messageBoxService.addMessageBox('Template Assignment', MessageBoxType.ACTIVE, message);
      } else {
        this.messageBoxService.addMessageBox('Template Assignment', MessageBoxType.ERROR, message);
      }
    }
  }

  /**
   * Back end calls firstTimeIn
   */
  private setQltyTmpltAsgnServiceFirstTimeIn(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltytmpltasgn/setqltytmpltasgnservice/firsttimein', JSON.stringify(container), options);

  }

  /**
   * Back end calls screenInfo
   */
  private setQltyTmpltAsgnServiceScreenInfo(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltytmpltasgn/setqltytmpltasgnservice/screeninfo', JSON.stringify(container), options);

  }

  /**
   * Back end calls exclusions
   */
  private setQltyTmpltAsgnServiceExclusions(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltytmpltasgn/setqltytmpltasgnservice/exclusions', JSON.stringify(container), options);

  }

  /**
   * Back end calls returnToMenu
   */
  private setQltyTmpltAsgnServiceReturnToMenu(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltytmpltasgn/setqltytmpltasgnservice/returntomenu', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainRoutine
   */
  private setQltyTmpltAsgnServiceMainRoutine(common: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltytmpltasgn/setqltytmpltasgnservice/mainroutine', JSON.stringify(common), options);

  }
}
