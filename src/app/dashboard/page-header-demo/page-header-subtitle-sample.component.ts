import {Component, Input} from '@angular/core';
import {DocumentClaimVO, DocumentMemberVO} from '@fox/rest-clients';
import {PageHeaderSubtitleComponent} from '@fox/shared';

@Component({
  templateUrl: './page-header-subtitle-sample.component.html',
  styleUrls: ['./page-header-subtitle-sample.component.css'],
})

export class PageHeaderSubtitleSampleComponent implements PageHeaderSubtitleComponent {
  @Input() data: any;

  detailMember: DocumentMemberVO = {
    accountNumber: 12345678901 ,
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'B',
    state: 'PA',
    zipCode: '12345',
    dateOfBirth: '05/05/1990',
    gender: 'Male',
    medicareBeneficiaryId: 'ABC12345678',
    planType: 'Plan Type',
    planCode: 'Plan Code',
    planEffectiveDate: '02/02/2009'
  };

  detailClaim: DocumentClaimVO = {
    claimNumber: 123451234560,
    claimJulianDate: 11221111,
    dosFrom: '02/03/2000',
    dosTo: '03/01/2025',
    providerName: 'Provider Name',
    providerTin: 'Provider TIN',
    ubTypeOfBill: 'Type OF Bill'
  };

}
