import {LowerCasePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  dashboardRoutePathOperatorAuthComb,
  dashboardRoutePathOperatorAuthLimit,
  dashboardRoutePathOperatorInfo,
  dashboardRoutePathOperatorSetQuality,
  dashboardRoutePathOperatorTransSecurityOne,
  dashboardRoutePathOperSelection,
  dashboardRoutePathRoot,
  Dfhcommarea,
  MessageBoxService,
  MessageBoxType,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs';
import {ClaimHistoryComponent} from '../../claim-processing/claim-history/claim-history.component';
import {OpMaintenanceService} from '@fox/shared';
import {Container} from './model/container.model';
import {OpMaintenanceMenu} from './model/op-maintenance-menu.model';

@Component({
  selector: 'fox-operator-maintenance-menu',
  templateUrl: './operator-maintenance-menu.component.html',
  styleUrls: ['./operator-maintenance-menu.component.css']
})

export class OperatorMaintenanceMenuComponent implements OnInit {
  screenBean = new OpMaintenanceMenu();
  common = new Dfhcommarea();
  container = new Container();
  operatorFileFormGroup: FormGroup;
  ionsIdFormControl = new FormControl('');
  firstNameFormControl = new FormControl('');
  lastNameFormControl = new FormControl('');
  successMsg: string = 'TRANSACTION COMPLETED';
  msgType: MessageBoxType = MessageBoxType.ERROR;
  disableCopyIonsId: boolean = true;
  buttonStatus: string = 'Submit';

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private fb: FormBuilder,
    private messageBoxService: MessageBoxService,
    protected lowerCasePipe: LowerCasePipe,
    protected opMaintenance: OpMaintenanceService
  ) {
    this.opMaintenanceForm();
  }

  opMaintenanceForm(): void {
    this.operatorFileFormGroup = this.fb.group({
      ionsIdFormControl: this.ionsIdFormControl,
      firstNameFormControl: this.firstNameFormControl,
      lastNameFormControl: this.lastNameFormControl,
    });
  }

  ngOnInit(): void {
    const container = new Container();
    const common = new Dfhcommarea();
    let data: any = undefined;
    const return_object = new Container();
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? this.common = new Dfhcommarea() : this.common;
    this.operMntMenuServiceMainProcess(this.common).subscribe(resp => {
      this.container = resp;
      this.screenBean = resp.opermntmenu;
      this.common = resp.dfhcommarea;
      data = this.transferSrv.getData();
      if (this.screenBean.m70err1) {
        let errorMsg = this.screenBean.m70err1.trim();
        this.msgType = (errorMsg === this.successMsg) ? MessageBoxType.SUCCESS : MessageBoxType.ERROR;
        errorMsg = this.getRegularCase(errorMsg);
        this.messageBoxService.addMessageBox(errorMsg, this.msgType, '');
      }
    });
  }

  /**
   * Event action ClearEventClick
   */
  ClearEventClick(): void {
    this.messageBoxService.reset();
    const container = new Container();
    const common = new Dfhcommarea();
    let return_object = new Container();
    container.opermntmenu = this.screenBean;
    container.dfhcommarea = common;
    this.screenBean.m70sel = '';
    this.screenBean.m70cion = '';
    this.disableCopyIonsId = true;
    this.operatorFileFormGroup.reset();
    this.operMntMenuServiceClearScreen(container).subscribe(resp => {
      return_object = resp;
      this.screenBean = resp.opermntmenu;
      this.common = resp.dfhcommarea;
    });
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  async EnterEventClick(): Promise<boolean> {
    try {
      this.buttonStatus = 'Working...';
      this.messageBoxService.reset();
      let common = new Dfhcommarea();
      let container = new Container();
      let data: any = undefined;
      container.opermntmenu = this.screenBean;
      common = this.container.dfhcommarea;
      container.dfhcommarea = common;
      container = await this.operMntMenuServiceEnterProcess(container).toPromise();
      this.screenBean = container.opermntmenu;
      this.common = container.dfhcommarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.screenBean.m70err1.match('COPIED IONS ID MUST BE VALUED') || this.screenBean.m70err1.match('NOT AUTHORIZED FOR TRANSACTION') || this.screenBean.m70err1.match('SELECTION - INVALID')) {
        this.buttonStatus = 'Failed';
        this.resetState();
      } else if (this.screenBean.m70ions.trim() === '') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperSelection]);
      } else if (this.screenBean.m70sel.match('1') || this.screenBean.m70sel.match('2') || this.screenBean.m70sel.match('3')) {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorInfo]);
      } else if (this.screenBean.m70sel.match('4')) {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorAuthLimit]);
      } else if (this.screenBean.m70sel.match('5')) {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorAuthComb]);
      } else if (this.screenBean.m70sel.match('6')) {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorTransSecurityOne]);
      } else if (this.screenBean.m70sel.match('7')) {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorSetQuality]);
      } else if (this.screenBean.m70sel.match('8')) {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate(['/dashboard/set-quality-combination']);
      } else {
        this.screenBean.m70ions = '';
      }
      if (this.screenBean.m70err1) {
        this.buttonStatus = 'Failed';
        this.resetState();
        let errorMsg = this.screenBean.m70err1.trim();
        errorMsg = this.getRegularCase(errorMsg);
        this.messageBoxService.addMessageBox(errorMsg, MessageBoxType.ERROR, '');
      }
      window.scrollTo(0, 0);
    } catch (error) {
      this.buttonStatus = 'Failed';
      this.resetState();
    }
    return true;
  }

  /**
   * Event action ReturnEventClick
   */
  ReturnEventClick(): void {
    let container = new Container();
    const common = new Dfhcommarea();
    const screen = new OpMaintenanceMenu();
    const return_object = new Container();

    container.opermntmenu = this.screenBean;

    container.dfhcommarea = common;
    this.operMntMenuServiceReturnModule(container).subscribe(resp => {
      container = resp;
    });
    this.screenBean = container.opermntmenu;
    this.common = container.dfhcommarea;
  }

  onChangeSelectedAction(value: string): void {
    this.disableCopyIonsId = !(value === '2');
    this.screenBean.m70cion = '';
  }

  checkIfFormFilled(): boolean {
    const values = this.operatorFileFormGroup.value;
    return !!(ClaimHistoryComponent.removeWhitespace(values.ionsIdFormControl) ||
      (ClaimHistoryComponent.removeWhitespace(values.firstNameFormControl) &&
        ClaimHistoryComponent.removeWhitespace(values.lastNameFormControl)));
  }

  getRegularCase(data): string {
    return (data.substr(0, 1) + this.lowerCasePipe.transform(data.substr(1)));
  }

  /**
   * Back end calls clearScreen
   */
  private operMntMenuServiceClearScreen(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opermntmenuservice/opermntmenuservice/clearscreen', JSON.stringify(container), options);
  }

  /**
   * Back end calls returnModule
   */
  private operMntMenuServiceReturnModule(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/opermntmenuservice/opermntmenuservice/returnmodule', JSON.stringify(container), options);
  }

  /**
   * Back end calls enterProcess
   */
  private operMntMenuServiceEnterProcess(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/opermntmenuservice/opermntmenuservice/enterprocess', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainProcess
   */
  private operMntMenuServiceMainProcess(dfhCommonArea: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/opermntmenuservice/opermntmenuservice/mainprocess', JSON.stringify(dfhCommonArea), options);
  }
}
