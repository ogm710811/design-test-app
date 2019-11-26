import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Dfhcommarea, FoxValidators, MessageBoxService, MessageBoxType, TransferSrvService} from '@fox/shared';
import * as momentConst from 'moment';
const moment = momentConst;
import {Observable} from 'rxjs';
import {Container} from '../medicare-constant-file-maintenance-screen1/model/container.model';
import {Rpdma29} from '../medicare-constant-file-maintenance-screen1/model/rpdma29.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::medcrcnstmnt::MedcrCnstMnt2::MedcrCnstMnt2
 */
@Component({
  selector: 'fox-medicare-constant-file-maintenance-screen2',
  templateUrl: './fox-medicare-constant-file-maintenance-screen2.component.html'
})
export class MedicareConstFileMaintenance2Component implements OnInit {
  screen = new Rpdma29();
  common = new Dfhcommarea();
  data: any = undefined;
  container = new Container();
  hideButton: boolean = true;
  customStartDate = new FormControl('', [FoxValidators.mmddyyyySlashDateValidator]);
  customEndDate = new FormControl({value: '', disabled: true}, [FoxValidators.mmddyyyySlashDateValidator]);

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
    this.medcrCnstMntServiceMainRoutine(this.common).subscribe(res => {
      this.container = res;
      this.data = this.transferSrv.getData();
      this.screen = this.container.screen2;
      this.common = this.container.dfhcommarea;

      if (this.screen.m29titl === 'REVIEW') {
        this.hideButton = false;
      }
      this.screen.m29edt1 = this.screen.m29edt1 ? moment(this.screen.m29edt1).format('MM/DD/YYYY') : '';
      this.screen.m29sdt1 = this.screen.m29sdt1 ? moment(this.screen.m29sdt1).format('MM/DD/YYYY') : '';
    });
  }

  /**
   * Event action ClearEventClick
   */
  clearEventClick(): void {
    this.container.screen2 = this.screen;
    this.container.dfhcommarea = this.common;
    this.medcrCnstMntServiceShowFreshRpdma29(this.container).subscribe(res => {
      this.container = res;
      this.screen = this.container.screen2;
      this.common = this.container.dfhcommarea;
      this.screen.m29edt1 = this.screen.m29edt1 ? moment(this.screen.m29edt1).format('MM/DD/YYYY') : '';
      this.screen.m29sdt1 = this.screen.m29sdt1 ? moment(this.screen.m29sdt1).format('MM/DD/YYYY') : '';
    });
  }

  /**
   * Event action EnterEventClick
   */
  enterEventClick(): void {
    this.screen.m29err1 = '';
    this.container.screen2 = this.screen;
    this.container.dfhcommarea = this.common;

    this.screen.m29sdt1 = this.screen.m29sdt1 ? moment(this.screen.m29sdt1).format('YYYYMMDD') : '';
    this.screen.m29edt1 = this.screen.m29edt1 ? moment(this.screen.m29edt1).format('YYYYMMDD') : '';

    this.medcrCnstMntServiceMainRunRpdma29(this.container).subscribe(res => {
      this.container = res;
      this.screen = this.container.screen2;
      this.screen.m29edt1 = this.screen.m29edt1 ? moment(this.screen.m29edt1).format('MM/DD/YYYY') : '';
      this.screen.m29sdt1 = this.screen.m29sdt1 ? moment(this.screen.m29sdt1).format('MM/DD/YYYY') : '';
      this.common = this.container.dfhcommarea;
      this.pushAlert(this.screen.m29err1);
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
    this.container.screen2 = this.screen;
    this.container.dfhcommarea = this.common;
    this.medcrCnstMntServiceCancel(this.container).subscribe(res => {
      this.container = res;
      this.screen = this.container.screen2;
      this.common = this.container.dfhcommarea;
      this.data['common'] = this.common;
      this.screen.m29edt1 = this.screen.m29edt1 ? moment(this.screen.m29edt1).format('MM/DD/YYYY') : '';
      this.screen.m29sdt1 = this.screen.m29sdt1 ? moment(this.screen.m29sdt1).format('MM/DD/YYYY') : '';

      if (this.common.callingProgram === 'RPD05O23') {
        this.router.navigate(['//member-information/plan-info-maintenance-menu']);
      }
    });
  }

  checkDateFormat(): void {
    const regEx = new RegExp('^[0-9]*$');
    if (!regEx.test(this.screen.m29sdt1)
      || this.screen.m29sdt1.length !== 8) {
      this.screen.m29err1 = 'START DATE MUST BE VALUED IN YYYYMMDD FORMAT';
    } else {
      this.screen.m29err1 = '';
    }
  }

  private pushAlert(message: string): void {
    if (message.includes('PLEASE')) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Medicare Constant File', MessageBoxType.ACTIVE, message);
    } else if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Medicare Constant File', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls mainRunRpdma29
   */
  private medcrCnstMntServiceMainRunRpdma29(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/medcrcnstmnt/medcrcnstmntservice/mainrunrpdma29', JSON.stringify(this.container), options);

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
   * Back end calls showFreshRpdma29
   */
  private medcrCnstMntServiceShowFreshRpdma29(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/medcrcnstmnt/medcrcnstmntservice/showfreshrpdma29', JSON.stringify(this.container), options);

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
