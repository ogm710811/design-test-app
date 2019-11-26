import {Component, Input} from '@angular/core';
import {ProviderAddressVO, ProviderIdVO} from '@fox/rest-clients';
import {ProviderSearchResultDetailsService} from '../../provider-profile.service';

@Component({
  selector: 'fox-provider-summary',
  templateUrl: './provider-summary.component.html',
  styleUrls: ['./provider-summary.component.css']
})

export class ProviderSummaryComponent {

  @Input() detailsService?: ProviderSearchResultDetailsService;
  @Input() providerAddress?: ProviderAddressVO;
  @Input() providerTypeCode?: ProviderIdVO;

  constructor() {
  }
}
