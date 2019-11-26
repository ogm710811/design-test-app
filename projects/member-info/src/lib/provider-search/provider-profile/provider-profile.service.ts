import {Injectable} from '@angular/core';
import {ResourceOfProviderVO} from '@fox/rest-clients';

@Injectable({
  providedIn: 'root'
})
export class ProviderSearchResultDetailsService {
  providerDetails?: ResourceOfProviderVO;
  altProviderDetails?: ResourceOfProviderVO;
  hasNotes: boolean = false;
  clmPaymentPref?: string;
  clmMaterialPref?: string;
}
