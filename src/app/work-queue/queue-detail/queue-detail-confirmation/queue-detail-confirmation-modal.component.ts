import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {NewWorkSessionRequestVO, WorkSessionApi} from '@fox/rest-clients';
import * as uuid from 'uuid';
import {
  MessageBoxService,
  MessageBoxType,
  WorkSessionService
} from '@fox/shared';

@Component({
  selector: 'fox-queue-confirmation-modal',
  templateUrl: './queue-detail-confirmation-modal.component.html',
  styleUrls: ['./queue-detail-confirmation-modal.component.css']
})
export class QueueDetailConfirmationComponent implements OnInit {

  @Input() showQueueDetailConfirmModal?: boolean;
  @Input() workItemId?: string;
  @Input() queueName?: string;
  @Input() workType?: string;
  @Output() showQueueDetailConfirmModalChange = new EventEmitter<boolean>(false);

  constructor(private workSessionApi: WorkSessionApi,
              private workSessionService: WorkSessionService,
              private router: Router,
              private messageBoxService: MessageBoxService) {
  }

  ngOnInit(): void {
    this.showQueueDetailConfirmModalChange.emit(false);
  }

  onQueueConfirmationPressed(): void {
    if (this.workItemId && !isNaN(+this.workItemId)) {
      this.showQueueDetailConfirmModal = false;
      this.showQueueDetailConfirmModalChange.emit(false);
      const workSession: NewWorkSessionRequestVO = {};
      workSession.workIdType = 'item';
      workSession.workId = +this.workItemId;
      this.workSessionApi.createSession(workSession, uuid()).subscribe(resp => {
        if (resp.workQueueItem) {
          this.workSessionService.checkSession(true);
        }
      }, error => {
        if (error.status === 409) {
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

  onQueueConfirmationCancelPressed(): void {
    this.showQueueDetailConfirmModal = false;
    this.showQueueDetailConfirmModalChange.emit(false);
  }

}
