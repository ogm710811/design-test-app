import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkSessionApi} from '@fox/rest-clients';
import {LoginService, WorkSessionService} from '@fox/shared';

@Component({
  selector: 'fox-open-workitem-confirmation-modal',
  templateUrl: './open-workitem-confirmation-modal.component.html',
  styleUrls: ['./open-workitem-confirmation-modal.component.css']
})
export class OpenWorkItemConfirmationComponent implements OnInit {

  @Input() showOpenWorkItemConfirmModal: boolean = false;
  @Input() workItemId?: string;
  @Input() workType?: string;
  @Input() queueName?: string;
  @Output() showOpenWorkItemModalChange = new EventEmitter<Boolean>(false);

  constructor(private loginSvc: LoginService, private workSessionApi: WorkSessionApi, private workSessionService: WorkSessionService) {
  }

  ngOnInit(): void {
    this.showOpenWorkItemModalChange.emit(false);
  }

  onOpenWorkItemConfirmationPressed(): void {
    if (this.workItemId) {
      this.workSessionService.endSessionAndCreateNew(this.workItemId);
    }
  }

  onOpenWorkItemConfirmationCancelPressed(): void {
    this.showOpenWorkItemConfirmModal = false;
    this.showOpenWorkItemModalChange.emit(false);
  }

}
