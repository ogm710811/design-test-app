import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {
  ClaimStatusVO,
  PagedResourcesOfResourceOfClaimSummaryVO,
  ReferencesApi,
  ReferenceValueVO
} from '@fox/rest-clients';
import {FoxValidators, LoginService, MessageBoxService, MessageBoxType} from '@fox/shared';
import * as moment from 'moment-timezone';
import {ClaimProcessingService} from '../shared/claim-search.service';
import mmddyyyySlashDateValidator = FoxValidators.mmddyyyySlashDateValidator;

@Component({
  selector: 'fox-claim-search-orig',
  templateUrl: './claim-search.component.html',
  styleUrls: ['./claim-search.component.css']
})
export class ClaimSearchOrigComponent implements OnInit {

  eventStateMap = new Map([
    ['PEN', 'PENDING'],
    ['MAT', 'MATCHED'],
    ['ACP', 'ACCEPTED'],
    ['RNF', 'RECORD NOT FOUND'],
    ['REJ', 'REJECTED'],
    ['INV', 'IN-VERIFICATION'],
    ['BYP', 'BYPASSED']
  ]);

  eventStateReasonMap = new Map([
    ['NEW', 'NEW'],
    ['AUT', 'AUTO'],
    ['RNF', 'RECORD NOT FOUND'],
    ['MRR', 'MANUAL REVIEW REQUIRED'],
    ['MAR', 'MANUAL REVIEW'],
    ['STO', 'SYSTEM TIMEOUT'],
    ['KNO', 'KNOWLEDGE'],
    ['RAS', 'REASSIGNED'],
    ['OTH', 'OTHER'],
    ['MTN', 'MAINTENANCE'],
    ['FCE', 'FAILED COMPLIANCE EDITS'],
    ['FPE', 'FAILED PLAN EDITS'],
    ['FCR', 'FAILED COMPLIANCE EDITS AND RNF'],
    ['FCP', 'FAILED COMPLIANCE EDITS AND FAILED PLAN EDITS']

  ]);

  displayedColumns = ['claimNumber', 'memberNumber', 'memberName', 'provider', 'status'
    , 'receiptDate', 'dos', 'history'];
  displayedHistoryColumns = ['assignedBy', 'eventState', 'eventDispositionReason', 'statusDate'];
  dataSource = new MatTableDataSource();
  claimSearchFormGroup: FormGroup;
  isDataDisplay: boolean = false;
  maxDataLength: number = 100;
  claimHistoryId: number;
  claimHistoryPPSClaimId: string;
  showClaimHistoryModal: boolean = false;
  historyDataSource = new MatTableDataSource();
  dobFormControl = new FormControl('', [mmddyyyySlashDateValidator]);
  dosFromFormControl = new FormControl('', [mmddyyyySlashDateValidator]);
  dosToFormControl = new FormControl({value: '', disabled: true}, [mmddyyyySlashDateValidator]);
  recFromFormControl = new FormControl('', [mmddyyyySlashDateValidator]);
  recToFormControl = new FormControl({value: '', disabled: true}, [mmddyyyySlashDateValidator]);
  claimStatusDescriptions: ReferenceValueVO[] = [];

  showNoClaimsAlert: boolean = false;
  showTooManyClaimsAlert: boolean = false;
  canViewImage: boolean = false;

  constructor(private claimSearchSvc: ClaimProcessingService,
              private loginSvc: LoginService,
              private fb: FormBuilder,
              private referencesSvc: ReferencesApi,
              private messageBoxService: MessageBoxService) {
    this.getFormClaimSearch();
  }

  ngOnInit(): void {
    this.getClaimStatus();
    this.canViewImage = this.loginSvc.hasOpViewClaimImageRole;
  }

  convertDateToISO(originalDate): string | null {
    if (originalDate) {
      const dob = originalDate.split('/');
      return dob[2] + '-' + dob[0] + '-' + dob[1];
    } else {
      return null;
    }
  }

  getFindClaim(reqPayload): void {
    this.claimSearchSvc.getClaimSearch(
      reqPayload.ppsClaimId, reqPayload.membershipId, reqPayload.mbi, reqPayload.firstName, reqPayload.lastName,
      this.convertDateToISO(reqPayload.dob), reqPayload.billNpi, reqPayload.billTin,
      this.convertDateToISO(reqPayload.dosFrom), this.convertDateToISO(reqPayload.dosTo),
      this.convertDateToISO(reqPayload.recdateFrom), this.convertDateToISO(reqPayload.recdateTo), reqPayload.status, 100)
      .subscribe((claimSearchResult: PagedResourcesOfResourceOfClaimSummaryVO) => {
        if (claimSearchResult && claimSearchResult._embedded && claimSearchResult._embedded.items) {
          const data = claimSearchResult._embedded.items;
          const ELEMENT_DATA: PagedResourcesOfResourceOfClaimSummaryVO[] = data;
          if (claimSearchResult && claimSearchResult.page && claimSearchResult.page.totalElements && claimSearchResult.page.totalElements <= 100) {
            this.processData(data);
          } else {
            this.isDataDisplay = false;
            this.showTooManyClaimsAlert = true;
          }
        } else {
          this.isDataDisplay = false;
          this.showNoClaimsAlert = true;
        }
      }, (e) => {
        if (e.status === 404) {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Error (404): No Claims Found');
          window.scrollTo(0, 0);
        }
      });
  }

  getClaimStatus(): void {
    const obs = this.referencesSvc.listCategoryCodes('CLAIM_STATUS').subscribe((obj: ReferenceValueVO[]) => {
        this.claimStatusDescriptions = obj;
        this.claimStatusDescriptions.unshift({id: 0, description: 'ALL', code: '', activeFlag: ''});
      }
    );
  }

  formatClaimCode(code: string): string {
    return code.replace('-', '_').toUpperCase();
  }

  pdfUrlText(claimTrackingId: string): string {
    return 'api/membervalidation/claim/' + claimTrackingId + '/image?token=' + this.loginSvc.loginState.access_token;
  }

  removeWhitespace(sourceString): string | null {
    if (sourceString) {
      return sourceString.trim();
    } else {
      return null;
    }
  }

  checkIfDosDateFilled(): void {
    if (!this.dosFromFormControl.invalid && this.dosFromFormControl.value) {
      this.dosToFormControl.reset({value: '', disabled: false});
    } else {
      this.dosToFormControl.reset({value: '', disabled: true});
    }
  }

  checkIfRecDateFilled(): void {
    if (!this.recFromFormControl.invalid && this.recFromFormControl.value) {
      this.recToFormControl.reset({value: '', disabled: false});
    } else {
      this.recToFormControl.reset({value: '', disabled: true});
    }
  }

  checkIfFormFilled(): boolean {
    const values = this.claimSearchFormGroup.value;

    return !!(this.removeWhitespace(values.claimNumber) || this.removeWhitespace(values.memberNumber) ||
      this.removeWhitespace(values.mediId) || this.removeWhitespace(values.firstName) ||
      this.removeWhitespace(values.lastName) || this.removeWhitespace(values.dob) ||
      this.removeWhitespace(values.billTin) || this.removeWhitespace(values.billNpi) ||
      this.removeWhitespace(values.dosFrom) || this.removeWhitespace(values.dosTo) ||
      this.removeWhitespace(values.recdateFrom) || this.removeWhitespace(values.recdateTo));
  }

  getClaimHistory(): void {
    this.historyDataSource = new MatTableDataSource();
    const obs = this.claimSearchSvc.getClaimHistory(this.claimHistoryId);
    if (obs) {
      obs.subscribe(obj => {
        this.historyDataSource = new MatTableDataSource<ClaimStatusVO>(obj);
        for (let k = 0; k < this.historyDataSource.data.length; k++) {
          const eventStateTemp = (this.historyDataSource.data[k] as ClaimStatusVO).eventState;
          if (eventStateTemp != null) {
            (this.historyDataSource.data[k] as ClaimStatusVO).eventState = this.eventStateMap.get(eventStateTemp);
          }

          const eventStateReasonTemp = (this.historyDataSource.data[k] as ClaimStatusVO).eventStateReason;
          if (eventStateReasonTemp != null) {
            (this.historyDataSource.data[k] as ClaimStatusVO).eventStateReason = this.eventStateReasonMap.get(eventStateReasonTemp);
          }

        }
      });
    }
  }

  getPDF(trackingId: string): void {
    const newBlob = new Blob([trackingId], {type: 'application/pdf'});
    console.log('new Blob', newBlob);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/membervalidation/claim/' + trackingId + '/image', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.loginSvc.loginState.access_token);
    xhr.responseType = 'blob';
    xhr.onreadystatechange = function (): void {
      if (xhr.readyState === 4) {
        if (xhr.status >= 400) {
          console.log('Failed in getting PDF');
        } else {
          console.log('resType', xhr.responseType);
          console.log('RESPONSE', xhr.response);
          // console.log('IE11 - claim', window.navigator.msSaveOrOpenBlob);
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            console.log('IE11 - claim', window.navigator.msSaveOrOpenBlob);
            console.log('res', xhr.response, 'BLOB', xhr.responseType);
            console.log('new BLob in IE', newBlob);
            // IE11
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
          }
          const url = URL.createObjectURL(xhr.response);
          const win = window.open('_blank');
          if (win) {
            win.location.assign(url);
          }
        }
      }
    };
    xhr.send(null);
  }

  processData(data): void {
    const dataRes: any[] = [];

    if (data.length > this.maxDataLength) {
      data = data.splice(0, this.maxDataLength);
    }

    for (let k = 0; k < data.length; k++) {
      const item = {
        'claimNumber': data[k].preProcessingSystemClaimId,
        'memberNumber': data[k].claimMember && data[k].claimMember.aarpMembershipNumber ? data[k].claimMember.aarpMembershipNumber : 'N/A',
        'memberName': data[k].claimMember ? data[k].claimMember.firstName + ' ' + data[k].claimMember.lastName : 'N/A',
        'provider': '',
        'status': '',
        'receiptDate': this.formatDateToCST(data[k].claimReceiptDate),
        'dos': '',
        'claimId': data[k].claimId,
        'ppsClaimId': data[k].preProcessingSystemClaimId
      };

      if (data[k].claimStatus && data[k].claimStatus.eventState && data[k].claimStatus.claimEventDate) {
        const statusTemp = this.eventStateMap.get(data[k].claimStatus.eventState) != null ? this.eventStateMap.get(data[k].claimStatus.eventState) : data[k].claimStatus.eventState;
        item.status = statusTemp + ',' + this.formatDateToCST(data[k].claimStatus.claimEventDate);
      }
      if (data[k].claimProviders && data[k].claimProviders.length) {
        item.provider = data[k].claimProviders[0].organizationName;
      }
      if (data[k].serviceFromDate) {
        item.dos = moment.tz(data[k].serviceFromDate, 'America/Chicago').format('MM/DD/YYYY');
      }
      if (data[k].serviceToDate) {
        item.dos += ' - ,';
        item.dos += moment.tz(data[k].serviceToDate, 'America/Chicago').format('MM/DD/YYYY');
      }

      dataRes.push(item);
    }
    if (dataRes.length > 0) {
      this.dataSource.data = dataRes;
      this.isDataDisplay = true;
      this.showNoClaimsAlert = false;
    }
  }

  getFormClaimSearch(): void {
    this.claimSearchFormGroup = this.fb.group({
      'claimNumber': [''],
      'memberNumber': [''],
      'mediId': [''],
      'firstName': [''],
      'lastName': [''],
      'dob': this.dobFormControl,
      'billNpi': [''],
      'billTin': [''],
      'dosFrom': this.dosFromFormControl,
      'dosTo': this.dosToFormControl,
      'recdateFrom': this.recFromFormControl,
      'recdateTo': this.recToFormControl,
      'status': ['']
    });
  }

  resetForm(): void {
    this.claimSearchFormGroup.reset();
    this.resetAlert();
    this.dosToFormControl.reset({value: '', disabled: true});
    this.recToFormControl.reset({value: '', disabled: true});
    this.claimSearchFormGroup.controls['status'].setValue('', {onlySelf: true});
  }

  resetAlert(): void {
    this.showTooManyClaimsAlert = false;
    this.showNoClaimsAlert = false;
  }

  claimSearchSubmit(formControl): void {
    this.resetAlert();
    this.dataSource.data = [];
    const formvalue = formControl.value;
    const reqPayload = {
      'ppsClaimId': formvalue.claimNumber,
      'membershipId': formvalue.memberNumber,
      'mbi': formvalue.mediId,
      'firstName': formvalue.firstName,
      'lastName': formvalue.lastName,
      'dob': formvalue.dob,
      'billNpi': formvalue.billNpi,
      'billTin': formvalue.billTin,
      'dosFrom': formvalue.dosFrom,
      'dosTo': formvalue.dosTo ? formvalue.dosTo : formvalue.dosFrom,
      'recdateFrom': formvalue.recdateFrom,
      'recdateTo': formvalue.recdateTo ? formvalue.recdateTo : formvalue.recdateFrom,
      'status': formvalue.status
    };
    for (const i in reqPayload) {
      if (reqPayload[i]) {
        reqPayload[i] = reqPayload[i].replace(/(^\s+|\s+$)/g, '');
      }
    }

    if (!this.dobFormControl.invalid && !this.dosToFormControl.invalid && !this.dosFromFormControl.invalid &&
      !this.recFromFormControl.invalid && !this.recToFormControl.invalid) {
      this.getFindClaim(reqPayload);
    }
  }

  claimHistoryModal(claimId: number, ppsClaimId: string): void {
    this.showClaimHistoryModal = true;
    this.claimHistoryId = claimId;
    this.claimHistoryPPSClaimId = ppsClaimId;
    this.getClaimHistory();
  }

  formatDateToCST(originalFormat): string {
    return moment.tz(originalFormat, 'America/Chicago').format('MM/DD/YYYY, hh:mmA zz');
  }

  formatClaimStatus(originalFormat: string): string {
    return originalFormat.replace('_', ' ');
  }

}
