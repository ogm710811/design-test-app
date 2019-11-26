import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathOperatorFile,
  dashboardRoutePathRoot,
  Dfhcommarea,
  MessageBoxService,
  PageHeaderService,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {OpMaintenanceService} from '@fox/shared';
import {opInfoVerifyMsg} from '../../operator-maintenance.constants';
import {Container} from './model/container.model';
import {OperatorInfoFieldModel} from './model/operator-info-field.model';
import {Rpdma72} from './model/rpdma72.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::OperInfo::OperInfo::OperInfo
 */
@Component({
  selector: 'fox-op-info',
  templateUrl: './op-info.component.html',
  styleUrls: ['./op-info.component.css']
})
export class OpInfoComponent implements OnInit {
  screen = new Rpdma72();
  common = new Dfhcommarea();
  container = new Container();
  operatorInformationCardTitle: string = 'Operator Information';
  operatorDetailsCardTitle: string = 'Operator Details';
  operatorDetailsSubTitle: string = 'Tab to navigate and update fields.';
  buttonStatus: string = ButtonStatus.SUBMIT;
  isReadOnlyMode = false;
  appointDate: string = '';
  termDate: string = '';
  processingDate: string = '';
  elementsObj = new OperatorInfoFieldModel();

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     protected fb: FormBuilder,
                     private messageBoxService: MessageBoxService,
                     private opMaintenance: OpMaintenanceService,
                     private pageHeaderService: PageHeaderService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    const container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.operInfoServiceMainProc(this.common).subscribe(resp => {
      this.container = resp;
      this.screen = resp.screenbean;
      const lastMaintainenceArr = this.screen.m72mdat.split('/');
      if (lastMaintainenceArr[2]) {
        lastMaintainenceArr[2] = parseInt(lastMaintainenceArr[2], 10) > 80 ? '19' + lastMaintainenceArr[2] : '20' + lastMaintainenceArr[2];
      }
      this.screen.m72mdat = lastMaintainenceArr.join('/');
      this.screen.m72hdr === 'REVIEW' ? this.isReadOnlyMode = true : this.isReadOnlyMode = false;
      if (this.isReadOnlyMode) {
        this.toggleReadOnlyMode();
      }
      this.appointDate = this.getSlashFormatedDateMMDDYYYY(this.screen.m72adat);
      this.termDate = this.getSlashFormatedDateMMDDYYYY(this.screen.m72tdat);
      this.processingDate = this.getSlashFormatedDateMMDDYYYY(this.screen.m72pdat);
      this.common = resp.dfhCommArea;
      this.pageHeaderService.customTitle = this.titleCase(this.screen.m72hdr) + ' Operator Information';
    });

  }

  toggleReadOnlyMode(): void {
    for (const prop in this.elementsObj) {
      if (this.isReadOnlyMode) {
        this.elementsObj[prop]['readOnly'] = 'true';
      } else {
        if (prop !== 'positionDetail' && prop !== 'titleDetail') {
          this.elementsObj[prop]['readOnly'] = '';
        }
      }
    }
  }

  getSlashFormatedDateMMDDYYYY(inputDate): string {
    let dateOfServiceFromFormat = '';
    if (inputDate) {
      if (inputDate.slice(4, 6) > 80) {
        dateOfServiceFromFormat = '19' + inputDate.slice(4, 6) + '-' + inputDate.slice(0, 2) + '-' + inputDate.slice(2, 4);
      } else {
        dateOfServiceFromFormat = '20' + inputDate.slice(4, 6) + '-' + inputDate.slice(0, 2) + '-' + inputDate.slice(2, 4);
      }
    }
    return dateOfServiceFromFormat;
  }

  getServiceFormatedDateMMDDYYYY(inputDate): string {
    let validDateFormat = '';
    if (inputDate) {
      validDateFormat = inputDate.slice(5, 7) + inputDate.slice(8, 10) + inputDate.slice(2, 4);
    }
    return validDateFormat;
  }

  /**
   * Event action ClearEventClick
   */
  clearEventClick(): void {
    this.screen.m72lnam = '';
    this.screen.m72fnam = '';
    this.screen.m72empn = '';
    this.screen.m72adat = '';
    this.appointDate = '';
    this.screen.m72tdat = '';
    this.termDate = '';
    this.screen.m72loc = '';
    this.screen.m72div = '';
    this.screen.m72levl = '';
    this.screen.m72posc = '';
    this.screen.m72posl = '';
    this.screen.m72titc = '';
    this.screen.m72titl = '';
    this.screen.m72colg = '';
    this.screen.m72othr = '';
    this.screen.m72full = '';
    this.screen.m72elqa = '';
    this.screen.m72pdat = '';
    this.processingDate = '';
    this.messageBoxService.reset();
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = ButtonStatus.SUBMIT, 2500);
  }

  /**
   * Event action EnterEventClick
   */
  enterEventClick(): void {
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      this.messageBoxService.reset();
      const container = new Container();
      let data: any = undefined;
      this.screen.m72adat = this.getServiceFormatedDateMMDDYYYY(this.appointDate);
      this.screen.m72tdat = this.getServiceFormatedDateMMDDYYYY(this.termDate);
      this.screen.m72pdat = this.getServiceFormatedDateMMDDYYYY(this.processingDate);
      this.container.screenbean = this.screen;
      this.container.dfhCommArea = this.common;
      this.operInfoServiceProcessTrans(this.container).subscribe(resp => {
        this.container = resp;
        this.screen = resp.screenbean;
        this.common = resp.dfhCommArea;
        data = this.transferSrv.getData();
        data['container'] = this.container;
        if (this.screen.m72err) {
          this.buttonStatus = this.screen.m72err.trim() === opInfoVerifyMsg ? ButtonStatus.SUCCESS : ButtonStatus.FAILED;
          this.resetState();
          this.opMaintenance.displayMessageBox(this.screen.m72err, opInfoVerifyMsg);
        }
        if (data['container'].dfhCommArea.operInfoCmnArea.opcomMessageInd === 'P') {
          data['common'] = this.common;
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.resetState();
          this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile]);
        }
        window.scrollTo(0, 0);
      });
    } catch (error) {
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
    }
  }

  /**
   * Event action ReturnEventClick
   */
  returnEventClick(): void {
    this.messageBoxService.reset();
    const container = new Container();
    let data: any = undefined;
    this.container.screenbean = this.screen;
    this.container.dfhCommArea = this.common;
    this.operInfoServiceCancelTrans(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = resp.screenbean;
      this.common = resp.dfhCommArea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile]);
    });
  }

  private titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  /**
   * Back end calls mainProc
   */
  private operInfoServiceMainProc(dfhcommarea: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operinfo/operinfoservice/mainproc', JSON.stringify(dfhcommarea), options);

  }

  /**
   * Back end calls clearKey
   */
  private operInfoServiceClearKey(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operinfo/operinfoservice/clearkey', JSON.stringify(container), options);

  }

  /**
   * Back end calls processTrans
   */
  private operInfoServiceProcessTrans(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operinfo/operinfoservice/processtrans', JSON.stringify(container), options);

  }

  /**
   * Back end calls cancelTrans
   */
  private operInfoServiceCancelTrans(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operinfo/operinfoservice/canceltrans', JSON.stringify(container), options);

  }
}
