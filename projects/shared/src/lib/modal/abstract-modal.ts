import {ModalResult, ModalComponent} from './modal.component';

export abstract class AbstractModal<T> {
  modal?: ModalComponent<T>;

  openModal(): void {
    if (this.modal) {
      this.modal.openModal();
    }
  }

  closeModal(emitValue: ModalResult<T>): void {
    if (this.modal) {
      this.modal.closeModal(emitValue);
    }
  }
}
