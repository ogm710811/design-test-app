import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {Router} from '@angular/router';
import {PagedResourcesofCombinedClaimVO} from '@fox/rest-clients';
import {
  claimProcessingUrlPrefixClaimDetails,
  memberInformationUrlPrefixMemberProfile,
  TableColumnKind
} from '@fox/shared';
import {ScrollTopService} from '../../../../shared/scroll-top.service';
import {CombinedClaimsResultSet} from '../../../claim-history-models/combined-claims-result.model';
import {MemberCardSet} from '../../../claim-history-models/member-card.model';
import CombinedClaimTypeEnum = PagedResourcesofCombinedClaimVO.CombinedClaimTypeEnum;

@Component({
  selector: 'fox-combined-claims-modal',
  templateUrl: './combined-claims-modal.component.html',
  styleUrls: ['./combined-claims-modal.component.css']
})

export class CombinedClaimsModalComponent implements OnChanges {

  @Input() combinedClaimModalVisible: boolean;
  @Input() combinedClaimsResult: CombinedClaimsResultSet[] = [];
  @Input() claimNumber: string;
  @Input() combinedClaimsResultLength: number;
  @Input() combinedClaimType: CombinedClaimTypeEnum;
  @Input() memberDetails: MemberCardSet;
  @Input() billingProvName: string;
  @Input() combinedSendDate: string;
  @Output() combinedClaimModalVisibleChange = new EventEmitter<boolean>();
  @Output() cancelCombinedClaimModal: EventEmitter<'cancel'> = new EventEmitter<'cancel'>();

  headers: string [] = ['Claim #', 'Dates Of Service', 'Amount Paid'];
  columns: any[] = [];
  tableColumnCurrentSortKey: string;
  tableColumnCurrentSortDirection: any;
  isInsured: boolean = false;

  constructor(private router: Router, private scrollTop: ScrollTopService) {
  }

  getMemberProfile(): void {
    if (this.memberDetails && this.memberDetails.memberNumber) {
      this.router.navigate(['../..' + memberInformationUrlPrefixMemberProfile + this.memberDetails.memberNumber]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('combinedClaimsResult' in changes && this.combinedClaimsResult && this.combinedClaimsResult.length) {
      this.buildColumns();
      if (this.combinedClaimType === CombinedClaimTypeEnum.INSURED) {
        this.isInsured = true;
      }
      if (this.combinedClaimType === CombinedClaimTypeEnum.PROVIDER) {
        this.isInsured = false;
      }
    }
  }

  buildColumns(): void {
    this.columns = Object.keys(this.combinedClaimsResult[0]).map((key, idx) => {
      return {
        key: key,
        headerText: this.headers[idx],
        border: false,
        kind: 0 === idx ? TableColumnKind.Link : 2 === idx ? TableColumnKind.Currency : TableColumnKind.Text,
        preImage: 0 === idx ? 'claim-blue.svg' : null,
        sortKey: key
      };
    });
  }

  linkClicked(link): void {
    const linkIdentifier = link && link.col && link.col.key;
    const linkData = link && link.data;
    switch (linkIdentifier) {
      case 'claimNum':
        const url = '..' + claimProcessingUrlPrefixClaimDetails + linkData.claimNum;
        this.router.navigate([url]).then();
        this.cancelCombinedClaimModal.emit('cancel');
        break;
    }
  }
}
