import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {memberInformationUrlPrefixMemberProfile} from '@fox/shared';
import {MemberResultSet} from '../../claim-history-models/member-result.model';

@Component({
  selector: 'fox-member-history-results',
  templateUrl: './member-result-table.component.html',
  styleUrls: ['../../claim-history.component.css']
})

export class MemberResultTableComponent {

  @Input() memberResults: MemberResultSet[] = [];
  @Input() isDesc: boolean = false;
  @Input() column: string = '';

  @Output() isDescChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() columnChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyErr: EventEmitter<string> = new EventEmitter<string>();

  memberValue: string = '';
  memberRecordNumber: string = '';

  get dataKeys(): string[] {
    return Object.keys(this.memberResults[0]);
  }

  constructor(private router: Router) {
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.isDescChange.emit(this.isDesc);

    this.column = property;
    this.columnChange.emit(this.column);
  }

  getClaim(data: string): void {
    this.memberValue = data;
    this.selectEvent.emit(this.memberValue);
  }

  getMemberProfile(membershipNumber): void {
    let url = '';
    if (membershipNumber != null || membershipNumber !== '') {
      url = '../..' + memberInformationUrlPrefixMemberProfile + membershipNumber;
      this.router.navigate([url]);
    }
  }

}
