import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  AccountMembershipResponseVO,
  ClaimsMaterialApi,
  ClaimsMemberApi
} from '@fox/rest-clients';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {MessageBoxService, MessageBoxType} from '@fox/shared';
import {
  AggregateYear,
  AggregateYearSelectionModalComponent
} from '../../../../shared/aggregate-year-selection-modal/aggregate-year-selection-modal.component';
import {EditAggregateValueModalComponent} from '../../../../shared/edit-aggregate-value-modal/edit-aggregate-value-modal.component';
import {EditAggregateService} from '../../../../shared/edit-aggregate.service';
import {MemberInformationService} from '../../../../shared/member-information.service';

@Component({
  selector: 'fox-member-aggregate-by-year',
  templateUrl: './by-year.component.html',
  styleUrls: ['./by-year.component.css']
})
export class ByYearComponent implements OnInit, OnDestroy {
  memberProfile: AccountMembershipResponseVO = new AccountMembershipResponseVO();
  mProfileSubscription: Subscription = new Subscription();
  isFilteredPayeeAggregateMemberPlan: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(AggregateYearSelectionModalComponent) yearSelectionModal?: AggregateYearSelectionModalComponent;
  @ViewChild(EditAggregateValueModalComponent) editAggregateCurrentValueModal?: EditAggregateValueModalComponent;
  @Input() membershipNumber: string = '';
  @Output() tableDataLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _aggregateYears: string[] = [];
  private _aggregateYear: string = '';

  constructor(private ytdApi: ClaimsMemberApi,
              private accountLock: ClaimsMaterialApi,
              private messageBoxService: MessageBoxService,
              private memberInfoSvc: MemberInformationService,
              public editAggregateSrc: EditAggregateService) {}

  setAggregateYears(years: string[]): void {
    this._aggregateYears = years;
  }

  get aggregateYears(): string[] {
    return this._aggregateYears;
  }

  setAggregateYear(year: string): void {
    this._aggregateYear = year;
  }

  get aggregateYear(): string {
    return this._aggregateYear;
  }

  getAggregateNewValuesOnTable(e: any): void {
    if (e) {
      this.editAggregateSrc.getYears(this.memberProfile);
    }
  }

  get hasAggregateMaintAvailable(): boolean {
    return this.memberInfoSvc.hasAggregateMaintAvailable;
  }

  ngOnInit(): void {
    this.mProfileSubscription = this.memberInfoSvc.memberProfileChanges$.subscribe(mp => {
      this.memberProfile = mp;
      this.editAggregateSrc.getYears(this.memberProfile);
    });
  }

  ngOnDestroy(): void {
    this.mProfileSubscription.unsubscribe();

    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getAggregateYears(): void {
    this.editAggregateSrc.getAggregateYears(this.memberProfile)
      .pipe(takeUntil(this.destroy$))
      .subscribe(ys => {
        this.setAggregateYears(ys);
      });
  }

  onPlanSelection(): void {
    if (this.editAggregateSrc.selectedPlan !== 'All Plans') {
      this.isFilteredPayeeAggregateMemberPlan = true;
      let selectedPlan = this.editAggregateSrc.selectedPlan;
      let selectedPlanOne = '';
      let selectedPlanTwo = '';
      if (this.editAggregateSrc.selectedPlan === 'ESP') {
        selectedPlan = '*J';
      } else if (this.editAggregateSrc.selectedPlan === 'Map w/ Drugs') {
        selectedPlan = 'X*';
        selectedPlanOne = 'Y*';
        selectedPlanTwo = 'Z*';
      } else if (this.editAggregateSrc.selectedPlan === 'Med Supp') {
        selectedPlan = 'M*';
      }
      this.editAggregateSrc.findYtdResults = this.editAggregateSrc.totalAggregateResults.filter(
          (ytd) => {
            return (ytd.plan === selectedPlan) || (ytd.plan === selectedPlanOne) || (ytd.plan === selectedPlanTwo);
          });
    } else {
      this.isFilteredPayeeAggregateMemberPlan = false;
      this.editAggregateSrc.findYtdResults = this.editAggregateSrc.totalAggregateResults;
    }
  }

  onYearSelection(): void {
    this.isFilteredPayeeAggregateMemberPlan = false;
    this.editAggregateSrc.getPlanTypes(this.memberProfile, this.editAggregateSrc.selectedYear);
    this.editAggregateSrc.resultTable(this.memberProfile);
  }

  openYearSelectionModal(e: any): void {
    if (e && this.yearSelectionModal) {
      this.getAggregateYears();
      this.yearSelectionModal.openModal();
    } else {
      this.getAggregateYears();
      this.lockAccount();
    }
  }

  selectedAggregateYear(value: AggregateYear): void {
    if (value.openEditAggregateModal && this.editAggregateCurrentValueModal) {
      this.setAggregateYear(value.year);
      this.editAggregateCurrentValueModal.openModal();
    }
  }

  lockAccount(): void {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.householdId && this.memberProfile.memberDetails.householdId.length > 0) {
      const membershipNumber = (this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + this.memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + this.memberProfile.memberDetails.householdId[0].insuredCode);
      this.accountLock.lockAccount(membershipNumber, uuid()).subscribe(res => {
        if (res.lockStatus === 'LOCKED' && this.yearSelectionModal) {
          this.editAggregateSrc.setMemberOnSessionStorage(membershipNumber);
          this.getAggregateYears();
          this.yearSelectionModal.openModal();
        }
      }, err => {
        if (err.status === 400) {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Member is currently locked and maintenance cannot be performed.');
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'The account has not been locked. Please close out and try again.');
        }
      });
    }
  }
}
