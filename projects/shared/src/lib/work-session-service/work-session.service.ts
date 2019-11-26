import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
  DocumentNotesApi,
  NewWorkSessionRequestVO,
  PagedResourcesOfResourceOfDocumentNotesVO,
  ReferenceValueVO,
  WorkBenchApi,
  WorkbenchRequestVO,
  WorkQueueApi,
  WorkQueueItemRequestVO,
  WorkQueueItemVO,
  WorkQueueReferencesApi,
  WorkSessionApi
} from '@fox/rest-clients';
import {of, Subscription} from 'rxjs';
import * as uuidNS from 'uuid';
import {LoginService} from '../login-service/login.service';
import {MessageBoxService} from '../message-box/message-box.service';
import {FeatureFlagService} from '../feature-flag-service/feature-flag.service';
import {workQueueManagementFeature} from '../constants/dashboard.constants';
import {MessageBoxType} from '../message-box/message-box-type.enum';
import {
  documentRepositoryRoutePathDocumentDetail,
  documentRepositoryRoutePathRoot
} from '../constants/document-repository.constants';
import {checkRecoveryUrlPrefixDepositDetail} from '../constants/check-recovery.constants';
import {
  workQueueRoutePathAcceptabilityCode,
  workQueueRoutePathProviderValidation,
  workQueueRoutePathRoot
} from '../constants/work-queue.constants';
import {OP} from '../authority/op';

const uuid = uuidNS;

@Injectable({
  providedIn: 'root'
})
export class WorkSessionService {
  workQueueTypes: ReferenceValueVO[] = [];
  hasWorkQueueSession = false;
  fromWorkBench = false;
  currentWorkQueueType = '';
  currentWorkQueueBusinessId = '';
  currentBusIdType: number = 0;
  currentSessionWorkQueueItem: WorkQueueItemVO = {};
  documentNotesCount = 0;
  workType: 'FIFO' | 'WIP' | 'NONE' = 'NONE';
  redirectTo: string = '';
  documentBusinessId = 1;
  params: object = {};

  constructor(
    private workSessionApi: WorkSessionApi,
    private router: Router,
    private referencesApi: WorkQueueReferencesApi,
    private loginService: LoginService,
    private wqSvc: WorkBenchApi,
    private docNotesApi: DocumentNotesApi,
    private queueService: WorkQueueApi,
    private loginSvc: LoginService,
    private msgBoxSvc: MessageBoxService,
    private featureFlagSvc: FeatureFlagService,
    private messageBoxService: MessageBoxService
  ) {
    this.referencesApi.workqueueReference('BUSINESS_ID_TYPE', uuid()).subscribe(wqType => {
      if (wqType) {
        this.workQueueTypes = wqType;
        this.checkSession();

        const documentType = this.workQueueTypes.find(type => type.description === 'DCN');
        if (documentType && documentType.id) {
          this.documentBusinessId = documentType.id;
        }
      }
    });
  }

  resetWorkSession(): void {
    this.hasWorkQueueSession = false;
    this.currentWorkQueueType = '';
    this.currentWorkQueueBusinessId = '';
    this.currentBusIdType = 0;
    this.currentSessionWorkQueueItem = {};
    this.workType = 'NONE';
  }

  checkSession(redirectToDetail?: boolean): void {
    if (!this.featureFlagSvc.isFeatureDisabled(workQueueManagementFeature) && !this.loginSvc.isSecurityAdmin && this.loginSvc.hasRole(OP.MAINTAIN_WORKQUEUE)) {
      this.workSessionApi.findSession(this.loginService.loginState.username, uuid())
        .subscribe(resp => {
          if (resp.workQueueItem && resp.workQueueItem.businessIdType) {
            this.hasWorkQueueSession = true;
            this.currentWorkQueueBusinessId = resp.workQueueItem.wqiBusinessId ? resp.workQueueItem.wqiBusinessId : 'N/A';
            this.currentBusIdType = resp.workQueueItem.businessIdType;
            this.currentSessionWorkQueueItem = resp.workQueueItem;
            const queuesForWorkItemObs = !!this.currentSessionWorkQueueItem.queue ?
              this.queueService.findQueues(uuid(), undefined, undefined, undefined, this.currentSessionWorkQueueItem.queue).map(wqs => wqs.content || []) :
              of([]);

            this.fromWorkBench = resp.workQueueItem.userId ? true : false;

            queuesForWorkItemObs.subscribe(wqs => {
              if (wqs.length) {
                const preWorkType = wqs[0];
                let wType: string = 'NONE';
                if (preWorkType && preWorkType.type) {
                  wType = preWorkType.type.toUpperCase();
                }
                if (!(wType === 'FIFO' || wType === 'WIP')) {
                  this.workType = 'NONE';
                } else {
                  this.workType = wType;
                }
              } else {
                this.workType = 'NONE';
              }
            });

            const businessIdDescription = this.workQueueTypes.find(type => type.id === this.currentBusIdType);
            if (businessIdDescription) {
              switch (businessIdDescription.description) {
                case 'DCN':
                  this.currentWorkQueueType = 'Document';
                  this.getDocNotesCount();
                  break;
                case 'Claim-Number':
                  this.currentWorkQueueType = 'Claim';
                  break;
                case 'Check':
                  this.currentWorkQueueType = 'Check';
                  break;
                case 'DepositDetailId':
                  this.currentWorkQueueType = 'Deposit';
                  break;
                default:
                  this.currentWorkQueueType = businessIdDescription.description || '';
              }
            }
          }

          if (redirectToDetail) {
            this.navigateToNext();
          }

        }, (error) => {
          if (error.status === 404) {
            this.resetWorkSession();
            if (redirectToDetail) {
              this.navigateToNext();
            }
          } else if (error.status === 204) {
            this.msgBoxSvc.addMessageBox(
              'No Items to Work',
              MessageBoxType.ERROR,
              'There are no available work items left in the work queue.');
            return;
          }
        });
    }
  }

  navigateToNext(): void {
    const businessIdDescription = this.workQueueTypes.find(type => type.id === this.currentSessionWorkQueueItem.businessIdType);

    if (businessIdDescription && this.hasWorkQueueSession) {
      switch (businessIdDescription.description) {
        case 'DCN':
          this.router.navigate([documentRepositoryRoutePathRoot + '/' + documentRepositoryRoutePathDocumentDetail], {queryParams: {dcn: this.currentSessionWorkQueueItem.wqiBusinessId}}).then();
          break;
        case 'DepositDetailId':
          this.router.navigate([checkRecoveryUrlPrefixDepositDetail + this.currentSessionWorkQueueItem.wqiBusinessId]).then();
          break;
        case 'Claim-Number':
          switch (this.currentSessionWorkQueueItem.queue) {
            case 'ACC':
              this.router.navigate([workQueueRoutePathRoot + '/' + workQueueRoutePathAcceptabilityCode]).then();
              break;
            case 'ADD':
              this.router.navigate([workQueueRoutePathRoot + '/' + workQueueRoutePathProviderValidation]).then();
              break;
          }
          break;
        default:
          console.log('Not redirecting.  May be covered by future stories.');
      }
    } else if (!this.hasWorkQueueSession) {
      if (this.router.url.startsWith('/' + documentRepositoryRoutePathRoot + '/' + documentRepositoryRoutePathDocumentDetail)) {
        this.router.navigate([this.redirectTo], {queryParams: this.params}).then();
      }
    }
  }

  getDocNotesCount(): void {
    const obs = this.docNotesApi.findDocumentNotes(this.currentWorkQueueBusinessId.toString(), uuid());
    obs.subscribe((resp: PagedResourcesOfResourceOfDocumentNotesVO) => {
      if (resp.page) {
        this.documentNotesCount = resp.page.totalElements ? resp.page.totalElements : 0;
      }
    });
  }

  endSessionAndCreateNew(workItemId: string): Subscription {
    return this.sendToWorkbench().add(() => {
      const workSession: NewWorkSessionRequestVO = {};
      workSession.workIdType = 'item';
      workSession.workId = +workItemId;

      this.workSessionApi.createSession(workSession, uuid()).subscribe(resp2 => {
          if (resp2.workQueueItem) {
            this.checkSession(true);
          }
        }, error => {
          if (error.status === 409) {
            this.messageBoxService.reset();
            this.messageBoxService.addMessageBox(
              'Error',
              MessageBoxType.ERROR,
              'Unable to create working session as the item is currently locked.'
            );
          }
        }
      );

      this.hasWorkQueueSession = true;
    });
  }

  endSession(): Subscription {
    return this.sendToWorkbench().add(() => {
      this.checkSession();
    });
  }

  endSessionLogout(): Subscription {
    return this.sendToWorkbench().add(() => {
      this.loginService.logout();
      this.resetWorkSession();
    });
  }

  sendToWorkbench(): Subscription {

    const queueItem: WorkQueueItemRequestVO = {
      wqiId: this.currentSessionWorkQueueItem.wqiId ? this.currentSessionWorkQueueItem.wqiId : 0,
      userId: this.loginService.loginState.username,
      reason: this.currentSessionWorkQueueItem.reason,
      wqiBusinessId: this.currentSessionWorkQueueItem.wqiBusinessId ? this.currentSessionWorkQueueItem.wqiBusinessId : '',
      businessIdType: this.currentSessionWorkQueueItem.businessIdType ? this.currentSessionWorkQueueItem.businessIdType : 0,
      queue: this.currentSessionWorkQueueItem.queue ? this.currentSessionWorkQueueItem.queue : '',
      assignedBy: this.loginService.loginState.username,
      urgency: 1,
      lockedBy: this.loginService.loginState.username
    };

    const workbenchRequest: WorkbenchRequestVO = {};
    workbenchRequest.endSession = true;
    workbenchRequest.items = [];
    workbenchRequest.items.push(queueItem);

    return this.wqSvc.updateWorkBench(workbenchRequest, uuid()).subscribe(resp => {
    });

  }
}
