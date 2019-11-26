import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {MemberInfoCard} from './models/member-info.model';
import {TableColumn, TableColumnKind} from '../table/table-column';
import {memberInformationUrlPrefixMemberProfile} from '../constants/member-information.constants';

@Component({
  selector: 'fox-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent {
  @Input() memberInfo?: MemberInfoCard;
  tableColumnCurrentSortKey: string = 'planCode';
  tableColumnCurrentSortDirection: number = 1;
  // Stop user from clicking the link multiple times in one session
  memberNumberLinkClicked: boolean = false;

  cols: TableColumn[] = [
    {
      kind: TableColumnKind.Text,
      key: 'planCode',
      headerText: 'Plan',
      dropDownOptions: [],
      sortKey: 'planCode'
    },
    {
      kind: TableColumnKind.Text,
      key: 'dates',
      headerText: 'Dates',
      dropDownOptions: [],
      sortKey: 'dates'
    },
    {
      kind: TableColumnKind.Text,
      key: 'reasonCode',
      headerText: 'Reason',
      dropDownOptions: [],
      sortKey: 'reasonCode'
    }
  ];

  constructor(private router: Router) {
  }

  columnChanged(event: any): void {
    this.tableColumnCurrentSortKey = event;
  }

  directionChanged(event: any): void {
    this.tableColumnCurrentSortDirection = event;
  }

  async getMemberProfile(): Promise<void> {
    if (this.memberNumberLinkClicked) {
      return;
    }
    let url = '';
    let memberNum = '';
    if (this.memberInfo && this.memberInfo.memberNumber) {
      memberNum = this.memberInfo.memberNumber.replace(/\s/g, '');
    }
    if (memberNum && memberNum !== '') {
      this.memberNumberLinkClicked = true;
      url = `/#/${memberInformationUrlPrefixMemberProfile}${memberNum}`;
      const result = await this.router.navigate([]).then(res => {
        window.open(url, '_blank');
      });
      this.memberNumberLinkClicked = false;
    }
  }

}
