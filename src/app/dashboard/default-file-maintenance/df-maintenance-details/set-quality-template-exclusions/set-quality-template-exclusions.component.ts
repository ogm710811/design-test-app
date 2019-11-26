import {HttpClient} from '@angular/common/http';
import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  Dfhcommarea,
  LoginService,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {tempSetQltytempltVerify} from '@fox/shared';
import {Container} from './model/container.model';
import {Rpdma91} from './model/rpdma91.model';
import {OpMaintenanceService} from '@fox/shared';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::setqltytmpltxcls::setqltytmpltxcls::BMSScreen
 */
@Component({
  selector: 'fox-set-quality-temp-excl',
  templateUrl: './set-quality-template-exclusions.component.html',
  styleUrls: ['./set-quality-template-exclusions.component.css']
})
export class TemplateExclusionsComponent implements OnInit {
  screen = new Rpdma91();
  common = new Dfhcommarea();
  isWorking = false;
  headerValue: any;
  buttonStatus: string = ButtonStatus.SUBMIT;

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    private loginService: LoginService,
    private pageHeaderService: PageHeaderService,
    private opMaintenance: OpMaintenanceService
  ) {

  }

  ngOnInit(): void {
    let container = new Container();
    let data: any = undefined;

    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.setQltyTmpltXclsServiceMainOnLoadMethod(this.common).subscribe(res => {
      container = res;
      data = this.transferSrv.getData();
      this.screen = container.rpdma91o;
      this.headerValue = container.rpdma91o.m91head;
      // this.screen.m91head = 'review';
      this.screen.divisionTables = [{'divNumber': '080'}, {'divNumber': '087'}, {'divNumber': '351'}, {'divNumber': '957'}, {'divNumber': ''}, {'divNumber': ''}, {'divNumber': ''}, {'divNumber': ''}, {'divNumber': ''}, {'divNumber': ''}, {'divNumber': ''}, {'divNumber': ''}, {'divNumber': ''}, {'divNumber': ''}, {'divNumber': ''}, {'divNumber': ''}];
      this.screen.locationTables = [{'locNumber': '417'}, {'locNumber': '804'}, {'locNumber': '853'}, {'locNumber': ''}, {'locNumber': ''}, {'locNumber': ''}, {'locNumber': ''}, {'locNumber': ''}, {'locNumber': ''}, {'locNumber': ''}, {'locNumber': ''}, {'locNumber': ''}, {'locNumber': ''}, {'locNumber': ''}, {'locNumber': ''}, {'locNumber': ''}];
      this.common = container.dfhcommarea;
    });
    this.pageHeaderService.customTitle = 'Quality Template Exclusions ' + this.titleCase(this.screen.m91head);
  }

  async ClearEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    for (let i = 0; i < this.screen.divisionTables.length; i++) {
      this.screen.divisionTables[i].divNumber = '';
    }
    for (let i = 0; i < this.screen.locationTables.length; i++) {
      this.screen.locationTables[i].locNumber = '';
    }
    return true;
  }

  async EnterEventClick(): Promise<boolean> {
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      this.isWorking = true;
      this.messageBoxService.reset();
      let container = new Container();
      let data: any = undefined;
      container.rpdma91o = this.screen;
      container.dfhcommarea = this.common;
      container = await this.setQltyTmpltXclsServiceScreenInfoMainMethod(container).toPromise();
      this.screen = container.rpdma91o;
      this.common = container.dfhcommarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.screen.m91err) {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.opMaintenance.displayMessageBox(this.screen.m91err, tempSetQltytempltVerify);
      }
      if (this.screen.m91err) {
        this.buttonStatus = ButtonStatus.FAILED;
        this.resetState();
        this.opMaintenance.displayMessageBox(this.screen.m91err, tempSetQltytempltVerify);
      }
      if (this.common.callingProgram.match('RPD05O82')) {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate(['/dashboard/operator-default-file']);
      }
      window.scrollTo(0, 0);
    } catch (error) {
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
    }
    return true;
  }

  async returnEventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.rpdma91o = this.screen;
    const common = new Dfhcommarea();
    container.dfhcommarea = this.common;
    container = await this.setQltyTmpltXclsServiceReturnPF1method(container).toPromise();
    this.screen = container.rpdma91o;
    this.common = container.dfhcommarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.router.navigate(['/dashboard/operator-default-file']);
    return true;
  }

  @HostListener('document:keypress', ['$event']) keyEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !this.isWorking) {
      this.EnterEventClick();
    }
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = ButtonStatus.SUBMIT, 2500);
  }

  private titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  private pushAlert(message: string, type?: string): void {
    if (message && type) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Template Exclusions', MessageBoxType.SUCCESS, message);
    } else if (message) {
      window.scrollTo(0, 0);
      if (message.toLocaleUpperCase().includes('PLEASE VERIFY')) {
        this.messageBoxService.addMessageBox('Template Exclusions', MessageBoxType.ACTIVE, message);
      } else {
        this.messageBoxService.addMessageBox('Template Exclusions', MessageBoxType.ERROR, message);
      }
    }
  }

  /**
   * Back end calls returnPF1method
   */
  private setQltyTmpltXclsServiceReturnPF1method(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltytmpltxcls/setqltytmpltxclsservice/returnpf1method', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainOnLoadMethod
   */
  private setQltyTmpltXclsServiceMainOnLoadMethod(common: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltytmpltxcls/setqltytmpltxclsservice/mainonloadmethod', JSON.stringify(common), options);

  }

  /**
   * Back end calls screenInfoMainMethod
   */
  private setQltyTmpltXclsServiceScreenInfoMainMethod(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltytmpltxcls/setqltytmpltxclsservice/screeninfomainmethod', JSON.stringify(container), options);

  }

  /**
   * Back end calls firstTimeIn
   */
  private setQltyTmpltXclsServiceFirstTimeIn(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltytmpltxcls/setqltytmpltxclsservice/firsttimein', JSON.stringify(container), options);

  }
}
