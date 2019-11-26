import {MessageBoxService, MessageBoxType} from '@fox/shared';
import {TitleCasePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {
  ClaimHistoryApi,
  PagedResourcesofResourceOfClaimHistMaintHistVO
} from '@fox/rest-clients';
import * as uuid from 'uuid';
import {MaintenanceApprovalService} from '../shared/maintenance-approval.service';
import {MaintenanceApprovalParamsModel} from './maintenance-approval-models/maintenance-approval-params-model';
import {RequestResultSet} from './maintenance-approval-models/maintenance-request-result.model';

@Component({
  selector: 'fox-claim-maintenance-approval',
  templateUrl: './maintenance-approval.component.html',
  styleUrls: ['./maintenance-approval.component.css']
})

export class MaintenanceApprovalComponent implements OnInit {

  isDataDisplay: boolean = false;
  teamSelected: string = '';
  msIdInput: string = '';
  actionTypeSelected: string = '';
  statusSelected: string = '';
  msidRegex = /^[a-z0-9]+$/i;
  actionTypeDescr: string = '';
  statusDescr: string = '';

  maintenanceApprovalFormGroup: FormGroup;
  maintenanceRequestResults: RequestResultSet[] = [];
  parametersUsed: MaintenanceApprovalParamsModel[] = [];

  requestResultPageSize = 10;
  requestResultDataLengthInput;
  requestResultPageTotal = 0;
  currentRequestResultPage = 0;

  requestResultIsDesc: boolean = true;
  requestResultSortColumn: string = 'createdDate';

  reqData = {
    'team': '',
    'actionType': '',
    'status': '',
    'msID': ''
  };

  constructor(private fb: FormBuilder,
              private claimHistMaintainApi: ClaimHistoryApi,
              private messageBoxService: MessageBoxService,
              private requestSvc: MaintenanceApprovalService,
              private titlecasePipe: TitleCasePipe) {
  }

  ngOnInit(): void {

    this.maintenanceApprovalValidation();

    if (this.requestSvc.requestDetailVisited) {
      this.requestSvc.requestDetailVisited = false;
      this.parametersUsed = this.requestSvc.parametersUsed;
      this.populateSearchParam(this.parametersUsed);
      this.getRequests();
    }

  }

  searchData(formControl): void {

    if (formControl.valid) {

      const formValue = formControl.value;
      let team, actionType, status, msID;

      team = formValue.team;
      actionType = formValue.actionType;
      status = formValue.status;
      msID = formValue.msIdFormControl;

      this.reqData = {
        'team': team,
        'actionType': actionType,
        'status': status,
        'msID': msID
      };

      this.getRequests();
    }
  }

  getRequests(): void {
    const res = this.claimHistMaintainApi.getMaintenanceRequests(uuid(),
      this.teamSelected ? this.teamSelected : undefined,
      this.msIdInput ? this.msIdInput : undefined,
      this.actionTypeSelected ? this.actionTypeSelected : undefined,
      this.statusSelected ? this.statusSelected : undefined,
      this.requestResultPageSize ? this.requestResultPageSize : undefined,
      this.currentRequestResultPage,
      this.requestResultSortColumn,
      this.requestResultIsDesc ? 'DSC' : 'ASC');

    this.messageBoxService.reset();

    res.subscribe(requestResult => {
      if (requestResult) {
        this.processRequestsResult(requestResult);
      }
    }, (e) => {
      if (e.status === 404) {
        this.messageBoxService.addMessageBox('No results found for search', MessageBoxType.ERROR, 'Please update your search query and try again.');
        this.isDataDisplay = false;
        this.maintenanceRequestResults = [];
      }
    });
  }

  processRequestsResult(requestResult: PagedResourcesofResourceOfClaimHistMaintHistVO): void {
    if (requestResult && requestResult._embedded && requestResult._embedded.items &&
        requestResult.page && requestResult.page.number !== undefined && requestResult.page.totalPages &&
        requestResult.page.totalElements) {

      this.maintenanceRequestResults = [];
      this.requestSvc.savedResult = [];

      requestResult._embedded.items.forEach(item => {

        const mappedItem: RequestResultSet = new RequestResultSet();
        mappedItem.memberNum = item.aarpMembershipNumber ? item.aarpMembershipNumber : '';
        mappedItem.claimNum = item.claimNumber ? item.claimNumber : '';
        mappedItem.requester = item.requesterMsid ? item.requesterMsid : '';
        mappedItem.approver = item.approverMsid ? item.approverMsid : '';
        mappedItem.actionCode = item.maintAction ? item.maintAction : '';
        mappedItem.maintRequestId = item.maintRequestId ? item.maintRequestId : '';
        mappedItem.denialReason = item.maintRequestUpdateDesc ? item.maintRequestUpdateDesc : '';
        mappedItem.reviewTimeStmp = '';
        mappedItem.timeStamp = '';
        mappedItem.action = '';
        mappedItem.status = '';

        if (item.aarpMembershipNumber) {
          mappedItem.aarpMembrshipNum = this.splitMemberNum(item.aarpMembershipNumber);
        }

        if (item.maintAction) {
          mappedItem.action = this.getActionTypeDescr(item.maintAction);
        }

        if (item.requestStatus) {
          mappedItem.status = this.titlecasePipe.transform(item.requestStatus);
        }

        if (item.requestTimestamp) {
          mappedItem.timeStamp = moment(item.requestTimestamp, 'YYYY-MM-DD hh:mm A').format('MM/DD/YYYY hh:mm A');
        }
        if (item.reviewedTimestamp) {
          mappedItem.reviewTimeStmp = moment(item.reviewedTimestamp, 'YYYY-MM-DD hh:mm A').format('MM/DD/YYYY hh:mm A');
        }

        this.maintenanceRequestResults.push(mappedItem);
        this.requestSvc.savedResult.push(mappedItem);
      });

      this.requestResultDataLengthInput = requestResult.page.totalElements;
      this.currentRequestResultPage = requestResult.page.number;
      this.requestResultPageTotal = requestResult.page.totalPages;
      this.isDataDisplay = true;
      this.getSavedValues();
    }
  }

  maintenanceApprovalValidation(): void {
    this.maintenanceApprovalFormGroup = this.fb.group({
      msIdFormControl: ['', [Validators.pattern(this.msidRegex)]],
      'status': [''],
      'team': [''],
      'actionType': ['']
    });
  }

  public getActionTypeDescr(data: string): string {
    switch (data) {
      case 'TRANSFERCLAIM':
        this.actionTypeDescr = 'Transfer Claim';
        break;
      case 'UPDATEEOB':
        this.actionTypeDescr = 'Update EOB';
        break;
      case 'ACCOUNTTRANSFER':
        this.actionTypeDescr = 'Transfer Member';
        break;
      case 'SPHMAINT':
        this.actionTypeDescr = 'Update Special Handling Code';
        break;
      case 'MEMBERAGGRMAINT':
        this.actionTypeDescr = 'Update Member Aggregate';
        break;
      case 'CROSSREFMAINT':
        this.actionTypeDescr = 'Update Cross-Reference';
        break;
      case 'REACTIVATECLAIM':
        this.actionTypeDescr = 'Reactivate Claim';
        break;
      case 'DELETECLAIM':
        this.actionTypeDescr = 'Delete Claim';
        break;
      default:
        this.actionTypeDescr = '';
    }

    return this.actionTypeDescr;
  }

  getSavedValues(): void {
    this.requestSvc.currentRequestResultPage = this.currentRequestResultPage;
    this.requestSvc.requestResultPageTotal = this.requestResultPageTotal;
    this.requestSvc.requestResultDataLengthInput = this.requestResultDataLengthInput;
    this.requestSvc.requestResultPageSize = this.requestResultPageSize;

    this.getFormValues();
    this.parametersUsed = this.requestSvc.parametersUsed;
  }

  getFormValues(): void {
    this.requestSvc.parametersUsed = [];
    if (!!this.maintenanceApprovalFormGroup) {
      if (this.teamSelected) {
        this.requestSvc.parametersUsed.push({
          paramName: 'Team',
          paramValue: this.teamSelected
        });
      }
      if (this.msIdInput) {
        this.requestSvc.parametersUsed.push({
          paramName: 'Msid',
          paramValue: this.msIdInput
        });
      }
      if (this.actionTypeSelected) {
        this.requestSvc.parametersUsed.push({
          paramName: 'Action Type',
          paramValue: this.actionTypeSelected
        });
      }
      if (this.statusSelected) {
        this.requestSvc.parametersUsed.push({
          paramName: 'Status',
          paramValue: this.statusSelected
        });
      }
    }
  }

  splitMemberNum(memberNum): string {
    const memNum = memberNum.substring(0, 9);
    const associationCode = memberNum.substring(9, 10);
    const houseId = memberNum.substring(10, 11);
    return memNum + ' ' + associationCode + ' ' + houseId;
  }

  private populateSearchParam(parametersUsed: MaintenanceApprovalParamsModel[]): void {
    parametersUsed.forEach(param => {
      if (param.paramName === 'Team') {
        this.teamSelected = param.paramValue;
      }
      if (param.paramName === 'Msid') {
        this.msIdInput = param.paramValue;
      }
      if (param.paramName === 'Action Type') {
        this.actionTypeSelected = param.paramValue;
      }
      if (param.paramName === 'Status') {
        this.statusSelected = param.paramValue;
      }
    });
  }

}
