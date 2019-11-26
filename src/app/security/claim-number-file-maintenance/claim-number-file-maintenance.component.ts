import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Dfhcommarea, MessageBoxService, MessageBoxType, TransferSrvService, ButtonStatus, PageHeaderService} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {Container} from './model/container.model';
import {Rpdma39} from './model/rpdma39.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::clmnbrfilemnt::clmnbrfilemnt::clmnbrfilemnt
 */
@Component({
  selector: 'fox-claim-number-file-maintenance',
  templateUrl: './claim-number-file-maintenance.component.html',
  styleUrls: ['./claim-number-file-maintenance.component.css']
})
export class ClaimNumberFileMaintenanceComponent implements OnInit {
  screenBean = new Rpdma39();
  common = new Dfhcommarea();
  buttonStatus: string = ButtonStatus.SUBMIT;

  public constructor(protected httpClient: HttpClient,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     public pageHeaderService: PageHeaderService) {

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
    this.clmNbrFileMntServiceMainRoutine(this.common).subscribe(res => {
      container = res;
      data = this.transferSrv.getData();
      this.screenBean = container.screenbean;
      this.common = container.dfhCommArea;
    });
    this.pageHeaderService.customTitle = ' Claim Number File Fix ';

  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {
    let container = new Container();

    container.screenbean = this.screenBean;

    container.dfhCommArea = this.common;
    this.clmNbrFileMntServiceShowFreshMap(container).subscribe(res => {
      container = res;
      this.screenBean = container.screenbean;
      this.common = container.dfhCommArea;
    });

  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {
    const clmNumber = this.screenBean.m39cno1;
    const oldMembership = this.screenBean.m39ome1;
    const newMembership = this.screenBean.m39nme1;

    this.concatClmNumber(clmNumber);
    this.concatOldMembership(oldMembership);
    this.concatNewMembership(newMembership);

    let container = new Container();
    let data: any = undefined;
    container.screenbean = this.screenBean;
    container.dfhCommArea = this.common;
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      this.clmNbrFileMntServiceScreenData(container).subscribe(res => {
        container = res;
        this.screenBean = container.screenbean;
        this.common = container.dfhCommArea;
        data = this.transferSrv.getData();
        data['common'] = this.common;

        this.screenBean.m39cno1 = this.screenBean.m39cno1
          + this.screenBean.m39cno2
          + this.screenBean.m39cno3
          + this.screenBean.m39cno4
          + this.screenBean.m39cno5
          + this.screenBean.m39cno6;

        this.screenBean.m39ome1 = this.screenBean.m39ome1
          + this.screenBean.m39ome2
          + this.screenBean.m39ome3;

        this.screenBean.m39nme1 = this.screenBean.m39nme1
          + this.screenBean.m39nme2
          + this.screenBean.m39nme3;

        this.pushAlert(this.screenBean.m39err1);
      });
      if (this.screenBean.m39mem1) {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
      } else {
        this.buttonStatus = ButtonStatus.FAILED;
        this.resetState();
      }

    } catch {
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
    }
  }

  resetState(): void {
    setTimeout(() => {
      this.buttonStatus = ButtonStatus.SUBMIT;
    }, 2500);
  }

  concatClmNumber(clmNumber): void {
    this.screenBean.m39cno1 = clmNumber.substring(0, 1);
    this.screenBean.m39cno2 = clmNumber.substring(1, 4);
    this.screenBean.m39cno3 = clmNumber.substring(4, 5);
    this.screenBean.m39cno4 = clmNumber.substring(5, 8);
    this.screenBean.m39cno5 = clmNumber.substring(8, 11);
    this.screenBean.m39cno6 = clmNumber.substring(11, 12);
  }

  concatOldMembership(oldMembership): void {
    this.screenBean.m39ome1 = oldMembership.substring(0, 9);
    this.screenBean.m39ome2 = oldMembership.substring(9, 10);
    this.screenBean.m39ome3 = oldMembership.substring(10, 11);
  }

  concatNewMembership(newMembership): void {
    this.screenBean.m39nme1 = newMembership.substring(0, 9);
    this.screenBean.m39nme2 = newMembership.substring(9, 10);
    this.screenBean.m39nme3 = newMembership.substring(10, 11);
  }

  /**
   * Event action F1EventClick
   */
  F1EventClick(): void {
    let container = new Container();
    container.screenbean = this.screenBean;
    container.dfhCommArea = this.common;
    this.clmNbrFileMntServiceReturnToMenu(container).subscribe(res => {
      container = res;
      this.screenBean = container.screenbean;
      this.common = container.dfhCommArea;
    });
  }

  private pushAlert(message: string): void {
    if (message.includes('COMPLETED')) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Claim Number File Maintenance', MessageBoxType.SUCCESS, message);
    } else if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Claim Number File Maintenance', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls returnToMenu
   */
  private clmNbrFileMntServiceReturnToMenu(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/clmnbrfilemnt/clmnbrfilemntservice/returntomenu', JSON.stringify(container), options);

  }

  /**
   * Back end calls screenData
   */
  private clmNbrFileMntServiceScreenData(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/clmnbrfilemnt/clmnbrfilemntservice/screendata', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshMap
   */
  private clmNbrFileMntServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/clmnbrfilemnt/clmnbrfilemntservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainRoutine
   */
  private clmNbrFileMntServiceMainRoutine(commonArea: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/clmnbrfilemnt/clmnbrfilemntservice/mainroutine', JSON.stringify(commonArea), options);

  }
}
