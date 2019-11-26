import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'fox-document-detail-delete-modal',
  templateUrl: 'document-detail-delete-modal.component.html',
  styleUrls: ['document-detail-delete-modal.component.css']
})
export class DocumentDetailNoteCancelModalComponent {
  @Input() deleteModalVisible: boolean = false;
  @Output() abortDeletion: EventEmitter<'abort'> = new EventEmitter<'abort'>();
  @Output() confirmDeletion: EventEmitter<'confirm'> = new EventEmitter<'confirm'>();

  constructor() {
  }

  onDeletelModalCancelPressed(): void {
    this.abortDeletion.emit('abort');
  }

  onDeleteModalConfirmPressed(): void {
    this.confirmDeletion.emit('confirm');
  }
}
