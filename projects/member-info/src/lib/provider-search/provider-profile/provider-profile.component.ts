import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ProviderAddressVO,
  ProviderApi,
  ProviderIdVO,
  ProviderNameVO,
  ReferencesApi,
  ResourceOfProviderVO,
  TaxStatusVO
} from '@fox/rest-clients';
import {
  memberInformationRoutePathProviderSearch,
  NotifyFooter,
  PageHeaderService
} from '@fox/shared';
import {Subscription} from 'rxjs';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {ProviderSearchResultDetailsService} from './provider-profile.service';

@Component({
  selector: 'fox-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.css']
})

export class ProviderProfileComponent implements OnInit, OnDestroy {

  url: string = '../../' + memberInformationRoutePathProviderSearch;
  paper = 'U.S. Mail';
  electronic = 'Online';
  tabTitles?: string[] = [];

  providerDetails?: ResourceOfProviderVO;
  sub?: Subscription;
  provId: string = '';
  lastPressed: number = 0;
  providerSearchResultDetailsService = new ProviderSearchResultDetailsService();
  providerAddress?: ProviderAddressVO;
  providerTypeCode?: ProviderIdVO;
  overrideProviderAddress?: ProviderAddressVO;
  altProviderAddress?: ProviderAddressVO;
  tinTaxStatus?: TaxStatusVO;
  mPin?: ProviderIdVO;
  taxonomyCode?: ProviderIdVO;
  currentNavChangeSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private providerSearchApi: ProviderApi,
    private notificationFooter: NotifyFooter,
    public pageHeaderService: PageHeaderService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {

      this.lastPressed = 0;
      this.providerSearchResultDetailsService = new ProviderSearchResultDetailsService();

      if (params['providerId']) {
        this.provId = params['providerId'];
        this.providerSearchApi.getProvider(+this.provId, uuid()).subscribe(res => {

          this.providerDetails = res;
          if (this.providerDetails) {

            if (this.providerDetails.alternativeProviderId) {
              this.pageHeaderService.tabs = ['Demographics', 'Status Codes', 'Notes', 'Alternate Provider'];
            } else {
              this.pageHeaderService.tabs = ['Demographics', 'Status Codes', 'Notes'];
            }

            this.providerSearchResultDetailsService.providerDetails = this.providerDetails;
            this.providerSearchResultDetailsService.hasNotes = (this.providerDetails && this.providerDetails.note && this.providerDetails.note.length > 0) ? true : false;

            if (!this.providerDetails.note) {
              this.providerSearchResultDetailsService.providerDetails.note = new Array();
            }

            if (this.providerDetails.alternativeProviderId && this.providerDetails.alternativeProviderId.idNumber) {
              const altProvId: number = +this.providerDetails.alternativeProviderId.idNumber;
              this.providerSearchApi.getProvider(altProvId, uuid()).subscribe(altProvResp => {
                this.providerSearchResultDetailsService.altProviderDetails = altProvResp;
                if (this.providerSearchResultDetailsService.altProviderDetails && this.providerSearchResultDetailsService.altProviderDetails.providerName && altProvResp.providerName && !altProvResp.providerName.businessName) {
                  this.providerSearchResultDetailsService.altProviderDetails.providerName.businessName = this.getBusinessName(altProvResp.providerName);
                }

                if (this.providerSearchResultDetailsService && this.providerSearchResultDetailsService.altProviderDetails &&
                  this.providerSearchResultDetailsService.altProviderDetails.providerAddress && this.providerSearchResultDetailsService.altProviderDetails.providerAddress.length > 0) {
                  this.altProviderAddress = this.providerSearchResultDetailsService.altProviderDetails.providerAddress[0];
                }
              });
            }

            // provider preference
            this.providerSearchResultDetailsService.clmPaymentPref = this.paper;
            this.providerSearchResultDetailsService.clmMaterialPref = this.paper;
            if (this.providerDetails.specialHandlingCode && this.providerDetails.specialHandlingCode.length > 0) {
              for (const code of this.providerDetails.specialHandlingCode) {
                const sphCode = code.sphCode;
                if ('D2' === sphCode || 'E1' === sphCode || 'E2' === sphCode) {
                  this.providerSearchResultDetailsService.clmPaymentPref = this.electronic;
                }
                if ('D3' === sphCode || 'D4' === sphCode || 'D5' === sphCode || 'D6' === sphCode) {
                  this.providerSearchResultDetailsService.clmMaterialPref = this.electronic;
                }
              }
            }
            // handle businessname
            if (this.providerDetails.providerName && !this.providerDetails.providerName.businessName) {
              this.providerDetails.providerName.businessName = this.getBusinessName(this.providerDetails.providerName);
            }

            if (this.providerDetails.overrideProviderName && !this.providerDetails.overrideProviderName.businessName) {
              this.providerDetails.overrideProviderName.businessName = this.getBusinessName(this.providerDetails.overrideProviderName);
            }

            // state
            if (this.providerSearchResultDetailsService) {
              if (this.providerSearchResultDetailsService.providerDetails) {
                if (this.providerSearchResultDetailsService.providerDetails.providerTypeCode && this.providerSearchResultDetailsService.providerDetails.providerTypeCode.length > 0) {
                  this.providerTypeCode = this.providerSearchResultDetailsService.providerDetails.providerTypeCode[0];
                }

                if (this.providerSearchResultDetailsService.providerDetails.tinInfo && this.providerSearchResultDetailsService.providerDetails.tinInfo.tinTaxStatus && this.providerSearchResultDetailsService.providerDetails.tinInfo.tinTaxStatus.length > 0) {
                  this.tinTaxStatus = this.providerSearchResultDetailsService.providerDetails.tinInfo.tinTaxStatus[0];
                }

                if (this.providerSearchResultDetailsService.providerDetails.mPin && this.providerSearchResultDetailsService.providerDetails.mPin.length > 0) {
                  this.mPin = this.providerSearchResultDetailsService.providerDetails.mPin[0];
                }

                if (this.providerSearchResultDetailsService.providerDetails.taxonomyCode && this.providerSearchResultDetailsService.providerDetails.taxonomyCode.length > 0) {
                  this.taxonomyCode = this.providerSearchResultDetailsService.providerDetails.taxonomyCode[0];
                }
              }

              if (this.providerSearchResultDetailsService.providerDetails.providerAddress && this.providerSearchResultDetailsService.providerDetails.providerAddress.length > 0) {
                this.providerAddress = this.providerSearchResultDetailsService.providerDetails.providerAddress[0];
              }

              if (this.providerSearchResultDetailsService.providerDetails.overrideProviderAddress && this.providerSearchResultDetailsService.providerDetails.overrideProviderAddress.length > 0) {
                this.overrideProviderAddress = this.providerSearchResultDetailsService.providerDetails.overrideProviderAddress[0];
              }

            }

          }

        });
      }
    });
    this.pageHeaderService.customTitle = 'Provider #' + this.provId;
    this.currentNavChangeSubscription = this.pageHeaderService.currentNavChange.subscribe((currentNav: any) => {
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.currentNavChangeSubscription.unsubscribe();
  }

  getBusinessName(providerNameVO: ProviderNameVO): string {
    const prefix = providerNameVO.prefix;
    const firstName = providerNameVO.firstName;
    const middleName = providerNameVO.middleName;
    const lastName = providerNameVO.lastName;
    let businessName = '';

    if (prefix) {
      businessName += prefix + ' ';
    }
    if (firstName) {
      businessName += firstName + ' ';
    }
    if (middleName) {
      businessName += middleName + ' ';
    }
    if (lastName) {
      businessName += lastName;
    }

    return businessName;
  }

  changePosition(origin?: number | null, position?: number | null): void {
    if (position === null || position === undefined) {
      this.lastPressed = 0;
    } else {
      this.lastPressed += position;
    }

  }

  onTabChange(event: any): void {
    this.notificationFooter.setNotificationFooter(event.index);
  }

}
