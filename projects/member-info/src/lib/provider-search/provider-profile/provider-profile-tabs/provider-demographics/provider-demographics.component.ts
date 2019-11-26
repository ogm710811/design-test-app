import {Component, Input} from '@angular/core';
import {ProviderAddressVO, ProviderIdVO, TaxStatusVO} from '@fox/rest-clients';
import {ProviderSearchResultDetailsService} from '../../provider-profile.service';

@Component({
  selector: 'fox-provider-demographics',
  templateUrl: './provider-demographics.component.html',
  styleUrls: ['./provider-demographics.component.css']
})

export class ProviderDemographicsComponent {

  @Input() detailsService?: ProviderSearchResultDetailsService;
  @Input() providerTypeCode?: ProviderIdVO;
  @Input() overrideProviderAddress?: ProviderAddressVO;
  @Input() providerAddress?: ProviderAddressVO;
  @Input() tinTaxStatus?: TaxStatusVO;
  @Input() mPin?: ProviderIdVO;
  @Input() taxonomyCode?: ProviderIdVO;

  constructor() {}
}
