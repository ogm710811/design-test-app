import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Container} from './model/container.model';
import {Rpdmb73} from './model/rpdmb73.model';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {
  Dfhcommarea,
  PaginatorNonMaterialComponent,
  MessageBoxService,
  MessageBoxType,
  TableColumnKind,
  TransferSrvService,
  HeaderRightItem,
  PageHeaderService,
  ProcessClaimHeaderRightComponent
} from '@fox/shared';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::rvwIcdService::rvwIcdService::rvwIcdService
 */
@Component({
  selector: 'fox-review-icd-codes',
  templateUrl: './review-icd-codes.component.html',
  styleUrls: ['./review-icd-codes.component.css']
})
export class ReviewIcdCodesComponent implements OnInit, OnDestroy {
  rpdmb73 = new Rpdmb73();
  dfhComArea = new Dfhcommarea();

  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;
  data: any;
  viewData: any;
  pageTotal: number = 0;
  pageSizeSelected = 10;
  currentPage = 0;
  dataLengthInput = 0;
  controlVisibility = true;
  subscription = new Subscription();
  revwIcdCodeColumn: object = [];
  revwIcdCodeTableData: any = [];
  resultCurrentSortKey: string = 'ICD Code';
  resultSortDirection: string = 'ASC';
  tableHeader: string[] = [];
  columnsHeader: object[] = [
    {
      headerText: '',
      colSpanValue: '3',
      border: true
    },
    {
      headerText: 'Mental Health',
      colSpanValue: '3',
      border: true
    },
    {
      headerText: '',
      colSpanValue: '2',
      border: true
    }];

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected router: Router,
                     protected httpClient: HttpClient,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     public pageHeaderService: PageHeaderService,
                     private componentFactoryResolver: ComponentFactoryResolver,
                     private injector: Injector ) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.dfhComArea = data['dfhComArea'];
    if (this.dfhComArea === undefined) {
      this.dfhComArea = new Dfhcommarea();
    }
    this.rvwIcdServiceMainOperation(this.dfhComArea).subscribe(res => {
      container = res;
      this.transferSrv.getData();
      this.rpdmb73 = container.rpdmb73;
      this.dfhComArea = container.dfhComArea;
      this.dataLengthInput = this.rpdmb73.mapLines.length;
      if (this.paginator) {
        this.viewData = this.rpdmb73.mapLines.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      }
      this.revwIcdCodeTableData = this.mapData(this.viewData);
      this.tableHeader = ['ICD Code', 'ICD Indicator', 'Descripition', 'Map Plans', 'Other Plans', 'Drug / Alcohol Facility Eligibility', 'Contest', 'Subrogation'];
      this.revwIcdCodeColumn = Object.keys(this.revwIcdCodeTableData[0]).map((key, index) => {
        return {
          key: key,
          headerText: this.tableHeader[index],
          border: false,
          kind: (index === 0 || index === 1 || index === 2) ? TableColumnKind.Text : TableColumnKind.IconItem,
          sortKey: key,
        };
      });
    });
    if (this.paginator) {
      this.pageTotal = Math.ceil(this.rpdmb73.mapLines.length / this.paginator.pageSize);
    }
    this.pageHeaderService.customTitle = 'Review ICD Codes';
    this.pageHeaderService.headerRightItem = new HeaderRightItem(
      ProcessClaimHeaderRightComponent,
      {
        secondButton: {
          display: 'Add Or Update (M)', identifier: 'm', tab: 'alt+m'
        }
      },
      this.componentFactoryResolver,
      this.injector);
    this.subscription = this.pageHeaderService.getBtnClickEmitter().subscribe((item: any) => {
      if (item === 'm') {
        this.pF7EventClick();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Event action CLEAREventClick
   */
  clearEventClick(): void {
    const container = new Container();
    let containerOut = new Container();
    container.rpdmb73 = this.rpdmb73;
    container.dfhComArea = this.dfhComArea;
    this.rvwIcdServiceShowFreshMap(container).subscribe(res => {
      containerOut = res;
      this.rpdmb73 = containerOut.rpdmb73;
      this.dfhComArea = container.dfhComArea;
      this.controlVisibility = true;
    });
  }

  /**
   * Event action ENTEREventClick
   */
  enterEventClick(): void {
    let container = new Container();
    container.rpdmb73 = this.rpdmb73;
    container.dfhComArea = this.dfhComArea;
    this.rvwIcdServiceScreenEnteredData(container).subscribe(res => {
      container = res;
      this.rpdmb73 = container.rpdmb73;
      this.dfhComArea = container.dfhComArea;
      if (this.rpdmb73.m73err || !this.rpdmb73.mapLines.length) {
        this.pushAlert(this.rpdmb73.m73err);
        this.controlVisibility = true;
      }
      if (this.rpdmb73.mapLines[0].icdI !== '') {
        this.controlVisibility = false;
      }
      this.dataLengthInput = this.rpdmb73.mapLines.length;
      if (this.paginator) {
        this.viewData = this.rpdmb73.mapLines.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
        this.revwIcdCodeTableData = this.mapData(this.viewData);
        this.pageTotal = Math.ceil(this.rpdmb73.mapLines.length / this.paginator.pageSize);
      }
    });
  }

  /**
   * Event action PF3EventClick
   */
  pF3EventClick(): void {
    let container = new Container();
    container.rpdmb73 = this.rpdmb73;
    container.dfhComArea = this.dfhComArea;
    this.rvwIcdServiceReadnextMoreRecords(container).subscribe(res => {
      container = res;
      this.rpdmb73 = container.rpdmb73;
      this.dfhComArea = container.dfhComArea;
    });
  }

  /**
   * Event action PF4EventClick
   */
  pF4EventClick(): void {
    let container = new Container();
    container.rpdmb73 = this.rpdmb73;
    container.dfhComArea = this.dfhComArea;
    this.rvwIcdServiceReadprevMoreRecords(container).subscribe(res => {
      container = res;
      this.rpdmb73 = container.rpdmb73;
      this.dfhComArea = container.dfhComArea;
    });
  }

  /**
   * Event action PF7EventClick
   */
  pF7EventClick(): void {
    let container = new Container();
    const data: any = undefined;
    container.rpdmb73 = this.rpdmb73;
    container.dfhComArea = this.dfhComArea;
    this.rvwIcdServiceXctlToRpd05o22(container).subscribe(res => {
      container = res;
      this.rpdmb73 = container.rpdmb73;
      this.dfhComArea = container.dfhComArea;
      if (this.dfhComArea.callingProgram === 'RPD05O22') {
        this.router.navigate(['/processing/icd-code-table']);
      }
    });
  }

  calculateNewPage(): void {
    if (this.paginator) {
      this.viewData = this.rpdmb73.mapLines.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.revwIcdCodeTableData = this.mapData(this.viewData);
      this.pageTotal = Math.ceil(this.rpdmb73.mapLines.length / this.paginator.pageSize);
    }
  }

  private pushAlert(message: string): void {
    window.scrollTo(0, 0);
    this.messageBoxService.addMessageBox('ICD File', MessageBoxType.ERROR, message);
  }

  private mapData(inputData: any): object {
    let mappedValue: object;
    mappedValue = inputData.map((result: any) => {
      return {
        'ICD Code': isNaN(Number(result.icdI)) ? result.icdI : Number(result.icdI),
        'ICD Indicator': isNaN(Number(result.icdindI)) ? result.icdI : Number(result.icdindI),
        'Descripition': result.desI,
        'Map Plans': (result.ehiI === 'Y') ? ['confirm-green.svg', 'Yes'] : (result.ehiI === 'N') ? ['deny-red.svg', 'No'] : '',
        'Other Plans': (result.othI === 'Y') ? ['confirm-green.svg', 'Yes'] : (result.othI === 'N') ? ['deny-red.svg', 'No'] : '',
        'Drug / Alcohol Facility Eligibility': (result.drgI === 'Y') ? ['confirm-green.svg', 'Yes'] : (result.drgI === 'N') ? ['deny-red.svg', 'No'] : '',
        'Contest': (result.cntI === 'Y') ? ['confirm-green.svg', 'Yes'] : (result.cntI === 'N') ? ['deny-red.svg', 'No'] : '',
        'Subrogation': (result.sbrI === 'Y') ? ['confirm-green.svg', 'Yes'] : (result.sbrI === 'N') ? ['deny-red.svg', 'No'] : '',
      };
    });
    return mappedValue;
  }

  /**
   * Back end calls xctlToRpd05o22
   */
  private rvwIcdServiceXctlToRpd05o22(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/rvwicdservice/rvwicdservice/xctlToRpd05o22', JSON.stringify(container), options);
  }

  /**
   * Back end calls showFreshMap
   */
  private rvwIcdServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/rvwicdservice/rvwicdservice/showfreshmap', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainOperation
   */
  private rvwIcdServiceMainOperation(dfhComArea: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/rvwicdservice/rvwicdservice/mainoperation', JSON.stringify(dfhComArea), options);
  }

  /**
   * Back end calls readprevMoreRecords
   */
  private rvwIcdServiceReadprevMoreRecords(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/rvwicdservice/rvwicdservice/readprevmorerecords', JSON.stringify(container), options);
  }

  /**
   * Back end calls screenEnteredData
   */
  private rvwIcdServiceScreenEnteredData(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/rvwicdservice/rvwicdservice/screenentereddata', JSON.stringify(container), options);
  }

  /**
   * Back end calls readnextMoreRecords
   */
  private rvwIcdServiceReadnextMoreRecords(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/rvwicdservice/rvwicdservice/readnextmorerecords', JSON.stringify(container), options);
  }

  /**
   * Back end calls xctlBack
   */
  private rvwIcdServiceXctlBack(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/rvwicdservice/rvwicdservice/xctlback', JSON.stringify(container), options);
  }
}
