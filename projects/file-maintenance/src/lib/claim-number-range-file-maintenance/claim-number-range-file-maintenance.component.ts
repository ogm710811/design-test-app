import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageBoxService, MessageBoxType, PaginatorNonMaterialComponent, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {ClmFileMntCmnArea} from './model/clm-file-mnt-cmn-area.model';
import {Container} from './model/container.model';
import {Rpdma25} from './model/rpdma25.model';
import {Rpdma26} from './model/rpdma26.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::clmnbrrngflmnt::ClmNbrRngFlMnt::ClmNbrRngFlMnt::ClmNbrRngFlMnt
 */
@Component({
  selector: 'fox-clm-nbr-rng-fl-mnt',
  templateUrl: './claim-number-range-file-maintenance.component.html'

})
export class ClaimNumberRangeFileMaintenanceComponent implements OnInit {
  screen = new Rpdma26();
  screen25 = new Rpdma25();
  common = new ClmFileMntCmnArea();
  container = new Container();

  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;
  data: any = {};
  viewData: any[] = [];
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;
  dataLengthInput = 0;
  cloneData: any[] = [];
  selectionType = '';
  labelEvent = 'Enter (E)';
  hotKey = 'alt+e';

  public constructor(protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService) {

  }
  /**
   * On Load Action
   * */
  ngOnInit(): void {
    const container = new Container();
    let data: any = undefined;
    let initialize = 1;

    data = this.transferSrv.getData();
    this.container = data['container'];
    this.selectionType = this.container.screenbean25.m25sel;

    if (this.container === undefined) {
      this.container = new Container();
    }
    this.clmNbrRngFlMntServiceOnloadProcess(this.container).subscribe(resp => {
      this.container = resp;

      data = this.transferSrv.getData();
      data['container'] = this.container;
      this.screen = this.container.screenbean26;
      this.common = this.container.cfmcomm;

      this.screen.mapLinesList.forEach(element => {
        const tempArray: any[] = element;
        tempArray.forEach(item => {
          item['index'] = initialize;
          this.cloneData.push(item);
          initialize++;
        });
      });

      if (this.paginator) {
        this.viewData = this.cloneData.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
        this.pageTotal = Math.ceil(this.cloneData.length / this.paginator.pageSize);
      }
      this.dataLengthInput = this.cloneData.length;

      if (this.selectionType === '2') {
        this.labelEvent = 'Delete (D)';
        this.hotKey = 'alt+d';
      }

    });

  }

  calculateNewPage(): void {
    if (this.paginator) {
      this.viewData = this.cloneData.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.cloneData.length / this.paginator.pageSize);
    }
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {
    let container = new Container();
    const container1 = new Container();

    container.screenbean26 = this.screen;

    container.cfmcomm = this.common;
    this.clmNbrRngFlMntServiceShowFreshMap(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean26;
      this.common = container.cfmcomm;
    });

  }

  /**
   * Event action ENTEREventClick
   */
  enterEventClick(): void {
    let data: any = undefined;
    this.container.screenbean26 = this.screen;
    this.container.cfmcomm = this.common;
    if (this.selectionType === '2') {
      this.container.screenbean26.m26del = 'Y';
    }
    this.clmNbrRngFlMntServiceScreenData(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screenbean26;
      this.common = this.container.cfmcomm;
      if (this.container.cfmcomm.mapSent === '25') {
        data = this.transferSrv.getData();
        data['common'] = this.common;
        this.router.navigate(['/file-maintenance/claim-number-range-menu']);
      }
      this.pushAlert(this.screen.m26err);
    });

  }

  /**
   * Event action F1EventClick
   */
  f1EventClick(): void {
    let container = new Container();

    container.screenbean26 = this.screen;

    container.cfmcomm = this.common;
    this.clmNbrRngFlMntServiceReturnOrCancel(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean26;
      this.common = container.cfmcomm;
      this.router.navigate(['/file-maintenance/claim-number-range-menu']);
    });
  }

  /**
 * Event action Next
 */
  f3EventClick(): void {

    this.container.screenbean26 = this.screen;
    this.container.cfmcomm = this.common;
    this.clmNbrRngFlMntServiceCheckPf3Next(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screenbean26;
      this.common = this.container.cfmcomm;
    });
  }

  /**
* Event action Prev
*/
  F4EventClick(): void {
    this.container.screenbean26 = this.screen;
    this.container.cfmcomm = this.common;
    this.clmNbrRngFlMntServiceCheckPf4Prev(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screenbean26;
      this.common = this.container.cfmcomm;
    });
  }

  private pushAlert(message: string): void {
    if (message.includes('PLEASE VERIFY')) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Claim Number Range File Maintenance', MessageBoxType.ACTIVE, message);
    } else if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Claim Number Range File Maintenance', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls Next
   */
  private clmNbrRngFlMntServiceCheckPf3Next(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/quality/services/clmnbrrngflmnt/clmnbrrngflmntservice/checkpf3next', JSON.stringify(container), options);

  }

  /**
 * Back end calls Prev
 */
  private clmNbrRngFlMntServiceCheckPf4Prev(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/quality/services/clmnbrrngflmnt/clmnbrrngflmntservice/checkpf4prev', JSON.stringify(container), options);

  }

  /**
   * Back end calls returnOrCancel
   */
  private clmNbrRngFlMntServiceReturnOrCancel(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/quality/services/clmnbrrngflmnt/clmnbrrngflmntservice/returnorcancel', JSON.stringify(container), options);

  }

  /**
   * Back end calls screenData
   */
  private clmNbrRngFlMntServiceScreenData(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/quality/services/clmnbrrngflmnt/clmnbrrngflmntservice/screendata', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshMap
   */
  private clmNbrRngFlMntServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/quality/services/clmnbrrngflmnt/clmnbrrngflmntservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls onloadProcess
   */
  private clmNbrRngFlMntServiceOnloadProcess(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/quality/services/clmnbrrngflmnt/clmnbrrngflmntservice/onloadprocess', JSON.stringify(container), options);

  }
}
