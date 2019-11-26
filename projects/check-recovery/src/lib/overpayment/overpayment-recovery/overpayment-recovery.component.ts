import {
  DocumentSearchTableHeaderModel,
  FoxValidators,
  importActionDropDown,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  RegexpReplacePipe
} from '@fox/shared';
import {DatePipe} from '@angular/common';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  MatPaginator,
  MatProgressBar,
  MatTableDataSource
} from '@angular/material';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import * as lodash from 'lodash';
const _ = lodash;
import {
  OverpaymentRecoveryApi,
  OverpaymentRecoveryInputFileVO,
  OverpaymentRecoveryVO,
  PagedResourcesofOverpaymentRecoveryVO,
  PageMetadataVO,
  ReferenceValueVO
} from '@fox/rest-clients';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import mmddyyyySlashDateRegex = FoxValidators.mmddyyyySlashDateRegex;
import mmddyyyySlashDateValidator = FoxValidators.mmddyyyySlashDateValidator;

@Component({
  selector: 'fox-overpayment-recovery',
  templateUrl: './overpayment-recovery.component.html',
  styleUrls: ['./overpayment-recovery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OverpaymentRecoveryComponent implements OnInit, OnDestroy {

  val = 1;
  currentPage: number = 0;
  lastPageIndex = 0;
  pageSize = 5;
  dataSource = new MatTableDataSource();
  hisActionFc: FormControl = new FormControl();
  importFileFormGroup: FormGroup = this.fb.group({});
  importActionDropDown: ReferenceValueVO[] = [];
  filesArray?: FileList = new FileList();
  action: OverpaymentRecoveryInputFileVO.ActionEnum = OverpaymentRecoveryInputFileVO.ActionEnum.Payment;
  importActionValue?: OverpaymentRecoveryInputFileVO.ActionEnum;
  inputFile: OverpaymentRecoveryInputFileVO = new OverpaymentRecoveryInputFileVO();
  temp: ReferenceValueVO[] = [];
  recoveryLog: OverpaymentRecoveryVO[] = [];
  filterLogData: OverpaymentRecoveryVO[] = [];
  page: PageMetadataVO | undefined;
  column: string = '';
  isDesc: boolean = false;
  inputReportDate: string = '';
  vendorName?: string;
  render: boolean = false;
  renderReportDate: boolean = false;
  showConfirmActionModal: boolean = false;
  showProgressModal: boolean = false;
  fileUploaded: boolean = false;
  fileDownloadUrl: string = '';
  localFileLocation: string = '';
  downloadLinkI: SafeResourceUrl = {};
  downloadLinkO: SafeResourceUrl = {};
  inputFileName: string = '';
  outputFileName: string = '';
  isIEOrEdge: boolean = false;
  strI: string | undefined;
  strO: string | undefined;
  numberOfElements: number = 0;
  totalPages: number = 0;
  size: number = 0;
  disableUpload: boolean = true;
  checkFormatDate: boolean = false;
  localFileUpload: string = '';
  currentNavChangeSubscription: Subscription = new Subscription();

  @ViewChild('fileInput1') fileInput1: ElementRef = new ElementRef('fileInput1');
  @ViewChild('fileInput2') fileInput2: ElementRef = new ElementRef('fileInput2');
  @ViewChild(MatPaginator) paginatorObj?: MatPaginator;
  @ViewChild(MatProgressBar) progressBar?: MatProgressBar;
  @Input() dosFromInput: string = '';
  @Input() uploadProgressValue: number = 0;
  tableHeaders: DocumentSearchTableHeaderModel[] = [
    {headerName: 'User', HeaderPO: 'createdBy'},
    {headerName: 'Timestamp', HeaderPO: 'createDate'},
    {headerName: 'Action', HeaderPO: 'recordType'},
    {headerName: 'Status', HeaderPO: 'status'},
    {headerName: 'File Uploaded', HeaderPO: 'inputFile'},
    {headerName: 'Completion Report File', HeaderPO: 'outputFile'},
  ];

  tableSummaryHeaders: DocumentSearchTableHeaderModel[] = [
    {headerName: 'User', HeaderPO: 'createdBy'},
    {headerName: 'Timestamp', HeaderPO: 'createDate'},
    {headerName: 'Action', HeaderPO: 'recordType'},
    {headerName: 'Status', HeaderPO: 'status'},
  ];

  reportDateFc = new FormControl('', [
    mmddyyyySlashDateValidator,
    Validators.required
  ]);

  inputFileFc = new FormControl('', [
    Validators.required
  ]);

  vendorOptionsFc = new FormControl('', [
    Validators.required
  ]);
  uploadImport = new FormControl('', [
    Validators.required
  ]);

  fileImportFc = new FormControl('', [
    Validators.required
  ]);

  constructor(private fb: FormBuilder,
              private msgBoxSvc: MessageBoxService,
              private OverPaymentRecoveryApi: OverpaymentRecoveryApi,
              private sanitizer: DomSanitizer,
              private regexpReplacePipe: RegexpReplacePipe,
              private datePipe: DatePipe,
              public pageHeaderService: PageHeaderService) {
    this.lastPageIndex = this.pageSize;
  }

  ngOnInit(): void {
    this.importActionDropDown = importActionDropDown;
    this.hisActionFc = this.fb.control('');
    this.fileDownloadUrl = 'assets/csv/csv-excel-example-file.csv';
    this.importActionFormValues();
    if (this.paginatorObj) {
      this.dataSource.paginator = this.paginatorObj;
    }
    this.isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent); // Check the Browser If it's IE or Edge
    this.setDisable();
    this.currentNavChangeSubscription = this.pageHeaderService.currentNavChange.subscribe((currentNav: number) => {
      if (currentNav === 2) {
        this.getRecoveryLog(this.hisActionFc.value);
      }
    });
  }

  ngOnDestroy(): void {
    this.currentNavChangeSubscription.unsubscribe();
  }

  changeDetails(e: string): void {
    this.inputReportDate = e;
    if (mmddyyyySlashDateRegex.test(e)) {
      if (this.localFileLocation) {
        this.disableUpload = false;
      }
      this.checkFormatDate = false;
    } else {
      this.disableUpload = true;
      this.checkFormatDate = true;
    }
  }

  setDisable(): void {
    if (this.importActionValue && this.localFileLocation) {
      this.disableUpload = false;
    } else {
      this.disableUpload = true;
    }
  }

  importActionFormValues(): void {
    this.importFileFormGroup = this.fb.group({
      'importActions': this.fileImportFc,
      'inputFile': this.inputFileFc
    });
    let str: string, value: any;
    str = this.renderReportDate ? (value = this.reportDateFc, 'ReportFile') : (this.render ? (value = this.vendorOptionsFc, 'vendorFile') : (value = '', ''));
    if (str) {
      this.importFileFormGroup = this.fb.group({
        'importActions': this.fileImportFc,
        'inputFile': this.inputFileFc,
        [str]: value
      });
    }
    this.setDisable();
  }

  showVendorOptions(): void {

    this.resetForm();
    try {
      if (this.importActionValue === 'R') {
        this.render = false;
        this.renderReportDate = false;
      } else if (this.importActionValue === 'U') {
        this.render = true;
        this.renderReportDate = false;
      } else if (this.importActionValue === 'P') {
        this.render = true;
        this.renderReportDate = false;
      } else if (this.importActionValue === 'C') {
        this.render = false;
        this.renderReportDate = true;
      } else {
        this.render = true;
        this.renderReportDate = false;
      }
    } catch (err) {
      console.log(err);
      this.msgBoxSvc.addMessageBox('Failed', MessageBoxType.ERROR, 'Failed to get Data', 6000);
    }
    this.importActionFormValues();
    this.setDisable();
  }

  onFileChange(files: FileList): void {
    this.localFileLocation = files[0].name;
    this.filesArray = files;
    this.setDisable();
    if (!this.localFileLocation.endsWith('.csv')) {
      this.msgBoxSvc.addMessageBox('Document Upload Unsuccessful', MessageBoxType.ERROR, 'This file is in incorrect format.');
      this.disableUpload = true;
    }
  }

  uploadFile(): void {
    if (this.importFileFormGroup.invalid) {
      this.msgBoxSvc.addMessageBox('File Could Not be Processed', MessageBoxType.ERROR, 'One or more errors prevented this file from being processed.' +
        'Please review the correct file format and structure.');
    } else if (!this.filesArray || !this.importActionValue) {
      this.msgBoxSvc.addMessageBox('File Could Not Be Processed', MessageBoxType.ERROR, 'One or more errors prevented this file from being processed. ' +
        'Please review the correct file format and structure.');
    } else if (this.importActionValue === 'R') {
      this.onClickProceed();
    } else {
      this.showConfirmActionModal = true;
    }
  }

  onClickProceed(): void {
    const theFile = this.filesArray && this.filesArray.length > 0 ? this.filesArray[0] : undefined;
    this.showConfirmActionModal = false;
    if (this.importActionValue !== 'R') {
      this.showProgressModal = true;
    }
    if (this.vendorName) {
      this.inputFile = {
        action: this.importActionValue,
        vendor: this.vendorName
      };
    } else if (this.inputReportDate) {
      this.inputFile = {
        action: this.importActionValue,
        reportDate: this.inputReportDate
      };
    } else if (this.importActionValue && !this.vendorName && !this.inputReportDate) {
      this.inputFile = {
        action: this.importActionValue
      };
    }

    const fr = new FileReader();

    fr.onload = (ev: Event) => {
      const fileBase64: string = (<string>fr.result).replace(/^data:[^;]*;base64,/, '');
      this.inputFile.overpaymentRecoveryInputFile = fileBase64;

      this.OverPaymentRecoveryApi.performOverpayentAction(uuid(), this.inputFile, 'events', true)
        .subscribe(
          (action: HttpEvent<any>) => {
            if (!action) {
              this.msgBoxSvc.addMessageBox('File Could Not Be Processed', MessageBoxType.ERROR, 'One or more errors prevented this file from being processed.' +
                'Please review the correct file format and structure.');
              this.importActionValue = undefined;
              this.resetForm();
            } else if (action.type === HttpEventType.UploadProgress && action.total) {
              this.uploadProgressValue = Math.round(100 * action.loaded / action.total);
              this.fileImportFc = this.fb.control('');
            } else if (action.type === HttpEventType.Response) {
              this.msgBoxSvc.addMessageBox('File Successfully Imported', MessageBoxType.SUCCESS, 'Details of import can be viewed below.', 10000);
              this.showProgressModal = false;
              this.fileUploaded = true;
              this.importActionValue = undefined;
              this.resetForm();
              this.getRecoveryLog(this.hisActionFc.value);
            }
          }, () => {
            this.showProgressModal = false;
            this.msgBoxSvc.addMessageBox('File Could Not Be Processed', MessageBoxType.ERROR, 'One or more errors prevented this file from being processed.' +
              'Please review the correct file format and structure.');
            this.importFileFormGroup.setErrors({'invalid': true});
            this.importActionValue = undefined;
            this.resetForm();
          });
    };

    fr.onerror = (ev: Event) => {
      this.showProgressModal = false;
      this.msgBoxSvc.addMessageBox('File Could Not Be Processed', MessageBoxType.ERROR, 'One or more errors prevented this file from being processed.' +
        'Please review the correct file format and structure.');
      this.importActionValue = undefined;
      this.resetForm();
    };

    if (theFile) {
      fr.readAsDataURL(theFile);
    }
  }

  getRecoveryLog(act: OverpaymentRecoveryInputFileVO.ActionEnum): void {
    this.recoveryLog = [];
    this.filterLogData = [];
    if (this.page && this.page.size) {
      this.size = this.page.size;
    }
    this.OverPaymentRecoveryApi.findOverpaymentRecoveries(uuid(), act, this.size, this.currentPage, 'DESC', 'dateReceived', 'body')
      .pipe(
        map((data: PagedResourcesofOverpaymentRecoveryVO) => {
          if (data._embedded && data._embedded.items) {
            for (const d of data._embedded.items) {
              for (const e of this.importActionDropDown) {
                if (d.recordType === e.code) {
                  d.recordType = e.description;
                }
              }
            }
          }
          return data;
        })
      ).subscribe((resp) => {
      if (resp && resp._embedded && resp._embedded.items) {
        this.recoveryLog = resp._embedded.items;
        this.page = resp.page;
        this.filterLogData = this.recoveryLog;
      }
    }, (err) => {
      if (err.status === 404) {
        this.msgBoxSvc.addMessageBox('No Records Found', MessageBoxType.ERROR, 'Error retrieving Recovery History Log');
      }
    });
  }

  resetForm(): void {
    this.vendorName = '';
    this.inputReportDate = '';
    this.localFileLocation = '';
    this.localFileUpload = '';
    this.filesArray = undefined;
    this.fileInput1.nativeElement.value = '';
    this.fileInput2.nativeElement.value = '';
    this.inputFileFc = this.fb.control('');
    this.uploadImport = this.fb.control('');
  }

  sortData(property: string): void {
    this.column = property;
    this.isDesc = !this.isDesc; // change the direction
    this.recoveryLog.sort((a: OverpaymentRecoveryVO, b: OverpaymentRecoveryVO) => {
      // @ts-ignore
      const nameA: any = a[property]; // ignore upper and lowercase
      // @ts-ignore
      const nameB: any = b[property]; // ignore upper and lowercase
      if (this.isDesc) {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else {
        return nameA < nameB ? 1 : nameA > nameB ? -1 : 0;
      }
    });
  }

  checkFormControlValidity(controlName: string): boolean {
    return this.importFileFormGroup.get(controlName)!.hasError('reguired') && this.importFileFormGroup.get(controlName)!.dirty;
  }

  getInputFile(id: number): boolean {
    this.recoveryLog.forEach(dataStr => {
      if (dataStr.overpaymentRecoveryId === id) {
        this.strI = dataStr.inputFile;
        if (dataStr.createDate) {
          dataStr.createDate = this.regexpReplacePipe.transform(dataStr.createDate, '^(.*)Z$', '$1');
          const dateCreated = this.datePipe.transform(dataStr.createDate, 'MMddyy_HHmm');
          this.inputFileName = dataStr.createdBy + '_' + dateCreated + '.csv';
        }
      }
    });
    if (this.isIEOrEdge) { // If IE or Edge
      const strMimeType = 'application/octet-stream;charset=utf-8';
      if (navigator.msSaveBlob && this.strI) {
        const linkRefI = `data:application/octet-stream;base64,` + btoa(this.strI);
        this.downloadLinkI = this.sanitizer.bypassSecurityTrustResourceUrl(linkRefI);
        return navigator.msSaveBlob(new Blob([this.strI], {type: strMimeType}), this.inputFileName);
      }
    } else if (this.strI) {
      const linkRefI = `data:application/octet-stream;base64,` + btoa(this.strI);
      this.downloadLinkI = this.sanitizer.bypassSecurityTrustResourceUrl(linkRefI);
    }
    return true;
  }

  getOutputFile(id: number): boolean {
    this.recoveryLog.forEach(dataStr => {
      if (dataStr.overpaymentRecoveryId === id) {
        this.strO = dataStr.outputFile;
        if (dataStr.createDate) {
          dataStr.createDate = this.regexpReplacePipe.transform(dataStr.createDate, '^(.*)Z$', '$1');
          const dateCreated = this.datePipe.transform(dataStr.createDate, 'MMddyy_HHmm');
          this.outputFileName = dataStr.createdBy + '_' + dateCreated + '_results.csv';
        }
      }
    });
    if (this.isIEOrEdge) { // If IE or Edge
      const strMimeType = 'application/octet-stream;charset=utf-8';
      if (navigator.msSaveBlob && this.strO) {
        const linkRefO = `data:application/octet-stream;base64,` + btoa(this.strO);
        this.downloadLinkO = this.sanitizer.bypassSecurityTrustResourceUrl(linkRefO);
        return navigator.msSaveBlob(new Blob([this.strO], {type: strMimeType}), this.outputFileName);
      }
    } else if (this.strO) {
      const linkRefO = `data:application/octet-stream;base64,` + btoa(this.strO);
      this.downloadLinkO = this.sanitizer.bypassSecurityTrustResourceUrl(linkRefO);
    }
    return true;
  }

  getExample(): void { // Get the file as blob for IE or Edge
    const content = '1035536 \r\n155262';
    const blob = new Blob([content], {type: 'text/csv'});
    window.navigator.msSaveBlob(blob, 'csv-excel-example-file.csv');
  }

  uploadAnother(): void {
    this.disableUpload = true;
    this.fileUploaded = false;
    this.vendorName = '';
    this.page = undefined;
  }

}
