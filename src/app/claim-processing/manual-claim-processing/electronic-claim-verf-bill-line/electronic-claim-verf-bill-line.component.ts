import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  claimProcessingRoutePathElectronicClaimVerfMaint,
  claimProcessingRoutePathRoot,
  DateFormatService,
  Dfhcommarea,
  HeaderMaintenanceService,
  TableColumnKind,
  TransferSrvService
} from '@fox/shared';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {Container} from '../electronic-claim-verf-maint/model/container.model';
import {Rpdma45MapBillLines} from '../electronic-claim-verf-maint/model/rpdma45-map-bill-lines.model';
import {Rpdma45} from '../electronic-claim-verf-maint/model/rpdma45.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::ecverfmnt::ecverfmntScreen45::ecverfmntScreen45
 */
@Component({
  selector: 'fox-app-ecverfmnt-screen45',
  templateUrl: './electronic-claim-verf-bill-line.component.html',
  styleUrls: ['./electronic-claim-verf-bill-line.component.css']
})
export class ElectronicClaimVerfBillLineComponent implements OnInit {
  screenBean = new Rpdma45();
  common = new Dfhcommarea();
  tableData: Rpdma45MapBillLines[];
  columns: Object;

  public constructor(protected httpClient: HttpClient,
                     protected transferSrv: TransferSrvService,
                     private requestDate: DateFormatService,
                     protected router: Router,
                     protected headerMaintenance: HeaderMaintenanceService) {

  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    container = await this.ecVerfMntServiceOnloadProcess(this.common).toPromise();
    this.screenBean = container.screenbean45;
    this.screenBean.map45SavePart.claimServFromDate
      = moment(this.requestDate.getFormatedDateYYYY(container.screenbean45.map45SavePart.claimServFromDate)).format('YYYY-MM-DD');
    this.screenBean.map45SavePart.claimServToDate
      = moment(this.requestDate.getFormatedDateYYYY(container.screenbean45.map45SavePart.claimServToDate)).format('YYYY-MM-DD');
    this.tableData = this.screenBean.map45SavePart.map45BillLines;
    this.columns = Object.keys(this.screenBean.map45SavePart.map45BillLines[0]).map((key, idx) => {
      return {
        key: key,
        header: key,
        border: idx === 1 || idx === 2,
        kind: 2 === idx || 3 === idx || 4 === idx ?
          TableColumnKind.Currency :
          TableColumnKind.Text
      };
    });
    this.common = container.dfhCommonArea;
    window.scrollTo(0, 0);
    return true;
  }

  async pf1EventClick(): Promise<boolean> {
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathElectronicClaimVerfMaint]);
    return true;
  }

  async pf4EventClick(): Promise<boolean> {
    let container = new Container();
    const screen = new Rpdma45();
    container.screenbean45 = screen;
    container.dfhCommonArea = this.common;
    container = await this.ecVerfMntServicePf4KeyProcess(container).toPromise();
    this.screenBean = container.screenbean45;
    this.common = container.dfhCommonArea;
    return true;
  }

  /**
   * Back end calls onloadProcess
   */
  private ecVerfMntServiceOnloadProcess(common: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/ecverfmnt/ecverfmntservice/onloadprocess', JSON.stringify(common), options);

  }

  private ecVerfMntServicePf1KeyProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/ecverfmnt/ecverfmntservice/pf1keyprocess', JSON.stringify(container), options);
  }

  private ecVerfMntServicePf4KeyProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/ecverfmnt/ecverfmntservice/pf4keyprocess', JSON.stringify(container), options);

  }
}
