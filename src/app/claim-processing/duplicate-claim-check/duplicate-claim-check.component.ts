import {Component, OnInit} from '@angular/core';
import {LineDetailVO, PotentialDuplicateDetailVO} from '@fox/rest-clients';
import {Dfhcommarea, TransferSrvService} from '@fox/shared';
import {Container} from '../manual-claim-processing/process-claim-exception/model/container.model';
import {ProcClmXcpt} from '../manual-claim-processing/process-claim-exception/model/proc-clm-xcpt.model';

@Component({
  selector: 'fox-duplicate-claim-check',
  templateUrl: './duplicate-claim-check.component.html',
  styleUrls: ['./duplicate-claim-check.component.css']
})

export class DuplicateClaimCheckComponent implements OnInit {
  chkeyEvent = 0;
  claimNumber = 111111111111;
  memberNumber = '00000000000';
  summarySwitch: boolean = false;
  chosenBillLineKey: PotentialDuplicateDetailVO[] = [];
  incomingClaim: LineDetailVO;
  incomingBilline: string[];
  screen = new ProcClmXcpt();
  common = new Dfhcommarea();
  container = new Container();

  constructor(protected transferSrv: TransferSrvService) {
  }

  ngOnInit(): void {
    const container = new Container();
    let data: any = undefined;

    data = this.transferSrv.getData();
    this.common = data['common'];
    this.claimNumber = +this.common.processClaimCommarea.claimNumber.toString().substring(0, 11);
    this.memberNumber = this.common.basicKey.toString();
  }

  showSummary(event): void {
    this.chosenBillLineKey = event.chosenBills;
    this.incomingClaim = event.incomingClaim;
    this.incomingBilline = event.incomingBilline;
    this.summarySwitch = true;
  }

  hideSummary(): void {
    this.summarySwitch = false;
  }

  onChkeyEvent(event: number): void {
    this.chkeyEvent = (event) ? event : this.claimNumber;
  }
}
