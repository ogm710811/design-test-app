import {AfterViewInit, EventEmitter} from '@angular/core';
import {AbstractModal} from './abstract-modal';
import {ModalResult} from './modal.component';

export abstract class CancelConfirmModal<T> extends AbstractModal<T> implements AfterViewInit {
  cancel: EventEmitter<ModalResult<T>> = new EventEmitter<ModalResult<T>>();
  confirm: EventEmitter<'ok'> = new EventEmitter<'ok'>();

  ngAfterViewInit(): void {
    if (this.modal) {
      this.modal.closed.subscribe(
        (modalResult: ModalResult<T>) => {
          if (modalResult === 'ok') {
            this.confirm.emit(modalResult);
          } else {
            this.cancel.emit(modalResult);
          }
        }
      );
    }
  }
}
