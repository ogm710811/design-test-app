import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'fox-denial-reason-modal',
  templateUrl: './denial-reason-modal.component.html',
  styleUrls: ['./denial-reason-modal.component.css']
})

export class DenialReasonModalComponent {

  @Input() denialReasonModalVisible: boolean;

  @Output() denialRsnEmitter = new EventEmitter<string>();
  @Output() denialReasonModalVisibleChange = new EventEmitter<boolean>();
  @Output() cancelDenialRequest: EventEmitter<'cancel'> = new EventEmitter<'cancel'>();
  @Output() confirmDenialRequest: EventEmitter<'confirm'> = new EventEmitter<'confirm'>();

  denialRsn: string = '';

  cancelDenialReasonModal(): void {
    this.cancelDenialRequest.emit('cancel');
  }

  submitDeny(): void {
    this.denialRsnEmitter.emit(this.denialRsn);
    this.confirmDenialRequest.emit('confirm');
  }
}
