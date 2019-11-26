import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  HostListener,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  claimProcessingRoutePathBillLineSpecialMemo,
  claimProcessingRoutePathProcessClaimMessages,
  claimProcessingRoutePathReviewBillLineMessages,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathTypeOfService,
  Dfhcommarea,
  HeaderMaintenanceService,
  MessageBoxService,
  MessageBoxType,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {HeaderSubtitleItem} from '@fox/shared';
import {PageHeaderService} from '@fox/shared';
import {ProcessClaimSubheaderComponent} from '@fox/shared';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Rpdmb22} from '../type-of-service/model/rpdmb22.model';
import {BillLineMessages} from './model/bill-line-messages.model';
import {Blmessages} from './model/blmessages.model';
import {Container} from './model/container.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::blmessages::blmessages::blmessages
 */
@Component({
  selector: 'fox-app-blmessages',
  templateUrl: './bill-line-messages.component.html',
  styleUrls: ['./bill-line-messages.component.css']
})
export class BillLineMessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('inputTable') inputTable: TableComponent;
  screen = new Blmessages();
  common = new Dfhcommarea();
  container = new Container();
  screenBeanData = new Rpdmb22();
  isHeaderOn = false;
  tableData: TableData[] = [];
  columns: Object;
  result: TableData[];
  isTableConstructed: boolean = false;
  isModified = false;
  isWorking = false;
  continueStatus = 'Submit';
  keysTable: any;
  billLineMessageTab: BillLineMessages[];

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    private manualCalimService: ManualClaimService,
    private pageHeaderService: PageHeaderService,
    protected headerMaintenance: HeaderMaintenanceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    this.isTableConstructed = false;
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    container = await this.bLMessagesServiceInitilizationprog(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screen = container.screen;
    this.common = container.commonArea;
    this.screenBeanData = this.manualCalimService.screenBean;
    this.billLineMessageTab = this.screen.billlinemessagetab;
    this.container = container;
    this.tableData = this.screen.billlinemessagetab.map((result, index) => {
      return {
        '#': index + 1,
        'PatternParagraph1': result.aa3pp[0],
        'PatternParagraph2': result.aa3pp[1],
        'PatternParagraph3': result.aa3pp[2],
        'PatternParagraph4': result.aa3pp[3],
        'PatternParagraph5': result.aa3pp[4],
        'SpecialMemo1': result['aa3sm1'],
        'SpecialMemo2': result['aa3sm2'],
        'Plan': result['aa3planCode'],
        'Provider': result['aa3provider'],
        'DateofServiceFrom': result['aa3fromDate'],
        'Charge': result['aa3charge'],
      };
    });
    this.keysTable = ['#', 'Pattern Paragraph 1', 'Pattern Paragraph 2', 'Pattern Paragraph 3', 'Pattern Paragraph 4', 'Pattern Paragraph 5',
      'Special Memo 1', 'Special Memo 2', 'Plan', 'Provider', 'Date of Service From', 'Charge'];
    this.columns = Object.keys(this.tableData[0]).map((key, index) => {
      return {
        key: key,
        headerText: this.keysTable[index],
        boarder: false,
        kind: (index === 0 || index === 8 || index === 9 || index === 10 || index === 11) ? TableColumnKind.Text : TableColumnKind.Input,
        inputType: (index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 6 || index === 7) ? 'text' : 'fox-currency'
      };
    });
    this.result = this.tableData;
    if (this.screen.aa3err) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.aa3err);
    }
    return true;
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapBackTheData().subscribe(data => {
        this.screen.billlinemessagetab = data;
        for (let i = 0; i < this.billLineMessageTab.length; i++) {
          this.screen.billlinemessagetab[i].aa3planCode = this.billLineMessageTab[i].aa3planCode;
          this.screen.billlinemessagetab[i].aa3provider = this.billLineMessageTab[i].aa3provider;
          this.screen.billlinemessagetab[i].aa3fromDate = this.billLineMessageTab[i].aa3fromDate;
          this.screen.billlinemessagetab[i].aa3charge = this.billLineMessageTab[i].aa3charge;
          this.screen.billlinemessagetab[i].aa3Cpt = this.billLineMessageTab[i].aa3Cpt;
          this.screen.billlinemessagetab[i].aa3Mod = this.billLineMessageTab[i].aa3Mod;
          this.screen.billlinemessagetab[i].aa3dtl = this.billLineMessageTab[i].aa3dtl;
        }
      });
    }

    if (!this.isTableConstructed) {
      this.tableColumnWidth();
      const header1 = document.getElementById('header1');
      const stickyCells = document.getElementsByClassName('column-sticky');
      if (header1 && stickyCells.length > 0) {
        this.isTableConstructed = true;
      }
    }
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Bill Line Messages';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        ProcessClaimSubheaderComponent,
        {
          memberName: (this.screen) ? this.screen.aa3name : 'N/A',
          account: (this.screen) ? this.screen.aa3memn : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);

      const subheadertitle = document.getElementById('subheadertitle');
      if (subheadertitle) {
        this.isHeaderOn = true;
      }
    }
  }

  /**
   * Event action BLMESSAGEEventClick
   */
  async blMessagEventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.screen = this.screen;
    container.commonArea = this.common;
    container = this.container;
    container.eibAid = 'PF5';
    container = await this.bLMessagesServiceEditEnterKey(container).toPromise();
    container = await this.bLMessagesServicePf5Key(container).toPromise();
    this.screen = container.screen;
    this.common = container.commonArea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.container = container;
    if (container.commonArea.nextProgram === 'RPD06O53') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathReviewBillLineMessages]);
    }
    return true;
  }

  /**
   * Event action CANCELEventClick
   */
  async returnEventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.screen = this.screen;
    container.commonArea = this.common;
    container = this.container;
    container = await this.bLMessagesServicePf1ReturnKey(container).toPromise();
    this.screen = container.screen;
    this.common = container.commonArea;
    this.container = container;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    if (container.commonArea.nextProgram === 'RPD06O76') {
      this.router.navigate(['/quality-review/quality-misc-info']);
    } else {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    }
    return true;
  }

  /**
   * Event action ENTEREventClick
   */
  async enterEventClick(): Promise<boolean> {
    this.screen.billlinemessagetab.forEach(res => {
      res.aa3pp[0] = res.aa3pp[0] === null ? '' : res.aa3pp[0];
      res.aa3pp[1] = res.aa3pp[1] === null ? '' : res.aa3pp[1];
      res.aa3pp[2] = res.aa3pp[2] === null ? '' : res.aa3pp[2];
      res.aa3pp[3] = res.aa3pp[3] === null ? '' : res.aa3pp[3];
      res.aa3pp[4] = res.aa3pp[4] === null ? '' : res.aa3pp[4];
      res.aa3sm1 = res.aa3sm1 === null ? '' : res.aa3sm1;
      res.aa3sm2 = res.aa3sm2 === null ? '' : res.aa3sm2;
      res.aa3planCode = res.aa3planCode === null ? '' : res.aa3planCode;
      res.aa3provider = res.aa3provider === null ? '' : res.aa3provider;
      res.aa3fromDate = res.aa3fromDate === null ? '' : res.aa3fromDate;
      res.aa3charge = res.aa3charge === null ? '' : res.aa3charge;
    });
    let container = new Container();
    let data: any = undefined;
    container.eibAid = 'ENTER';
    try {
      this.continueStatus = 'Working...';
      this.isWorking = true;
      container = await this.bLMessagesServiceEditEnterKey(this.container).toPromise();
      container = await this.bLMessagesServiceEnterKey(container).toPromise();
      this.screen = container.screen;
      this.common = container.commonArea;
      this.container = container;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.screen.aa3err) {
        this.continueStatus = 'Failed';
        this.resetState();
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.aa3err);
      }
      if (container.commonArea.nextProgram === 'RPD06O54') {
        this.setSuccess();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimMessages]);
      }
      if (container.commonArea.nextProgram === 'RPD06O52') {
        this.setSuccess();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBillLineSpecialMemo]);
      }
      if (container.commonArea.nextProgram === 'RPD06O76') {
        this.setSuccess();
        data['dfhCommArea'] = this.common;
        this.router.navigate(['/quality-review/quality-misc-info']);
      }
      return true;
    } catch {
      this.continueStatus = 'Failed';
      this.resetState();
      return false;
    }
  }

  clearEventClick(): void {
    this.inputTable.tableFormGroup.reset();
  }

  @HostListener('document:keypress', ['$event']) keyEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !this.isWorking) {
      this.enterEventClick();
    }
  }

  private tableColumnWidth(): void {
    const header1 = document.getElementById('header1');
    if (header1) {
      header1.style.minWidth = '150px';
      header1.style.whiteSpace = 'normal';
    }
    const header2 = document.getElementById('header2');
    if (header2) {
      header2.style.minWidth = '150px';
      header2.style.whiteSpace = 'normal';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '150px';
      header3.style.whiteSpace = 'normal';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '150px';
      header4.style.whiteSpace = 'normal';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '150px';
      header5.style.whiteSpace = 'normal';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '100px';
      header6.style.whiteSpace = 'normal';
    }
    const header7 = document.getElementById('header7');
    if (header7) {
      header7.style.minWidth = '100px';
      header7.style.whiteSpace = 'normal';
    }
    const header8 = document.getElementById('header8');
    if (header8) {
      header8.style.minWidth = '90px';
    }
    const header9 = document.getElementById('header9');
    if (header9) {
      header9.style.minWidth = '170px';
    }
    const header10 = document.getElementById('header10');
    if (header10) {
      header10.style.minWidth = '120px';
    }
    const header11 = document.getElementById('header11');
    if (header11) {
      header11.style.minWidth = '85px';
    }

    const containerTable = document.getElementsByClassName('container-table');
    if (containerTable[0]) {
      containerTable[0]['style'].overflow = 'hidden';
    }
    const stickyCells = document.getElementsByClassName('column-sticky');
    for (let i = 0; i < stickyCells.length; i++) {
      if (stickyCells[i].id === 'header0') {
        stickyCells[i]['style'].width = '53px';
        stickyCells[i]['style'].height = '57px';
      } else {
        stickyCells[i]['style'].width = '53px';
        stickyCells[i]['style'].height = '71px';
        stickyCells[i]['style']['padding-top'] = '17px';
      }
    }
    const sve = document.getElementsByClassName('table-scroller-vertical');
    if (sve && sve.length > 0) {
      this.isTableConstructed = (sve[0]['style'].marginLeft === '52px') ? true : false;
      sve[0]['style'].marginLeft = '52px';
    }
  }

  private mapBackTheData(): Observable<BillLineMessages[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(results => {
          return {
            aa3pp: [
              results['PatternParagraph1'],
              results['PatternParagraph2'],
              results['PatternParagraph3'],
              results['PatternParagraph4'],
              results['PatternParagraph5']
            ],
            aa3sm1: results['SpecialMemo1'],
            aa3sm2: results['SpecialMemo2'],
          };
        });
      })
    );
  }

  private setSuccess(): void {
    this.continueStatus = 'Success!';
    this.resetState();
  }

  private resetState(): void {
    setTimeout(() => {
      this.continueStatus = 'Submit';
      this.isWorking = false;
    }, 2500);
  }

  /**
   * Back end calls pf5Key
   */
  private bLMessagesServicePf5Key(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/blmessages/blmessagesservice/pf5key', JSON.stringify(container), options);

  }

  /**
   * Back end calls enterKey
   */
  private bLMessagesServiceEnterKey(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/blmessages/blmessagesservice/enterkey', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf1ReturnKey
   */
  private bLMessagesServicePf1ReturnKey(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/blmessages/blmessagesservice/pf1returnkey', JSON.stringify(container), options);

  }

  /**
   * Back end calls editEnterKey
   */
  private bLMessagesServiceEditEnterKey(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/blmessages/blmessagesservice/editenterkey', JSON.stringify(container), options);

  }

  /**
   * Back end calls initilizationprog
   */
  private bLMessagesServiceInitilizationprog(commonArea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/blmessages/blmessagesservice/initilizationprog', JSON.stringify(commonArea), options);

  }
}

interface TableData {
  '#': number;
  'PatternParagraph1': string;
  'PatternParagraph2': string;
  'PatternParagraph3': string;
  'PatternParagraph4': string;
  'PatternParagraph5': string;
  'SpecialMemo1': string;
  'SpecialMemo2': string;
  'Plan': string;
  'Provider': string;
  'DateofServiceFrom': string;
  'Charge': string;
}
