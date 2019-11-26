import {Action} from '@ngrx/store';

export interface ModalState {
  modalActive: boolean;
}

export const OPEN = 'OPEN';
export const CLOSE = 'CLOSE';

export function modalReducer(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case OPEN: {
      return true;
    }

    case CLOSE: {
      return false;
    }

    default: {
      return state;
    }

  }
}
