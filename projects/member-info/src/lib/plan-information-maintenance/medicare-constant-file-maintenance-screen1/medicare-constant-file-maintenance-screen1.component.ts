import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Dfhcommarea, MessageBoxService, MessageBoxType, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {Rpdma28} from './model/rpdma28.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::medcrcnstmnt::MedcrCnstMnt1::MedcrCnstMnt1
 */
@Component({
  selector: 'fox-medicare-constant-file-maintenance-screen1',
  templateUrl: './medicare-constant-file-maintenance-screen1.component.html',
  styleUrls: ['./medicare-constant-file-maintenance-screen1.component.css']
})
export class MedicareConstFileMaintenance1Component implements OnInit {
  screen = new Rpdma28();
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
      this.screen = this.container.screen;
      this.common = this.container.dfhcommarea;
      if (this.screen.m28titl === 'REVIEW') {
        this.hideButton = false;
      }
    });

  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {

    this.container.screen = this.screen;
    this.container.dfhcommarea = this.common;
    this.medcrCnstMntServiceShowFreshRpdma28().subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screen;
      this.common = this.container.dfhcommarea;
    });

  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {
    this.container.screen = this.screen;
    this.container.dfhcommarea = this.common;
    this.medcrCnstMntServiceMainRunRpdma28().subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screen;
      this.common = this.container.dfhcommarea;
      this.pushAlert(this.screen.m28err1);
      if (this.common.planInfoCmnArea.pifcomReturnStatus === 'C') {
        this.data['common'] = this.common;
        this.router.navigate(['/member-information/plan-info-maintenance-menu']);
      }
    });
  }

  /**
   * Event action F1EventClick
   */
  f1EventClick(): void {
    this.container.screen = this.screen;
    this.container.dfhcommarea = this.common;
    this.medcrCnstMntServiceCancel().subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screen;
      this.common = this.container.dfhcommarea;
      this.data['common'] = this.common;
      if (this.common.callingProgram === 'RPD05O23') {
        this.router.navigate(['/member-information/plan-info-maintenance-menu']);
      }
    });

  }

  private pushAlert(message: string): void {
    if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Message Maintenance', MessageBoxType.ACTIVE, message);
    }
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
   * Back end calls showFreshRpdma28
   */
  private medcrCnstMntServiceShowFreshRpdma28(): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/medcrcnstmnt/medcrcnstmntservice/showfreshrpdma28', JSON.stringify(this.container), options);

  }

  /**
   * Back end calls cancel
   */
  private medcrCnstMntServiceCancel(): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/medcrcnstmnt/medcrcnstmntservice/cancel', JSON.stringify(this.container), options);

  }

  /**
   * Back end calls mainRunRpdma28
   */
  private medcrCnstMntServiceMainRunRpdma28(): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/medcrcnstmnt/medcrcnstmntservice/mainrunrpdma28', JSON.stringify(this.container), options);

  }
}
