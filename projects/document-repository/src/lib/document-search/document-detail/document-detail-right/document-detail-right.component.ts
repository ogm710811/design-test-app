import {Component, Input, NgZone, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {
  DocumentManagementApi,
  DocumentVO,
  WorkItemApi,
  WorkQueueApi,
  WorkQueueBpmStartVO,
  WorkQueueItemBpmVO,
  WorkQueueItemProcessVO
} from '@fox/rest-clients';
import {
  documentRepositoryRoutePathDocumentSearch,
  documentRepositoryRoutePathRoot,
  LoginService,
  MessageBoxService,
  MessageBoxType,
  ModalService,
  PageHeaderRightComponent,
  PageHeaderService,
  WorkSessionService
} from '@fox/shared';
import {Observable} from 'rxjs';
import * as uuidNS from 'uuid';
import {DocumentSearchService} from '../../document-search.service';

const uuid = uuidNS;

@Component({
  selector: 'fox-document-detail-right-sample',
  templateUrl: './document-detail-right.component.html',
  styleUrls: ['./document-detail-right.component.css'],
})
export class DocumentDetailRightComponent implements PageHeaderRightComponent, OnInit {
  @Input() data: DocumentDetailRightData = {};
  separateModalVisible: boolean = false;
  showPdf = true;
  showDeleteDialog = false;
  lockedInd: boolean = false;
  docMetaFormGroup?: FormGroup;
  pdfTotalPages: number = 0;
  selectedDeleteDocDcn: string = '';

  get hasEnhancedRole(): boolean {
    return this.loginSvc ? this.loginSvc.hasEnhancedWqRole : false;
  }

  constructor(
    private msgBoxSvc: MessageBoxService,
    private ngZone: NgZone,
    private documentSearchService: DocumentSearchService,
    private router: Router,
    private wqiSvc: WorkItemApi,
    private modalSvc: ModalService,
    private loginSvc: LoginService,
    private wqSvc: WorkQueueApi,
    private workSessionService: WorkSessionService,
    private docManagementApi: DocumentManagementApi,
    private pageHeaderService: PageHeaderService
  ) {
  }

  ngOnInit(): void {
    this.data = this.pageHeaderService.headerRightItem ? this.pageHeaderService.headerRightItem.data : undefined;
    this.pdfTotalPages = this.pageHeaderService.dynamicData;
    this.pageHeaderService.updateDynamicData.subscribe((data: any) => {
      this.pdfTotalPages = data;
    });
  }

  separateDoc(): void {
    this.separateModalVisible = true;
    this.msgBoxSvc.reset();
  }

  onAbortSeparation(): void {
    this.separateModalVisible = false;
  }

  onConfirmSeparation(): void {
    this.separateModalVisible = false;
  }

  goBack(isDeleteFlag: boolean): void {
    if (isDeleteFlag) {
      this.documentSearchService.lastDocDeleted = true;
    }
    this.showPdf = false;
    this.router.navigate([documentRepositoryRoutePathRoot + '/' + documentRepositoryRoutePathDocumentSearch]);
  }

  onSeparateDocumentSuccessfulMsg(dcnList: string[]): void {
    this.separateModalVisible = false;
    this.msgBoxSvc.addMessageBox('Separated Document', MessageBoxType.SUCCESS, `Separated Document successfully and added to Documents ${dcnList[0]} & ${dcnList[1]}`, 3000);
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.goBack(false);
        });
      }, 5000);
    });
  }

  onSeparateDocumentUnsuccessfulMsg(errorMessage: string): void {
    this.separateModalVisible = false;
    this.msgBoxSvc.reset();
    this.msgBoxSvc.addMessageBox('Unsuccessful Attempt to Separate Document', MessageBoxType.ERROR, 'The Document is Unable to be Separated');
  }

  sendToWorkbench(): void {
    if (this.data && this.data.documentControlNumberStr && this.data.documentBusinessIdType) {
      const retrieveQueueProcessByBusinessTypeSubs = this.wqiSvc.retrieveQueueProcessByBusinessType(this.data.documentControlNumberStr, this.data.documentBusinessIdType.toString(), uuid()).subscribe(
        (procVo: WorkQueueItemProcessVO) => {
          if (procVo && procVo.wqiId) {
            this.modalSvc.saveToWorkbenchItemList = [procVo];
            this.modalSvc.saveToWorkbenchModalVisible = true;
            this.modalSvc.saveToWorkbenchFromDetailInitiated = true;
            this.modalSvc.itemDetails = procVo.reason ? procVo.reason : '';
            this.modalSvc.followUpDate = procVo.followUpDate ? procVo.followUpDate : '';
          } else {
            this.createAndHandleNewProcess((wqiProcVo: WorkQueueItemProcessVO) => {
              this.modalSvc.saveToWorkbenchItemList = [wqiProcVo];
              this.modalSvc.saveToWorkbenchModalVisible = true;
              this.modalSvc.saveToWorkbenchFromDetailInitiated = true;
              this.modalSvc.itemDetails = wqiProcVo.reason ? wqiProcVo.reason : '';
              this.modalSvc.followUpDate = wqiProcVo.followUpDate ? wqiProcVo.followUpDate : '';
            });
          }
          retrieveQueueProcessByBusinessTypeSubs.unsubscribe();
        },
        (err) => {
          if (err.status === 404) {
            this.createAndHandleNewProcess((wqiProcVo: WorkQueueItemProcessVO) => {
              this.modalSvc.saveToWorkbenchItemList = [wqiProcVo];
              this.modalSvc.saveToWorkbenchModalVisible = true;
              this.modalSvc.routeToQueueFromDetailInitiated = true;
              this.modalSvc.itemDetails = wqiProcVo.reason ? wqiProcVo.reason : '';
              this.modalSvc.followUpDate = wqiProcVo.followUpDate ? wqiProcVo.followUpDate : '';
            });
          } else {
            this.msgBoxSvc.addMessageBox('Send to Workbench Failed', MessageBoxType.ERROR, 'Error retrieving Work Queue Item for document');
          }
          retrieveQueueProcessByBusinessTypeSubs.unsubscribe();
        });
    } else {
      this.msgBoxSvc.addMessageBox('Send to Workbench Failed', MessageBoxType.ERROR, 'Error retrieving Work Queue Item for document');
    }
  }

  getLockedByInformation(dcn: number): void {
    const retrieveQueueProcessByBusinessTypeSubs = this.wqiSvc.retrieveQueueProcessByBusinessType(dcn.toString(), '1', uuid()).subscribe(respWI => {
      if (respWI) {
        if (!respWI.lockedBy || respWI.lockedBy === this.loginSvc.username) {
          this.lockedInd = false;
        } else {
          this.lockedInd = true;
          if (this.docMetaFormGroup) {
            this.docMetaFormGroup.disable();
          }
        }
      }
      retrieveQueueProcessByBusinessTypeSubs.unsubscribe();
    });
  }

  routeToQueue(): void {
    if (this.data && this.data.documentControlNumberStr) {
      const retrieveQueueProcessByBusinessTypeSubs = this.wqiSvc.retrieveQueueProcessByBusinessType(this.data.documentControlNumberStr, '1', uuid()).subscribe(
        (procVo: WorkQueueItemProcessVO) => {
          if (procVo && procVo.wqiId) {
            this.modalSvc.routeToQueueItemList = [procVo.wqiId];
            this.modalSvc.routeToQueueModalVisible = true;
            this.modalSvc.routeToQueueFromDetailInitiated = true;
            this.modalSvc.itemDetails = procVo.reason ? procVo.reason : '';
          } else {
            this.createAndHandleNewProcess((wqiProcVo: WorkQueueItemProcessVO) => {
              this.modalSvc.routeToQueueItemList = [wqiProcVo.wqiId || 0];
              this.modalSvc.routeToQueueModalVisible = true;
              this.modalSvc.routeToQueueFromDetailInitiated = true;
              this.modalSvc.itemDetails = wqiProcVo.reason ? wqiProcVo.reason : '';
            });
          }
          retrieveQueueProcessByBusinessTypeSubs.unsubscribe();
        },
        (err) => {
          if (err.status === 404) {
            this.createAndHandleNewProcess((wqiProcVo: WorkQueueItemProcessVO) => {
              this.modalSvc.routeToQueueItemList = [wqiProcVo.wqiId || 0];
              this.modalSvc.routeToQueueModalVisible = true;
              this.modalSvc.routeToQueueFromDetailInitiated = true;
              this.modalSvc.itemDetails = wqiProcVo.reason ? wqiProcVo.reason : '';
            });
          } else {
            this.msgBoxSvc.addMessageBox('Route to Queue Failed', MessageBoxType.ERROR, 'Error retrieving Work Queue Item for document');
          }
          retrieveQueueProcessByBusinessTypeSubs.unsubscribe();
        }
      );
    } else {
      this.msgBoxSvc.addMessageBox('Route to Queue Failed', MessageBoxType.ERROR, 'Error retrieving Work Queue Item for document');
    }
  }

  deleteItemDoc(): void {
    if (this.data && (this.data.selectedDcnList && this.data.documentControlNumberStr) && !(this.data.selectedDcnList.indexOf(this.data.documentControlNumberStr) > -1)) {
      this.data.selectedDcnList.push(this.data.documentControlNumberStr);
    } else {
      this.msgBoxSvc.addMessageBox('Error deleting document', MessageBoxType.ERROR, 'The document(s) failed to be deleted');
    }
    this.showDeleteDialog = true;
  }

  confirmDeleteDoc(): void {
    this.msgBoxSvc.reset();
    if (this.data && this.data.documentControlNumberStr) {
      const manageDocumentDeletionSubs = this.docManagementApi.manageDocumentDeletion(this.data.documentControlNumberStr, uuid(), 'response').subscribe(resp => {
        if (resp.status !== 204) {
          this.msgBoxSvc.addMessageBox('Error deleting document', MessageBoxType.ERROR, 'The document(s) failed to be deleted');
        } else {
          this.msgBoxSvc.addMessageBox('Document(s) deleted', MessageBoxType.SUCCESS, 'The document(s) successfully deleted', 3000);
          this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
              this.ngZone.run(() => {
                this.goBack(true);
              });
            }, 3000);
          });
        }
        manageDocumentDeletionSubs.unsubscribe();
      }, () => {
        this.msgBoxSvc.addMessageBox('Error deleting document', MessageBoxType.ERROR, 'The document(s) failed to be deleted');
        manageDocumentDeletionSubs.unsubscribe();
      });
      this.showDeleteDialog = false;
      this.selectedDeleteDocDcn = '';
    } else {
      this.msgBoxSvc.addMessageBox('Error deleting document', MessageBoxType.ERROR, 'The document(s) failed to be deleted');
    }
  }

  private createAndHandleNewProcess(handler: (wqiProcVo: WorkQueueItemProcessVO) => void): void {

    const bpmVo: WorkQueueItemBpmVO = {
      reason: 'Routing uploaded document without WQ ID',
      wqiBusinessId: this.data ? this.data.documentControlNumberStr : undefined,
      businessIdType: this.data ? this.data.documentBusinessIdType : undefined,
      queue: undefined,
      assignedBy: this.loginSvc.loginState.username,
      urgency: 1
    };

    const startWQItemSubs = this.wqSvc.startWQItem(bpmVo, uuid())
      .map((procVo: WorkQueueBpmStartVO) => {
        return {
          wqiId: procVo.wqiId,
          processId: procVo.processId,
          wqiBusinessId: this.data ? this.data.documentControlNumberStr : undefined,
          businessIdType: this.data ? this.data.documentBusinessIdType : undefined,
          queue: undefined,
          assignedBy: this.loginSvc.loginState.username
        };
      })
      .catch((e) => {
        this.msgBoxSvc.addMessageBox('Work Queue Item Creation Failed',
          MessageBoxType.ERROR, 'The document has no Work Queue Item, and attempts to create one for the document failed');
        return Observable.of({});
      })
      .subscribe(resp => {
        handler(resp);
        startWQItemSubs.unsubscribe();
      });
  }
}

export interface DocumentDetailRightData {
  documentControlNumber?: string;
  documentControlNumberStr?: string;
  documentBusinessIdType?: number;
  currentWorkQueueBusinessId?: string;
  selectedDcnList?: string[];
  isDocTypeClaim?: boolean;
  downloadUrl?: string;
  documentVO?: DocumentVO;
  isStatusComplete?: boolean;
}
