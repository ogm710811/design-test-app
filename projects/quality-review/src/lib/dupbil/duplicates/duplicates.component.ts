import {Component, OnInit} from '@angular/core';
import {
  Dfhcommarea,
  Oprec1Record,
  PageHeaderService,
  TransferSrvService
} from '@fox/shared';
import {dupe_resp} from '@fox/test-support';
import {Container} from '../../miscinfo/model/container.model';
import {Rpdmb76} from '../../miscinfo/model/rpdmb76.model';
import {QualityReviewService} from '../../quality-review.service';
import {QualityReviewMiscService} from '../../shared/quality-review-misc.service';

@Component({
  selector: 'fox-duplicates',
  templateUrl: './duplicates.component.html',
  styleUrls: ['./duplicates.component.css']
})
export class DuplicatesComponent implements OnInit {
  incomingChargeData: string[] = [];
  claimNumber: number = 0;
  screenBean = new Rpdmb76();
  container = new Container();
  duplicateCheckResp: any = {};
  tableData: any = {};
  count = 0;

  constructor(private pageHeaderService: PageHeaderService,
              private qualityRvwSvc: QualityReviewService,
              private qualityReviewMiscService: QualityReviewMiscService,
              private transferSrv: TransferSrvService) {
  }

  ngOnInit(): void {
    if (this.qualityReviewMiscService.qualityReviewFlag) {
      this.container = this.qualityReviewMiscService.savedQualityReviewResult;
      this.qualityReviewMiscService.qualityReviewFlag = false;
    } else {
      let data: any = undefined;
      let dfhcommarea;
      let oprec1Record;
      let qualityInfoRecord;
      let qualityCommAreaFieldsFor06o75;
      this.container = new Container();

      data = this.transferSrv.getData();
      dfhcommarea = data['dfhCommArea'];

      if (dfhcommarea === undefined) {
        dfhcommarea = new Dfhcommarea();
      }

      oprec1Record = data['oprec1Record'];
      if (oprec1Record === undefined) {
        oprec1Record = new Oprec1Record();
      }

      qualityInfoRecord = data['qualityInfoRecord'];
      qualityCommAreaFieldsFor06o75 = data['qualityCommAreaFieldsFor06o75'];

      this.container.dfhCommarea = dfhcommarea;
      this.container.workStorage.oprec1Record = oprec1Record;
      this.container.workStorage.qualityInfoRecord = qualityInfoRecord;
      this.container.workStorage.qualityCommAreaFieldsFor06o75 = qualityCommAreaFieldsFor06o75;
    }

    this.qualityRvwSvc.qltyRvwRvldMiscInfoServiceMain(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean.rpdmb76;
      this.claimNumber = parseInt(this.screenBean.m76cn.replace(/\D/g, ''), 10);
      this.getDuplicateClaims();
    }, (e) => {
      console.log('error occurred:', e);
    });
  }

  getDuplicateClaims(): void {
    this.duplicateCheckResp = dupe_resp;
    this.incomingChargeData = this.duplicateCheckResp.items[0].incomingChargeLine;
    this.tableData = this.duplicateCheckResp.items[0].duplicateBillLines;
  }

  preIncmgData(): void {
    if (this.count > 0) {
      this.count = this.count - 1;
    }
  }

  nextIncmgData(): void {
    this.count = this.count + 1;
  }
}
