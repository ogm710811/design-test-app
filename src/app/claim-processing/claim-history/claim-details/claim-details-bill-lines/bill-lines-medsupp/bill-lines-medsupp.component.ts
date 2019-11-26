import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ClaimHistoryApi,
  PagedResourcesOfResourceOfClaimHistoryBillLineMessagesVO,
  ResourceOfClaimBillLineDetailsVO,
  ResourceOfClaimHistoryBillLineMessagesVO
} from '@fox/rest-clients';
import * as uuid from 'uuid';
import {TooltipDefinitionService} from '../../../../shared/tooltip-definition.service';

@Component({
  selector: 'fox-bill-lines-medsupp',
  templateUrl: './bill-lines-medsupp.component.html',
  styleUrls: ['../../claim-details.component.css']
})

export class BillLinesMedSuppComponent {

  @Input() billLinesResultSet: ResourceOfClaimBillLineDetailsVO[] = [];
  @Input() isEobType: boolean = false;
  @Input() isDesc: boolean = false;
  @Input() column: string = '';

  @Output() isDescChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() columnChange: EventEmitter<string> = new EventEmitter<string>();

  serviceTypeHeader: string = '';
  serviceTypeDescr: string = '';

  isBillLineDataDisplay: boolean = false;
  billLinesResults: ResourceOfClaimHistoryBillLineMessagesVO[] = [];
  billLineKey: string = '';
  isCollapse: boolean = false;
  isBillLineMsg: boolean = false;
  arrow: string = 'right';
  rowClicked = -1;

  constructor(private claimHistorySearchApi: ClaimHistoryApi, private toolTip: TooltipDefinitionService) {

  }

  getServiceType(data): void {
    const toolTipValue = this.toolTip.getToolTipServiceIndDescr(data).split('|');
    this.serviceTypeHeader = toolTipValue[0];
    this.serviceTypeDescr = toolTipValue[1];
  }

  get dataKeys(): string[] {
    return Object.keys(this.billLinesResultSet[0]);
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.isDescChange.emit(this.isDesc);

    this.column = property;
    this.columnChange.emit(this.column);
  }

  billLineRowClick(data: string, selectedRow: number, collapseFlag: boolean, billMsgFlag: string): void {
    const temp = this.rowClicked;
    this.isCollapse = false;
    this.billLineKey = data;
    this.rowClicked = selectedRow;
    this.isBillLineMsg = (+billMsgFlag > 0);
    console.log(this.isBillLineMsg);
    if (temp === this.rowClicked && !collapseFlag && this.isBillLineMsg) {
      this.isCollapse = true;
    }
    this.isBillLineDataDisplay = false;
    this.billLinesResults = [];
    if (this.isBillLineMsg) {
      this.getBillLinesMsg();
    }
  }

  getBillLinesMsg(): void {
    const res = this.claimHistorySearchApi.getClaimHistoryBillLineMessages(+this.billLineKey, uuid());
    res.subscribe(billResult => {
      if (billResult) {
        console.log(billResult);
        this.processBillLinesResult(billResult);
      }
    }, (e) => {
      if (e.status === 404) {
        this.billLinesResults = [];
      }
    });
  }

  processBillLinesResult(billResult: PagedResourcesOfResourceOfClaimHistoryBillLineMessagesVO): void {
    if (billResult && billResult._embedded && billResult._embedded.items) {
      this.billLinesResults = billResult._embedded.items;
      console.log(this.billLinesResults);
      if (this.billLinesResults.length > 0) {
        this.isBillLineDataDisplay = true;
        this.arrow = (this.arrow === 'right') ? 'bottom' : 'right';
      }
    }
  }

}
