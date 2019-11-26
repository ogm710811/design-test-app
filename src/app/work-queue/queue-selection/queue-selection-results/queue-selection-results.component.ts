import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Router} from '@angular/router';
import {
  NewWorkSessionRequestVO,
  WorkQueueVO,
  WorkSessionApi
} from '@fox/rest-clients';
import {
  LoginService,
  MessageBoxService,
  MessageBoxType,
  OP,
  workQueueRoutePathQueueDetail,
  workQueueRoutePathQueueSelection,
  workQueueRoutePathRoot,
  WorkSessionService
} from '@fox/shared';
import * as uuid from 'uuid';
import {QueueSelectionConfirmationComponent} from './queue-selection-confirmation/queue-selection-confirmation.component';

@Component({
  selector: 'fox-queue-selection-results',
  templateUrl: './queue-selection-results.component.html',
  styleUrls: ['./queue-selection-results.component.css']
})
export class QueueSelectionResultsComponent implements OnInit, OnChanges {

  @Input() queues: WorkQueueVO[] = [];
  @Input() dataSize: number = 0;
  @Input() pageSize: number = 0;
  @Input() pageTotal: number = 0;
  @Input() pageNumber: number = 0;
  @Output() pageNumberChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  @ViewChild(QueueSelectionConfirmationComponent) queueConfirmModal?: QueueSelectionConfirmationComponent;

  queueDetailsPath = '/' + workQueueRoutePathRoot + '/' + workQueueRoutePathQueueDetail;
  private fifoQueueToWork?: WorkQueueVO;

  get hasEnhancedWorkQueueRole(): boolean {
    return this.loginSvc.hasRole(OP.MAINTAIN_EH_WQ);
  }

  constructor(
    private router: Router,
    private loginSvc: LoginService,
    private msgBoxSvc: MessageBoxService,
    private workSessionApi: WorkSessionApi,
    private workSessionService: WorkSessionService,
    private messageBoxService: MessageBoxService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pageNumber && this.pageNumber) {
      this.pageNumberChange.emit(this.pageNumber);
    }

    if (changes.pagesize && this.pageSize) {
      this.pageSizeChange.emit(this.pageSize);
    }
  }

  onStartFifo(queue: WorkQueueVO): void {
    this.fifoQueueToWork = queue;
    if (this.queueConfirmModal) {
      this.queueConfirmModal.queueName = this.fifoQueueToWork.name || 'UNKNOWN';
      this.queueConfirmModal.openModal();
    }
  }

  onConfirmQueueToWork(): void {
    if (!this.fifoQueueToWork || !this.fifoQueueToWork.queueId) {
      this.msgBoxSvc.addMessageBox(
        'Failed to Begin FIFO Queue Working Session',
        MessageBoxType.ERROR,
        'The working session was unable to start because the data for the selected queue is incomplete.You may wish to try ' +
        'again, or contact an administrator or technical support staff if this issue persists.');
      return;
    }

    if (this.workSessionService.hasWorkQueueSession) {
      this.workSessionService.sendToWorkbench().add(() => {
        this.createNewSession();
      });
    } else {
      this.createNewSession();
    }
  }

  createNewSession(): void {
    this.workSessionService.redirectTo = workQueueRoutePathRoot + '/' + workQueueRoutePathQueueSelection;
    const workSession: NewWorkSessionRequestVO = {};
    workSession.workIdType = 'queue';
    workSession.workId = this.fifoQueueToWork ? this.fifoQueueToWork.queueId : 0;

    this.workSessionApi.createSession(workSession, uuid()).subscribe(resp => {
      if (resp.workQueueItem) {
        this.workSessionService.checkSession(true);
      }
    }, (e) => {
      if (e.status === 404) {
        this.msgBoxSvc.addMessageBox(
          'No Items to Work',
          MessageBoxType.ERROR,
          'There are no available work items left in the work queue.');
        return;
      } else if (e.status === 409) {
        this.messageBoxService.reset();
        this.messageBoxService.addMessageBox(
          'Error',
          MessageBoxType.ERROR,
          'Unable to create working session as the item is currently locked.'
        );
      }
    });
  }
}
