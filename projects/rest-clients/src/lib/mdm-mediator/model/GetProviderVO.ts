import {AddressVO} from '../../bpm-mediator/model/AddressVO';
import {AltProviderVO} from './AltProviderVO';
import {ProviderIdVO} from './ProviderIdVO';
import {ProviderNameVO} from './ProviderNameVO';

export class GetProviderVO {
  providerId: ProviderIdVO = new ProviderIdVO;
  tin: number = 0;
  npi: number = 0;
  taxStatusCd: string = '';
  taxStatusDesc: string = '';
  providerName: ProviderNameVO = new ProviderNameVO();
  address: AddressVO = new AddressVO();
  providerAddress: AddressVO = new AddressVO();
  overrideProviderAddress: AddressVO = new AddressVO();
  addressType: string = '';
  alternateProvider: AltProviderVO = new AltProviderVO();
}
