import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Dfhcommarea, MessageBoxService, MessageBoxType, TransferSrvService, PaginatorNonMaterialComponent, TableColumnKind} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {ContainerDrugInquiryResult} from './model/Container-PB03';
import {DrugInquiry} from './model/drug-inquiry.model';
import {DrugInquiryResults} from './model/drug-inquiry-results.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::druginquiry::druginquiry::druginquiry
 */
@Component({
  selector: 'fox-druginquiry',
  templateUrl: './drug-inquiry.component.html',
  styleUrls: ['./drug-inquiry.component.css']
})
export class DrugInquiryComponent implements OnInit {
  screenBean = new DrugInquiry();
  screanBeanTable = new DrugInquiryResults();
  dfhCommArea = new Dfhcommarea();

  searchByList = [{id: 1, label: 'Drug Name'}, {id: 2, label: 'NDC Number'}];
  searchType: number = 1;
  searchError: boolean = false;
  viewData: any[] = [];

  dataLengthInput = 0;
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;

  columns?: Object;
  tableData: TableData[] = [];
  results?: TableData[];
  tableDataSortKey: string = 'Drug Name';
  tableDataDirection: string = 'ASC';
  hasTableData = false;
  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;

  public constructor(protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();

    this.dfhCommArea = data['dfhCommArea'];
    if (this.dfhCommArea === undefined) {
      this.dfhCommArea = new Dfhcommarea();
    }
    this.drugInquiryServiceProgramEntry(this.dfhCommArea).subscribe(res => {
      container = res;
      data = this.transferSrv.getData();
      this.screenBean = container.screenBean;
      this.dfhCommArea = container.dfhCommArea;
    });
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {
    this.screenBean.m02ddos = '';
    this.screenBean.m02dnam = '';
    this.screenBean.m02dstr = '';
    this.screenBean.m02dunt = '';
    this.screenBean.m02dndc = '';
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {

    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    container.screenBean = this.screenBean;
    container.dfhCommArea = this.dfhCommArea;
    this.drugInquiryServiceScreenEnteredData(container).subscribe(resp => {
      container = resp;
      this.screenBean = container.screenBean;
      this.dfhCommArea = container.dfhCommArea;
      data['common'] = container.dfhCommArea;
      this.pushAlert(this.screenBean.m02err1);
    }, error => {
      this.searchError = true;
      this.hasTableData = false;
    },  () => {
      this.drugInquiryResultsServiceMainMethod(this.dfhCommArea).subscribe(resp => {
        let container2 = new ContainerDrugInquiryResult();
        this.hasTableData = true;
        this.searchError = false;
        container2 = resp;
        data = this.transferSrv.getData();
        this.screanBeanTable = container2.drugInquiryResults;
        this.dfhCommArea = container.dfhCommArea;
        this.dataLengthInput = this.screanBeanTable.searchRsltList.length;
        if (this.dataLengthInput > 0 && this.paginator) {
          this.pageTotal = 0;
          this.paginator.currentPage = 0;
          this.viewData = this.screanBeanTable.searchRsltList.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
          this.setTableData();
          this.columns = Object.keys(this.tableData[0]).map((column, index) => {
            return {
              key: column,
              header: column,
              sortKey: column,
              kind: TableColumnKind.Text
            };
          });
          this.results = this.tableData;
          this.pageTotal = Math.ceil(this.screanBeanTable.searchRsltList.length / this.paginator.pageSize);
        } else {
          this.searchError = true;
          this.hasTableData = false;
        }
      }, error => {
        this.searchError = true;
        this.hasTableData = false;
      });
    });
  }

  /**
   * Event action f1EventClick
   */
  f1EventClick(): void {

    const container = new Container();
    container.screenBean = this.screenBean;
    container.dfhCommArea = this.dfhCommArea;
    this.screenBean = container.screenBean;
    this.dfhCommArea = container.dfhCommArea;
  }

  searchEvent(event: number): void {
    this.searchType = event;
  }

  calculateNewPage(): void {
    if (this.paginator) {
      this.viewData = this.screanBeanTable.searchRsltList.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.setTableData();
      this.results = this.tableData;
      this.pageTotal = Math.ceil(this.screanBeanTable.searchRsltList.length / this.paginator.pageSize);
    }
  }

  private setTableData(): void {
    this.tableData = this.viewData.map((result) => {
      return {
        'Drug Name': result['drugName'],
        Strength: result['strength'],
        Volume: result['unit'],
        Form: result['form'],
        Benefit: result['benefitAmt'],
        NDC: result['ndc']
      };
    });
  }

  private pushAlert(message: string): void {
    if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Drug Look Up', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls showFreshMap
   */
  private drugInquiryServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/druginquiry/druginquiryservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls screenEnteredData
   */
  private drugInquiryServiceScreenEnteredData(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/druginquiry/druginquiryservice/screenentereddata', JSON.stringify(container), options);

  }

  /**
   * Back end calls programEntry
   */
  private drugInquiryServiceProgramEntry(dfhCommArea: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/druginquiry/druginquiryservice/programentry', JSON.stringify(dfhCommArea), options);

  }

  /**
   * Back end calls transferComm
   */
  private drugInquiryServiceTransferComm(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/druginquiry/druginquiryservice/transfercomm', JSON.stringify(container), options);

  }

  private drugInquiryResultsServiceMainMethod(dfhCommArea: Dfhcommarea): Observable<ContainerDrugInquiryResult> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<ContainerDrugInquiryResult>('/api/quality/services/druginquiryresults/DrugInquiryResultsService/mainmethod', JSON.stringify(dfhCommArea), options);

  }
}

interface TableData {
  'Drug Name': string;
  Strength: string;
  Volume: string;
  Form: string;
  Benefit: string;
  NDC: string;
}
