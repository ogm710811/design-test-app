import {
  claimProcessingRoutePathClaimEligibility,
  claimProcessingRoutePathRoot,
  MessageBoxService,
  MessageBoxType
} from '@fox/shared';
import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {ManualClaimService} from '../manual-claim-service.service';

@Component({
  selector: 'fox-manual-claim-receipt',
  templateUrl: './manual-claim-receipt.component.html',
  styleUrls: ['./manual-claim-receipt.component.css']
})
export class ManualClaimReceiptComponent implements OnInit {

  memberName: string;
  memberNumber: string;
  aClaimNumber: string;
  aDcn: string | undefined;
  dosFrom: string;
  dosTo: string | undefined;

  isClaimNumberCopied: boolean = false;
  isDcnCopied: boolean = false;
  innerWidth: number;

  constructor(private activatedRoute: ActivatedRoute,
              private messageBoxService: MessageBoxService,
              private manualClaimService: ManualClaimService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.memberName = this.manualClaimService.data.firstName + ' ' + this.manualClaimService.data.lastName;
    this.memberNumber = this.manualClaimService.data.memberNumber;
    this.aClaimNumber = this.manualClaimService.data.claimNumber;
    this.aDcn = this.manualClaimService.data.dcn;
    this.dosFrom = moment(this.manualClaimService.data.serviceDate, 'YYYY-MM-DD').format('MM/DD/YYYY');
    this.dosTo = this.manualClaimService.data.serviceEndDate ? moment(this.manualClaimService.data.serviceEndDate, 'YYYY-MM-DD').format('MM/DD/YYYY') : undefined;

    if (this.aDcn) {
      this.messageBoxService.addMessageBox('Claim # Created and Document Uploaded', MessageBoxType.SUCCESS, 'This claim may now be processed in FOX', 10000);
    } else {
      this.messageBoxService.addMessageBox('Claim # Created', MessageBoxType.SUCCESS, 'This claim may now be processed in FOX', 10000);
    }
    window.scroll(0, 0);
  }

  clearCopied(): void {
    this.isClaimNumberCopied = false;
    this.isDcnCopied = false;
  }

  dcnCopied(): void {
    this.isDcnCopied = true;
    setTimeout(() => {
      this.isDcnCopied = false;
    }, 3000);
  }

  claimNumberCopied(): void {
    this.isClaimNumberCopied = true;
    setTimeout(() => {
      this.isClaimNumberCopied = false;
    }, 3000);
  }

  proceedToEligibility(): void {
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimEligibility]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.innerWidth = window.innerWidth;
  }

}
