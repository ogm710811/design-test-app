import {Component, Input, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import * as moment from 'moment-timezone';
import {
  ClaimHistoryApi,
  PagedResourcesOfResourceOfClaimBillLineVO
} from '@fox/rest-clients';
import {
  claimProcessingUrlPrefixClaimDetails,
  TableRowComponent
} from '@fox/shared';
import * as uuid from 'uuid';
import {TooltipDefinitionService} from '../../../shared/tooltip-definition.service';
import {BillLinesResultSet} from '../../claim-history-models/bill-lines-result.model';

@Component({
  selector: 'fox-bill-lines-results',
  templateUrl: './bill-lines-table.component.html',
  styleUrls: ['./bill-lines-table.component.css']
})

export class BillLinesResultTableComponent implements TableRowComponent, OnInit {

  @Input() data: any;

  billLinesResults: BillLinesResultSet[] = [];
  billLinesSize = 5;
  claimValue: number;
  billLinesLength: number;
  billLinesTotal: number;
  billlinesColumns: any[] = [];

  get dataKeys(): string[] {
    return Object.keys(this.billLinesResults[0]);
  }

  constructor(
    private claimHistorySearchApi: ClaimHistoryApi,
    private toolTip: TooltipDefinitionService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.data && this.data.claimNumber) {
      this.getBillLines(this.data.claimNumber);
    }
  }

  getBillLines(claimNumber): void {
    claimNumber = claimNumber || '';
    const res = this.claimHistorySearchApi.listBillLine(claimNumber, uuid(),
      this.billLinesSize, undefined, undefined);

    res.subscribe(billResult => {
      if (billResult && billResult.page) {
        this.processBillLinesResult(billResult);
      }
    }, (e) => {
      if (e.status === 404) {
        this.billLinesResults = [];
      }
    });
  }

  processBillLinesResult(billResult: PagedResourcesOfResourceOfClaimBillLineVO): void {
    if (billResult && billResult._embedded && billResult._embedded.items && billResult.page) {

      this.billLinesResults = [];
      this.billLinesLength = billResult._embedded.items.length;
      this.billLinesTotal = billResult.page.totalElements ? billResult.page.totalElements : 0;

      billResult._embedded.items.forEach(item => {
        const mappedItem: BillLinesResultSet = new BillLinesResultSet();
        mappedItem.billLineNumber = item.billLineNumber ? item.billLineNumber : '';
        mappedItem.planCode = item.planCode ? item.planCode : '';
        mappedItem.typeOfService = item.typeOfService ? item.typeOfService : '';
        mappedItem.billProvider = '';
        mappedItem.dos = '';
        mappedItem.numOfServices = item.numOfServices ? item.numOfServices : '';
        mappedItem.benefitAmount = item.benefitAmount ? item.benefitAmount : '';
        mappedItem.cptCode = item.cptCode ? item.cptCode : '';
        mappedItem.serviceTypeHeader = '';
        mappedItem.serviceTypeDescr = '';

        if (item.billProviderBusName) {
          mappedItem.billProvider = item.billProviderBusName;
        }

        if (item.claimDosFromDate || item.claimDosToDate) {
          mappedItem.dos = (item.claimDosFromDate ? moment.tz(item.claimDosFromDate, 'America/Chicago').format('MM/DD/YYYY') : '') + ' - ' +
            (item.claimDosToDate ? moment.tz(item.claimDosToDate, 'America/Chicago').format('MM/DD/YYYY') : '');
        }

        if (item.typeOfService) {
          const toolTipString = this.toolTip.getToolTipServiceIndDescr(item.typeOfService);
          const toolTipValue = toolTipString.split('|');
          mappedItem.serviceTypeHeader = toolTipValue[0];
          mappedItem.serviceTypeDescr = toolTipValue[1];
        }

        this.billLinesResults.push(mappedItem);

      });

    }
  }

  routeBillLineDetails(claimNum, eobType): void {
    const param: NavigationExtras = {queryParams: {eobType: eobType}};
    const url = '..' + claimProcessingUrlPrefixClaimDetails + claimNum;
    this.router.navigate([url], param).then();
  }

}
