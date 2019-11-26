import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent, CancelConfirmModal, ModalResult} from '@fox/shared';

@Component({
  selector: 'fox-queue-selection-confirmation',
  templateUrl: './queue-selection-confirmation.component.html',
  styleUrls: ['./queue-selection-confirmation.component.css']
})
export class QueueSelectionConfirmationComponent extends CancelConfirmModal<void> {
  @Input() queueName?: string;
  @Output() cancel: EventEmitter<ModalResult<void>> = new EventEmitter<ModalResult<void>>();
  @Output() confirm: EventEmitter<'ok'> = new EventEmitter<'ok'>();

  @ViewChild('modal') modal?: ModalComponent<void>;

  constructor() {
    super();
  }
}
