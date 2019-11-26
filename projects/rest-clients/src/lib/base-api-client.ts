import {Store} from '@ngrx/store';
import {
  AppState,
  ERROR204,
  ERROR400,
  ERROR401,
  ERROR403,
  ERROR409,
  ERROR412,
  ERROR415,
  ERROR500,
  RESET
} from '@fox/state-management';

export class BaseApiClient {

  store: Store<AppState>;

  constructor(theStore: Store<AppState>) {
    this.store = theStore;
  }

  handleError(errorCode: number): void {

    switch (errorCode) {
      case 204: {
        this.store.dispatch({type: ERROR204});
        break;
      }

      case 400: {
        this.store.dispatch({type: ERROR400});
        break;
      }

      case 401: {
        this.store.dispatch({type: ERROR401});
        break;
      }

      case 403: {
        this.store.dispatch({type: ERROR403});
        break;
      }

//      case 404: {
//        this.store.dispatch({type: ERROR404});
//        break;
//      }

      case 409: {
        this.store.dispatch({type: ERROR409});
        break;
      }

      case 412: {
        this.store.dispatch({type: ERROR412});
        break;
      }

      case 415: {
        this.store.dispatch({type: ERROR415});
        break;
      }

      case 500: {
        this.store.dispatch({type: ERROR500});
        break;
      }

      default: {
        this.store.dispatch({type: RESET});
        break;
      }
    }

  }
}
