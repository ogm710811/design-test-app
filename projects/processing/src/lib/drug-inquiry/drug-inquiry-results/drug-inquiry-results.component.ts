import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dfhcommarea, PaginatorNonMaterialComponent, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {DrugInquiryResults} from './model/drug-inquiry-results.model';
import {SearchRsltList} from './model/search-rslt-list.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::druginquiryresults::druginquiryresults::druginquiryresults
 */

@Component({
  selector: 'fox-druginquiryresults',
  templateUrl: './drug-inquiry-results.component.html'
  // styleUrls: ['../../custom/pagination/pagination.styles.css']
})
export class DrugInquiryResultsComponent implements OnInit {
  screenBean = new DrugInquiryResults();
  dfhCommarea = new Dfhcommarea();

  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;
  data: SearchRsltList = new SearchRsltList();
  viewData: SearchRsltList[] = [];
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;

  get dataLengthInput(): number {
    return (!!this.screenBean) ? ((!!this.screenBean.searchRsltList) ? this.screenBean.searchRsltList.length : 0) : 0;
  }

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let container = new Container();
    let data: any = undefined;

    data = this.transferSrv.getData();
    this.dfhCommarea = data['common'];
    if (this.dfhCommarea === undefined) {
      this.dfhCommarea = new Dfhcommarea();
    }
    this.drugInquiryResultsServiceMainMethod(this.dfhCommarea).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      this.screenBean = container.drugInquiryResults;
      this.dfhCommarea = container.dfhCommArea;
      if (this.paginator) {
        this.viewData = this.screenBean.searchRsltList.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
        this.pageTotal = Math.ceil(this.screenBean.searchRsltList.length / this.paginator.pageSize);
      }
    });
  }

  /**
   * Event action CLEAREventClick
   */
  CLEAREventClick(): void {
    const container = new Container();
    container.drugInquiryResults = this.screenBean;
    container.dfhCommArea = this.dfhCommarea;
    this.drugInquiryResultsServiceShowFreshMap(container).subscribe(resp => {
      this.screenBean = container.drugInquiryResults;
      this.dfhCommarea = container.dfhCommArea;
    });
  }

  /**
   * Event action ENTEREventClick
   */
  ENTEREventClick(): void {
    const container = new Container();
    container.drugInquiryResults = this.screenBean;
    container.dfhCommArea = this.dfhCommarea;
    this.drugInquiryResultsServiceScreenDataEntered(container).subscribe(resp => {
      this.screenBean = container.drugInquiryResults;
      this.dfhCommarea = container.dfhCommArea;
    });
  }

  /**
   * Event action RETURNEventClick
   */
  RETURNEventClick(): void {
    const container = new Container();
    container.drugInquiryResults = this.screenBean;
    container.dfhCommArea = this.dfhCommarea;
    this.screenBean = container.drugInquiryResults;
    this.dfhCommarea = container.dfhCommArea;
    this.router.navigate(['/processing/drug-inquiry']);
  }

  calculateNewPage(): void {
    if (this.paginator) {
      this.viewData = this.screenBean.searchRsltList.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.screenBean.searchRsltList.length / this.paginator.pageSize);
    }
  }

  /**
   * Back end calls transferToPrevScreen
   */
  private drugInquiryResultsServiceTransferToPrevScreen(container: Container): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<void>('/api/quality/services/druginquiryresults/DrugInquiryResultsService/transfertoprevscreen', JSON.stringify(container), options);

  }

  /**
   * Back end calls screenDataEntered
   */
  private drugInquiryResultsServiceScreenDataEntered(container: Container): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<void>('/api/quality/services/druginquiryresults/DrugInquiryResultsService/screendataentered', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshMap
   */
  private drugInquiryResultsServiceShowFreshMap(container: Container): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<void>('/api/quality/services/druginquiryresults/DrugInquiryResultsService/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainMethod
   */
  private drugInquiryResultsServiceMainMethod(dfhCommArea: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/druginquiryresults/DrugInquiryResultsService/mainmethod', JSON.stringify(dfhCommArea), options);

  }
}
