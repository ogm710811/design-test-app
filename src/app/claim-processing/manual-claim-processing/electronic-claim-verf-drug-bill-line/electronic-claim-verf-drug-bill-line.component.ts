import {TitleCasePipe} from '@angular/common';
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
import {Rpdma49MapBillLines} from '../electronic-claim-verf-maint/model/rpdma49-map-bill-lines.model';
import {Rpdma49} from '../electronic-claim-verf-maint/model/rpdma49.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::ecverfmnt::ecverfmntScreen49::ecverfmntScreen49
 */
@Component({
  selector: 'fox-app-ecverfmnt-screen49',
  templateUrl: './electronic-claim-verf-drug-bill-line.component.html',
  styleUrls: ['./electronic-claim-verf-drug-bill-line.component.css']
})
export class ElectronicClaimVerfDrugBillLineComponent implements OnInit {
  screenBean = new Rpdma49();
  common = new Dfhcommarea();
  columns: Object;
  tableData: Rpdma49MapBillLines[];

  public constructor(protected httpClient: HttpClient,
                     protected transferSrv: TransferSrvService,
                     protected router: Router,
                     private requestDate: DateFormatService,
                     private titlecasePipe: TitleCasePipe,
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
    this.screenBean = container.screenbean49;
    this.tableData = this.screenBean.map49SavePart.map49BillLines;
    this.columns = Object.keys(this.screenBean.map49SavePart.map49BillLines[0]).map((key, idx) => {
      return {
        key: key,
        header: key,
        border: idx === 1 || idx === 2,
        kind: 2 === idx ?
          TableColumnKind.Currency :
          TableColumnKind.Text
      };
    });

    this.screenBean.map49SavePart.map49FromDate
      = moment(this.requestDate.getFormatedDateYYYY(container.screenbean49.map49SavePart.map49FromDate)).format('YYYY-MM-DD');
    this.screenBean.map49SavePart.map49ToDate
      = moment(this.requestDate.getFormatedDateYYYY(container.screenbean49.map49SavePart.map49ToDate)).format('YYYY-MM-DD');
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
    const screen = new Rpdma49();
    container.screenbean49 = screen;
    container.dfhCommonArea = this.common;
    container = await this.ecVerfMntServicePf4KeyProcess(container).toPromise();
    this.screenBean = container.screenbean49;
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
