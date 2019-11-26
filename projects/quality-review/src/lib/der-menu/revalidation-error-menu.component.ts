import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Dfhcommarea, MessageBoxService, MessageBoxType, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {Rpdmb96} from './model/rpdmb96.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::qltyrvwrvlderrmenu::components::qltyrvwrvlderrmenu::qltyrvwrvlderrmenu
 */
@Component({
  selector: 'fox-revalidation-error-menu',
  templateUrl: './revalidation-error-menu.component.html'
})
export class RevalidationErrorMenuComponent implements OnInit {
  screenBean = new Rpdmb96();
  container = new Container();

  public constructor(protected httpClient: HttpClient,
                     protected transferSrv: TransferSrvService,
                     private router: Router,
                     private messageBoxService: MessageBoxService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let data: any = undefined;
    let dfhcommarea = new Dfhcommarea();

    data = this.transferSrv.getData();
    dfhcommarea = data['dfhCommArea'];
    if (dfhcommarea === undefined) {
      dfhcommarea = new Dfhcommarea();
    }

    this.qltyRvwRvldErrMenuServiceMainProcess(dfhcommarea).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.rpdmb96;
    });
  }

  /**
   * Event action anykeyEventClick
   */
  anykeyEventClick(): void {

    this.container.rpdmb96 = this.screenBean;
    this.qltyRvwRvldErrMenuServiceInvalidKey95(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.rpdmb96;
    });
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {

    this.container.rpdmb96 = this.screenBean;
    this.qltyRvwRvldErrMenuServiceShowFreshMap300(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.rpdmb96;
    });
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {

    this.container.rpdmb96 = this.screenBean;
    this.qltyRvwRvldErrRvwServiceEnterProcess200(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.rpdmb96;

      if (this.container.redirectTo === 'RPD06O85') {
        const qualityErrorCommArea = this.container.wsCommarea.qualityErrorCommArea;
        this.transferSrv.set('qualityErrorCommArea', qualityErrorCommArea);
        this.router.navigate(['/quality-review/quality-error-review']);
      }
    });
  }

  /**
   * Event action pf1EventClick
   */
  pf1EventClick(): void {

    this.container.rpdmb96 = this.screenBean;
    this.qltyRvwRvldErrMenuServiceXCtlPepCommandModule(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.rpdmb96;
    });
  }

  private pushAlert(message: string): void {
    if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Message Maintenance', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls mainProcess
   */
  private qltyRvwRvldErrMenuServiceMainProcess(dfhcommarea: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrmenu/qltyrvwrvlderrmenuservice/mainprocess', JSON.stringify(dfhcommarea), options);

  }

  /**
   * Back end calls xCtlPepCommandModule
   */
  private qltyRvwRvldErrMenuServiceXCtlPepCommandModule(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrmenu/qltyrvwrvlderrmenuservice/xctlpepcommandmodule', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshMap300
   */
  private qltyRvwRvldErrMenuServiceShowFreshMap300(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrmenu/qltyrvwrvlderrmenuservice/showfreshmap300', JSON.stringify(container), options);

  }

  /**
   * Back end calls invalidKey95
   */
  private qltyRvwRvldErrMenuServiceInvalidKey95(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrmenu/qltyrvwrvlderrmenuservice/invalidkey95', JSON.stringify(container), options);

  }

  /**
   * Back end calls enterProcess200
   */
  private qltyRvwRvldErrRvwServiceEnterProcess200(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrmenu/qltyrvwrvlderrmenuservice/enterprocess200', JSON.stringify(container), options);

  }
}
