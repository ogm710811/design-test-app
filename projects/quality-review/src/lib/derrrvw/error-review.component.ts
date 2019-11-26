import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Dfhcommarea, PaginatorNonMaterialComponent, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {GridReport} from './model/grid-report.model';
import {QualityErrorCommArea} from './model/quality-error-comm-area.model';
import {Rpdmb97} from './model/rpdmb97.model';
import {WorkStorage} from './model/work-storage.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::qltyrvwrvlderrrvw::qltyrvwrvlderrrvw::qltyrvwrvlderrrvw
 */
@Component({
  selector: 'fox-error-review',
  templateUrl: './error-review.component.html'
})
export class ErrorReviewComponent implements OnInit {
  screenBean = new Rpdmb97();
  container = new Container();
  gridReports: GridReport[] = [];
  page: number = 1;

  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;
  viewData: any[] = [];
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;
  cloneData: any[] = [];

  get dataLengthInput(): number {
    return (!!this.container) ? ((!!this.container.workStorage.gridReports) ? this.container.workStorage.gridReports.length : 0) : 0;
  }

  public constructor(protected httpClient: HttpClient,
                     protected transferSrv: TransferSrvService,
                     protected router: Router) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let data: any = undefined;
    let dfhcommarea = new Dfhcommarea();
    let qualityErrorCommArea = new QualityErrorCommArea();

    data = this.transferSrv.getData();
    dfhcommarea = data['dfhCommArea'];
    qualityErrorCommArea = data['qualityErrorCommArea'];

    console.log('85');
    console.log(qualityErrorCommArea);

    if (dfhcommarea === undefined) {
      dfhcommarea = new Dfhcommarea();
    }

    if (qualityErrorCommArea === undefined) {
      qualityErrorCommArea = new QualityErrorCommArea();
    }

    this.container.workStorage = new WorkStorage();
    this.container.workStorage.qualityErrorCommArea = qualityErrorCommArea;

    this.qltyRvwRvldErrRvwServiceMain(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
      if (this.paginator) {
        this.gridReports = this.container.workStorage.gridReports.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
        this.pageTotal = Math.ceil(this.gridReports.length / this.paginator.pageSize);
      }
    });

  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldErrRvwServiceShowFreshMap(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
      this.gridReports = this.container.workStorage.gridReports;
    });
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldErrRvwServiceEnterProcess(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
  }

  /**
   * Event action pf1EventClick
   */
  pf1EventClick(): void {

    const qualityErrorCommArea = this.container.workStorage.qualityErrorCommArea;
    this.transferSrv.set('qualityErrorCommArea', qualityErrorCommArea);

    this.router.navigate(['/quality-review/revalidation-error-menu']);
  }

  calculateNewPage(): void {
    if (this.paginator) {
      this.gridReports = this.container.workStorage.gridReports.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.container.workStorage.gridReports.length / this.paginator.pageSize);
    }
  }

  /**
   * Back end calls showFreshMap
   */
  private qltyRvwRvldErrRvwServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrrvw/qltyrvwrvlderrrvwservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls enterProcess
   */
  private qltyRvwRvldErrRvwServiceEnterProcess(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrrvw/qltyrvwrvlderrrvwservice/enterprocess', JSON.stringify(container), options);

  }

  /**
   * Back end calls xctlMenuModule
   */
  private qltyRvwRvldErrRvwServiceXctlMenuModule(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrrvw/qltyrvwrvlderrrvwservice/xctlmenumodule', JSON.stringify(container), options);

  }

  /**
   * Back end calls main
   */
  private qltyRvwRvldErrRvwServiceMain(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrrvw/qltyrvwrvlderrrvwservice/main', JSON.stringify(container), options);

  }
}
