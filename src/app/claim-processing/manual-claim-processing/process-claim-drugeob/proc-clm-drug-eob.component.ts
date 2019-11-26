import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  claimProcessingRoutePathBillLineMessages,
  claimProcessingRoutePathClaimSuspendClm,
  claimProcessingRoutePathRoot,
  DateFormatService,
  Dfhcommarea,
  HeaderMaintenanceService,
  HeaderRightItem,
  HeaderSubtitleItem,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  ProcessClaimHeaderRightComponent,
  ProcessClaimSubheaderComponent,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Container} from './model/container.model';
import {DrugBillLines} from './model/drug-bill-lines.model';
import {DrugEobFoxSingleSelect} from './model/proc-clm-drug-eob-select-single.model';
import {ProcClmDrugEob} from './model/proc-clm-drug-eob.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmdrugeobservice::ProcClmDrugEobService::ProcClmDrugEobServiceScreen
 */
@Component({
  selector: 'fox-app-proc-clm-drug-eob-service-screen',
  templateUrl: './proc-clm-drug-eob.component.html',
  styleUrls: ['./process-claim-drugeob.component.css']
})
export class ProcClmDrugEobComponent implements OnInit, AfterViewChecked {
  @ViewChild('inputTable') inputTable: TableComponent;
  procClmDrugEob = new ProcClmDrugEob();
  dfhcommarea = new Dfhcommarea();
  billLines: DrugBillLines[] = [];
  buttonStatus: string = 'Submit';
  isHeaderOn = false;
  isModified = false;
  indSelectOptions: DrugEobFoxSingleSelect[] = [
    {key: 'Y', value: 'Y'},
    {key: 'N', value: ' '}
  ];
  drugEobTableColumns: any[] =
    [
      {
        key: 'serialNumber',
        headerText: '#',
        kind: TableColumnKind.Text,
      },
      {
        key: 'assgnInd',
        headerText: 'Assign. Ind',
        kind: TableColumnKind.Input,
        inputType: 'fox-select-single',
        dropDownOptions: this.indSelectOptions
      },
      {
        key: 'plnCode',
        headerText: 'Plan',
        kind: TableColumnKind.Text,
      },
      {
        key: 'typeOfService',
        headerText: 'Type of Service',
        kind: TableColumnKind.Text,
      },
      {
        key: 'prvName',
        headerText: 'Provider',
        kind: TableColumnKind.Text,
      },
      {
        key: 'dateOfService',
        headerText: 'Service Dates',
        kind: TableColumnKind.Text,
      },
      {
        key: 'chrgAmt',
        headerText: 'Charge',
        kind: TableColumnKind.Text,
      },
      {
        key: 'cvrdExp',
        headerText: 'Covered Expense',
        kind: TableColumnKind.Text,
      },
      {
        key: 'dedAmt',
        headerText: 'Deductible',
        kind: TableColumnKind.Text,
      },
      {
        key: 'benAmt',
        headerText: 'Benefit',
        kind: TableColumnKind.Text,
      },
      {
        key: 'ndc',
        headerText: 'NDC',
        kind: TableColumnKind.Text,
      }
    ];
  drugEobTableData: DrugBillLines[] = [];
  suscription: Subscription;
  btnAction: string;

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    private requestDate: DateFormatService,
    protected headerMaintenance: HeaderMaintenanceService,
    private manualCalimService: ManualClaimService,
    private pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    this.suscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
      this.btnAction = item;
      if (this.btnAction && this.btnAction === 'f9') {
        this.onSuspend();
      }
    });
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.dfhcommarea = data['common'];
    container.dfhcommarea = this.dfhcommarea;
    container.procClmDrugEob = this.procClmDrugEob;
    container = await this.procClmDrugEobServiceMain(container).toPromise();
    this.dfhcommarea = container.dfhcommarea;
    this.procClmDrugEob = container.procClmDrugEob;
    this.drugEobTableData = this.procClmDrugEob.drugBillLines.filter((item) => item.plnCode.trim().length > 0);

    if (container && container.procClmDrugEob && container.procClmDrugEob.drugBillLines) {
      for (const index of Object.keys(container.procClmDrugEob.drugBillLines)) {
        if (container.procClmDrugEob.drugBillLines[index].dosFrm) {
          container.procClmDrugEob.drugBillLines[index].dosFrm
            = this.requestDate.getFormatedDateYYYY(container.procClmDrugEob.drugBillLines[index].dosFrm);
          container.procClmDrugEob.drugBillLines[index].validateFromDate = container.procClmDrugEob.drugBillLines[index].dosFrm;
        } else {
          container.procClmDrugEob.drugBillLines[index].validateFromDate = '';
        }
        if (container.procClmDrugEob.drugBillLines[index].dosTo) {
          container.procClmDrugEob.drugBillLines[index].dosTo
            = this.requestDate.getFormatedDateYYYY(container.procClmDrugEob.drugBillLines[index].dosTo);
          container.procClmDrugEob.drugBillLines[index].validateToDate = container.procClmDrugEob.drugBillLines[index].dosTo;
        } else {
          container.procClmDrugEob.drugBillLines[index].validateToDate = '';
        }
      }
    }
    this.drugEobTableData = this.drugEobTableData.map((item, index) => {
      item.serialNumber = index + 1;
      item.dateOfService = item.validateFromDate + ' - ' + item.validateToDate;
      item.chrgAmt = '$' + item.chrgAmt;
      item.benAmt = '$' + item.benAmt;
      item.cvrdExp = '$' + item.cvrdExp;
      item.dedAmt = '$' + item.dedAmt;
      item.assgnInd = item[index].assgnInd === 'Y' ? 'Y' : ' ';
      return item;
    });
    this.billLines = this.procClmDrugEob.drugBillLines;
    return true;
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapBackTheData().subscribe(data => {
        this.drugEobTableData = this.drugEobTableData.map((item, index) => {
          if (data.length === this.drugEobTableData.length) {
            item.assgnInd = data[index].assgnInd === 'Y' ? 'Y' : '';
          }
          return item;
        });
      });
      const header2 = document.getElementById('header2');
      if (header2 && header2.style.minWidth !== '65px') {
        this.tableColumnWidth();
      }
    }
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Drug EOB';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(ProcessClaimSubheaderComponent, {
          memberName: (this.procClmDrugEob) ? this.procClmDrugEob.wholeNm : 'N/A',
          account: (this.procClmDrugEob) ? this.procClmDrugEob.acctNum : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);
    }
    this.pageHeaderService.headerRightItem = new HeaderRightItem(ProcessClaimHeaderRightComponent,
      {
        suspendBtn: {
          display: 'Suspend (F9)', identifier: 'f9', tab: 'ctrl+f9'
        }
      },
      this.componentFactoryResolver,
      this.injector);
  }

  /**
   * Event action ClearEventClick
   */
  clearEventClick(): void {
    this.procClmDrugEob.adjAmt = '';
    this.procClmDrugEob.adjClm = '';
    this.procClmDrugEob.assAdj = '';
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  /**
   * Event action onSubmit
   */
  async onSubmit(): Promise<boolean> {
    try {
      this.buttonStatus = 'Working...';
      let container = new Container();
      let data: any = undefined;
      container.dfhcommarea = this.dfhcommarea;
      container.procClmDrugEob = this.procClmDrugEob;
      container.keyPressed = 'PFENTER';
      container.dfhcommarea.eibTrnId = 'RPE0';
      if (container && container.procClmDrugEob && container.procClmDrugEob.drugBillLines) {
        for (const index of Object.keys(container.procClmDrugEob.drugBillLines)) {
          if (container.procClmDrugEob.drugBillLines[index].validateFromDate) {
            container.procClmDrugEob.drugBillLines[index].dosFrm
              = container.procClmDrugEob.drugBillLines[index].validateFromDate;
          }
          if (container.procClmDrugEob.drugBillLines[index].validateToDate) {
            container.procClmDrugEob.drugBillLines[index].dosTo
              = container.procClmDrugEob.drugBillLines[index].validateToDate;
          }
        }
      }
      for (const index of Object.keys(container.procClmDrugEob.drugBillLines)) {
        if (container.procClmDrugEob.drugBillLines[index].dosFrm) {
          container.procClmDrugEob.drugBillLines[index].dosFrm =
            container.procClmDrugEob.drugBillLines[index].dosFrm.split('/').join('');
        }
        if (container.procClmDrugEob.drugBillLines[index].dosTo) {
          container.procClmDrugEob.drugBillLines[index].dosTo =
            container.procClmDrugEob.drugBillLines[index].dosTo.split('/').join('');
        }
      }
      container = await this.procClmDrugEobServiceMain(container).toPromise();
      this.dfhcommarea = container.dfhcommarea;
      this.procClmDrugEob = container.procClmDrugEob;
      this.billLines = this.procClmDrugEob.drugBillLines;
      data = this.transferSrv.getData();
      data['common'] = this.dfhcommarea;
      if (container && container.procClmDrugEob && container.procClmDrugEob.drugBillLines) {
        for (const index of Object.keys(container.procClmDrugEob.drugBillLines)) {
          if (container.procClmDrugEob.drugBillLines[index].dosFrm) {
            container.procClmDrugEob.drugBillLines[index].dosFrm
              = this.requestDate.getFormatedDate(container.procClmDrugEob.drugBillLines[index].dosFrm);
          }
          if (container.procClmDrugEob.drugBillLines[index].dosTo) {
            container.procClmDrugEob.drugBillLines[index].dosTo
              = this.requestDate.getFormatedDate(container.procClmDrugEob.drugBillLines[index].dosTo);
          }
        }
      }
      if (this.procClmDrugEob.errLine) {
        this.buttonStatus = 'Failed';
        this.resetState();
        this.messageBoxService.addMessageBox(this.procClmDrugEob.errLine, MessageBoxType.ERROR, '');
      }
      if (this.dfhcommarea.nextProgram === 'RPD06O51') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBillLineMessages]);
      }
      if (this.dfhcommarea.nextProgram === 'RPD06O27') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.dfhcommarea.callingProgram = 'RPD06O22';
        this.transferSrv.set('common', this.dfhcommarea);
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBillLineMessages]);
      } else if (this.dfhcommarea.nextProgram === 'RPD06O14') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.dfhcommarea.callingProgram = 'RPD06O22';
        this.transferSrv.set('common', this.dfhcommarea);
      } else if (this.dfhcommarea.nextProgram === 'RPD06O39') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.dfhcommarea.callingProgram = 'RPD06O22';
        this.transferSrv.set('common', this.dfhcommarea);
      } else if (this.dfhcommarea.nextProgram === 'RPD06O15') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.dfhcommarea.callingProgram = 'RPD06O22';
        this.transferSrv.set('common', this.dfhcommarea);
      } else if (this.dfhcommarea.nextProgram === 'RPD07O77') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.dfhcommarea.callingProgram = 'RPD06O22';
        this.transferSrv.set('common', this.dfhcommarea);
      } else if (this.dfhcommarea.nextProgram === 'RPD07O01') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.dfhcommarea.callingProgram = 'RPD06O22';
        this.transferSrv.set('common', this.dfhcommarea);
      }
    } catch (error) {
      this.buttonStatus = 'Failed';
      this.resetState();
    }
    return true;
  }

  /**
   * Event action onSuspend
   */
  async onSuspend(): Promise<boolean> {
    let container = new Container();
    container.dfhcommarea = this.dfhcommarea;
    container.procClmDrugEob = this.procClmDrugEob;
    container.keyPressed = 'DFHPF4';
    container.dfhcommarea.eibTrnId = 'RPE0';
    container = await this.procClmDrugEobServiceMain(container).toPromise();
    this.dfhcommarea = container.dfhcommarea;
    this.procClmDrugEob = container.procClmDrugEob;
    this.billLines = this.procClmDrugEob.drugBillLines;
    if (this.procClmDrugEob.errLine) {
      this.messageBoxService.addMessageBox(this.procClmDrugEob.errLine, MessageBoxType.ERROR, '');
    }
    if (this.dfhcommarea.nextProgram === 'RPD06O27') {
      this.dfhcommarea.callingProgram = 'RPD06O22';
      this.transferSrv.set('common', this.dfhcommarea);
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBillLineMessages]);
    } else if (this.dfhcommarea.nextProgram === 'RPD06O14') {
      this.dfhcommarea.callingProgram = 'RPD06O22';
      this.transferSrv.set('common', this.dfhcommarea);

    } else if (this.dfhcommarea.nextProgram === 'RPD06O39') {
      this.dfhcommarea.callingProgram = 'RPD06O22';
      this.transferSrv.set('common', this.dfhcommarea);
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimSuspendClm]);

    } else if (this.dfhcommarea.nextProgram === 'RPD06O15') {
      this.dfhcommarea.callingProgram = 'RPD06O22';
      this.transferSrv.set('common', this.dfhcommarea);

    } else if (this.dfhcommarea.nextProgram === 'RPD07O77') {
      this.dfhcommarea.callingProgram = 'RPD06O22';
      this.transferSrv.set('common', this.dfhcommarea);

    } else if (this.dfhcommarea.nextProgram === 'RPD07O01') {
      this.dfhcommarea.callingProgram = 'RPD06O22';
      this.transferSrv.set('common', this.dfhcommarea);
    }
    return true;
  }

  /**
   * Back end calls mainModule
   */
  private procClmDrugEobServiceMain(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmdrugeobservice/ProcClmDrugEobService/main', JSON.stringify(container), options);
  }

  private mapBackTheData(): Observable<DrugBillLines[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(results => {
          return {
            assignInd: results['assignInd']
          };
        });
      })
    );
  }

  private tableColumnWidth(): void {
    const header2 = document.getElementById('header2');
    if (header2) {
      header2.style.minWidth = '65px';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '135px';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '193px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '125px';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '83px';
    }
    const header7 = document.getElementById('header7');
    if (header7) {
      header7.style.minWidth = '111px';
    }
    const header8 = document.getElementById('header8');
    if (header8) {
      header8.style.minWidth = '111px';
    }
    const header9 = document.getElementById('header9');
    if (header9) {
      header9.style.minWidth = '117px';
    }
    const header10 = document.getElementById('header10');
    if (header10) {
      header10.style.minWidth = '177px';
    }
  }
}
