import {
  CancelConfirmModal,
  Data,
  FeatureFlagService,
  MessageBoxService,
  MessageBoxType,
  ModalComponent
} from '@fox/shared';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {NgForm} from '@angular/forms';
import {
  AccountMembershipResponseVO,
  AggregatesResponse,
  AggregatesUpdateItemVO,
  AggregatesUpdateVO,
  AggregateVO,
  ClaimsMaterialApi,
  ClaimsMemberApi,
  EligibilityUiApi,
  PlanSpecificAggregatesVO,
  PlanVO
} from '@fox/rest-clients';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {EditAggregateService} from '../edit-aggregate.service';
import {MemberInformationService} from '../member-information.service';

@Component({
  selector: 'fox-edit-aggregate-value-modal',
  templateUrl: './edit-aggregate-value-modal.component.html',
  styleUrls: ['./edit-aggregate-value-modal.component.css']
})
export class EditAggregateValueModalComponent extends CancelConfirmModal<void> implements OnChanges, OnDestroy {
  aggregateDataSource: AggregateVO[] = [];
  totalAggregateDataSource: AggregateVO[] = [];
  aggregateChanges: AggregatesUpdateVO = {
    planYear: '',
    payeeAggregate: {},
    planSpecificAggregates: []
  };
  specialAggregateDataSource: AggregatesUpdateItemVO[] = [];
  updatedYtdResults: PlanSpecificAggregatesVO[] = [];
  payeeAggregateChange: AggregatesUpdateItemVO = new AggregatesUpdateItemVO();
  hasPayeeAggregateValueUpdate: boolean = false;
  hasAggregateValueUpdate: boolean = false;
  validationPattern = '[0-9]+(\.[0-9][0-9]?)?';
  column = 'Plan';
  direction = -1;
  isDesc = false;
  changeYearClicked: boolean = false;
  multiSelectPlanDataSource: Data[] = [];
  selectedPlans: Data[] = [];
  multiSelectPlanSettings = {
    closeOnSelect: false,
    placeholder: 'Select one or more plans...',
    hideSelected: false,
    hasAllSelectCheckbox: false
  };
  isFilteredPayeeAggregateMemberPlan: boolean = false;
  hasFilteredPlan: boolean = false;
  effectivePlans: string[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  resetFormTimeOut: number = 0;

  @ViewChild('modal') modal?: ModalComponent<void>;
  @ViewChild('form') form?: NgForm;
  @ViewChildren('payeeAggregateNewValueInput') payeeAggregateNewValueInput?: QueryList<ElementRef>;
  @ViewChildren('aggregateNewValueInput') aggregateNewValueInput?: QueryList<ElementRef>;
  @Output() openYrSelectionModal = new EventEmitter<boolean>(false);
  @Output() updateAggregateTable = new EventEmitter<boolean>(false);

  private _emptyInputField: boolean = true;
  private _positiveDifferenceValue: boolean = false;

  private _aggregateYear: string = '';
  @Input()
  set editAggregateYear(value: string) {
    this._aggregateYear = value;
  }

  private _memberProfile: AccountMembershipResponseVO = new AccountMembershipResponseVO();
  @Input()
  set memberProfile(value: AccountMembershipResponseVO) {
    this._memberProfile = value;
  }

  get editAggregateYear(): string {
    return this._aggregateYear;
  }

  get memberProfile(): AccountMembershipResponseVO {
    return this._memberProfile;
  }

  get emptyInputField(): boolean {
    return this._emptyInputField;
  }

  get positiveDifferenceValue(): boolean {
    return this._positiveDifferenceValue;
  }

  get toggleEligibilityFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F4015');
  }

  constructor(
    private ytdApi: ClaimsMemberApi,
    private accountLock: ClaimsMaterialApi,
    private messageBoxService: MessageBoxService,
    private memberSrv: MemberInformationService,
    private eligibilityApi: EligibilityUiApi,
    private editAggregateService: EditAggregateService,
    private featureFlagSvc: FeatureFlagService
  ) {
    super();
  }

  setEmptyInputField(v: boolean): void {
    this._emptyInputField = v;
  }

  setPositiveDifferenceValue(v: boolean): void {
    this._positiveDifferenceValue = v;
  }

  getIndexAsString(idx: any): string {
    return idx.toString();
  }

  getContainerDiffValueClass(item: AggregatesUpdateItemVO | AggregateVO): string {
    const nValue: number = item.newValue ? +item.newValue : 0;
    const cValue: number = item.oldValue ? +item.oldValue : 0;
    if (nValue && +nValue - cValue < 0) {
      this.setPositiveDifferenceValue(false);
      return 'container-diff-value-negative';
    } else if (nValue && +nValue - cValue > 0) {
      this.setPositiveDifferenceValue(true);
      return 'container-diff-value-positive';
    } else {
      this.setPositiveDifferenceValue(false);
      return 'container-diff-value-null';
    }
  }

  getContainerDiff(item: AggregatesUpdateItemVO | AggregateVO): number {
    const nValue: number = item.newValue ? +item.newValue : 0;
    const cValue: number = item.oldValue ? +item.oldValue : 0;
    return nValue - cValue;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editAggregateYear) {
      this.selectedPlans = [];
      this.multiSelectPlanDataSource = [];
      this.hasPayeeAggregateValueUpdate = false;
      this.isFilteredPayeeAggregateMemberPlan = false;
      this.getModalMemberAggregatesData();
      setTimeout(() => {
        this.appInit();
      }, 3000);
    }
  }

  appInit(): void {
    if (this.toggleEligibilityFeature) {
      this.getCompasEligibility();
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.resetFormTimeOut);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onMultiSelectPlan(items: Data[]): void {
    this.setEmptyInputField(true);
    this.selectedPlans = items;
    const plans = this.selectedPlans.map(po => {
      return po.name;
    });
    for (let i = 0; i < plans.length; i++) {
      if (plans[i] === 'Med Supp') {
        plans.splice(i, 1, 'MEDSUPP');
      } else if (plans[i] === 'Map w/ Drugs') {
        plans.splice(i, 1, 'MAP');
      }
    }
    this.getModalMemberAggregatesData(plans);
    this.isFilteredPayeeAggregateMemberPlan = !!(this.editAggregateYear === 'Lifetime' && this.selectedPlans.length > 0 && !plans.includes('Member'));
  }

  getCompasEligibility(): void {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.householdId && this.memberProfile.memberDetails.householdId.length > 0) {
      const membershipNumber = (this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + this.memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + this.memberProfile.memberDetails.householdId[0].insuredCode);
      this.eligibilityApi.getCompasEligibility(membershipNumber, uuid(), 'memberId')
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          let effectiveDate;
          let terminationDate;
          if (res.plans) {
            const effectivePlans: string[] = [];
            const planVOS: PlanVO[] = res.plans;
            if (this.editAggregateYear !== 'Lifetime') {
              planVOS.forEach(p => {
                if (p.effectiveDate && p.termDate) {
                  effectiveDate = p.effectiveDate.substring(0, 4);
                  terminationDate = p.termDate.substring(0, 4);
                  if ( (Number(effectiveDate) <= Number(this.editAggregateYear)) && (Number(this.editAggregateYear) <= Number(terminationDate)) ) {
                    if (p.planCode) {
                      effectivePlans.push(p.planCode);
                    }
                  }
                }
              });
              if (effectivePlans) {
                this.getUniqueEffectivePlans(effectivePlans as string[]);
              }
            } else {
              const effectPlans = planVOS.map(p => {
                return p.planCode;
              });
              if (effectPlans) {
                this.getUniqueEffectivePlans(effectPlans as string[]);
              }
            }
          }
        }, err => {});
    }
  }

  getUniqueEffectivePlans(plans: string[]): void {
    let uniqueEffectivePlans;
    uniqueEffectivePlans = plans.filter((p, i) => plans.indexOf(p) === i)
                                .map(e => e.trim());
    if (uniqueEffectivePlans) {
      this.effectivePlans = uniqueEffectivePlans as string[];
    }
  }

  getModalMemberAggregatesData(planTypes?: string[]): void {
    this.aggregateDataSource = [];
    this.totalAggregateDataSource = [];
    this.specialAggregateDataSource = [];
    if (this.editAggregateYear && this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.householdId && this.memberProfile.memberDetails.householdId.length > 0) {
      const membershipNumber = (this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + this.memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + this.memberProfile.memberDetails.householdId[0].insuredCode);
      this.ytdApi.getMemberAggregates(uuid(), membershipNumber, this.editAggregateYear, planTypes)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
        let response: AggregatesResponse;
        const objArray: any[] = [];
        if (res) {
          response = <AggregatesResponse>res[0];

          if (response.payeeAggregate && this.editAggregateYear === 'Lifetime') {
            this.getModalSpecialPayeeAggregateData(response);
          }

          if (response.aggregates) {
            const aggregates = response.aggregates;
            // @ts-ignore
            const result: any = Object.keys(aggregates).map(function (key: number): any {
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
                            oldValue: objArray[k][l][m].value['amount'],
                            newValue: '',
                            difference: '',
                            effectiveDate: objArray[k][l][m].value['effectiveDate'],
                          });
                        this.aggregateDataSource.push(objResult);
                      }
                    }
                  }
                }
              }
            }
          }
          this.totalAggregateDataSource = [...this.aggregateDataSource];
        }
      }, err => {})
          .add(() => {
            this.getPlanTypes(this.memberProfile, this.editAggregateYear);
      });
    }
  }

   getPlanTypes(memberProfile: AccountMembershipResponseVO, year: string): void {
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
        if (this.editAggregateYear === 'Lifetime') {
          plansToDisplay.unshift('Member');
        }
        this.multiSelectPlanDataSource = this.setMultiSelectPlanData(plansToDisplay);
      });
    }
  }

  setMultiSelectPlanData(planTypes: string[]): Data[] {
    return  planTypes.map((p, i) => {
      const plan: Data = {id: '', name: ''};
      plan.id = i.toString();
      plan.name = p;
      return plan;
    });
  }

  modalVisibleChange(e: any): void {
    if (this.selectedPlans.length > 0 && !e) {
      this.clearSelectDropdown();
    }

    if (this.changeYearClicked && !e) {
      this.changeYearClicked = false;
    } else if (!e) {
      this.unlockAccount();
    }
    this.setEmptyInputField(true);
  }

  getModalSpecialPayeeAggregateData(aggregateRes: AggregatesResponse): void {
    this.aggregateDataSource = [];
    this.specialAggregateDataSource = [];
    this.payeeAggregateChange = {
      difference: '',
      oldValue: aggregateRes.payeeAggregate,
      newValue: ''
    };
    this.specialAggregateDataSource.push(this.payeeAggregateChange);
  }

  onSort(col: string): void {
    this.column = col;
    this.isDesc = !this.isDesc;
    this.direction = this.isDesc ? 1 : -1;
  }

  openYearSelectionModal(): void {
    this.openYrSelectionModal.emit(true);
    this.changeYearClicked = true;
    this.setEmptyInputField(true);
    if (this.modal) {
      this.modal.closeModal('cancel');
    }
    this.resetFormTimeOut = window.setTimeout(() => {
      if (this.form) {
        this.form.resetForm();
      }
    }, 3000);

  }

  cancelForm(): void {
    if (this.form) {
      this.form.reset();
    }
    if (this.modal) {
      this.modal.closeModal();
    }
    this.setEmptyInputField(true);
  }

  clearSelectDropdown(): void {
    this.multiSelectPlanDataSource = [];
    this.isFilteredPayeeAggregateMemberPlan = false;
    this.hasPayeeAggregateValueUpdate = false;
    this.hasAggregateValueUpdate = false;
    this.getModalMemberAggregatesData();
  }

  inputValueChange(): void {
    let payeeAggregateValueCount = 0;
    let aggregateValueCount = 0;
    if (this.payeeAggregateNewValueInput) {
      this.payeeAggregateNewValueInput.forEach((elem: ElementRef<any>) => {
        // @ts-ignore
        if (elem['value']) {
          payeeAggregateValueCount++;
        }
      });
    }
    if (this.aggregateNewValueInput) {
      this.aggregateNewValueInput.forEach((elem: ElementRef<any>) => {
        // @ts-ignore
        if (elem['value']) {
          aggregateValueCount++;
        }
      });
    }

    if (payeeAggregateValueCount > 0 && aggregateValueCount === 0) {
      this.setEmptyInputField(false);
    } else if (payeeAggregateValueCount === 0 && aggregateValueCount === 0) {
      this.setEmptyInputField(true);
    } else if (payeeAggregateValueCount === 0 && aggregateValueCount > 0) {
      this.setEmptyInputField(false);
    } else {
      this.setEmptyInputField(false);
    }
  }

  onSubmit(values: any): void {
    const aggregates: string[] = [];
    const rexAggregate = new RegExp('aggregate\\s\\d+');
    const rexSpecialAggregate = new RegExp('payeeAggregate\\s\\d+');

    // search inside values to look for payeeAggregates
    for (const i in values) {
      if (values.hasOwnProperty(i)) {
        if (rexSpecialAggregate.test(i)) {
          if (values[i] && values[i] !== '') {
            this.hasPayeeAggregateValueUpdate = true;
            this.payeeAggregateChange.newValue = values[i];
            let difference = (Number(this.payeeAggregateChange.newValue) - Number(this.payeeAggregateChange.oldValue)).toFixed(2);
            difference = this.transformDifferenceValue(difference);
            this.payeeAggregateChange.difference = difference;
          }
          delete values['payeeAggregate 0'];
        }
      }
    }

    const valuesOfValues = Object.values(values);
    for (let i = 0; i < valuesOfValues.length; i++) {
      aggregates.push(valuesOfValues[i] as string);
    }

    if (aggregates.length > 0) {
      // format array values that didn't change to be empty string
      for (let i = 0; i < aggregates.length; i++) {
        if (aggregates[i] === null || aggregates[i] === '') {
          aggregates[i] = '';
        }
        if (aggregates[i]) {
          this.hasAggregateValueUpdate = true;
        }
      }
      if (this.hasAggregateValueUpdate) {
        this.setAggregatesNewValues(aggregates);
      }
    }

    if (!this.hasAggregateValueUpdate && this.hasPayeeAggregateValueUpdate) {
      delete this.aggregateChanges.planSpecificAggregates;
      this.aggregateChanges.planYear = this.editAggregateYear;
      this.aggregateChanges.payeeAggregate = this.payeeAggregateChange;
      this.updateMemberAggregates();
    } else if (this.hasAggregateValueUpdate && !this.hasPayeeAggregateValueUpdate) {
      delete this.aggregateChanges.payeeAggregate;
      this.aggregateChanges.planYear = this.editAggregateYear;
      this.aggregateChanges.planSpecificAggregates = this.createPlanSpecificAggregatesArray(this.updatedYtdResults);
      this.updateMemberAggregates();
    } else if (this.hasAggregateValueUpdate && this.hasPayeeAggregateValueUpdate) {
      this.aggregateChanges.planYear = this.editAggregateYear;
      this.aggregateChanges.planSpecificAggregates = this.createPlanSpecificAggregatesArray(this.updatedYtdResults);
      this.aggregateChanges.payeeAggregate = this.payeeAggregateChange;
      this.updateMemberAggregates();
    }
    if (this.modal) {
      this.modal.closeModal();
      this.setEmptyInputField(true);
      this.modal.closeModal();
    }

  }

  setAggregatesNewValues(values: any[]): void {
    const dataSource = this.aggregateDataSource;

    dataSource.forEach((elem, i) => {
      if (elem && elem['oldValue'] !== undefined && values[i] !== '') {
        elem['newValue'] = (values[i]);
        let difference = (Number(values[i]) - Number(elem['oldValue'])).toFixed(2);
        difference = this.transformDifferenceValue(difference);
        elem['difference'] = difference.toString();
      } else {
        elem['newValue'] = '';
      }
    });
    this.updateAggregatePlanWithNewValue(dataSource);
  }

  updateAggregatePlanWithNewValue(updateResults: AggregateVO[]): void {
    this.updatedYtdResults = [];
    if (updateResults) {
      updateResults.map(elem => {
        if (elem.field) {
          elem.field = elem.field.replace(/ +/g, '');
        }
      });
      for (const i in updateResults) {
        if (updateResults[i].newValue) {
          const updateResultsItem = updateResults[i];
          if (this.updatedYtdResults.length <= 0) {
            const objectMapping = this.createAggregateObjectMapping(updateResultsItem);
            this.updatedYtdResults.push(objectMapping);
          } else {
            for (let j = 0; j < this.updatedYtdResults.length; j++) {
              if (this.updatedYtdResults[j].plan === updateResultsItem.plan) {
                if (updateResultsItem.field) {
                  // @ts-ignore
                  this.updatedYtdResults[j][updateResultsItem.field] = {
                    difference: updateResultsItem.difference,
                    newValue: updateResultsItem.newValue,
                    oldValue: updateResultsItem.oldValue,
                    effectiveDate: updateResultsItem.effectiveDate
                  };
                }
              } else {
                const updatedYtdResultsFilter = this.updatedYtdResults.filter(v => v.plan === updateResultsItem.plan);
                if (updatedYtdResultsFilter.length <= 0) {
                  const objectMapping = this.createAggregateObjectMapping(updateResultsItem);
                  this.updatedYtdResults.push(objectMapping);
                }
              }
            }
          }
        }
      }
    }
  }

  createAggregateObjectMapping(updateResultsItem: AggregateVO): PlanSpecificAggregatesVO {
    const objectMapping = {
      plan: updateResultsItem.plan
    };
    if (updateResultsItem.field) {
      // @ts-ignore
      objectMapping[updateResultsItem.field] = {
        difference: updateResultsItem.difference,
        newValue: updateResultsItem.newValue,
        oldValue: updateResultsItem.oldValue,
        effectiveDate: updateResultsItem.effectiveDate
      };
    }
    return objectMapping;
  }

  transformDifferenceValue(value: any): any {
    if (!value || value.toString() === '0') {
      return value;
    } else {
      if (value && value % 1 === 0) {
        const valueToStr: string = value.toString();
        const valueToStrLength = valueToStr.length;
        const lastChart = valueToStr.charAt(valueToStrLength - 1);
        const secondLastChart = valueToStr.charAt(valueToStrLength - 2);

        if (valueToStr.includes('.')) {
          if (secondLastChart === '0' && lastChart === '0' || secondLastChart === '.' && lastChart === '0') {
            const wholeEndZero = this.transformNumber(value, 0);
            if (wholeEndZero) {
              return wholeEndZero.toString().replace(/,/g, '');
            }
          }
        } else {
          return value.toString().replace(/,/g, '');
        }
      } else {
        const decimalToStr: string = value.toString();
        const decimalToStrLength = decimalToStr.length;
        const lastChart = decimalToStr.charAt(decimalToStrLength - 1);
        const secondLastChart = decimalToStr.charAt(decimalToStrLength - 2);

        if (decimalToStr.includes('.') && lastChart === '0' && secondLastChart !== '0') {
          const decimalEndZero = this.transformNumber(value, 1);
          if (decimalEndZero) {
            return decimalEndZero.toString().replace(/,/g, '');
          }
        } else if (decimalToStr.includes('.') && lastChart !== '0' && secondLastChart === '.') {
          const decimal = this.transformNumber(value, 1);
          if (decimal) {
            return decimal.toString().replace(/,/g, '');
          }
        } else if (decimalToStr.includes('.') && lastChart !== '0' && secondLastChart !== '0') {
          const decimal = this.transformNumber(value, 2);
          if (decimal) {
            return decimal.toString().replace(/,/g, '');
          }
        } else {
          const decimal = this.transformNumber(value, 2);
          if (decimal) {
            return decimal.toString().replace(/,/g, '');
          }
        }
      }
    }
  }

  transformNumber(value: string, decimals: number): any {
    return parseFloat(value).toFixed(decimals);
  }

  updateMemberAggregates(): void {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.householdId && this.memberProfile.memberDetails.householdId.length > 0) {
      const membershipNumber = (this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + this.memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + this.memberProfile.memberDetails.householdId[0].insuredCode);
      this.ytdApi.updateMemberAggregates(uuid(), membershipNumber, this.aggregateChanges)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
        if (res) {
          this.messageBoxService.addMessageBox('Success', MessageBoxType.SUCCESS, 'Aggregate Maintenance updates have been submitted successfully.', 3000);
          if (this.hasPayeeAggregateValueUpdate || this.hasAggregateValueUpdate) {
            this.getModalMemberAggregatesData();
            this.hasPayeeAggregateValueUpdate = false;
            this.hasAggregateValueUpdate = false;
          }
          this.hasFilteredPlan = false;
          this.updateAggregateTable.emit(true);
        }
      }, err => {
        this.hasFilteredPlan = false;
        if (err.status === 412) {
          this.memberSrv.hasAggregateMaintAvailable = false;
          const headersRes = err.headers.get('reasoncode');
          this.memberSrv.displayErrorMessage(headersRes);
        } else if (err.status === 403) {
          this.messageBoxService.addMessageBox('Request Submitted', MessageBoxType.ERROR, 'Authorization is required for Aggregate maintenance. Your request has been submitted.');
          this.updateAggregateTable.emit(false);
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'There was an error submitting the aggregate maintenance request. Please try again.');
          this.updateAggregateTable.emit(false);
        }
      });
    }
  }

  createPlanSpecificAggregatesArray(planSpecificAggregates: PlanSpecificAggregatesVO[]): PlanSpecificAggregatesVO[] {
    const arrayDeepCopy: PlanSpecificAggregatesVO[] = planSpecificAggregates.map(elem => Object.assign({}, elem));
    if (arrayDeepCopy) {
      arrayDeepCopy.forEach((specificAggregate, index) => {
        arrayDeepCopy[index] = this.createPlanSpecificAggregatesObjectResult(specificAggregate);
      });
    }
    return arrayDeepCopy;
  }

  createPlanSpecificAggregatesObjectResult(planSpecificAggregates: PlanSpecificAggregatesVO): PlanSpecificAggregatesVO {
    const objResult: PlanSpecificAggregatesVO = {};
    const outOfPocketAggregates: AggregatesUpdateItemVO[] = [];
    const objectEntries = Object.entries(planSpecificAggregates);

    objectEntries.forEach(kv => {
      if (kv[0].includes('outOfPocketAggregates')) {
        outOfPocketAggregates.push(kv[1]);
        objResult.outOfPocketAggregates = outOfPocketAggregates;
      } else {
        // @ts-ignore
        objResult[kv[0]] = kv[1];
      }
    });
    return objResult;
  }

  unlockAccount(): void {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.householdId && this.memberProfile.memberDetails.householdId.length > 0) {
      const membershipNumber = (this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + this.memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + this.memberProfile.memberDetails.householdId[0].insuredCode);
      this.accountLock.unlockAccount(membershipNumber, uuid())
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          this.editAggregateService.removeMemberOnSessionStorage();
          this.messageBoxService.addMessageBox('Success', MessageBoxType.SUCCESS, 'Member was unlocked.', 3000);
        }, err => {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'The account has not been unlocked.');
        });
    }
  }
}
