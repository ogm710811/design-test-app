import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {IcdCodeMnt} from './model/icd-code-mnt.model';
import {MessageBoxService, PageHeaderService, TransferSrvService, Dfhcommarea, MessageBoxType} from '@fox/shared';
import {Container} from './model/container.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::icdcodemnt::icdcodemnt::icdcodemnt
 */
@Component({
  selector: 'fox-icd-code-table-maintenance',
  templateUrl: './icd-code-table-maintenance.component.html',
  styleUrls: ['./icd-code-table-maintenance.component.css']
})
export class IcdCodeTableMaintenanceComponent implements OnInit {
  screen = new IcdCodeMnt();
  dfhCommArea = new Dfhcommarea();
  container = new Container();

  items = [
    { id: '9', label: '9'},
    { id: '10', label: '10'},
  ];

  public constructor(protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     public pageHeaderService: PageHeaderService,
                     private messageBoxService: MessageBoxService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.dfhCommArea = data['dfhCommArea'];
    if (this.dfhCommArea === undefined) {
      this.dfhCommArea = new Dfhcommarea();
    }
    this.icdCodeMntServiceMainRoutine(this.dfhCommArea).subscribe(resp => {
      this.container = resp;
      data = this.transferSrv.getData();
      this.screen = this.container.screenBean;
      this.dfhCommArea = this.container.dfhCommArea;
    });
    this.pageHeaderService.customTitle = 'Maintain ICD Code Table';
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {
    this.container.screenBean = this.screen;
    this.container.dfhCommArea = this.dfhCommArea;
    this.icdCodeMntServiceReshowFreshMap(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screenBean;
      this.dfhCommArea = this.container.dfhCommArea;
    });
  }

  changeSingleSelect(event: any, value: string): void {
    if (value === 'screen.m22ehi') {
      this.screen.m22ehi = event.target.checked ? 'Y' : '';
    } else if (value === 'screen.m22mhi') {
      this.screen.m22mhi = event.target.checked ? 'Y' : '';
    } else if (value === 'screen.m22sbi') {
      this.screen.m22sbi = event.target.checked ? 'Y' : '';
    } else if (value === 'screen.m22dai') {
      this.screen.m22dai = event.target.checked ? 'Y' : '';
    }
  }
    /**
   * Event action enterEventClick
   */
  enterEventClick(): void {
    this.container.screenBean = this.screen;
    this.container.dfhCommArea = this.dfhCommArea;
    this.icdCodeMntServiceScreenData(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screenBean;
      this.dfhCommArea = this.container.dfhCommArea;
      if (this.screen.m22icd !== '' && this.screen.m22ici !== '') {
      }
      this.pushAlert(this.screen.m22err);
    });
  }

  /**
   * Event action f1EventClick
   */
  f1EventClick(): void {
    this.container.screenBean = this.screen;
    this.container.dfhCommArea = this.dfhCommArea;
    this.icdCodeMntServiceReturnControl(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screenBean;
      this.dfhCommArea = this.container.dfhCommArea;
      this.router.navigate(['/processing/review-icd-codes']);
    });

  }

  /**
   * Event action f7EventClick
   */
  f7EventClick(): void {

    this.container.screenBean = this.screen;
    this.container.dfhCommArea = this.dfhCommArea;
    this.screen = this.container.screenBean;
    this.dfhCommArea = this.container.dfhCommArea;
  }

  private pushAlert(message: string): void {
    if (message && (message.includes('ICD CODE NOT FOUND'))) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Icd Code Table', MessageBoxType.SUCCESS, message);
    } else if (message && message.includes('HAS BEEN')) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Icd Code Table', MessageBoxType.SUCCESS, message, 3000);
    } else if (message && !message.includes('MAKE CHANGES AND PRESS')) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Icd Code Table', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls mainRoutine
   */
  private icdCodeMntServiceMainRoutine(dfhCommArea: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/icdcodemnt/icdcodemntservice/mainroutine', JSON.stringify(dfhCommArea), options);

  }

  /**
   * Back end calls screenData
   */
  private icdCodeMntServiceScreenData(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/icdcodemnt/icdcodemntservice/screendata', JSON.stringify(container), options);

  }

  /**
   * Back end calls returnControl
   */
  private icdCodeMntServiceReturnControl(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/icdcodemnt/icdcodemntservice/returncontrol', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshMap
   */
  private icdCodeMntServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/icdcodemnt/icdcodemntservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls reshowFreshMap
   */
  private icdCodeMntServiceReshowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/icdcodemnt/icdcodemntservice/reshowfreshmap', JSON.stringify(container), options);

  }
}
