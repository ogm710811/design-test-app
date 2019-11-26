import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {
  CategoryVO,
  QueueNameVO,
  ReferenceValueVO,
  RouteToQueueVO,
  WorkQueueApi,
  WorkQueueItemRequestVO,
  WorkQueueReferencesApi
} from '@fox/rest-clients';
import * as uuidNS from 'uuid';
import {ModalService} from '../modal.service';
import {MessageBoxService} from '../../message-box/message-box.service';
import {WorkSessionService} from '../../work-session-service/work-session.service';
import {LoginService} from '../../login-service/login.service';
import {FeatureFlagService} from '../../feature-flag-service/feature-flag.service';
import {MessageBoxType} from '../../message-box/message-box-type.enum';

const uuid = uuidNS;

@Component({
  selector: 'fox-route-to-queue-modal',
  templateUrl: 'route-to-queue-modal.component.html',
  styleUrls: ['route-to-queue-modal.component.css']
})
export class RouteToQueueModalComponent implements OnInit {
  @Input() modalVisible: boolean = false;
  @Output() modalVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  workTypeOptions: ReferenceValueVO[] = [];
  categoryOptions: CategoryVO[] = [];
  queueNameOptions: QueueNameVO[] = [];

  lastWorkType = '';
  lastCategory = '';
  lastQueueName = '';
  noteContent = '';
  queueType: any;

  get isF5001Enabled(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F5001');
  }

  constructor(private refSvc: WorkQueueReferencesApi,
              private wqSvc: WorkQueueApi,
              private modalService: ModalService,
              private router: Router,
              private messageBoxService: MessageBoxService,
              private sessionService: WorkSessionService,
              private loginService: LoginService,
              private featureFlagSvc: FeatureFlagService) {
  }

  ngOnInit(): void {
    this.refSvc.workqueueReference('WORK_TYPE', uuid()).subscribe((refVals) => this.workTypeOptions = refVals);
    this.modalService.itemsDetailsChange.subscribe((change: any) => {
      this.noteContent = change;
    });
  }

  onKeyUp(): void {
    this.noteContent = this.noteContent.replace(/^\s+/, '');
  }

  hasWorkQueueSession(): boolean {
    return this.sessionService.hasWorkQueueSession;
  }

  displayTwoButtons(): boolean {
    return this.sessionService.currentSessionWorkQueueItem && this.sessionService.workType === 'FIFO' && this.hasWorkQueueSession()
      && this.modalService.routeToQueueItemList.length === 1 && !this.sessionService.fromWorkBench
      && this.modalService.routeToQueueItemList[0] === this.sessionService.currentSessionWorkQueueItem.wqiId;
  }

  resetValues(): void {
    this.lastWorkType = '';
    this.lastCategory = '';
    this.lastQueueName = '';
    this.noteContent = '';
    this.categoryOptions = [];
  }

  onRoutePressed(routeStatus: string): void {
    let successCount = 0;
    let redirect = false;
    if (this.modalService.routeToQueueItemList.length > 0) {
      const request: RouteToQueueVO = {};
      request.routeReason = this.noteContent;
      request.queueTarget = +this.lastQueueName;
      const queueItems: WorkQueueItemRequestVO[] = [];
      this.modalService.routeToQueueItemList.forEach(itemId => {
        const item: WorkQueueItemRequestVO = {};
        item.wqiId = itemId;
        queueItems.push(item);
      });
      request.items = queueItems;
      if (routeStatus === 'exit') {
        request.endSession = true;
      } else if (routeStatus === 'next') {
        request.endSession = false;
        this.resetValues();
      } else if (this.sessionService.currentSessionWorkQueueItem && routeStatus === 'queue' && this.hasWorkQueueSession
        && this.modalService.routeToQueueItemList[0] === this.sessionService.currentSessionWorkQueueItem.wqiId) {
        request.endSession = true;
        redirect = true;
      }
      const senditemId = queueItems[0];
      const sendRequest = {...senditemId, ...request};
      // @ts-ignore
      sendRequest['item'] = [];
      // @ts-ignore
      sendRequest['item'].push(senditemId);
      this.wqSvc.routeToQueue(sendRequest, uuid()).subscribe(resp => {

        if (resp) {
          successCount = resp.filter(o => o.success).length;

          if (successCount === 0) {
            this.messageBoxService.addMessageBox('Failed', MessageBoxType.ERROR, 'No items successfully routed to queue.');
          } else if (successCount === this.modalService.routeToQueueItemList.length) {

            this.messageBoxService.addMessageBox('Items routed', MessageBoxType.SUCCESS, 'All items successfully routed to queue.', 3000);

          } else {
            this.messageBoxService.addMessageBox('Not All Items Successfully Routed', MessageBoxType.ACTIVE, 'Due to an unknown error, only ' + successCount + ' of '
              + this.modalService.routeToQueueItemList.length + ' items could be routed to queue.');
          }

        }

        this.modalService.routeToQueueItemList = [];

        this.modalService.routeToQueueCompleted = true;

        this.sessionService.checkSession(routeStatus === 'next' || routeStatus === 'exit' || redirect);
      });
      this.changeVisible(false);
    }
  }

  changeWorkType(): void {
    this.refreshCategoryOptions();
    this.lastCategory = '';
    this.lastQueueName = '';
  }

  changeCategory(): void {
    this.refreshQueueSelection();
    this.lastQueueName = '';
  }

  refreshQueueSelection(): void {
    this.queueNameOptions = [];
    if (this.lastCategory) {
      this.wqSvc.getQueueNames(this.lastWorkType, this.lastCategory, uuid()).subscribe(resp => {
        this.queueNameOptions = resp;
      });
    } else {
      this.queueNameOptions = [];
    }
  }

  refreshCategoryOptions(): void {
    this.queueNameOptions = [];
    if (this.lastWorkType) {
      this.refSvc.getCategoriesByWorkType(this.lastWorkType, uuid()).subscribe(resp => {
        this.categoryOptions = resp;
      });
    } else {
      this.categoryOptions = [];
    }
  }

  changeVisible(visible: boolean): void {
    this.modalVisible = visible;
    this.modalVisibleChange.emit(this.modalVisible);
    this.resetValues();
  }
}
