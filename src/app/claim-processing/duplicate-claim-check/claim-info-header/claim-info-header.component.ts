import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment-timezone';
import {
  AccountMembershipResponseVO,
  ClaimHistoryApi,
  MemberApi,
  ResourceOfClaimHistoryDetailVO
} from '@fox/rest-clients';
import * as uuid from 'uuid';
import {Dfhcommarea, MessageBoxService, MessageBoxType} from '@fox/shared';
import {Container} from '../../manual-claim-processing/process-claim-exception/model/container.model';
import {ProcClmXcpt} from '../../manual-claim-processing/process-claim-exception/model/proc-clm-xcpt.model';

@Component({
  selector: 'fox-claim-info-header',
  templateUrl: './claim-info-header.component.html',
  styleUrls: ['./claim-info-header.component.css']
})
export class ClaimInfoHeaderComponent implements OnInit {
  @Input() claimNumber: number;
  @Input() memberNumber = '000000000 0 0';
  @Output() chKeyEvent = new EventEmitter<number>();
  dateOfServiceStart = '00/00/0000';
  dateOfServiceEnd = '00/00/0000';
  totalBilledAmount = '0,000.00';
  effectivePlans = 'Value, Value2, Value3';
  effectiveDate = '00/00/0000, 01/01/0001, 02/02/0003';
  claimType = 'Value';
  memberPrefix = 'Prfx.';
  memberFirstName = 'Firstname';
  memberMiddleName = 'Middlename';
  memberLastName = 'Lastname';
  memberSuffix = 'Sfx.';
  screen = new ProcClmXcpt();
  common = new Dfhcommarea();
  container = new Container();

  constructor(private claimHistorySearchApi: ClaimHistoryApi,
              private memberApi: MemberApi,
              private messageBoxService: MessageBoxService) {
  }

  ngOnInit(): void {
    if (this.claimNumber !== 0) {
      this.getHeaderInfo(this.claimNumber);
    }
  }

  testHeaderInfo(inputEvent): void {
    this.claimNumber = 0;
    this.dateOfServiceStart = '00/00/0000';
    this.dateOfServiceEnd = '00/00/0000';
    this.totalBilledAmount = '0,000.00';
    this.effectivePlans = 'Value, Value2, Value3';
    this.effectiveDate = '00/00/0000, 01/01/0001, 02/02/0002';
    this.claimType = 'Value';
    this.memberPrefix = 'Prfx.';
    this.memberFirstName = 'Firstname';
    this.memberMiddleName = 'Middlename';
    this.memberLastName = 'Lastname';
    this.memberSuffix = 'Sfx.';
    this.memberNumber = '000000000 0 0';
    this.getHeaderInfo(inputEvent.target.value);
    this.claimNumber = (inputEvent.target.value);
  }

  formatDateToCST(originalFormat): string {
    return moment.tz(originalFormat, 'America/Chicago').format('MM/DD/YYYY');
  }

  getHeaderInfo(claimNumber): void {
    // this.callClaimHistory(claimNumber); // need to wait for Rose to decide what she wants for this
    this.callMember();
  }

  callClaimHistory(claimNumber): void {
    try {
      const res = this.claimHistorySearchApi.getClaimHistory(claimNumber, uuid());
      res.subscribe(historyResult => {
        this.processClaimHistoryResult(historyResult);
      }, (e) => {
        if (e.status === 404) {
          this.messageBoxService.addMessageBox('Fail to Call Api', MessageBoxType.ERROR, 'The Call to Claim History Api Failed');
        }
      });
    } catch (err) {
      // header failing should not break the UI, do nothing here.
    }
  }

  callMember(): void {
    const res = this.memberApi.getMemberByMemberNumber(this.memberNumber, uuid());
    res.subscribe(memberResult => {
      this.processMemberResult(memberResult);
    }, (e) => {
      if (e.status === 404) {
        this.messageBoxService.addMessageBox('Fail to Call Api', MessageBoxType.ERROR, 'The Call to Member Api Failed');
      }
    });
  }

  processMemberResult(memberResult: AccountMembershipResponseVO): void {
    if (memberResult.memberDetails) {
      const memberDetails = memberResult.memberDetails;
      if (memberDetails.memberName) {
        const memberName = memberDetails.memberName;

        if (memberName.prefix) {
          this.memberPrefix = memberName.prefix;
        }
        if (memberName.firstName) {
          this.memberFirstName = memberName.firstName;
        }
        if (memberName.middleName) {
          this.memberMiddleName = memberName.middleName;
        }
        if (memberName.lastName) {
          this.memberLastName = memberName.lastName;
        }
        if (memberName.suffix) {
          this.memberSuffix = memberName.suffix;
        }
      }
    }

    if (memberResult.insuredPlan) {
      this.effectivePlans = '';
      this.effectiveDate = '';
      for (const insuredPlan of memberResult.insuredPlan) {
        if (insuredPlan.planStatus && insuredPlan.planStatus === ('A')) {
          if (insuredPlan.effectiveDate) {
            this.effectiveDate += this.formatDate(insuredPlan.effectiveDate) + ', ';
          }
          if (insuredPlan.planCode) {
            this.effectivePlans += insuredPlan.planCode + ', ';
          }
        }
      }
      if (this.effectivePlans && this.effectivePlans.length > 1) {
        this.effectivePlans = this.effectivePlans.slice(0, this.effectivePlans.length - 2);
      }
      if (this.effectiveDate && this.effectiveDate.length > 1) {
        this.effectiveDate = this.effectiveDate.slice(0, this.effectiveDate.length - 2);
      }
    }
  }

  processClaimHistoryResult(historyResult: ResourceOfClaimHistoryDetailVO): void {
    if (historyResult.claimDosFromDate) {
      this.dateOfServiceStart = this.formatDate(historyResult.claimDosFromDate);
    }
    if (historyResult.claimDosToDate) {
      this.dateOfServiceEnd = this.formatDate(historyResult.claimDosToDate);
    }
    if (historyResult.totBilledAmt) {
      this.totalBilledAmount = historyResult.totBilledAmt;
    }
    if (historyResult.claimTypeIndicator) {
      this.claimType = historyResult.claimTypeIndicator;
    }
    if (historyResult.chKey) {
      this.chKeyEvent.emit(historyResult.chKey);
    }
  }

  formatDate(date): string {
    const splitDate = date.split('-');
    const year = splitDate[0];
    const month = splitDate[1];
    const day = splitDate[2];

    return month + '/' + day + '/' + year;
  }
}
