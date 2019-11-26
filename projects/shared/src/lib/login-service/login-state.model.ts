import {ResourceOfUserVO} from '@fox/rest-clients';
import {OP} from '../authority/op';

export class LoginState {
  username: string = '';
  authorities: string[] = [];
  permissions: OP[] = [];
  access_token = '';
  refresh_token = '';
  errorMessage?: string;
  userDetails: ResourceOfUserVO = {};
  token_timeout = 0;
}
