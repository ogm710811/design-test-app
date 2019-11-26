import {Component, Input} from '@angular/core';
import {ProviderAddressVO, ProviderIdVO} from '@fox/rest-clients';
import {memberInformationUrlPrefixProviderProfile, PageHeaderService} from '@fox/shared';
import {ProviderSearchResultDetailsService} from '../../provider-profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'fox-provider-alternate',
  templateUrl: './provider-alternate.component.html',
  styleUrls: ['./provider-alternate.component.css']
})

export class ProviderAlternativeComponent {

  @Input() detailsService?: ProviderSearchResultDetailsService;
  @Input() providerTypeCode?: ProviderIdVO;
  @Input() altProviderAddress?: ProviderAddressVO;

  constructor(
    private pageHeaderService: PageHeaderService,
    private router: Router
  ) {

  }

  getUrlForProvider(id: string): string {
    return id ? memberInformationUrlPrefixProviderProfile + id : '';
  }

  navigateToProvider(id: string): void {
    const url = this.getUrlForProvider(id);
    this.router.navigate([url]);
    this.pageHeaderService.currentNav = 1;
  }

}
