import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {AccountMembershipResponseVO, AddressVO} from '@fox/rest-clients';
import {Subscription} from 'rxjs/Subscription';
import {MemberInformationService} from '../../../../../shared/member-information.service';

@Component({
  selector: 'fox-member-demographics-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() membershipNumber: string = '';
  memberProfile: AccountMembershipResponseVO = new AccountMembershipResponseVO();
  mProfileSubscription: Subscription = new Subscription();

  addressDataSource = new MatTableDataSource();
  displayedAddressColumns = ['addressType', 'effectiveFrom', 'effectiveTo', 'addressOne', 'addressTwo', 'city', 'state', 'zipCode', 'country'];

  todayDate: any = new Date();

  @ViewChild(MatSort) sort?: MatSort;

  constructor(private memberInformationService: MemberInformationService) {}

  ngOnInit(): void {
    this.mProfileSubscription = this.memberInformationService.memberProfileChanges$.subscribe(
      mProfile => {
        this.memberProfile = mProfile;
        this.addressProcessData();
      }
    );
  }

  ngAfterViewInit(): void {
    this.addressDataSource.sort = this.sort ? this.sort : null;
  }

  ngOnDestroy(): void {
    this.mProfileSubscription.unsubscribe();
  }

  addressProcessData(): void {
    const addressData: AddressVO[] = [];
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.address) {
      for (let i = 0; i < this.memberProfile.memberDetails.address.length; i++) {
        if (this.memberProfile.memberDetails.address && this.memberProfile.memberDetails.address[i].recordDetail) {
          const addressObj = this.memberProfile.memberDetails.address[i].address || {};
          const recordDetailObj = this.memberProfile.memberDetails.address[i].recordDetail || {};
          const addressItem = {
            'addressType': '',
            'effectiveFrom': addressObj.startDt,
            'effectiveTo': addressObj.stopDt,
            'addressOne': addressObj.addressLine1,
            'addressTwo': addressObj.addressLine2,
            'city': addressObj.city,
            'state': addressObj.stateProvinceCode,
            'zipCode': addressObj.postalCode,
            'country': addressObj.countrySubCode
          };

          if (recordDetailObj.attrCode === 'PERMADR') {
            if (addressItem.effectiveTo === undefined && recordDetailObj.attrCode === 'PERMADR') {
              addressItem.addressType = 'Home';
            } else {
              addressItem.addressType = 'Permanent';
            }
            addressData.push(addressItem);
          }
          if (recordDetailObj.attrCode === 'TEMPADR') {
            if (addressItem.effectiveTo === undefined && recordDetailObj.attrCode === 'TEMPADR') {
              addressItem.addressType = 'Mailing';
            } else {
              addressItem.addressType = 'Temporary';
            }
            addressData.push(addressItem);
          }
        }
      }
    }
    this.addressDataSource.data = addressData;
  }
}
