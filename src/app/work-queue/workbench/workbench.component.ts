import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material';
import {
  ConfiguserApi,
  DocumentNotesApi,
  PagedResourcesOfResourceOfDocumentNotesVO,
  PagedResourcesOfResourceOfUserVO,
  ResourceOfDocumentNotesVO,
  ResourceOfUserVO,
  WorkQueueApi,
  WorkQueueItemMetadataVO,
  WorktypeCount
} from '@fox/rest-clients';
import {
  FeatureFlagService,
  LoginService,
  memberInformationRoutePathPrefixMemberProfile,
  memberInformationRoutePathRoot,
  ModalService,
  OP,
  OrderByPipe,
  PageHeaderService,
  TableColumn,
  TableColumnKind,
  TableComponent,
  TableRowSelection,
  workQueueRoutePathRoot,
  workQueueRoutePathWorkbench,
  WorkSessionService
} from '@fox/shared';

import * as _ from 'lodash';
import * as moment from 'moment-timezone';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';
import * as uuidNS from 'uuid';

const uuid = uuidNS;

const {CheckBox} = TableColumnKind;

@Component({
  selector: 'fox-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent implements OnInit {
  @ViewChild('workbenchTable') workbenchTable: TableComponent;

  EH_WQ = OP.MAINTAIN_EH_WQ;
  placeholderUser: ResourceOfUserVO = {
    userName: this.loginSvc.loginState.username,
    lastName: this.loginSvc.loginState.username
  };
  user: ResourceOfUserVO = this.placeholderUser;
  allUsers: ResourceOfUserVO[] = [this.placeholderUser];
  displayWorkbenchItems;
  workbenchItemTypeCounts: WorktypeCount[] = [];
  workbenchItemTypeSummary: number = 0;
  selectedText = '';
  count = 0;

  selectedWorkbenchItemList: number[] = [];
  allChecked = false;

  showOpenWorkItemConfirmationModal = false;
  showQueueConfirmationModal = false;
  workItemId?: number;
  workType?: string;
  queueName?: string;

  sortBy: string = 'createdDate';
  sortDirection?: number = 1;

  queryLinkToMemberProfile = '/' + workQueueRoutePathRoot + '/' + workQueueRoutePathWorkbench;
  linkToMemberProfile = '/' + memberInformationRoutePathRoot + '/' + memberInformationRoutePathPrefixMemberProfile;
  isF4913Enabled = false;

  itemsPerPage: number = 10;
  currentPage: number;
  totalPages: number;
  numberOfElements: number;
  pager: any = {};
  currentTableData: WorkQueueModel[] = [];
  messageBoxCountComponent: number = 0;
  disabledIndexes: number[] = [];
  userMap: { [username: string]: string } = {};
  isNotesModal: boolean = false;
  notesModalData: ResourceOfDocumentNotesVO[];
  wqiBusinessIdModal: number;
  isF5055Enabled: boolean = true;

  set workbenchItems(items: WorkQueueModel[]) {
    if (this.isF4913Enabled) {
      this.displayWorkbenchItems = items.map(item => {
        return {
          ...item,
          member: {
            name: item.mFirstName + ' ' + item.mLastName,
            number: item.mAccountNumber
          },
          wqiBusinessIdDisplay: item && item.wqiBusinessId ? '#' + item.wqiBusinessId.toString() : '',
          itemType: item.documentType
        };
      });
    } else {
      this.displayWorkbenchItems = items;
    }
    this._workbenchItems = items;
  }

  get workbenchItems(): WorkQueueModel[] {
    return this._workbenchItems;
  }

  wbCols: TableColumn[] = [
    {
      key: 'lockedBy',
      kind: TableColumnKind.Images,
      headerText: ' ',
      images: [{
        condition: (x) => x && !!x.lockedBy,
        image: 'LockIcon.svg'
      }]
    },
    {
      key: 'notes',
      kind: TableColumnKind.Images,
      headerText: ' ',
      images: [{
        condition: (x) => x && x.notes,
        image: 'document-badge.svg'
      }]
    },
    {
      key: 'urgency',
      kind: TableColumnKind.Images,
      headerText: ' ',
      images: [{
        condition: (x) => x && x.urgency && x.urgency === 3,
        image: 'priority-icon.svg'
      }]
    },
    {
      key: 'wqiBusinessIdDisplay',
      sortKey: 'wqiBusinessId',
      kind: TableColumnKind.Text,
      headerText: 'ID',
      menus: [
        {
          key: 'workThisItem',
          title: 'Work This Item',
          kind: 'menu',
          visible: (data) => {
            return true;
          },
          disabled: (data) => {
            return !!data.lockedBy;
          }
        },
        {
          kind: 'divider',
        },
        {
          key: 'routeToQueue',
          title: 'Route to Queue...',
          kind: 'menu',
          disabled: (data) => {
            return !!data.lockedBy;
          }
        },
        {
          key: 'sendToWorkbench',
          title: 'Send to Workbench...',
          kind: 'menu',
          visible: (data) => {
            return true;
          },
          disabled: (data) => {
            return !!data.lockedBy;
          }
        },
        {
          kind: 'divider',
          visible: (data) => {
            return data.notes ? data.notes.length > 0 && this.isF5055Enabled : false;
          }
        },
        {
          key: 'getNotes',
          title: 'Show Document Notes',
          kind: 'menu',
          visible: (data) => {
            return data.notes ? data.notes.length > 0 && this.isF5055Enabled : false;
          }
        }
      ]
    },
    {
      key: 'assignmentNote',
      sortKey: 'assignmentNote',
      kind: TableColumnKind.Text,
      headerText: 'Item Details',
    },
    {
      key: 'member',
      sortKey: 'mAccountNumber',
      kind: TableColumnKind.MemberItem,
      preImage: 'member-blue.svg',
      headerText: 'Member',
    },
    {
      key: 'claimNumber',
      sortKey: 'claimNumber',
      kind: TableColumnKind.Text,
      preImage: 'heart-grey.svg',
      headerText: 'Claim #'
    },
    {
      key: 'itemType',
      sortKey: 'itemType',
      kind: TableColumnKind.Text,
      headerText: 'Item Type'
    },
    {
      key: 'originatingQueue',
      sortKey: 'originatingQueue',
      kind: TableColumnKind.Text,
      headerText: 'Originating Queue'
    },
    {
      key: 'followUpBy',
      sortKey: 'followUpBy',
      kind: TableColumnKind.Date,
      headerText: 'Follow-Up By'
    },
    {
      key: 'assignedBy',
      sortKey: 'assignedBy',
      kind: TableColumnKind.Text,
      headerText: 'Assigned By'
    },
    {
      key: 'createdDate',
      sortKey: 'createdDate',
      kind: TableColumnKind.Date,
      headerText: 'Created Date'
    }
  ];

  get fullname(): string {
    return this.fullNameFor(this.user);
  }

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

  get checkRefresh(): string {
    if (this.modalService.routeToQueueCompleted) {
      this.getWorkItems(undefined, undefined);
      this.getWorkItemCounts();
      this.modalService.routeToQueueCompleted = false;
      this.selectedWorkbenchItemList = [];
    }

    if (this.modalService.saveToWorkbenchCompleted) {
      this.getWorkItems(undefined, undefined);
      this.getWorkItemCounts();
      this.modalService.saveToWorkbenchCompleted = false;
      this.selectedWorkbenchItemList = [];
    }

    return '';
  }

  private _workbenchItems: WorkQueueModel[] = [];

  constructor(private userAPISvc: ConfiguserApi,
              private loginSvc: LoginService,
              private workQueueApi: WorkQueueApi,
              private modalService: ModalService,
              private workSessionService: WorkSessionService,
              private configusrApi: ConfiguserApi,
              private pageHeaderService: PageHeaderService,
              private featureFlagService: FeatureFlagService,
              private orderByPipe: OrderByPipe,
              private cdRef: ChangeDetectorRef,
              private docNotesApi: DocumentNotesApi) {
    this.isF4913Enabled = !this.featureFlagService.isFeatureDisabled('F4913');
    this.isF5055Enabled = !this.featureFlagService.isFeatureDisabled('F5055');
  }

  private static _isExpansionIndicator(eTarget: EventTarget): boolean {
    const expansionIndicatorClass = 'mat-expansion-indicator';
    const target = eTarget as HTMLInputElement;
    return (target.classList && target.classList.contains(expansionIndicatorClass));
  }

  ngOnInit(): void {
    this.selectedText = 'All';
    this.workbenchItems = [];
    this.workbenchItemTypeCounts = [];
    this.workbenchItemTypeSummary = 0;
    const phu = [this.placeholderUser];
    this.allUsers = phu;
    if (!this.isF5055Enabled) {
      this.wbCols.splice(1, 1);
    }
    // If the role is enhanced WQ user
    if (this.loginSvc.hasRole(OP.MAINTAIN_EH_WQ)) {
      let totalPages = 1;

      // get the first page and see how many pages we're dealing with
      this.userAPISvc.findUser(uuid(), undefined, undefined, undefined, undefined, 200).subscribe(
        (value: PagedResourcesOfResourceOfUserVO) => {
          this.allUsers = value ? (value._embedded ? (value._embedded.items || phu) : phu) : phu;
          const selUserList = this.allUsers.filter(x => x.userName === this.placeholderUser.userName);
          this.user = selUserList.length > 0 ? selUserList[0] : this.placeholderUser;
          this.pageHeaderService.customTitle = this.fullNameFor(this.user) + '\'s Workbench';
          totalPages = (value ? (value.page ? (value.page.totalPages || 1) : 1) : 1);
          this.getWorkItems(undefined, undefined);
          this.getWorkItemCounts();
        },
        () => {
          this.allUsers = phu;
          this.getWorkItems(undefined, undefined);
          this.getWorkItemCounts();
        }
      );
    } else {
      this.userAPISvc.getUser(this.loginSvc.loginState.username, uuid()).subscribe(
        (value: ResourceOfUserVO) => {
          this.user = value;
          this.allUsers = [value];
          this.getWorkItems(undefined, undefined);
          this.getWorkItemCounts();
        },
        () => {
          this.user = this.placeholderUser;
          this.allUsers = phu;
          this.getWorkItems(undefined, undefined);
          this.getWorkItemCounts();
        }
      );
    }
  }

  menuClicked(event): void {
    if (event.menu.key === 'routeToQueue') {
      this.modalService.routeToQueueItemList = [event.data.wqiId];
      this.modalService.itemDetails = event.data.assignmentNote;
      this.routeToQueueModalVisible = true;
    } else if (event.menu.key === 'sendToWorkbench') {
      this.modalService.saveToWorkbenchItemList = [event.data];
      this.modalService.itemDetails = event.data.assignmentNote ? event.data.assignmentNote : '';
      this.modalService.followUpDate = event.data.followUpBy ? this.formatDateToService(event.data.followUpBy) : '';
      this.saveToWorkbenchModalVisible = true;
    } else if (event.menu.key === 'workThisItem') {
      this.modalService.saveToWorkbenchItemList = [event.data.wqiId];
      this.onWorkThisItem(event.data);
      this.showQueueConfirmationModal = true;
    } else if (event.menu.key === 'getNotes') {
      this.showNotesModal(<ResourceOfDocumentNotesVO[]>event.data.notes, event.data.wqiBusinessId);
    }
  }

  showNotesModal(notes: ResourceOfDocumentNotesVO[], wqiBusinessId: number): void {
    this.isNotesModal = true;
    this.notesModalData = notes;
    this.wqiBusinessIdModal = wqiBusinessId;
  }

  fullNameFor(user: ResourceOfUserVO): string {
    let fullName = user.userName;
    if (user) {
      const fn = user.firstName;
      const ln = user.lastName;
      fullName = (fn ? this.formatNameCasing(fn) : '') + ((fn && ln) ? ' ' : '') + (ln ? this.formatNameCasing(ln) : '');
    } else {
      fullName = 'Unknown';
    }
    return fullName;
  }

  expandPanel(matExpansionPanel: MatExpansionPanel, event: Event): void {
    event.stopPropagation(); // Preventing event bubbling

    if (event.target) {
      if (!WorkbenchComponent._isExpansionIndicator(event.target)) {
        matExpansionPanel.toggle();
      }
    }
  }

  formatDateToCST(originalFormat: string): string {
    return moment.tz(originalFormat, 'America/Chicago').format('MM/DD/YYYY, hh:mmA zz');
  }

  getWorkbenchItems(selectedText: string, workType: string | undefined, category: string | undefined): void {
    this.selectedText = selectedText;
    this.getWorkItems(workType, category);
  }

  getWorkItems(workType: string | undefined, category: string | undefined): void {
    this.workbenchItems = [];
    if (this.user.userName) {
      if (this.isF4913Enabled) {
        let wqMetaItems: WorkQueueItemMetadataVO[] = [];
        this.workQueueApi.getWorkbenchItems(this.user.userName, uuid(), workType, category)
          .subscribe(items => {
            wqMetaItems = items;

            const assignedByUsers = wqMetaItems
              .map(x => x.assignedBy)
              .filter((value, index, self) => {
                // get unique items - by deleting any non-first index occurrence
                return self.indexOf(value) === index;
              })
              .filter(x => !!x);

            const userObservables = assignedByUsers.map((x) => {
              // Assert truthy because we filtered above
              return this.configusrApi.getUser(x!, uuid());
            });

            const notesObservables = wqMetaItems.map(metaItem => {
              if (metaItem.wqiBusinessId && this.isF5055Enabled) {
                return this.docNotesApi.findDocumentNotes(metaItem.wqiBusinessId, uuid(), 50);
              }
            });

            this.workbenchItems = wqMetaItems.map(metaItem => {
              const retVal: WorkQueueModel = {
                wqiId: metaItem.wqiId,
                assignedBy: metaItem.assignedBy,
                assignmentNote: metaItem.reason || '',
                followUpBy: metaItem.followUpDate || '',
                originatingQueue: metaItem.queueName,
                mFirstName: (metaItem.metadata) ? metaItem.metadata['firstName'] || '' : '',
                mLastName: (metaItem.metadata) ? metaItem.metadata['lastName'] || '' : '',
                mAccountNumber: (metaItem.metadata) ? metaItem.metadata['memberAccountNumber'] || '' : '',
                wqiBusinessId: metaItem.wqiBusinessId || '',
                urgency: metaItem.urgency,
                businessIdType: metaItem.businessIdType,
                businessIdTypeDesc: metaItem.businessIdTypeDesc,
                queue: metaItem.queue,
                createdDate: metaItem.createdDate,
                documentType: metaItem.metadata ? metaItem.metadata['documentType'] : '',
                claimNumber: metaItem.metadata ? metaItem.metadata['claimNumber'] : '',
                lockedBy: metaItem.lockedBy,
                docId: metaItem.metadata ? metaItem.metadata['id'] : ''
              };
              return retVal;
            });

            forkJoin([...userObservables, ...notesObservables]).subscribe((userOrNotes: (ResourceOfUserVO | PagedResourcesOfResourceOfDocumentNotesVO)[]) => {
              userOrNotes.forEach(userOrNote => {
                let wbis = this.workbenchItems;
                if (userOrNote.hasOwnProperty('userName')) {
                  wbis = wbis.map(x => {
                    const user = <ResourceOfUserVO>userOrNote;
                    if (x.assignedBy === user.userName) {
                      x.assignedBy = (user.firstName || '') + ' ' + (user.lastName || '');
                    }
                    return x;
                  });
                } else if (this.isF5055Enabled) {
                  const note = <PagedResourcesOfResourceOfDocumentNotesVO>userOrNote;
                  wbis = wbis.map(item => {
                    const firstNote = note._embedded && note._embedded.items ? note._embedded.items[0] : undefined;
                    if (firstNote && firstNote.docId && note._embedded && item.docId === firstNote.docId.toString()) {
                      item.notes = note._embedded.items;
                    }
                    return item;
                  });
                }
                this.workbenchItems = wbis;
                this.setPage(0);
              });
            });
          });
      } else {
        this.workQueueApi.getWorkbenchItems(this.user.userName, uuid(), workType, category)
          .pipe(
            map(
              data => {
                const workQueueList: WorkQueueModel[] = [];
                for (const d of data) {
                  this.configusrApi.getUser(d.assignedBy || '', uuid()).subscribe(
                    user => {
                      workQueueList.push({
                        wqiId: d.wqiId,
                        assignedBy: (user.firstName || '') + ' ' + (user.lastName || ''),
                        assignmentNote: d.reason || '',
                        followUpBy: d.followUpDate || '',
                        originatingQueue: d.queueName,
                        mFirstName: (d.metadata) ? d.metadata['firstName'] || '' : '',
                        mLastName: (d.metadata) ? d.metadata['lastName'] || '' : '',
                        mAccountNumber: (d.metadata) ? d.metadata['memberAccountNumber'] || '' : '',
                        wqiBusinessId: d.wqiBusinessId || '',
                        urgency: d.urgency,
                        businessIdType: d.businessIdType,
                        businessIdTypeDesc: d.businessIdTypeDesc,
                        queue: d.queue,
                        createdDate: d.createdDate
                      });
                    }
                  );
                }
                return workQueueList;
              }
            )
          )
          .subscribe(resp => {
            for (const w of resp) {
              this.configusrApi.getUser(w.assignedBy || '', uuid())
                .subscribe(
                  user => {
                    w.assignedBy = (user.firstName || '') + ' ' + (user.lastName || '');
                  });
            }
            this.workbenchItems = resp;
            this.onSortDirectionChange(this.sortDirection);
          });
      }
    }
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.pager = this.getPaginationData(this.displayWorkbenchItems.length, page + 1, this.itemsPerPage);
    this.numberOfElements = this.displayWorkbenchItems.length;
    this.totalPages = this.pager.totalPages;
    this.currentTableData = this.pager.startIndex < this.displayWorkbenchItems.length ? this.displayWorkbenchItems.slice(this.pager.startIndex, this.pager.endIndex + 1) : [];
    this.count++;
    if (this.currentTableData && this.count === 3) {
      this.currentTableData = this.currentTableData.sort((a: any, b: any): number => {
        if (a.createdDate && b.createdDate) {
          const c = Date.parse(b.createdDate);
          const d = Date.parse(a.createdDate);
          return c - d;
        } else {
          return 0;
        }
      });
    }
    this.disabledIndexes = this.currentTableData
      .filter(x => !!x.lockedBy)
      .map(item => this.currentTableData.findIndex(wb => wb.wqiId === item.wqiId));
  }

  getPaginationData(totalItems: number, currentPage: number = 1, pageSize: number = 10): object {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;

    if (totalPages <= 20) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 10) {
        startPage = 1;
        endPage = 20;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = _.range(startPage, endPage + 1);
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  perPageItemsChange(itemCount): void {
    this.itemsPerPage = itemCount;
    const page = 0;
    this.currentPage = page;
    this.pager = this.getPaginationData(this.displayWorkbenchItems.length, page + 1, this.itemsPerPage);
    this.totalPages = this.pager.totalPages;
    this.currentTableData = this.displayWorkbenchItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getWorkItemCounts(): void {
    this.workbenchItemTypeCounts = [];
    this.workbenchItemTypeSummary = 0;

    if (this.user.userName) {
      this.workQueueApi.getWorkbenchCount(this.user.userName, uuid()).subscribe(resp => {
        this.workbenchItemTypeCounts = resp.workType ? resp.workType : [];
        this.workbenchItemTypeSummary = resp.itemCount ? resp.itemCount : 0;
        this.onSortDirectionChange(this.sortDirection);
      });
    }
  }

  formatNameCasing(str: string): string {
    return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
  }

  onSelectionChange(qid: number): void {
    if (this.selectedWorkbenchItemList.indexOf(qid) > -1) {
      this.selectedWorkbenchItemList.splice(this.selectedWorkbenchItemList.indexOf(qid), 1);
    } else {
      this.selectedWorkbenchItemList.push(qid);
    }
  }

  changeAllSelection(): void {
    this.selectedWorkbenchItemList = [];
    this.allChecked = !this.allChecked;
    if (this.allChecked) {
      this.workbenchItems.forEach(row => {
        if (row.wqiId) {
          this.selectedWorkbenchItemList.push(row.wqiId);
        }
      });
    }
  }

  onChangeSelectedUser(): void {
    this.selectedText = 'All';
    this.workbenchItems = [];
    this.workbenchItemTypeCounts = [];
    this.currentTableData = [];
    this.workbenchItemTypeSummary = 0;
    this.getWorkItems(undefined, undefined);
    this.getWorkItemCounts();
    this.pageHeaderService.customTitle = this.fullNameFor(this.user) + '\'s Workbench';
  }

  routeToQueueRibbon(): void {
    this.modalService.routeToQueueItemList = this.selectedWorkbenchItemList;
    if (this.selectedWorkbenchItemList.length === 1) {
      const selectedWq = this.workbenchItems.filter(data => data.wqiId === this.selectedWorkbenchItemList[0]);
      this.modalService.itemDetails = selectedWq[0].assignmentNote ? selectedWq[0].assignmentNote : '';
      this.modalService.followUpDate = selectedWq[0].followUpBy ? selectedWq[0].followUpBy : '';
    }
    this.routeToQueueModalVisible = true;
  }

  cancelWorkBenchRibbon(): void {
    this.selectedWorkbenchItemList = [];
    this.allChecked = false;
  }

  sendToWorkbenchRibbon(): void {
    this.modalService.saveToWorkbenchItemList = this.workbenchItems.filter(item => this.selectedWorkbenchItemList.indexOf(item.wqiId ? item.wqiId : 0) > -1);
    this.modalService.itemDetails = '';
    this.modalService.followUpDate = '';
    if (this.selectedWorkbenchItemList.length === 1) {
      const selectedWq = this.workbenchItems.filter(data => data.wqiId === this.selectedWorkbenchItemList[0]);
      this.modalService.itemDetails = selectedWq[0].assignmentNote ? selectedWq[0].assignmentNote : '';
      this.modalService.followUpDate = selectedWq[0].followUpBy ? selectedWq[0].followUpBy : '';
    }
    this.saveToWorkbenchModalVisible = true;
  }

  routeToQueue(wqiId: number): void {
    this.modalService.routeToQueueItemList = [];
    this.modalService.routeToQueueItemList.push(wqiId);
    this.routeToQueueModalVisible = true;
  }

  sendToWorkbench(wqi: WorkQueueItemMetadataVO): void {
    this.modalService.saveToWorkbenchItemList = [];
    this.modalService.saveToWorkbenchItemList.push(wqi);
    this.saveToWorkbenchModalVisible = true;
  }

  hasRole(role: OP): boolean {
    return this.loginSvc.hasRole(role);
  }

  onWorkThisItemRibbon(): void {
    this.onWorkThisItem(this.workbenchItems.filter(item => this.selectedWorkbenchItemList.indexOf(item.wqiId ? item.wqiId : 0) > -1)[0]);
  }

  onWorkThisItem(item: WorkQueueItemMetadataVO): void {
    this.workItemId = item.wqiId;
    this.workType = this.workSessionService.currentWorkQueueType;
    this.queueName = item.queueName;
    this.workSessionService.redirectTo = workQueueRoutePathRoot + '/' + workQueueRoutePathWorkbench;
    this.showOpenWorkItemConfirmationModal = this.workSessionService.hasWorkQueueSession;
    this.showQueueConfirmationModal = !this.workSessionService.hasWorkQueueSession;
  }

  onShowOpenWorkItemModalChange(): void {
    this.showOpenWorkItemConfirmationModal = false;
  }

  onShowQueueDetailConfirmModalChange(): void {
    this.showQueueConfirmationModal = false;
  }

  onTableSelectionChange(selectionChangeEvent: TableRowSelection): void {
    if (selectionChangeEvent && selectionChangeEvent.isAll) {
      if (selectionChangeEvent.isChecked) {
        this.selectedWorkbenchItemList = this.displayWorkbenchItems
          .filter(x => !x.lockedBy)
          .map(x => x.wqiId);
      } else {
        this.selectedWorkbenchItemList = [];
      }
    } else {
      if (selectionChangeEvent.index || selectionChangeEvent.index === 0) {
        const wqiForIndex = this.currentTableData[selectionChangeEvent.index];
        const wqiIdForIndex = wqiForIndex.wqiId;
        if (wqiIdForIndex && !wqiForIndex.lockedBy) {
          if (selectionChangeEvent.isChecked) {
            this.selectedWorkbenchItemList.push(wqiIdForIndex);
          } else {
            const indexOfWqiIdInSelectionList = this.selectedWorkbenchItemList.indexOf(wqiIdForIndex);
            this.selectedWorkbenchItemList.splice(indexOfWqiIdInSelectionList, 1);
          }
        }
      }
    }
  }

  onSortColumnChange(columnName): void {
    if (columnName) {
      this.sortBy = columnName;
      this.displayWorkbenchItems = this.orderByPipe.transform(this.displayWorkbenchItems, {
        property: this.sortBy,
        direction: this.sortDirection
      });
      this.setPage(0);
    }
  }

  onSortDirectionChange(direction): void {
    if (this.sortBy) {
      this.sortDirection = direction;
      this.displayWorkbenchItems = this.orderByPipe.transform(this.displayWorkbenchItems, {
        property: this.sortBy,
        direction: this.sortDirection
      });
      this.setPage(0);
    }
  }

  formatDateToService(originalFormat): string {
    return moment.tz(originalFormat, 'MM/DD/YYYY').format('MM/DD/YYYY');
  }

}

interface WorkQueueModel {
  wqiId?: number;
  assignedBy?: string;
  assignmentNote?: string;
  followUpBy?: string;
  originatingQueue?: string;
  mFirstName?: string;
  mLastName?: string;
  mAccountNumber?: string;
  wqiBusinessId?: string;
  businessIdType?: number;
  queue?: string;
  urgency?: number;
  createdDate?: string;
  businessIdTypeDesc?: string;
  documentType?: string;
  claimNumber?: string;
  lockedBy?: string;
  notes?: ResourceOfDocumentNotesVO[];
  link?: string;
  docId?: string;
}
