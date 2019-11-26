import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {AccountMembershipResponseVO, InsuredPlanVO} from '@fox/rest-clients';
import {Subscription} from 'rxjs/Subscription';
import {MemberInformationService} from '../../../../../../shared/member-information.service';

@Component({
  selector: 'fox-member-enrollment-info-insurance-old-version',
  templateUrl: './info-insurance-v1.component.html',
  styleUrls: ['./info-insurance-v1.component.css']
})
export class InfoInsuranceV1Component implements OnInit, AfterViewInit, OnDestroy {
  @Input() membershipNumber: string = '';
  memberProfile: AccountMembershipResponseVO = new AccountMembershipResponseVO();
  mProfileSubscription: Subscription = new Subscription();

  insuranceDataSource = new MatTableDataSource();
  displayedInsuranceColumns = ['planCode', 'planName', 'status', 'effectiveDate', 'termDate', 'termReason', 'premPaidThrough', 'grsAccount'];

  @ViewChild(MatSort) sort?: MatSort;

  constructor(private memberInformationService: MemberInformationService) {}

  ngOnInit(): void {
    this.mProfileSubscription = this.memberInformationService.memberProfileChanges$.subscribe(
      mProfile => {
        this.memberProfile = mProfile;
        this.insuranceProcessData();
      }
    );
    this.insuranceProcessData();
  }

  ngAfterViewInit(): void {
    this.insuranceDataSource.sort = this.sort ? this.sort : null;
  }

  ngOnDestroy(): void {
    this.mProfileSubscription.unsubscribe();
  }

  insuranceProcessData(): void {
    const insuranceData: InsuredPlanVO[] = [];
    if (this.memberProfile && this.memberProfile.insuredPlan) {
      for (let i = 0; i < this.memberProfile.insuredPlan.length; i++) {
        const insuranceItem = {
          'planCode': this.memberProfile.insuredPlan[i].planCode || '',
          'planName': this.memberProfile.insuredPlan[i].planCategoryDescription || '',
          'status': '',
          'effectiveDate': this.memberProfile.insuredPlan[i].effectiveDate || '',
          'termDate': this.memberProfile.insuredPlan[i].termDate || '',
          'termReason': '',
          'premPaidThrough': '',
          'grsAccount': ''
        };
        if (this.memberProfile.insuredPlan[i].planStatus === 'A') {
          insuranceItem.status = 'Active';
        } else {
          insuranceItem.status = 'Terminated';
        }
        insuranceData.push(insuranceItem);
      }
    }
    this.insuranceDataSource.data = insuranceData;
  }
}
