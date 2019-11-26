import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'fox-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {
  @Input() trcNumber: string | undefined;
  @Output() abortDeletion: EventEmitter<'abort'> = new EventEmitter<'abort'>();
  @Output() confirmDeletion: EventEmitter<'confirm'> = new EventEmitter<'confirm'>();
  @Output() cancelOrConfirmDeletion: EventEmitter<'abort' | 'confirm'> = new EventEmitter<'abort' | 'confirm'>();

  constructor() {
  }

  onDeleteModalCancelPressed(): void {
    this.abortDeletion.emit('abort');
    this.cancelOrConfirmDeletion.emit('abort');
  }

  onDeleteModalConfirmPressed(): void {
    this.confirmDeletion.emit('confirm');
    this.cancelOrConfirmDeletion.emit('confirm');
  }
}
