import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Dfhcommarea, MessageBoxService, MessageBoxType, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from '../medicare-constant-file-maintenance-screen1/model/container.model';
import {Rpdma12} from '../medicare-constant-file-maintenance-screen1/model/rpdma12.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::medcrcnstmnt::MedcrCnstMntOop::MedcrCnstMntOop
 */
@Component({
  selector: 'fox-medicare-constant-out-of-pocket',
  templateUrl: './medicare-constant-out-of-pocket.component.html'
})
export class MedicareConstOutOfPocketComponent implements OnInit {
  screen = new Rpdma12();
  common = new Dfhcommarea();
  container = new Container();
  data: any = undefined;
  hideButton: boolean = true;

  public constructor(protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    this.hideButton = true;
    this.data = this.transferSrv.getData();
    this.common = this.data['common'];
    if (!this.common) {
      this.common = new Dfhcommarea();
    }
    this.medcrCnstMntServiceMainRoutine(this.common).subscribe(resp => {
      this.container = resp;
      this.data = this.transferSrv.getData();
      this.screen = this.container.screen1;
      this.common = this.container.dfhcommarea;
      if (this.screen.m12titl === 'REVIEW') {
        this.hideButton = false;
      }
    });

  }

  /**
   * Event action ClearEventClick
   */
  ClearEventClick(): void {

    this.container.screen1 = this.screen;
    this.container.dfhcommarea = this.common;
    this.medcrCnstMntServiceShowFreshRpdma12(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screen1;
      this.common = this.container.dfhcommarea;
    });
  }

  /**
   * Event action EnterEventClick
   */
  EnterEventClick(): void {

    this.container.screen1 = this.screen;

    this.container.dfhcommarea = this.common;

    this.medcrCnstMntServiceMainRunRpdma12(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screen1;
      this.common = this.container.dfhcommarea;
      this.pushAlert(this.screen.m12err1);
      if (this.common.planInfoCmnArea.pifcomReturnStatus === 'C') {
        this.data['common'] = this.common;
        this.router.navigate(['/member-information/plan-info-maintenance-menu']);
      }
    });

  }

  /**
   * Event action F1EventClick
   */
  F1EventClick(): void {

    this.container.screen1 = this.screen;

    this.container.dfhcommarea = this.common;
    this.medcrCnstMntServiceCancel(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screen1;
      this.common = this.container.dfhcommarea;
      this.data['common'] = this.common;
      if (this.common.callingProgram === 'RPD05O23') {
        this.router.navigate(['/member-information/plan-info-maintenance-menu']);
      }
    });
  }

  private pushAlert(message: string): void {
    if (message.includes('PLEASE')) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Medicare Constant File', MessageBoxType.ACTIVE, message);
    } else if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Medicare Constant OOP', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls showFreshRpdma12
   */
  private medcrCnstMntServiceShowFreshRpdma12(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/medcrcnstmnt/medcrcnstmntservice/showfreshrpdma12', JSON.stringify(this.container), options);

  }

  /**
   * Back end calls mainRoutine
   */
  private medcrCnstMntServiceMainRoutine(common: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/medcrcnstmnt/medcrcnstmntservice/mainroutine', JSON.stringify(common), options);

  }

  /**
   * Back end calls mainRunRpdma12
   */
  private medcrCnstMntServiceMainRunRpdma12(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/medcrcnstmnt/medcrcnstmntservice/mainrunrpdma12', JSON.stringify(this.container), options);

  }

  /**
   * Back end calls cancel
   */
  private medcrCnstMntServiceCancel(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/medcrcnstmnt/medcrcnstmntservice/cancel', JSON.stringify(this.container), options);

  }
}
