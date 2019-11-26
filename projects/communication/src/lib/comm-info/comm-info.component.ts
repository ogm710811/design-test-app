import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MemberApi} from '@fox/rest-clients';
import {
  CommunicationCommarea,
  MessageBoxService,
  MessageBoxType,
  ModalService,
  RvwCmnctHistCommonArea,
  TransferSrvService,
  ProcessClaimSubheaderComponent,
  HeaderSubtitleItem,
  PageHeaderService,
  ProcessClaimHeaderRightComponent,
  HeaderRightItem
} from '@fox/shared';
import {Observable} from 'rxjs';
import {Endcmnct} from './end-communication/model/endcmnct.model';
import {Rpd07O41Container} from './end-communication/model/rpd07-o41-container.model';
import {ClmCmnctInfo} from './model/clm-cmnct-info.model';
import {Rpd07O43Container} from './model/rpd07-o43-container.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::clmcmnctinfo::clmcmnctinfo::clmcmnctinfo
 */
@Component({
  selector: 'fox-comm-info',
  templateUrl: './comm-info.component.html',
  styleUrls: ['./comm-info.component.css']
})
export class CommInfoComponent implements OnInit, AfterViewChecked {
  screen = new ClmCmnctInfo();
  screenModal = new Endcmnct();
  common = new CommunicationCommarea();
  reviewCommArea = new RvwCmnctHistCommonArea();
  memberId: string = '';
  pageViewType: string = '';
  communicationNumber: string = '';
  m65cre2: string = '';
  m65cre3: string = '';
  m65cre4: string = '';
  isHeaderOn = false;
  buttonValue: string = 'Submit Changes (S)';
  disableOption: boolean = false;
  requestedDate: string = '';
  selectionStatusList = [
    {id: 'Y', label: 'Yes'}, {id: 'N', label: 'No'}
  ];
  callerWriterList = [
    {id: '1', label: '1-Insured'}, {id: '2', label: '2-Spouse'}, {id: '3', label: '3-Other'}
  ];
  // Validators
  sendIons = new FormControl('');
  concern_code = new FormControl('');
  claimNumber = new FormControl('');
  problem = new FormControl('');
  // Modal
  @Input() endCommunicationVisible: boolean = false;
  @Output() cancelEndCommModal: EventEmitter<'abort'> = new EventEmitter<'abort'>();
  @Output() abortOrConfirmCancellation: EventEmitter<'abort' | 'confirm'> = new EventEmitter<'abort' | 'confirm'>();
  get isEnableEnterComm(): boolean {
    return (this.sendIons.valid && this.claimNumber.valid && this.problem.valid && this.concern_code.valid);
  }

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private modalService: ModalService,
                     private pageHeaderService: PageHeaderService,
                     private componentFactoryResolver: ComponentFactoryResolver,
                     private injector: Injector,
                     private messageBoxService: MessageBoxService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    this.modalService.routeValidationModalVisible = false;
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['command']) {
        this.pageViewType = params['command'];
        this.modalService.routeValidationModalVisible = false;
      }
      if ((params['commId'])) {
        this.communicationNumber = params['commId'];
        this.onLoadAction();
      }
      if (params['memberid']) {
        this.memberId = params['memberid'];
        this.onLoadAction();
      }
    });
  }

  routeToErrorPage(): void {
    let param: NavigationExtras = {};
    const destination = 'invalid-params';
    param = {
      queryParams: {
        memberid: this.memberId,
        commId: this.communicationNumber,
        command: this.pageViewType
      }
    };
    this.router.navigate([destination], param);
  }

  onLoadAction(): void {
    let rpd07O43Container = new Rpd07O43Container();
    let rpd07O41container = new Rpd07O41Container();
    let data: any = undefined;

    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new CommunicationCommarea() : this.common;
    if (this.memberId !== '') {
      this.common.comcomm.command = 'CI';
      this.common.comcomm.membershipId = +this.memberId;
    }
    if (this.communicationNumber !== '' || this.pageViewType === 'SC') {
      this.common.comcomm.command = 'SC';
      this.common.comcomm.commNumber = +this.communicationNumber;
    }
    this.buttonValue = this.common.comcomm.command === 'CI' ? 'Send Communication (S)' : 'Submit Changes (S)';
    this.disableOption = this.common.comcomm.command === 'CI' ? false : true;
    this.screen.m65name.replace('null', '');
    this.screen.m65addr.replace('null', '');
    this.screen.m65cszc.replace('null', '');
    if (this.screen.m65aph1 === undefined) {
      this.screen.m65aph1 = '';
    }
    if (this.screen.m65aare === undefined) {
      this.screen.m65aare = '';
    }
    if (this.screen.m65aph2 === undefined) {
      this.screen.m65aph2 = '';
    }

    // Menu Behavior
    this.commControlEndCommServiceMainOperation(this.common).subscribe(response => {
      rpd07O41container = response;
      if (rpd07O41container.commonArea.comcomm.command === 'CI' || rpd07O41container.commonArea.comcomm.command === 'SC') {
        this.common = rpd07O41container.commonArea;
        data = this.transferSrv.getData();
        data['common'] = this.common;
        // Page Behavior
        this.clmCommMiscInfoServiceMainMethod(this.common).subscribe(resp => {
          rpd07O43Container = resp;
          data = this.transferSrv.getData();
          this.screen = rpd07O43Container.rpdmb65;
          this.requestedDate = this.getSlashFormatedDateMMDDYYYY(this.screen.m65date);
          this.common = rpd07O43Container.commonArea;
        });
      }
    }, err => {
      if (this.pageViewType === 'SC') {
        this.routeToErrorPage();
      }
    });
  }

  ngAfterViewChecked(): void {
    if (!this.isHeaderOn) {
      if (this.common.comcomm.command === 'CI') {
        this.pageHeaderService.customTitle = 'Add Communication';
      } else {
        this.pageHeaderService.customTitle = 'Edit Communication';
      }
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        ProcessClaimSubheaderComponent,
        {
          memberName: this.screen.m65name,
          account: this.screen.m65acct + ' ' + this.screen.m65assn + ' ' + this.screen.m65insc
        },
        this.componentFactoryResolver,
        this.injector);

      this.pageHeaderService.headerRightItem = new HeaderRightItem(
        ProcessClaimHeaderRightComponent,
        {
          secondButton: {
            display: 'Microfilm Required (F6)', identifier: 'f6', tab: 'ctrl+f6'
          },
          suspendBtn: {
            display: 'Letter (F7)', identifier: 'f7', tab: 'ctrl+f7'
          }
        },
        this.componentFactoryResolver,
        this.injector
      );

      const subheadertitle = document.getElementById('subheadertitle');
      if (subheadertitle) {
        this.isHeaderOn = true;
      }
    }
  }

  /**
   * Event action CompleteAllEventClick()
   */
  completeAllEventClick(): void {
    let rpd07O43Container = new Rpd07O43Container();
    let data: any = undefined;
    this.screen.m65date = this.getServiceFormatedDateMMDDYY(this.requestedDate);
    rpd07O43Container.rpdmb65 = this.screen;
    rpd07O43Container.commonArea = this.common;
    this.clmCommMiscInfoServiceMainRun(rpd07O43Container).subscribe(resp => {
      rpd07O43Container = resp;
      this.screen = rpd07O43Container.rpdmb65;
      this.common = rpd07O43Container.commonArea;
      if (this.screen.m65err1 === '' || this.screen.m65err1 == null) {
        data = this.transferSrv.getData();
        data['common'] = this.common;
        this.InitEndCommunication();
        this.endCommunicationVisible = true;
      } else {
        this.screen = rpd07O43Container.rpdmb65;
        this.common = rpd07O43Container.commonArea;
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m65err1);
      }
    });
  }

  reviewCommunicationEventClick(): void {

    let data: any = undefined;
    this.reviewCommArea.memberId = String(this.common.comcomm.membershipId);
    data = this.transferSrv.getData();
    data['reviewCommArea'] = this.reviewCommArea;
    this.router.navigate(['/communication/communication-list']);
  }

  InitEndCommunication(): void {
    const rpd07O41Container = new Rpd07O41Container();
    let rpd07O41container = new Rpd07O41Container();

    this.common = this.common === undefined ? new CommunicationCommarea() : this.common;
    this.commControlEndCommServiceMainOperation(this.common).subscribe(resp => {
      rpd07O41container = resp;
      this.screenModal = rpd07O41container.rpdmb55;
      this.common = rpd07O41container.commonArea;
      if (rpd07O41container.commonArea.clmCmnctstatArea.tsfStatus === 'SENT') {
        this.screenModal.isSent = true;
      }
    });
  }

  getSlashFormatedDateMMDDYYYY(inputDate: string): string {
    let dateOfServiceFromFormat = '';
    if (inputDate) {
      if (inputDate.slice(4, 6).length > 80) {
        dateOfServiceFromFormat = '19' + inputDate.slice(4, 6) + '-' + inputDate.slice(0, 2) + '-' + inputDate.slice(2, 4);
      } else {
        dateOfServiceFromFormat = '20' + inputDate.slice(4, 6) + '-' + inputDate.slice(0, 2) + '-' + inputDate.slice(2, 4);
      }
    }
    return dateOfServiceFromFormat;
  }

  getServiceFormatedDateMMDDYY(inputDate: string): string {
    let validDateFormat = '';
    if (inputDate) {
      validDateFormat = inputDate.slice(5, 7) + inputDate.slice(8, 10) + inputDate.slice(2, 4);
    }
    return validDateFormat;
  }

  assignCallWriter(value: string): void {
    this.screen.m65call = value;
    if (this.screen && this.screen.m65call !== '3') {
      this.screen.m65othe = '';
    }
  }

  changeVisible(visible: boolean): void {
    this.endCommunicationVisible = visible;
  }

  checkForValidator(txtFieldId: string): void {
    if ((txtFieldId === 'txtSendIonsSuspend' || txtFieldId === 'txtSendIonsAdd') && this.sendIons.untouched) {
      this.sendIons.setValidators([Validators.required, Validators.minLength(6)]);
      this.sendIons.updateValueAndValidity();
    } else if (txtFieldId === 'txtConcrnCode' && this.concern_code.untouched) {
      this.concern_code.setValidators(Validators.required);
      this.concern_code.updateValueAndValidity();
    } else if (txtFieldId === 'txtProblemConcern' && this.problem.untouched) {
      this.problem.setValidators(Validators.required);
      this.problem.updateValueAndValidity();
    } else if (txtFieldId === 'txtClaimId1' && this.claimNumber.untouched) {
      this.claimNumber.setValidators(this.claimNumber.validator);
      this.claimNumber.updateValueAndValidity();
    }
  }

  /**
   * Back end calls mainRun.
   */
  private clmCommMiscInfoServiceMainRun(rpd07O43Container: Rpd07O43Container): Observable<Rpd07O43Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Rpd07O43Container>('/api/overpayment/services/clmcommmiscinfo/clmcommmiscinfoservice/mainrun', JSON.stringify(rpd07O43Container), options);

  }

  /**
   * Back end calls mainMethod
   */
  private clmCommMiscInfoServiceMainMethod(commonArea: CommunicationCommarea): Observable<Rpd07O43Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Rpd07O43Container>('/api/overpayment/services/clmcommmiscinfo/clmcommmiscinfoservice/mainmethod', JSON.stringify(commonArea), options);

  }

  /**
   * Back end calls mainOperation
   */
  private commControlEndCommServiceMainOperation(commonArea: CommunicationCommarea): Observable<Rpd07O41Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Rpd07O41Container>('/api/overpayment/services/commcontrolendcomm/commcontrolendcommservice/mainoperation', JSON.stringify(commonArea), options);

  }
}
