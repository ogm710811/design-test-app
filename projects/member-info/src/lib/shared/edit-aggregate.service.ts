import {MessageBoxService} from '@fox/shared';
import {Injectable} from '@angular/core';
import {
  AccountLockVO,
  AccountMembershipResponseVO,
  AggregatesResponse,
  AggregateVO,
  ClaimsMaterialApi,
  ClaimsMemberApi,
  PayeeAggregatesVO
} from '@fox/rest-clients';
import {Observable} from 'rxjs';
import * as uuidConst from 'uuid';
const uuid = uuidConst;

@Injectable({
  providedIn: 'root'
})
export class EditAggregateService {
  planYears: string[] = [];
  selectedYear: string = '';
  planTypes: string[] = [];
  selectedPlan: string = '';
  findYtdResults: AggregateVO[] = [];
  totalAggregateResults: AggregateVO[] = [];
  specPayeeTable: PayeeAggregatesVO[] = [];
  isPayeeAggregateDisplayData: boolean = true;

  constructor(private ytdApi: ClaimsMemberApi,
              private messageBoxService: MessageBoxService,
              private claimsMaterialApi: ClaimsMaterialApi) {}

  getAggregateYears(memberProfile: AccountMembershipResponseVO): Observable<string[]> {
    let membershipNumber: string = '';
    if (memberProfile && memberProfile.memberDetails && memberProfile.memberDetails.aarpMembershipNumber && memberProfile.memberDetails.householdId && memberProfile.memberDetails.householdId.length > 0) {
      membershipNumber = (memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + memberProfile.memberDetails.householdId[0].insuredCode);
    }
    return this.ytdApi.getPlanYears(membershipNumber, uuid());
  }

  getYears(memberProfile: AccountMembershipResponseVO): void {
    if (memberProfile && memberProfile.memberDetails && memberProfile.memberDetails.aarpMembershipNumber && memberProfile.memberDetails.householdId && memberProfile.memberDetails.householdId.length > 0) {
      const membershipNumber = (memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + memberProfile.memberDetails.householdId[0].insuredCode);
      this.ytdApi.getPlanYears(membershipNumber, uuid()).subscribe(resYears => {
        this.planYears = resYears;
        if (this.planYears.length > 1) {
          this.selectedYear = this.planYears[1];
          this.getPlanTypes(memberProfile, this.selectedYear);
          this.resultTable(memberProfile);
        } else {
          this.selectedYear = this.planYears[0];
          this.resultTable(memberProfile);
        }
      });
    }
  }

  getPlanTypes(memberProfile: AccountMembershipResponseVO, year: string): void {
    this.planTypes = ['All Plans'];
    if (memberProfile && memberProfile.memberDetails && memberProfile.memberDetails.aarpMembershipNumber && memberProfile.memberDetails.householdId && memberProfile.memberDetails.householdId.length > 0) {
      const membershipNumber = (memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + memberProfile.memberDetails.householdId[0].insuredCode);
      this.ytdApi.getPlanTypes(membershipNumber, year, uuid()).subscribe(resPlans => {
        const plansToDisplay = resPlans.map(p => {
          if (p === 'MAP') {
            return 'Map w/ Drugs';
          } else if (p === 'MEDSUPP') {
            return 'Med Supp';
          } else {
            return p;
          }
        });
        this.planTypes = this.planTypes.concat(plansToDisplay);
        this.selectedPlan = this.planTypes[0];
      });
    }
  }

  resultTable(memberProfile: AccountMembershipResponseVO): void {
    this.findYtdResults = [];
    this.totalAggregateResults = [];
    this.specPayeeTable = [];
    if (memberProfile && memberProfile.memberDetails && memberProfile.memberDetails.aarpMembershipNumber && memberProfile.memberDetails.householdId && memberProfile.memberDetails.householdId.length > 0) {
      const membershipNumber = (memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + memberProfile.memberDetails.householdId[0].insuredCode);
      this.ytdApi.getMemberAggregates(uuid(), membershipNumber, this.selectedYear).subscribe(res => {
        let response: AggregatesResponse;
        const objArray: any[] = [];
        if (res) {
          this.isPayeeAggregateDisplayData = true;
          response = <AggregatesResponse>res[0];

          if (response.payeeAggregate && this.selectedYear === 'Lifetime') {
            this.getSpecialPayeeAggregate(response);
          }

          if (response.aggregates) {
            const aggregates = response.aggregates;
            // @ts-ignore
            const result = Object.keys(aggregates).map(function (key: number): any {
              let keyElt;
              if (aggregates[key].hasOwnProperty('plan')) {
                keyElt = aggregates[key].plan;
                delete aggregates[key].plan;
              }
              return [keyElt, aggregates[key]];
            }.bind(this));
            for (const i in result) {
              if (result) {
                let oopArray = [];
                if (result[i][1].hasOwnProperty('outOfPocketAggregates')) {
                  oopArray = result[i][1]['outOfPocketAggregates'];
                  oopArray.forEach((elem: any, index: number) => {
                    result[i][1]['outOfPocketAggregates ' + index] = elem;
                  });
                  delete result[i][1]['outOfPocketAggregates'];
                }
              }
            }
            for (const i in result) {
              if (result) {
                const myObj: any = {};
                const objProp = result[i][0];
                myObj[objProp] = Object.entries(result[i][1]).map(([key, value]) => ({key, value}));
                objArray.push(myObj);
              }
            }
            for (const k in objArray) {
              if (objArray) {
                for (const l in objArray[k]) {
                  if (objArray[k]) {
                    for (const m in objArray[k][l]) {
                      if (objArray[k][l]) {
                        const objResult = Object.assign(
                          {
                            plan: String(Object.keys(objArray[k])),
                            field: objArray[k][l][m].key.split(/(?=[A-Z])/).join(' '),
                            currentValue: objArray[k][l][m].value['amount'],
                            effectiveDate: objArray[k][l][m].value['effectiveDate'],
                          });
                        this.findYtdResults.push(objResult);
                      }
                    }
                  }
                }
              }
            }
          }
          this.totalAggregateResults = [...this.findYtdResults];
        }
      }, err => {
        if (err.status === 404) {
          this.isPayeeAggregateDisplayData = false;
        }
      });
    }
  }

  getSpecialPayeeAggregate(aggregateRes: AggregatesResponse): void {
    const payeeAggregates: PayeeAggregatesVO = {
      firstName: '',
      lastName: '',
      memberNumber: '',
      payeeAggregate: aggregateRes.payeeAggregate
    };
    this.specPayeeTable.push(payeeAggregates);
  }

  lockAccount(memberProfile: AccountMembershipResponseVO): { lockAccountResult: Observable<AccountLockVO>, membershipNumber: string } {
    let membershipNumber: string = '';
    if (memberProfile && memberProfile.memberDetails && memberProfile.memberDetails.aarpMembershipNumber && memberProfile.memberDetails.householdId && memberProfile.memberDetails.householdId.length > 0) {
      membershipNumber = (memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + memberProfile.memberDetails.householdId[0].insuredCode);
    }
    const lockAccountResult = this.claimsMaterialApi.lockAccount(membershipNumber, uuid());
    return {lockAccountResult, membershipNumber};
  }

  setMemberOnSessionStorage(membershipNumber: string): void {
    sessionStorage.setItem('memberNumber', membershipNumber);
  }

  removeMemberOnSessionStorage(): void {
    sessionStorage.removeItem('memberNumber');
  }
}
