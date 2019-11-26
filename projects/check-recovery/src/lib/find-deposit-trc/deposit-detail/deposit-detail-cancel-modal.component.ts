import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'fox-deposit-detail-cancel-modal',
  templateUrl: 'deposit-detail-cancel-modal.component.html',
  styleUrls: ['deposit-detail-cancel-modal.component.css']
})
export class DepositDetailCancelModalComponent {
  @Input() cancelModalVisible: boolean = false;
  @Output() abortCancellation: EventEmitter<'abort'> = new EventEmitter<'abort'>();
  @Output() confirmCancellation: EventEmitter<'confirm'> = new EventEmitter<'confirm'>();
  @Output() abortOrConfirmCancellation: EventEmitter<'abort' | 'confirm'> = new EventEmitter<'abort' | 'confirm'>();

  constructor() {
  }

  onCancelModalCancelPressed(): void {
    this.abortCancellation.emit('abort');
    this.abortOrConfirmCancellation.emit('abort');
  }

  onCancelModalConfirmPressed(): void {
    this.confirmCancellation.emit('confirm');
    this.abortOrConfirmCancellation.emit('confirm');
  }
}
