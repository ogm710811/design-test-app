import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {
  DupCheckClaimSummaryVO,
  DupCheckDupBillLineVO,
  DuplicateCheckApi,
  LineDetailVO,
  PotentialDuplicateDetailVO
} from '@fox/rest-clients';
import {
  claimProcessingRoutePathClaimDrugEob,
  claimProcessingRoutePathClaimMedSuppEob,
  claimProcessingRoutePathDrugChrg,
  claimProcessingRoutePathMedicalVisit,
  claimProcessingRoutePathMedSuppCharge,
  claimProcessingRoutePathMedSuppChargeB,
  claimProcessingRoutePathProcessClaiHospSnf,
  claimProcessingRoutePathProcessClaimException,
  claimProcessingRoutePathProcessClaimNopay,
  claimProcessingRoutePathProcessClaimNopayEob,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathServiceEob,
  Dfhcommarea,
  HeaderMaintenanceService,
  MessageBoxService,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {Container as ContainerS5} from '../../manual-claim-processing/process-claim-drugchrg/model/container.model';
import {Container as ContainerS8} from '../../manual-claim-processing/process-claim-exception/model/container.model';
import {ProcClmXcpt} from '../../manual-claim-processing/process-claim-exception/model/proc-clm-xcpt.model';
import {Rpdmd28Container as ContainerS6} from '../../manual-claim-processing/process-claim-home-health/model/rpdmd28-container.model';
import {Container as ContainerS1} from '../../manual-claim-processing/process-claim-hospital-charge/model/container.model';
import {Rpd06O05MContainer as ContainerS3} from '../../manual-claim-processing/process-claim-medical-visit/model/rpd06-o05-mcontainer.model';
import {Container as ContainerS7} from '../../manual-claim-processing/process-claim-medsupp-charge/model/container.model';
import {Container as ContainerS4} from '../../manual-claim-processing/process-claim-nursing-charge/model/container.model';

@Component({
  selector: 'fox-duplicate-claim-summary',
  templateUrl: './duplicate-claim-summary.component.html',
  styleUrls: ['./duplicate-claim-summary.component.css']
})
export class DuplicateClaimSummaryComponent implements OnInit {
  @Input() chosenBillLineKey: PotentialDuplicateDetailVO[] = [];
  @Input() incomingClaim: LineDetailVO;
  @Input() claimHistoryKey: number;
  @Input() incomingBilline: string[] = [];
  @Output() hideSummaryEvent = new EventEmitter();
  chosenBillLineKeyLocals: PotentialDuplicateDetailVO[] = [];
  screen = new ProcClmXcpt();
  common = new Dfhcommarea();
  containerS1: ContainerS1;
  containerS3: ContainerS3;
  containerS4: ContainerS4;
  containerS5: ContainerS5;
  containerS6: ContainerS6;
  containerS7: ContainerS7;
  containerS8: ContainerS8;
  nextProgram = '';

  constructor(private duplicateCheckApi: DuplicateCheckApi,
              private messageBoxService: MessageBoxService,
              protected transferSrv: TransferSrvService,
              protected httpClient: HttpClient,
              protected router: Router,
              protected headerMaintenance: HeaderMaintenanceService) {
  }

  ngOnInit(): void {
    const data = this.transferSrv.getData();
    this.common = data['common'];
    switch (this.common.callingProgram) {
      case 'RPD06O03':
        this.containerS1 = data['container'];
        break;
      case 'RPD06O05':
        this.containerS3 = data['container'];
        break;
      case 'RPD06O06':
        this.containerS4 = data['container'];
        break;
      case'RPD06O07':
        this.containerS5 = data['container'];
        break;
      case'RPD06O08':
        this.containerS6 = data['container'];
        break;
      case 'RPD06O09':
        this.containerS7 = data['container'];
        break;
      case 'RPD06O10':
        this.containerS8 = data['container'];
        break;
      default:
        break;
    }
    this.nextProgram = data['nextProgram'];
    if (!this.nextProgram) {
      this.nextProgram = this.common.nextProgram;
    }
    this.chosenBillLineKeyLocals = this.chosenBillLineKey.slice();
  }

  hideSummary(): void {
    this.hideSummaryEvent.emit();
  }

  async submit(): Promise<boolean> {
    const data = this.transferSrv.getData();
    const resultSub: DupCheckDupBillLineVO[] = [];
    const calls: Observable<DupCheckClaimSummaryVO>[] = [];
    for (const billLines of this.chosenBillLineKeyLocals) {
      const resultSubset: DupCheckDupBillLineVO = {
        duplicateBillLine: billLines.lineKey ? billLines.lineKey : '',
        historicalClaimNum: billLines.claimNum ? billLines.claimNum : ''
      };
      if (resultSubset !== {}) {
        resultSub.push(resultSubset);
      }
    }

    if (this.incomingClaim !== undefined) {
      const claimNumberForTypeOfServiceScreen = this.common.commComm.claimNumber;
      if (this.common.chargeLineDuplicateIndicatorsPerScreen) {
        const chargeLineDuplicateIndicatorsPerScreen = this.common.chargeLineDuplicateIndicatorsPerScreen;
        if (!chargeLineDuplicateIndicatorsPerScreen.hasOwnProperty(claimNumberForTypeOfServiceScreen)) {
          chargeLineDuplicateIndicatorsPerScreen[claimNumberForTypeOfServiceScreen] = [];
        }
        this.chosenBillLineKeyLocals.map((potentialDuplicateDetailVO) => {
          const duplicateIndicator0 = (potentialDuplicateDetailVO.claimNum) ? potentialDuplicateDetailVO.claimNum : 0;
          chargeLineDuplicateIndicatorsPerScreen[claimNumberForTypeOfServiceScreen].push(duplicateIndicator0);
        });
        this.common.chargeLineDuplicateIndicatorsPerScreen = chargeLineDuplicateIndicatorsPerScreen;
      }
    }
    switch (this.common.callingProgram) {
      case 'RPD06O03':
        break;
      case 'RPD06O05':
        break;
      case 'RPD06O06':
        break;
      case' RPD06O07':
        break;
      case 'RPD06O08':
        break;
      case 'RPD06O09':
        this.containerS7.commonArea = this.common;
        this.containerS7 = await this.procClmMedSupPtBChrgServiceEnterKeyProcess(this.containerS7).toPromise();
        this.common = this.containerS7.commonArea;
        data['container'] = this.containerS7;
        break;
      case 'RPD06O10':
        break;
      default:
        break;
    }
    data['common'] = this.common;
    switch (this.common.nextProgram) {
      case 'RPD06O11':
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaiHospSnf]);
        break;
      case 'RPD06O09':
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathMedSuppCharge]);
        break;
      case 'RPD06O05':
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathMedicalVisit]);
        break;
      case 'RPD06O12':
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimMedSuppEob]);
        break;
      case 'RPD06O29':
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathMedSuppChargeB]);
        break;
      case 'RPD06O10':
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimException]);
        break;
      case 'RPD06O13':
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathServiceEob]);
        break;
      case 'RPD06O04':
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimNopay]);
        break;
      case 'RPD06O07':
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathDrugChrg]);
        break;
      case 'RPD06O22':
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimDrugEob]);
        break;
      case 'RPD06O21':
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimNopayEob]);
        break;
      default:
        break;
    }
    return true;
  }

  /**
   * Back end calls enterKeyProcess
   */
  private procClmMedSupPtBChrgServiceEnterKeyProcess(container: ContainerS7): Observable<ContainerS7> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    const url = '/api/manual/adjudication/services/procclmmedsupptbchrg/procclmmedsupptbchrgservice/enterkeyprocess';
    return this.httpClient.post<ContainerS7>(url, JSON.stringify(container), options);
  }

  private mProcClmMedVisitChrgServiceScreenData_300(container: ContainerS3): Observable<ContainerS3> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<ContainerS3>('/api/manual/adjudication/services/procclmmedvisitchrg/mprocclmmedvisitchrgservice/screendata_300', JSON.stringify(container), options);
  }
}
