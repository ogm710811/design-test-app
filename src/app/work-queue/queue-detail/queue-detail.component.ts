import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  ConfiguserApi,
  DocumentManagementApi,
  PagedResourcesOfResourcesOfQueueItemDetailsVO,
  WorkQueueApi,
  WorkQueueItemMetadataVO
} from '@fox/rest-clients';
import {
  FeatureFlagService,
  LoginService,
  MessageBoxService,
  MessageBoxType,
  ModalService,
  OP,
  workQueueRoutePathQueueDetail,
  workQueueRoutePathQueueSelection,
  workQueueRoutePathRoot,
  WorkSessionService
} from '@fox/shared';
import 'rxjs/Rx';
import * as uuid from 'uuid';
import {ResourceDocument} from './ResourceDocumentVO';
import {
  DocumentSearchDropdownModel,
  DocumentSearchService
} from '@fox/document-repository';

@Component({
  selector: 'fox-queue-detail',
  templateUrl: './queue-detail.component.html',
  styleUrls: ['./queue-detail.component.css']
})
export class QueueDetailComponent implements OnInit {

  queueId?: number;
  queueName?: string;
  workType?: string;
  queueCategory?: string;
  queueType?: string;
  totalDocuments?: number;
  oldestDocuments?: number;
  description?: string;
  backUrl = '../../' + workQueueRoutePathQueueSelection;
  queuePageSize = 10;
  numberOfElements = 0;
  queuePageTotal: number = 0;
  currentQueuePage = 0;
  searchResult: Array<WorkQueueItemMetadataVO> = [];
  selectedDocList: ResourceDocument[] = [];
  selectedWqItemList: Array<WorkQueueItemMetadataVO> = [];
  dataKeys: string[] = [];
  selectedQueueItemList: number[] = [];
  selectedDcnList: number[] = [];
  selectedDcnLatestlist: any[] = [];
  allChecked = false;
  showQueueDetailConfirmModal = false;
  showOpenWorkItemConfirmModal = false;
  showDeleteDialog = false;
  workItemId?: string;
  userLocked?: string;
  downloadLink: string = '';
  docType: string[] = [];
  docTypes: DocumentSearchDropdownModel [];

  get routeToQueueModalVisible(): boolean {
    return this.modalService.routeToQueueModalVisible;
  }

  set routeToQueueModalVisible(visible: boolean) {
    this.modalService.routeToQueueModalVisible = visible;
  }

  get saveToWorkbenchModalVisible(): boolean {
    return this.modalService.saveToWorkbenchModalVisible;
  }

  set saveToWorkbenchModalVisible(visible: boolean) {
    this.modalService.saveToWorkbenchModalVisible = visible;
  }

  get selectedDocListDownloadUrls(): string[] {
    this.selectedDcnLatestlist = this.searchResult.filter(val => {
      return val['checked'];
    });
    return this.selectedDcnLatestlist.map(doc => this.downloadUrl(doc['wqiBusinessId'].toString() || '', this.hasProperty(doc.metadata, 'documentType') ? doc.metadata['documentType'] : ''));
  }

  get hasOpDeleteDocument(): boolean {
    return this.loginSvc.hasOpDeleteDocument;
  }

  get isF4275Enabled(): boolean {
    return this.featureFlagSvc.isFeatureEnabled('F4275');
  }

  get isLockBadgeInTheList(): boolean {
    return (this.selectedDocList.find(s => s.lockBadge === true)) ? true : false;
  }

  get selectedDocListNumbers(): string[] {
    return this.selectedDocList.map(doc => doc.docControlNumber || '');
  }

  get currentWorkQueueBusinessId(): string {
    return this.workSessionService.currentWorkQueueBusinessId;
  }

  get checkRefresh(): string {
    if (this.modalService.routeToQueueCompleted) {
      this.loadQueue();
      this.modalService.routeToQueueCompleted = false;
    }

    if (this.modalService.saveToWorkbenchCompleted) {
      this.loadQueue();
      this.modalService.saveToWorkbenchCompleted = false;
    }

    return '';
  }

  get hasEnhancedWorkQueueRole(): boolean {
    return this.loginSvc.hasRole(OP.MAINTAIN_EH_WQ);
  }

  constructor(private activatedRoute: ActivatedRoute,
              private workQueueApi: WorkQueueApi,
              private workSessionService: WorkSessionService,
              private modalService: ModalService,
              private userSvc: ConfiguserApi,
              private loginSvc: LoginService,
              private docManagementApi: DocumentManagementApi,
              private messageBoxService: MessageBoxService,
              private documentSearchService: DocumentSearchService,
              private featureFlagSvc: FeatureFlagService) {
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.qid) {
        this.queueId = Number(params.qid);
        this.workQueueApi.getQueue(this.queueId, uuid()).subscribe(resp => {
          this.queueName = resp.name;
          this.workType = resp.workType;
          this.queueCategory = resp.category;
          this.queueType = resp.type;
          this.totalDocuments = resp.totalItems;
          this.oldestDocuments = resp.aging;
          this.description = resp.description;
        });
        this.loadQueue();
      }
    });

    this.docTypes = this.documentSearchService.docTypeDropdownValues;
  }

  isFeatureEnabled(feature): boolean {
    return !this.featureFlagSvc.isFeatureDisabled(feature);
  }

  getDataKeys(): string[] {
    if (this.searchResult && this.searchResult.length > 0) {
      this.searchResult.forEach(data => {
        data['checked'] = false;
      });
      const listOfKeys = this.searchResult.filter(sr => !!sr.metadata).map(sr => Object.keys(sr.metadata!));
      const merged: string[] = (<string[]>[]).concat.apply([], listOfKeys);

      return Array.from<string>(new Set(merged));
    } else {
      return [];
    }
  }

  hasProperty(input: object, property: string): boolean {
    if (input) {
      return input.hasOwnProperty(property);
    } else {
      return false;
    }
  }

  loadQueue(): void {
    this.selectedQueueItemList = [];
    if (this.queueId) {
      this.workQueueApi.getQueueDetails(this.queueId, uuid(), this.queuePageSize, this.currentQueuePage).subscribe((resp: PagedResourcesOfResourcesOfQueueItemDetailsVO) => {
        this.searchResult = [];

        if (resp) {
          this.currentQueuePage = resp.number ? resp.number : 0;
          this.numberOfElements = resp.totalElements ? resp.totalElements : 0;
          this.queuePageSize = resp.size ? resp.size : 0;
          this.queuePageTotal = resp.totalPages ? resp.totalPages : 0;
          this.totalDocuments = resp.totalElements;
          if (resp.content) {
            this.searchResult = resp.content;
            this.dataKeys = this.getDataKeys();
          }
        }
      }, (e) => {
        if (e.status === 404) {
          this.searchResult = [];
          this.currentQueuePage = 0;
          this.numberOfElements = 0;
          this.queuePageTotal = 0;
          this.queuePageSize = 0;
          this.totalDocuments = 0;
          this.oldestDocuments = 0;
        }
      });
    }
  }

  onOpenWorkItemModalVisibleChange(visible: boolean): void {
    this.showOpenWorkItemConfirmModal = visible;
    this.showQueueDetailConfirmModal = false;
  }

  onQueueDetailModalVisibleChange(visible: boolean): void {
    this.showQueueDetailConfirmModal = visible;
    this.showOpenWorkItemConfirmModal = false;
  }

  isSelected(doc: ResourceDocument): boolean {
    return this.selectedDocList.map(docu => docu.docControlNumber).indexOf(doc.docControlNumber) > -1;
  }

  determineModalToDisplay(visible: boolean, workItemId: string): void {
    this.workSessionService.redirectTo = workQueueRoutePathRoot + '/' + workQueueRoutePathQueueDetail;
    this.workSessionService.params = {'qid': this.queueId};
    this.workSessionService.checkSession();
    this.workItemId = workItemId;
    if (this.workSessionService.hasWorkQueueSession) {
      this.onOpenWorkItemModalVisibleChange(visible);
    } else {
      this.onQueueDetailModalVisibleChange(visible);
    }
  }

  onSelectionChange(qid: number, dcn, data): void {
    dcn = parseInt(dcn, 10);
    this.searchResult.forEach(val => {
      if (val.wqiBusinessId === data.wqiBusinessId) {
        data.checked = !data.checked;
      }
    });
    if (this.selectedQueueItemList.indexOf(qid) > -1) {
      this.selectedQueueItemList.splice(this.selectedQueueItemList.indexOf(qid), 1);
    } else {
      this.selectedQueueItemList.push(qid);
    }
    if (this.selectedDcnList.indexOf(dcn) > -1) {
      this.selectedDcnList.splice(this.selectedDcnList.indexOf(dcn), 1);
    } else {
      this.selectedDcnList.push(dcn);
    }
    if (this.selectedDocList.indexOf(data) > -1) {
      this.selectedDocList.splice(this.selectedDocList.indexOf(data), 1);
    } else {
      this.selectedDocList.push(data);
    }
    if (this.selectedWqItemList.indexOf(data) > -1) {
      this.selectedWqItemList.splice(this.selectedWqItemList.indexOf(data), 1);
    } else {
      this.selectedWqItemList.push(data);
    }
  }

  resetSelectedList(): void {
    this.allChecked = false;
    this.selectedQueueItemList = [];
    this.selectedDocList = [];
    this.selectedDcnList = [];
    this.searchResult.forEach(data => {
      data.checked = this.allChecked;
    });
  }

  changeAllSelection(): void {
    this.allChecked = !this.allChecked;
    this.selectedQueueItemList = [];
    this.selectedDcnList = [];
    this.selectedDcnLatestlist = [];
    if (this.allChecked) {
      this.searchResult.forEach(row => {
        if (row.wqiId) {
          this.selectedQueueItemList.push(row.wqiId);
        }
        if (row.wqiBusinessId) {
          this.selectedDcnList.push(parseInt(row.wqiBusinessId, 10));
        }
      });
    }
    this.searchResult.forEach(data => {
      data.checked = this.allChecked;
    });
  }

  routeToQueueRibbon(): void {
    this.modalService.routeToQueueItemList = this.selectedQueueItemList;
    this.modalService.itemDetails = (this.selectedWqItemList.length === 1 && this.selectedWqItemList[0].reason) ? this.selectedWqItemList[0].reason : '';
    this.routeToQueueModalVisible = true;
  }

  sendToWorkbenchRibbon(): void {
    this.modalService.saveToWorkbenchItemList = this.searchResult.filter(item => this.selectedQueueItemList.indexOf(item.wqiId ? item.wqiId : 0) > -1);
    this.modalService.itemDetails = (this.selectedWqItemList.length === 1 && this.selectedWqItemList[0].reason) ? this.selectedWqItemList[0].reason : '';
    this.modalService.followUpDate = (this.selectedWqItemList.length === 1 && this.selectedWqItemList[0].followUpDate) ? this.selectedWqItemList[0].followUpDate : '';
    this.saveToWorkbenchModalVisible = true;
  }

  routeToQueue(wqiId: number, wqi: WorkQueueItemMetadataVO): void {
    this.modalService.routeToQueueItemList = [];
    this.modalService.routeToQueueItemList.push(wqiId);
    this.modalService.itemDetails = wqi.reason ? wqi.reason : '';
    this.routeToQueueModalVisible = true;
    this.modalService.queueType = this.queueType || '';
  }

  sendToWorkbench(wqi: WorkQueueItemMetadataVO): void {
    this.modalService.saveToWorkbenchItemList = [];
    this.modalService.saveToWorkbenchItemList.push(wqi);
    this.modalService.itemDetails = wqi.reason ? wqi.reason : '';
    this.modalService.followUpDate = wqi.followUpDate ? wqi.followUpDate : '';
    this.saveToWorkbenchModalVisible = true;
  }

  getLockedUserDetails(voItem: WorkQueueItemMetadataVO): string | undefined {
    if (voItem.lockedBy && voItem.lockedBy.length > 0) {
      this.userSvc.getUser(voItem.lockedBy, uuid()).subscribe(user => {
        this.userLocked = user.firstName + ' ' + user.lastName;
      });
    }
    return this.userLocked;
  }

  checkIfLockedByIsPresent(voItem: WorkQueueItemMetadataVO): boolean {
    return !!voItem.lockedBy;
  }

  downloadUrl(dcn: string, docType: string): string {
    const docTypeCode = this.getDocTypeDecode(docType);
    return `/api/docmanagement/${encodeURIComponent(String(docTypeCode))}/${encodeURIComponent(String(dcn))}/image`;
  }

  getDocTypeDecode(docType: string): string {
    const desc = this.docTypes.filter(value => value.dropdownItemDesc.toUpperCase() === docType.toUpperCase());
    if (desc.length > 0) {
      return desc[0].dropdownItemValue;
    } else {
      return docType;
    }
  }

  confirmDeleteDoc(): void {

    let successCount = 0;
    let failedCount = 0;

    for (let i = 0; i < this.selectedQueueItemList.length; i++) {
      const doc = this.selectedQueueItemList[i];
      const dcn = this.selectedDcnList[i].toString();
      if (doc) {
        const manageDocumentDeletionSubs = this.docManagementApi.manageDocumentDeletion(dcn || '', uuid()).subscribe(() => {
          successCount++;
          this.showDeleteMessage(successCount, failedCount, this.selectedQueueItemList.length);
          manageDocumentDeletionSubs.unsubscribe();
          this.loadQueue();
        }, () => {
          failedCount++;
          this.showDeleteMessage(successCount, failedCount, this.selectedQueueItemList.length);
          manageDocumentDeletionSubs.unsubscribe();
        });
      }
    }
  }

  showDeleteMessage(successCount: number, failedCount: number, totalCount: number): void {
    if (totalCount === (successCount + failedCount)) {
      if (successCount === 0) {
        this.messageBoxService.addMessageBox('Failed', MessageBoxType.ERROR, 'No items successfully deleted.');
      } else if (successCount === totalCount) {
        this.messageBoxService.addMessageBox('Items sent', MessageBoxType.SUCCESS, 'All items successfully deleted.', 3000);
      } else {
        this.messageBoxService.addMessageBox('Not All Items Successfully deleted', MessageBoxType.ACTIVE, 'Due to an unknown error, only ' + successCount + ' of '
          + totalCount + ' items could be deleted.');
      }

      this.showDeleteDialog = false;
      this.selectedDocList = [];
      this.allChecked = false;
    }
  }
}
