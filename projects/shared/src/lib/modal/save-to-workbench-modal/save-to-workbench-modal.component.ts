import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {
  ConfiguserApi,
  ReferenceValueVO,
  ResourceOfUserVO,
  WorkBenchApi,
  WorkbenchRequestVO,
  WorkQueueItemMetadataVO,
  WorkQueueItemRequestVO,
  WorkQueueReferencesApi
} from '@fox/rest-clients';
import * as moment from 'moment-timezone';
import * as uuidNS from 'uuid';
import {FoxValidators} from '../../fox-validators/FoxValidators';
import {ModalService} from '../modal.service';
import {LoginService} from '../../login-service/login.service';
import {MessageBoxService} from '../../message-box/message-box.service';
import {FeatureFlagService} from '../../feature-flag-service/feature-flag.service';
import {WorkSessionService} from '../../work-session-service/work-session.service';
import {MessageBoxType} from '../../message-box/message-box-type.enum';

const uuid = uuidNS;

@Component({
  selector: 'fox-save-to-workbench-modal',
  templateUrl: 'save-to-workbench-modal.component.html',
  styleUrls: ['save-to-workbench-modal.component.css']
})
export class SaveToWorkbenchModalComponent implements OnInit {
  @Input() modalVisible: boolean = false;
  @Output() modalVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  firstName: string = '';
  lastName: string = '';
  msid = this.loginSvc.loginState.username;
  selectedMsid = this.msid;
  column = '';
  isDesc = false;
  direction = 1;
  urgency = 1;
  reasonContent = '';
  followUpDate: string | null = '';
  urgencyOptions: ReferenceValueVO[] = [];
  searchResult: ResourceOfUserVO[] = [];
  noRecordsErrorMessage: boolean = false;
  followUpDateFormControl = new FormControl('', [FoxValidators.mmddyyyySlashDateValidator]);

  get hasWorkQueueSession(): boolean {
    const filteredList = this.modalService.saveToWorkbenchItemList.filter(item => (item.wqiBusinessId ? item.wqiBusinessId.toString() : '')
      === this.workSessionService.currentWorkQueueBusinessId);

    return this.workSessionService.hasWorkQueueSession && filteredList.length > 0;
  }

  get workQueueBusinessIdTypeDescription(): string | undefined {
    const topOfWorkbenchList: WorkQueueItemMetadataVO = this.modalService.saveToWorkbenchItemList[0];
    if (topOfWorkbenchList) {
      return topOfWorkbenchList.businessIdTypeDesc;
    } else {
      return undefined;
    }
  }

  get workQueueQueue(): string | undefined {
    const topOfWorkbenchList: WorkQueueItemMetadataVO = this.modalService.saveToWorkbenchItemList[0];
    if (topOfWorkbenchList) {
      return topOfWorkbenchList.queue;
    } else {
      return undefined;
    }
  }

  get isF5001Enabled(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F5001');
  }

  constructor(private wqSvc: WorkBenchApi,
              private modalService: ModalService,
              private router: Router,
              private configuserApi: ConfiguserApi,
              private refSvc: WorkQueueReferencesApi,
              private loginSvc: LoginService,
              private messageBoxService: MessageBoxService,
              private workSessionService: WorkSessionService,
              private featureFlagSvc: FeatureFlagService) {
  }

  ngOnInit(): void {
    this.resetValues();
    this.selectedMsid = this.msid;
    this.refSvc.workqueueReference('URGENCY', uuid()).subscribe((refVals) => this.urgencyOptions = refVals);
    this.modalService.itemsDetailsChange.subscribe((change: any) => {
      this.reasonContent = change;
    });

    this.modalService.followupDateChange.subscribe((change: any) => {
      this.followUpDate = change ? this.formatDateToUi(change) : '';
    });
  }

  displayTwoButtons(): boolean {
    return this.workSessionService.workType === 'FIFO'
      && this.hasWorkQueueSession && !this.workSessionService.fromWorkBench
      && this.modalService.saveToWorkbenchItemList[0].wqiId === this.workSessionService.currentSessionWorkQueueItem.wqiId;
  }

  resetValues(): void {
    this.firstName = '';
    this.lastName = '';
    this.urgency = 1;
    this.reasonContent = '';
    this.followUpDate = null;
    this.searchUser();
    this.selectedMsid = this.msid;
  }

  searchUser(): void {
    this.searchResult = [];
    this.selectedMsid = '';

    const firstNameFinal = this.checkIfOnlySpace(this.firstName);
    const lastNameFinal = this.checkIfOnlySpace(this.lastName);
    const msidFinal = this.checkIfOnlySpace(this.msid);

    this.configuserApi.findUser(uuid(), firstNameFinal, lastNameFinal, undefined, msidFinal, 1000)
      .subscribe(resp => {
        if (resp && resp._embedded && resp._embedded.items) {
          this.noRecordsErrorMessage = false;
          this.searchResult = resp._embedded.items;
        } else {
          if (resp && resp.page && (resp.page.totalElements === 0)) {
            this.noRecordsErrorMessage = true;
          }
        }
      });
  }

  checkIfOnlySpace(str: string): string | undefined {
    return (!(/\S/.test(str))) ? undefined : str.trim();
  }

  onKeyUp(): void {
    this.reasonContent = this.reasonContent.replace(/^\s+/, '');
  }

  onSavePressed(mode: string): void {
    if (this.modalService.saveToWorkbenchItemList.length > 0) {
      let successCount = 0;
      let redirect = false;
      const queueItems: WorkQueueItemRequestVO[] = this.modalService.saveToWorkbenchItemList
        .map(item => {
          return {
            wqiId: item.wqiId ? item.wqiId : 0,
            userId: this.selectedMsid,
            reason: this.reasonContent.trim(),
            wqiBusinessId: item.wqiBusinessId ? item.wqiBusinessId : '',
            businessIdType: item.businessIdType ? item.businessIdType : 0,
            queue: item.queue ? item.queue : undefined,
            assignedBy: this.loginSvc.username,
            followUpDate: this.followUpDate ? this.formatDateToService(this.followUpDate) : undefined,
            urgency: this.urgency
          };
        });
      const workbenchRequest: WorkbenchRequestVO = {};
      workbenchRequest.items = queueItems;
      if (mode === 'exit') {
        workbenchRequest.endSession = true;
      } else if (mode === 'next') {
        workbenchRequest.endSession = false;
      } else if (mode === 'normal' && this.hasWorkQueueSession
        && this.modalService.saveToWorkbenchItemList[0].wqiId === this.workSessionService.currentSessionWorkQueueItem.wqiId) {
        workbenchRequest.endSession = true;
        redirect = true;
      }

      this.wqSvc.updateWorkBench(workbenchRequest, uuid()).subscribe(resp => {
        if (resp) {
          successCount = resp.filter(o => o.success).length;

          if (successCount === 0) {
            this.messageBoxService.addMessageBox('Failed', MessageBoxType.ERROR, 'No items successfully sent to the workbench.');
          } else {
            if (successCount === this.modalService.saveToWorkbenchItemList.length) {
              this.messageBoxService.addMessageBox('Items sent', MessageBoxType.SUCCESS, 'All items successfully sent to the workbench.', 3000);
            } else {
              this.messageBoxService.addMessageBox('Not All Items Successfully Sent', MessageBoxType.ACTIVE, 'Due to an unknown error, only ' + successCount + ' of '
                + this.modalService.saveToWorkbenchItemList.length + ' items could be sent to the workbench.');
            }

            this.modalService.saveToWorkbenchCompleted = true;
            this.modalService.saveToWorkbenchItemList = [];
          }
        } else if (resp === null && mode === 'next') {
          this.messageBoxService.addMessageBox('Queue has no more active items', MessageBoxType.SUCCESS, 'Queue has no more active items. Work Session has been completed.');
        } else if (resp === null && workbenchRequest.endSession) {
          this.messageBoxService.addMessageBox('Items sent', MessageBoxType.SUCCESS, 'All items successfully sent to the workbench.', 3000);
        }

        this.workSessionService.checkSession(mode === 'exit' || mode === 'next' || redirect);
        this.changeVisible(false);
        this.router.navigate([this.workSessionService.redirectTo], {queryParams: this.workSessionService.params}).then();

      }, () => {
        this.messageBoxService.addMessageBox('Failed', MessageBoxType.ERROR, 'No items successfully sent to the workbench.');
        this.changeVisible(false);
      });
    } else {
      this.messageBoxService.addMessageBox('Failed', MessageBoxType.ERROR, 'No items to send to the workbench.');
    }
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  changeVisible(visible: boolean): void {
    this.modalVisible = visible;
    this.modalVisibleChange.emit(this.modalVisible);
    this.msid = this.loginSvc.loginState.username;
    this.resetValues();
  }

  formatDateToService(originalFormat: string): string {
    return moment.tz(originalFormat, 'MM/DD/YYYY').format('YYYY-MM-DD');
  }

  formatDateToUi(originalFormat: string): string {
    return moment.tz(originalFormat, 'MM/DD/YYYY').format('MM/DD/YYYY');
  }
}
