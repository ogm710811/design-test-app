import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceOfCheckVO} from '@fox/rest-clients';
import {TableRowComponent} from '@fox/shared';
import {CheckRecoveryService} from '../../shared/check-recovery.service';

@Component({
  selector: 'fox-check-detail-sub-section',
  templateUrl: './check-detail-sub-section.component.html',
  styleUrls: ['./check-detail-sub-section.component.css']
})
export class CheckDetailSubSectionComponent implements OnInit, TableRowComponent {

  @Input() data: any;
  @Output() checkDetailsChange: EventEmitter<ResourceOfCheckVO> = new EventEmitter<ResourceOfCheckVO>();

  checkDetails?: ResourceOfCheckVO;
  replaceSuccessMsg: boolean = false;
  voidSuccessMsg: boolean = false;
  denySuccessMsg: boolean = false;
  authorizeSuccessMsg: boolean = false;
  errorMsg: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private checkSvc: CheckRecoveryService) {
  }

  ngOnInit(): void {
    if (this.data && this.data.checkId) {
      this.init(this.data.checkId);
    }
  }

  init(checkId: number): void {
    if (checkId) {
      this.checkSvc.getCheckDetail(checkId).subscribe(res => {
        if (res) {
          this.checkDetails = res;
          const zeroField = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          if (this.checkDetails.accountNumber) {
            const numberLength = this.checkDetails.accountNumber.toString().length;
            zeroField.splice(0, numberLength);
            this.checkDetails.accountNumber = zeroField.join('') + this.checkDetails.accountNumber;
          }
          if (this.checkDetails.tin === 0) {
            this.checkDetails.tin = undefined;
          }
          if (this.checkDetails.npi === 0) {
            this.checkDetails.npi = undefined;
          }
          this.checkDetailsChange.emit(this.checkDetails);
        }
      });
    }
  }
}
