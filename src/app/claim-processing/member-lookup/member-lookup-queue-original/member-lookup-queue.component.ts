import {Component, OnInit} from '@angular/core';
import {ReferencesApi, ReportDetailVO} from '@fox/rest-clients';
import {LoginService, ModalService} from '@fox/shared';
import * as uuid from 'uuid';

@Component({
  selector: 'fox-member-lookup-queue',
  templateUrl: 'member-lookup-queue.component.html',
  styleUrls: ['./member-lookup-btn.css', 'member-lookup-queue.component.css']
})
export class MemberLookupQueueComponent implements OnInit {

  msReports: ReportDetailVO[] | undefined;
  nasReports: ReportDetailVO[] | undefined;

  get reportModalVisible(): boolean {
    return this.modalService.reportModalVisible;
  }

  set reportModalVisible(visible: boolean) {
    this.modalService.reportModalVisible = visible;
  }

  constructor(private referencesSvc: ReferencesApi, private modalService: ModalService, private loginSvc: LoginService) {
  }

  ngOnInit(): void {
    this.referencesSvc.listOperationalReport(uuid(), 'MLK', 'body', false).subscribe(res => {
      this.msReports = res.microStrategyReport;
      this.nasReports = res.nasDriveReport;
    });
  }
}
