import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageBoxService, MessageBoxType, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {ClmFileMntCmnArea} from '../model/clm-file-mnt-cmn-area.model';
import {Container} from '../model/container.model';
import {Rpdma25} from '../model/rpdma25.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::clmnbrrngflmnt::ClmNbrRngFlMntMenu::ClmNbrRngFlMntMenu::ClmNbrRngFlMntMenu
 */
@Component({
  selector: 'fox-clm-nbr-rng-fl-mnt-menu',
  templateUrl: './claim-number-range-file-maintenance-menu.component.html'
})
export class ClaimNumberRangeFileMaintenanceMenuComponent implements OnInit {
  screen = new Rpdma25();
  common = new ClmFileMntCmnArea();
  container = new Container();
  public constructor(protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
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
    container.screenbean25 = this.screen;
    data = this.transferSrv.getData();
    this.common = data['common'];
    container.cfmcomm = this.common;
    if (this.common === undefined) {
      this.common = new ClmFileMntCmnArea();
    }
    this.clmNbrRngFlMntServiceOnloadProcess(this.common).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      this.screen = container.screenbean25;
      this.common = container.cfmcomm;
      this.pushAlert(this.screen.m25err1);
    });
  }

  /**
   * Event action CLEAREventClick
   */
  CLEAREventClick(): void {
    let container = new Container();
    const container1 = new Container();

    container.screenbean25 = this.screen;

    container.cfmcomm = this.common;
    this.clmNbrRngFlMntServiceShowFreshMap(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean25;
      this.common = container.cfmcomm;
    });
  }

  /**
   * Event action ENTEREventClick
   */
  ENTEREventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.screenbean25 = this.screen;
    container.cfmcomm = this.common;
    this.clmNbrRngFlMntServiceScreenData(container).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      data['container'] = container;
      this.router.navigate(['/file-maintenance/claim-number-range']);
      this.common = container.cfmcomm;
    });
  }

  /**
   * Event action F1EventClick
   */
  F1EventClick(): void {
    let container = new Container();

    container.screenbean25 = this.screen;

    container.cfmcomm = this.common;
    this.clmNbrRngFlMntServiceReturnOrCancel(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean25;
      this.common = container.cfmcomm;
    });
  }

  private pushAlert(message: string): void {
    if (message.includes('COMPLETED')) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Claim Number Range File Maintenance', MessageBoxType.SUCCESS, message);
    } else if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Claim Number Range File Maintenance', MessageBoxType.ERROR, message);
    }
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
  private clmNbrRngFlMntServiceOnloadProcess(commonArea: ClmFileMntCmnArea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/quality/services/clmnbrrngflmnt/clmnbrrngflmntservice/onloadprocess1', JSON.stringify(commonArea), options);

  }
}
