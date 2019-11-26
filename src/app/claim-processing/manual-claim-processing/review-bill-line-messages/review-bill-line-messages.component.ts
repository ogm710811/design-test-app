import {HttpClient} from '@angular/common/http';
import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {
  claimProcessingMenuGroupQRId,
  claimProcessingRoutePathBillLineMessages,
  claimProcessingRoutePathProcessClaimMessages,
  claimProcessingRoutePathRoot,
  Dfhcommarea,
  HeaderMaintenanceService,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {Container} from './model/container.model';
import {Rpdmaa5Screen} from './model/rpdmaa5-screen.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::rvwblmessages::rvwblmessages::rvwblmessages
 */
@Component({
  selector: 'fox-app-rvwblmessages',
  templateUrl: './review-bill-line-messages.component.html',
  styleUrls: ['./review-bill-line-messages.component.css']
})
export class ReviewBillLineMessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('inputTable') inputTable: TableComponent;
  rpdmaa5Screen = new Rpdmaa5Screen();
  commonArea = new Dfhcommarea();
  reviewbilllinecolumns: object = [];
  reviewbilllinetabledata: object = [];
  result: any = [];
  resultCurrentSortKey: string;
  resultSortDirection: any;
  isTableConstructed: boolean = false;

  public constructor(protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     protected headerMaintenance: HeaderMaintenanceService,
                     private pageHeaderService: PageHeaderService) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    this.isTableConstructed = false;
    let container = new Container();
    let data: any = undefined;
    let combinedValues: string[];
    let checkingValue: string[];
    let ppCodeIteration: number = 0;
    let messageText: string = '';
    const path =  this.router.url;
    data = this.transferSrv.getData();
    this.commonArea = data['common'];
    this.commonArea = this.commonArea === undefined ? new Dfhcommarea() : this.commonArea;
    container = await this.rvwBLMessageServiceOnLoad(this.commonArea).toPromise();
    data = this.transferSrv.getData();
    this.rpdmaa5Screen = container.rpdmaa5Screen;
    this.commonArea = container.commonArea;
    if (this.rpdmaa5Screen.maa5ErrMsg) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.rpdmaa5Screen.maa5ErrMsg);
    }
    this.result = this.rpdmaa5Screen.rpdmaa5Tabs.filter((item) => this.isEmptyObject(item));
    this.result = this.result.map( (result, index) => {
      checkingValue =  result.maa5Dtl.split(' ');
      if (!isNaN(Number(checkingValue[0])) && !isNaN(Number(checkingValue[3]))) {
        combinedValues = result.maa5Dtl.split( ' ');
        messageText = '';
        ppCodeIteration++;
      } else {
        messageText = messageText + result.maa5Dtl;
      }
      return {
        'serialNumber': combinedValues[0],
        'Plan': combinedValues[1],
        'Provider': combinedValues[2],
        'DOS From': this.getSlashFormatedDateMMDDYYYY(combinedValues[3]),
        'Charge': combinedValues[4],
        'PP Code': combinedValues[6 + ppCodeIteration],
        'messageText': messageText,
      };
    });
    this.result = this.result.filter((item) =>  item.messageText.trim().length > 0);
    this.result = this.result.sort((item, iteration) =>  (item.serialNumber > iteration.serialNumber) ? 1 : (item.messageText.length < iteration.messageText.length) ? 1 : -1);
    this.reviewbilllinetabledata = this.result.reduce((arr, item) => {
      const exists = arr.find(obj => obj.serialNumber === item.serialNumber);
      if (!exists) {
        arr.push(item);
      }
      return arr;
    }, []);
    this.reviewbilllinecolumns = Object.keys(this.reviewbilllinetabledata[0]).map((key, index) => {
      return {
        key: key,
        headerText: index === 0 ? '#' : index === 6 ? 'Message Text' : key,
        sortKey: index === 6 ? null : key,
        kind: index === 4 ? TableColumnKind.CurrencyText : TableColumnKind.Text,
      };
    });
    this.pageHeaderService.customTitle = (path.search(claimProcessingRoutePathRoot) !== -1) ? 'Bill Line Messages' : (path.search(claimProcessingMenuGroupQRId) !== -1) ? 'QR Bill Line Messages' : 'Review Bill Line Messages';

    return true;
  }

  ngAfterViewChecked(): void {
    if (!this.isTableConstructed) {
      this.tableColumnWidth();
      const header1 = document.getElementById('header1');
      const stickyCells = document.getElementsByClassName('column-sticky');
      if (header1 && stickyCells.length > 0) {
        this.isTableConstructed = true;
      }
    }
  }

  /**
   * Event action pf7EventClick
   */
  async pf7EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.rpdmaa5Screen = this.rpdmaa5Screen;
    container.commonArea = this.commonArea;
    data = this.transferSrv.getData();
    container = await this.rvwBLMessageServiceReadPgmTsq(container).toPromise();
    container = await this.rvwBLMessageServiceSetScreenAttr(container).toPromise();
    // this.rvwBLMessageServiceCreateMaa5Screen(container).toPromise();
    container = await this.rvwBLMessageServiceSendDataonly(container).toPromise();
    this.rpdmaa5Screen = container.rpdmaa5Screen;
    this.commonArea = container.commonArea;
    return true;
  }

  /**d
   * Event action pf8EventClick
   */
  async pf8EventClick(): Promise<boolean> {
    const container = new Container();
    let data: any = undefined;
    container.rpdmaa5Screen = this.rpdmaa5Screen;
    container.commonArea = this.commonArea;
    data = this.transferSrv.getData();
    this.rvwBLMessageServiceReadPgmTsq(container).toPromise();
    this.rvwBLMessageServiceSetScreenAttr(container).toPromise();
    // this.rvwBLMessageServiceCreateMaa5Screen(container).toPromise();
    this.rvwBLMessageServiceSendDataonly(container).toPromise();
    this.rpdmaa5Screen = container.rpdmaa5Screen;
    this.commonArea = container.commonArea;
    return true;
  }

  /**
   * Event action DFHPF1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.rpdmaa5Screen = this.rpdmaa5Screen;
    container.commonArea = this.commonArea;
    data = this.transferSrv.getData();
    container = await this.rvwBLMessageServiceReadPgmTsq(container).toPromise();
    container.workStorage.wsReturnPgm = container.commonArea.callingProgram;
    container = await this.rvwBLMessageServiceXcltPgm(container).toPromise();
    this.rpdmaa5Screen = container.rpdmaa5Screen;
    this.commonArea = container.commonArea;
    data = this.transferSrv.getData();
    data['common'] = this.commonArea;
    if (container.workStorage.wsReturnPgm === 'RPD06O51') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBillLineMessages]);
    }
    if (container.workStorage.wsReturnPgm === 'RPD06O54') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimMessages]);
    }
    return true;
  }

  getSlashFormatedDateMMDDYYYY(inputDate): string {
    let dateOfServiceFromFormat = '';
    if (inputDate) {
      if (inputDate.slice(4, 6) > 80) {
        dateOfServiceFromFormat = inputDate.slice(0, 2) + '/' + inputDate.slice(2, 4) + '/' + '19' + inputDate.slice(4, 6);
      } else {
        dateOfServiceFromFormat = inputDate.slice(0, 2) + '/' + inputDate.slice(2, 4) + '/' + '20' + inputDate.slice(4, 6);
      }
    }
    return dateOfServiceFromFormat;
  }

  private isEmptyObject(obj: any): string {
    let hasValue = '';
    Object.keys(obj).forEach(key => {
      hasValue = (obj[key]);
    });
    return hasValue;
  }

  private tableColumnWidth(): void {
    const header1 = document.getElementById('header1');
    if (header1) {
      header1.style.minWidth = '71px';
    }
    const header2 = document.getElementById('header2');
    if (header2) {
      header2.style.minWidth = '154px';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '136px';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '136px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '107px';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '554px';
    }
    const containerTable = document.getElementsByClassName('container-table');
    if (containerTable[0]) {
      containerTable[0]['style'].overflow = 'hidden';
    }
    const stickyCells = document.getElementsByClassName('column-sticky');
    for (let i = 0; i < stickyCells.length; i++) {
      if (stickyCells[i].id === 'header0') {
        stickyCells[i]['style'].width = '53px';
        stickyCells[i]['style']['border-bottom'] = 'none';
      } else {
        stickyCells[i]['style'].width = '53px';
      }
    }
    const tableScrollerVertical = document.getElementsByClassName('table-scroller-vertical');
    if (tableScrollerVertical[0]) {
      tableScrollerVertical[0]['style'].marginLeft = '53px';
    }
  }

  /**
   * Back end calls sendDataonly
   */
  private rvwBLMessageServiceSendDataonly(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/rvwblmessage/rvwblmessageservice/senddataonly', JSON.stringify(container), options);
  }

  /**
   * Back end calls readPgmTsq
   */
  private rvwBLMessageServiceReadPgmTsq(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/rvwblmessage/rvwblmessageservice/readpgmtsq', JSON.stringify(container), options);
  }

  /**
   * Back end calls onLoad
   */
  private rvwBLMessageServiceOnLoad(comarea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/rvwblmessage/rvwblmessageservice/onLoad', JSON.stringify(comarea), options);
  }

  /**
   * Back end calls setScreenAttr
   */
  private rvwBLMessageServiceSetScreenAttr(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/rvwblmessage/rvwblmessageservice/setscreenattr', JSON.stringify(container), options);
  }

  /**
   * Back end calls xcltPgm
   */
  private rvwBLMessageServiceXcltPgm(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/rvwblmessage/rvwblmessageservice/xcltpgm', JSON.stringify(container), options);
  }
}
