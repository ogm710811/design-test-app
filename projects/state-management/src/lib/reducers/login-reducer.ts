import {Action} from '@ngrx/store';

export interface LoginReduxState {
  loggedIn: boolean;
}

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export function loginReducer(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case LOG_IN: {
      return true;
    }

    case LOG_OUT: {
      return false;
    }

    default: {
      return state;
    }

  }
}
