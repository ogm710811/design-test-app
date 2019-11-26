import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClaimHistoryApi, ManualClaimDetailVO} from '@fox/rest-clients';
import {
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathTypeOfService,
  Dfhcommarea,
  HeaderMaintenanceService,
  MessageBoxService,
  MessageBoxType,
  TableColumnKind,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Container} from './model/container.model';
import {ProcClmEligLine} from './model/proc-clm-elig-line.model';
import {ProcClmElig} from './model/proc-clm-elig.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmelig::procclmelig::ProcClmEligServiceScreen
 */
@Component({
  selector: 'fox-app-proc-clm-elig-service-screen',
  templateUrl: './process-claim-eligibility.component.html',
  styleUrls: ['./process-claim-eligibility.component.css']
})
export class ProcClmEligServiceScreenComponent implements OnInit {
  procClmElig = new ProcClmElig();
  procClmEligLines: ProcClmEligLine[] = [];
  claimCommarea = new Dfhcommarea();
  setDisplay: boolean = false;
  buttonStatus: string = 'Submit';
  data: ManualClaimDetailVO;
  mutipleMemTableColumns: any[] =
    [
      {
        key: 'm21sel',
        headerText: 'Selection #',
        kind: TableColumnKind.Text,
        border: false,
      },
      {
        key: 'm21nam',
        headerText: 'Name',
        kind: TableColumnKind.Text,
        border: false,
      },
      {
        key: 'm21dob',
        headerText: 'Date Of Birth',
        kind: TableColumnKind.Text,
        border: false,
      }

    ];
  mutipleMemTableData: ProcClmEligLine[] = [];
  showErrorMessage: boolean = false;
  divError1 = false;
  divError2 = false;
  cardTitle = 'Claim Eligibility';
  cardSubTitle = 'Claim number required. Click “Submit” (or use Alt + S or Enter) to proceed.';
  errorMessageSubTitle = 'Please correct the errors and try to save again';
  multipleMembersHeader = 'Multiple Members Found';
  multipleMembersSub = 'Enter a Selection # and click “Submit” (or use Alt + S or Enter) to proceed.';

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     private manualClaimService: ManualClaimService,
                     private claimHistoryService: ClaimHistoryApi,
                     protected headerMaintenance: HeaderMaintenanceService) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let commonArea = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.claimCommarea = data['claimCommarea'];
    this.claimCommarea = this.claimCommarea === undefined ? new Dfhcommarea() : this.claimCommarea;
    commonArea.claimCommArea = this.claimCommarea;
    commonArea = await this.procClmEligServiceServiceMainModule(commonArea).toPromise();
    data = this.transferSrv.getData();
    data['claimCommarea'] = commonArea.claimCommArea;
    this.procClmElig = commonArea.procClmElig;
    this.claimCommarea = commonArea.claimCommArea;
    this.procClmEligLines = commonArea.procClmElig.lines;

    let claimId;
    let claimDetails;
    this.activatedRoute.queryParams.subscribe(params => {
      claimId = params['claimNumid'];
    });
    if (claimId) {
      claimDetails = await this.claimHistoryService.getClaimHistory(Number(claimId)).toPromise();
      commonArea.procClmElig.m21cnm = claimId;
      commonArea.procClmElig.m21cnm1 = claimId.slice(0, 5);
      commonArea.procClmElig.m21cnm2 = claimId.toString().slice(5, 11);
      commonArea.procClmElig.m21memn = claimDetails.claimHistoryMember.aarpMembershipNumber;
      commonArea.procClmElig.m21hic = claimDetails.medicareClaimNum;
      commonArea.procClmElig.m21srv1 = claimDetails.claimDosFromDate.slice(5, 7) + claimDetails.claimDosFromDate.slice(2, 4);
      commonArea.procClmElig.m21srv2 = claimDetails.claimDosToDate.slice(5, 7) + claimDetails.claimDosToDate.slice(2, 4);
    }

    if (this.procClmElig.m21err1.includes('CLAIM ABORTED')) {
      this.messageBoxService.addMessageBox('Success', MessageBoxType.SUCCESS, 'CLAIM ABORTED');
    }
    if (this.manualClaimService.data) {
      this.data = this.manualClaimService.data;
      commonArea.procClmElig.m21cnm = this.manualClaimService.data.claimNumber;
      commonArea.procClmElig.m21cnm1 = this.manualClaimService.data.claimNumber.slice(0, 5);
      commonArea.procClmElig.m21cnm2 = this.manualClaimService.data.claimNumber.slice(5, 11);
      commonArea.procClmElig.m21memn = this.manualClaimService.data.memberNumber.slice(0, 9);
      commonArea.procClmElig.m21assc = this.manualClaimService.data.memberNumber.slice(10, 11);
      commonArea.procClmElig.m21lnam = this.manualClaimService.data.lastName.slice(0, 4);
      commonArea.procClmElig.m21fint = this.manualClaimService.data.firstName.slice(0, 1);
      commonArea.procClmElig.m21sex = this.manualClaimService.data.gender.slice(0, 1);
      commonArea.procClmElig.m21srv1 = this.manualClaimService.data.serviceDate.slice(5, 7) + this.manualClaimService.data.serviceDate.slice(2, 4);
      commonArea.procClmElig.m21srv2 = this.manualClaimService.data.serviceEndDate ? this.manualClaimService.data.serviceEndDate.slice(5, 7) + this.manualClaimService.data.serviceEndDate.slice(2, 4) : '';
    }

    return true;
  }

  buttonClick(event): void {
    this.btnSubmitEventClick();
  }

  /**
   * Event action btnClearClick
   */
  btnClearClick(): void {
    const commonArea = new Container();
    this.procClmElig = new ProcClmElig();
    this.messageBoxService.reset();
    this.showErrorMessage = false;
    this.setDisplay = false;
    this.divError1 = false;
    this.divError2 = false;
    window.scrollTo(0, 0);
    commonArea.eibAid = 'CLEAR';
  }

  /**
   * Event action btnClearPF5
   */
  async btnClearPF5(): Promise<boolean> {
    let commonArea = new Container();
    commonArea.eibAid = 'PF5';
    commonArea.claimCommArea = this.claimCommarea;
    commonArea.procClmElig = this.procClmElig;
    commonArea.procClmElig.lines = this.procClmEligLines;
    commonArea.claimCommArea.eibTaskN = 'RPHA';
    commonArea.procClmElig.display = true;
    commonArea = await this.procClmEligServiceServiceMainModule(commonArea).toPromise();
    this.procClmElig = commonArea.procClmElig;
    this.procClmEligLines = commonArea.procClmElig.lines;
    this.claimCommarea = commonArea.claimCommArea;
    if (this.procClmElig.m21err1) {
      this.divError1 = false;
    }
    if (this.procClmElig.m21err2) {
      this.divError2 = false;
    }
    window.scrollTo(0, 0);
    return true;
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  /**
   * Event action btnSubmitEventClick
   */

  async btnSubmitEventClick(): Promise<boolean> {
    try {
      this.buttonStatus = 'Working...';
      let commonArea = new Container();
      if (this.procClmElig && this.procClmElig.m21cnm) {
        this.procClmElig.m21cnm1 = this.procClmElig.m21cnm.slice(0, 5);
        this.procClmElig.m21cnm2 = this.procClmElig.m21cnm.slice(5, 11);
      }
      commonArea.eibAid = 'ENTER';
      commonArea.claimCommArea = this.claimCommarea;
      commonArea.procClmElig = this.procClmElig;
      commonArea.procClmElig.lines = this.procClmEligLines;
      commonArea.claimCommArea.eibTaskN = 'RPHA';
      commonArea.procClmElig.display = true;
      commonArea = await this.procClmEligServiceServiceMainModule(commonArea).toPromise();

      this.procClmElig = commonArea.procClmElig;
      this.procClmElig.m21cnm = this.procClmElig.m21cnm1 + '' + this.procClmElig.m21cnm2;
      this.procClmEligLines = commonArea.procClmElig.lines;
      this.setDisplay = this.procClmEligLines.length > 0;
      this.mutipleMemTableData = this.procClmEligLines.map(item => ({...item, m21sel: item.m21sel.replace('.', '')}));
      this.claimCommarea = commonArea.claimCommArea;
      this.showErrorMessage = false;
      this.divError1 = false;
      this.divError2 = false;
      if (this.procClmElig.m21err1) {
        this.buttonStatus = 'Failed';
        this.resetState();
        this.setDisplay = false;
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.procClmElig.m21err1);
      } else if (this.procClmElig.m21err2) {
        this.buttonStatus = 'Failed';
        this.resetState();
        this.setDisplay = false;
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.procClmElig.m21err2);
      } else if (commonArea.redirectTo === 'RPD06O02') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.transferSrv.set('common', this.claimCommarea);
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
      } else {
        this.buttonStatus = 'Success!';
        this.resetState();
      }
    } catch (error) {
      this.buttonStatus = 'Failed';
      this.resetState();
    }
    return true;
  }

  /**
   * Back end calls mainModule
   */
  private procClmEligServiceServiceMainModule(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmelig/procclmeligserviceservice/mainmodule', JSON.stringify(container), options);
  }
}
