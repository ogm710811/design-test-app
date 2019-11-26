import {Action} from '@ngrx/store';

export interface AppState {
  message: string;
}

export const ERROR204 = 'ERROR204';
export const ERROR400 = 'ERROR400';
export const ERROR401 = 'ERROR401';
export const ERROR403 = 'ERROR403';
export const ERROR404 = 'ERROR404';
export const ERROR409 = 'ERROR409';
export const ERROR412 = 'ERROR412';
export const ERROR415 = 'ERROR409';
export const ERROR500 = 'ERROR500';
export const RESET = 'RESET';

export function snackbarReducer(state: string = '', action: Action): string {
  switch (action.type) {
    case ERROR204:
      return 'Error (204) : No Content';

    case ERROR400:
      return 'Error (400) : Bad Request';

    case ERROR401:
      return 'Error (401) : Unauthorized';

    case ERROR403:
      return 'Error (403) : Forbidden';

    case ERROR404:
      return 'Error (404) : Not Found';

    case ERROR409:
      return 'Error (409) : Conflict';

    case ERROR412:
      return 'Error (412) : Precondition Failed';

    case ERROR415:
      return 'Error (415) : Unsupported Media Type';

    case ERROR500:
      return 'Error (500) : Internal Server Error';

    case RESET:
      return '';

    default:
      return state;
  }
}
