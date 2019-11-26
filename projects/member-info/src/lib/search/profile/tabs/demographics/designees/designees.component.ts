import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AccountMembershipResponseVO, ClaimsMemberApi, PayeeAggregatesVO} from '@fox/rest-clients';
import {Subscription} from 'rxjs/Subscription';
import {MemberInformationService} from '../../../../../shared/member-information.service';

@Component({
  selector: 'fox-member-demographics-designees',
  templateUrl: './designees.component.html',
  styleUrls: ['./designees.component.css']
})
export class DesigneesComponent implements OnInit, AfterViewInit {

  designeesDataSource = new MatTableDataSource();
  displayedDesigneesColumns = ['designeeType', 'firstName', 'lastName', 'roles', 'addressOne', 'addressTwo', 'city', 'state', 'zipCode', 'country', 'phoneNumber', 'phoneNumberType', 'emailAddress', 'effectiveFrom', 'effectiveTo'];
  dataLength = 0;
  currentPage = 0;
  lastPageIndex = 0;
  pageSize = 5;

  @ViewChild(MatPaginator) paginatorObj?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  @Input() membershipNumber: string = '';
  memberProfile: AccountMembershipResponseVO = new AccountMembershipResponseVO();
  mProfileSubscription: Subscription = new Subscription();

  constructor(private claimInsuredMemberApi: ClaimsMemberApi,
              private memberInformationService: MemberInformationService) {
    this.lastPageIndex = this.pageSize;

  }

  ngOnInit(): void {
    this.mProfileSubscription = this.memberInformationService.memberProfileChanges$.subscribe(
      mProfile => {
        this.memberProfile = mProfile;
        this.demographicsTable();
      }
    );
  }

  ngAfterViewInit(): void {
    this.designeesDataSource.paginator = this.paginatorObj ? this.paginatorObj : null;
    this.designeesDataSource.sort = this.sort ? this.sort : null;
  }

  demographicsTable(): void {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.householdId && this.memberProfile.auxiliaryParty && this.memberProfile.auxiliaryParty.length > 0) {
      const designeeResults: PayeeAggregatesVO[] = [];
      if (this.memberProfile && this.memberProfile.auxiliaryParty && this.memberProfile.auxiliaryParty.length > 0) {
        for (let i = 0; i < this.memberProfile.auxiliaryParty.length; i++) {
          const auxData = this.memberProfile.auxiliaryParty[i];
          if (auxData && auxData.auxiliaryPersonType && auxData.auxiliaryPersonName && auxData.auxiliaryDayPhone && auxData.auxiliaryEveningPhone && auxData.auxiliaryPersonPermAddress && auxData.auxiliaryPersonPermAddress.length > 0 && auxData.auxiliaryPersonRole && auxData.auxiliaryPersonRole.length > 0) {
            const designeeItem = {
              'designeeType': auxData.auxiliaryPersonType.name || '',
              'firstName': auxData.auxiliaryPersonName.firstName || '',
              'lastName': auxData.auxiliaryPersonName.lastName || '',
              'addressOne': auxData.auxiliaryPersonPermAddress[0].addressLine1 || '',
              'addressTwo': auxData.auxiliaryPersonPermAddress[0].addressLine2 || '',
              'city': auxData.auxiliaryPersonPermAddress[0].city || '',
              'state': (auxData.auxiliaryPersonPermAddress[0].stateProvinceCode || '').trim(),
              'zipCode': auxData.auxiliaryPersonPermAddress[0].postalCode || '',
              'country': auxData.auxiliaryPersonPermAddress[0].countryCode || '',
              'phoneNumber': auxData.auxiliaryDayPhone.phoneNumber || auxData.auxiliaryEveningPhone.phoneNumber,
              'phoneNumberType': '',
              'emailAddress': auxData.auxiliaryEmail || '',
              'effectiveFrom': auxData.auxiliaryStartDate || '',
              'effectiveTo': auxData.auxiliaryStopDate || '',
              'roles': auxData.auxiliaryPersonRole[0].name
            };
            if (designeeItem.phoneNumber === auxData.auxiliaryDayPhone.phoneNumber) {
              designeeItem.phoneNumberType = '';
            } else if (designeeItem.phoneNumber === auxData.auxiliaryEveningPhone.phoneNumber) {
              designeeItem.phoneNumberType = '';
            }
            designeeResults.push(designeeItem);
          }
        }
        this.designeesDataSource.data = designeeResults;
        this.dataLength = designeeResults.length;
      }
    }
  }
}
