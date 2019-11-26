import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {LineDetailVO, PotentialDuplicateDetailVO, ResourcesListOfResourceOfLineDetailVO} from '@fox/rest-clients';
import {claimProcessingUrlPrefixClaimDetails, Dfhcommarea, MessageBoxService, TransferSrvService} from '@fox/shared';
import {ProcClmXcpt} from '../../manual-claim-processing/process-claim-exception/model/proc-clm-xcpt.model';
import {Container} from '../../manual-claim-processing/process-claim-hospital-charge/model/container.model';
import {DuplicateClaimCheckComponent} from '../duplicate-claim-check.component';

@Component({
  selector: 'fox-duplicate-processing',
  templateUrl: './duplicate-processing.component.html',
  styleUrls: ['./duplicate-processing.component.css']
})
export class DuplicateProcessingComponent implements OnInit, OnChanges {
  baseUrl: string;
  claimHistoryDetailEndpoint: string;
  hardCodedClaim: string;
  isHosp: boolean = false;
  isProf: boolean = false;
  isDrug: boolean = false;
  check: string[] = [];
  incomingBillLine: LineDetailVO;
  incomingChargeList: string[] = [];
  duplicateBillLines?: PotentialDuplicateDetailVO[] = [];
  billLineNum: number;
  swichToggleIds: SwitchMemory[] = [];
  billLineLength: number;
  billCount: number[] = [];
  chosenBillLineKey: PotentialDuplicateDetailVO[] = [];
  chargeLineType: string;
  dupList: ResourcesListOfResourceOfLineDetailVO;
  uniqueToggles: HTMLInputElement[] = [];
  NO_MARKED_AS_DUPLICATE = 'was not marked as a duplicate';
  screen = new ProcClmXcpt();
  common = new Dfhcommarea();
  container = new Container();
  profTypesOfService = ['B', 'M', 'A', 'E', 'S', 'T', 'X', 'D', 'C', 'F', 'L', 'P', 'G'];
  drugTypesOfService = ['R'];
  hospTypesOfService = ['H', 'W', 'Q'];

  @Input() duplicateClaimCheckComponent: DuplicateClaimCheckComponent;
  @Input() claimHistoryKey: number;
  @Input() claimHistoryStart: number;
  @Output() chosenBillLineKeyEvent = new EventEmitter<DataSelected>();

  get duplicateBillLineFunction(): PotentialDuplicateDetailVO[] | undefined {
    return this.duplicateBillLines;
  }

  constructor(private router: Router,
              protected transferSrv: TransferSrvService,
              private messageBoxService: MessageBoxService) {
  }

  ngOnInit(): void {
    this.baseUrl = '';
    const data = this.transferSrv.getData();
    this.common = data['common'];
    this.claimHistoryDetailEndpoint = this.baseUrl + '/#/claim-processing/claim-details';
    this.hardCodedClaim = this.claimHistoryDetailEndpoint + '/901640292531';
    this.billLineNum = 0;
    this.processResourceList(this.common.dupCheckBillLineResponseVO);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'claimHistoryKey') {
        if (this.claimHistoryKey !== 0) {
          this.incomingChargeList = [];
          this.dupList.chargeLines = [];
        }
        if (this.dupList) {
          this.processResourceList(this.dupList);
        }
      }
    }
  }

  processResourceList(dupCheckList: ResourcesListOfResourceOfLineDetailVO): void {
    if (dupCheckList && dupCheckList.chargeLines && dupCheckList.chargeLines.length > 0) {
      this.billLineLength = dupCheckList.chargeLines.length;
      this.incomingBillLine = dupCheckList.chargeLines[this.billLineNum];
      const indexICList = this.incomingChargeList.indexOf(dupCheckList.chargeLines[this.billLineNum].lineKey as string);
      if (indexICList === -1) {
        this.incomingChargeList.push(dupCheckList.chargeLines[this.billLineNum].lineKey as string);
      }
      if (dupCheckList.chargeLines[this.billLineNum].potentialDuplicateBillLines) {
        this.duplicateBillLines = dupCheckList.chargeLines[this.billLineNum].potentialDuplicateBillLines;
      }
      if (this.profTypesOfService.indexOf(dupCheckList.chargeLines[this.billLineNum].typeOfService.toUpperCase()) > -1) {
        this.isProf = true;
        this.isHosp = false;
        this.isDrug = false;
        this.chargeLineType = 'ProfCharge';
      } else if (this.drugTypesOfService.indexOf(dupCheckList.chargeLines[this.billLineNum].typeOfService.toUpperCase()) > -1) {
        this.isProf = false;
        this.isHosp = false;
        this.isDrug = true;
        this.chargeLineType = 'RxCharge';
      } else if (this.hospTypesOfService.indexOf(dupCheckList.chargeLines[this.billLineNum].typeOfService.toUpperCase()) > -1) {
        this.isProf = false;
        this.isHosp = true;
        this.isDrug = false;
        this.chargeLineType = 'HospCharge';
      }
    }
  }

  uniqueToggle(clickedCheckBox): void {

    if (this.uniqueToggles.indexOf(clickedCheckBox.id) > -1) {
      this.uniqueToggles = [];

      const indexSwitchId = this.swichToggleIds.findIndex(st => st.billNum === this.billLineNum);
      if (indexSwitchId !== -1) {
        this.swichToggleIds.splice(indexSwitchId, 1);
      }

      this.check[this.billLineNum] = '';
      const index = this.chosenBillLineKey.findIndex(chosen => chosen.billLine === (this.billLineNum + 1));
      this.chosenBillLineKey[index].legend = this.NO_MARKED_AS_DUPLICATE;
      this.chosenBillLineKey[index].claimNum = '';

    } else {

      this.swichToggleIds.push({
        billNum: this.billLineNum,
        switchId: clickedCheckBox.id

      });

      this.uniqueToggles = [];
      this.uniqueToggles.push(clickedCheckBox.id);
      this.check[this.billLineNum] = clickedCheckBox.id;
      const billLineNum = clickedCheckBox.id.substring(clickedCheckBox.id.indexOf('_') + 1);

      if (this.duplicateBillLines && this.duplicateBillLines.length > 0) {

        const chosenBillLineKeyIndex = this.chosenBillLineKey.findIndex(cb => cb.billLine === (this.billLineNum + 1));
        this.duplicateBillLines[billLineNum].billLine = this.billLineNum + 1;
        this.duplicateBillLines[billLineNum].legend = 'was marked as a duplicate of';
        const duplicateBillLinesCloned = {...this.duplicateBillLines[billLineNum]};

        if (chosenBillLineKeyIndex === -1) {
          this.chosenBillLineKey.push(duplicateBillLinesCloned);
        } else {
          this.chosenBillLineKey[chosenBillLineKeyIndex] = duplicateBillLinesCloned;
        }
      }
    }
  }

  goToClaimDetail(claimNumber): void {
    this.router.navigate([claimProcessingUrlPrefixClaimDetails, claimNumber]);
  }

  showSummary(): void {

    const chosenBillLineKeyIndex =
      this.chosenBillLineKey.findIndex(chosen => chosen.billLine === (this.billLineNum + 1));
    if (chosenBillLineKeyIndex === -1) {
      const tempDuplicateBillLines: PotentialDuplicateDetailVO = <PotentialDuplicateDetailVO>{};
      tempDuplicateBillLines.billLine = this.billLineNum + 1;
      tempDuplicateBillLines.legend = this.NO_MARKED_AS_DUPLICATE;
      tempDuplicateBillLines.claimNum = '';
      this.chosenBillLineKey.push({...tempDuplicateBillLines});
    }

    if (this.billLineNum < this.billLineLength - 1) {
      this.billLineNum++;
      this.dupList = this.common.dupCheckBillLineResponseVO;
      this.processResourceList(this.dupList);
      this.uniqueToggles = [];
      const indexSwitchId = this.swichToggleIds.findIndex(st => st.billNum === this.billLineNum);
      if (indexSwitchId !== -1) {
        this.uniqueToggles.length = 0;
        this.uniqueToggles.push(this.swichToggleIds[indexSwitchId].switchId);
      }
    } else {
      if (this.billCount.length === 0) {
        for (let i = 0; i < this.billLineLength; i++) {
          this.billCount.push(i);
        }
      }

      this.chosenBillLineKeyEvent.emit({
        chosenBills: this.chosenBillLineKey,
        incomingClaim: this.incomingBillLine,
        incomingBilline: this.incomingChargeList
      });
    }
  }

  previousButton(): void {
    if (this.billLineNum !== 0) {

      this.billLineNum--;
      this.dupList = this.common.dupCheckBillLineResponseVO;
      const indexSwitchId = this.swichToggleIds.findIndex(st => st.billNum === this.billLineNum);

      if (indexSwitchId !== -1 && this.billLineNum === this.swichToggleIds[indexSwitchId].billNum) {
        this.uniqueToggles.length = 0;
        this.uniqueToggles.push(this.swichToggleIds[indexSwitchId].switchId);
      }

      this.processResourceList(this.dupList);
    }
  }
}

interface SwitchMemory {
  billNum: number;
  switchId: HTMLInputElement;
}

interface DataSelected {
  chosenBills: PotentialDuplicateDetailVO[];
  incomingClaim: LineDetailVO;
  incomingBilline: string[];
}
