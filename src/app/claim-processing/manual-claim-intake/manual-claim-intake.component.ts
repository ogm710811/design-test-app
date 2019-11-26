import {
  claimProcessingRoutePathManualClaimReceipt,
  claimProcessingRoutePathRoot,
  memberInformationRoutePathMemberSearch,
  memberInformationRoutePathRoot,
  MessageBoxService,
  MessageBoxType,
  ProgressContextService,
  FeatureFlagService
} from '@fox/shared';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors
} from '@angular/forms';
import {Router} from '@angular/router';
import {
  AssignClaimNumberRequestVO,
  ClaimApi,
  ClaimsMaterialApi,
  ClaimsMemberApi,
  DocMetaApi,
  DocumentManagementApi,
  DocumentVO,
  ManualClaimApi,
  ManualClaimDetailVO,
  ManualClaimIntakeVO,
  ManualClaimUploadVO,
  MemberApi,
  ResourceOfSearchMemberVO
} from '@fox/rest-clients';
import * as moment from 'moment';
import {Subscription} from 'rxjs/Rx';
import * as uuid from 'uuid';
import {ManualClaimIntakeModel} from './manual-claim-intake.model';
import {ManualClaimService} from './manual-claim-service.service';

@Component({
  selector: 'fox-manual-claim-intake',
  templateUrl: './manual-claim-intake.component.html',
  styleUrls: ['./manual-claim-intake.component.css']
})
export class ManualClaimIntakeComponent implements OnInit {

  @ViewChild('formDirective') formDirective;
  @ViewChild('fileInput') fileInput;
  @ViewChild('doesImageExist') doesImageExist;
  manualClaimIntakeFormGroup: FormGroup;
  memberListResultSet: ManualClaimIntakeModel[] | undefined;
  isDesc: boolean;
  column: string;
  direction: number;
  localFileLocation: string = 'No file chosen';
  isFileSelected: boolean = false;
  filesArray?: FileList | null;
  isMemberNotFound = false;
  selectedMember: string;
  imageAsBinary: string;
  manualClaimUploadResponse: ManualClaimDetailVO;
  isContinuing: boolean;
  progressBarColor: string = 'primary';
  progressBarMode: string = 'determinant';
  progressBarValue: number;
  progressBarBufferValue: number;
  uploadDetailText: string = 'Checking account lock status';
  subs: Subscription[] = [];
  uploadSub: Subscription;
  dcn: string | undefined;
  isCancelled: boolean = false;
  imageSource: string = '';
  userProvided: string = '';
  findMember: boolean = false;
  isDefault: boolean = true;
  memberNumber = this.fb.control('');
  serviceStartDate = this.fb.control('');
  serviceEndDate = this.fb.control('');
  innerWidth: number = 0;
  memberSearchUrl = memberInformationRoutePathRoot + '/' + memberInformationRoutePathMemberSearch;

  get dataHistoryKeys(): string[] | undefined {
    if (this.memberListResultSet) {
      return Object.keys(this.memberListResultSet[0]);
    }
  }

  get toggleLockAccountServiceFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F4072');
  }

  constructor(private memberApi: MemberApi,
              private fb: FormBuilder,
              private claimsMemberApi: ClaimsMaterialApi,
              private progressSvc: ProgressContextService,
              private docMgmtApi: DocumentManagementApi,
              private messageBoxService: MessageBoxService,
              private manualClaimService: ManualClaimService,
              private router: Router,
              private manualClaimApi: ManualClaimApi,
              private claimApi: ClaimApi,
              private claimMemberApi: ClaimsMemberApi,
              private docMetaApi: DocMetaApi,
              private featureFlagSvc: FeatureFlagService) {
    this.manualClaimIntakeForm();
  }

  ngOnInit(): void {
    this.sort('memberNumber');
    this.innerWidth = window.innerWidth;
  }

  manualClaimIntakeForm(): void {
    this.manualClaimIntakeFormGroup = this.fb.group({
      memberNumber: this.memberNumber,
      serviceDateStart: this.serviceStartDate,
      serviceDateEnd: this.serviceEndDate
    }, {validator: this.endDateValidator});
  }

  findMembers(): void {
    this.messageBoxService.reset();
    if (moment(this.serviceEndDate.value) < moment(this.serviceStartDate.value)) {
      this.messageBoxService.addMessageBox('Service Start Date is beyond Service End Date', MessageBoxType.ERROR, 'Service End Date must be greater than or equal to Service Start date');
    } else if (moment(this.serviceStartDate.value) > moment() || moment(this.serviceEndDate.value) > moment()) {
      this.messageBoxService.addMessageBox('Service Dates cannot be in the future', MessageBoxType.ERROR, 'Neither Service Start Date nor Service End Date may be in the future');
    } else {
      this.isMemberNotFound = false;
      this.memberListResultSet = [];
      this.localFileLocation = 'No file chosen';
      this.isFileSelected = false;
      this.selectedMember = '';
      const obs = this.memberApi.searchMember('0', this.memberNumber.value, undefined, undefined, undefined, undefined, undefined, undefined, uuid());
      if (obs) {
        this.progressSvc.forTag('search-member').watch(obs).subscribe(response => {
          if (response._embedded && response._embedded.items) {
            this.processSearchResults(response._embedded.items, this.memberNumber.value);
            if (response._embedded.items.length > 0) {
              this.findMember = true;
              this.isDefault = false;
            } else {
              this.findMember = false;
            }
          }
        }, e => {
          if (e.status === 404) {
            this.isMemberNotFound = true;
            this.isDefault = false;
            this.findMember = false;
          }
        });
      }
    }
  }

  processSearchResults(input: ResourceOfSearchMemberVO[], memberNum: string): void {
    this.memberListResultSet = [];
    this.memberListResultSet = input.map(item => {
      const mappedItem: ManualClaimIntakeModel = new ManualClaimIntakeModel();
      if (item.name && item.identifiers) {
        mappedItem.memberNumber = item.identifiers.aarpMembershipNumber + ' ' + item.identifiers.aarpAssociationId + ' ' + item.identifiers.aarpInsuredCd;
        mappedItem.lastName = item.name.lastName ? item.name.lastName : '';
        mappedItem.firstName = item.name.firstName ? item.name.firstName : '';
        mappedItem.genderCode = item.name.gender ? item.name.gender : '';
        if (item.identifiers.aarpMembershipNumber && item.identifiers.aarpAssociationId && item.identifiers.aarpInsuredCd) {
          this.claimMemberApi.getMigrationStatus(uuid(), item.identifiers.aarpMembershipNumber + item.identifiers.aarpAssociationId + item.identifiers.aarpInsuredCd).subscribe((memberMigration) => {
            if (memberMigration.memberMigrated) {
              mappedItem.migrated = memberMigration.memberMigrated;
            } else {
              mappedItem.migrated = false;
            }
          }, e => {
            this.messageBoxService.reset();
            this.messageBoxService.addMessageBox('Member Migration Error Message', MessageBoxType.ERROR, 'An error occurred with the Member Migration Service.  Please try again.');
            window.scrollTo(0, 0);
          });
        }
      }
      return mappedItem;
    });

    if (memberNum.length === 11) {
      const member = this.memberListResultSet.find(m => m.memberNumber.replace(/ /g, '') === memberNum);
      this.memberListResultSet = [];
      this.memberListResultSet.push(member as ManualClaimIntakeModel);
    }
  }

  onFileChange(files: FileList | null): void {
    if (files) {
      this.localFileLocation = files[0].name;
      this.isFileSelected = true;
      this.filesArray = files;
      const reader = new FileReader();
      if (files && files.length > 0) {
        const file = files[0];
        reader.onload = () => {
          this.imageAsBinary = reader.result!.toString().split(',')[1];
        };
        reader.readAsDataURL(file);
      }
    }
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  onClickContinue(): void {
    this.progressBarValue = 0;
    this.isContinuing = true;
    this.uploadDetailText = 'Checking account lock status...';
    if (this.toggleLockAccountServiceFeature) {
      this.subs.push(this.claimsMemberApi.getLockAccountStatus(this.selectedMember.replace(/ /g, ''), uuid()).subscribe(lock => {
        this.progressBarValue = 10;
        if (lock && lock.lockStatus === 'UNLOCKED') {
          let manualClaimDetail: ManualClaimDetailVO = {
            claimNumber: '',
            serviceDate: '',
            firstName: '',
            lastName: '',
            memberNumber: '',
            gender: ''
          };
          this.uploadDetailText = 'Retrieving member details...';
          this.subs.push(this.memberApi.getMemberByMemberNumber(this.selectedMember.replace(/ /g, ''), uuid()).subscribe(mem => {
            if (mem.memberDetails && mem.memberDetails.memberName && mem.memberDetails.gender) {
              const memberNumRaw = this.selectedMember.replace(/ /g, '');
              this.progressBarValue = 20;
              const assignClaimNumberRequest: AssignClaimNumberRequestVO = {
                sourceKey: '',
                claimReceiptDate: moment().format('YYYY-MM-DD'),
                carrierId: '1',
                state: 'YY'
              };
              this.claimApi.assignClaimNumber(assignClaimNumberRequest, uuid()).subscribe((resp) => {
                if (mem.memberDetails && mem.memberDetails.memberName && mem.memberDetails.gender) {
                  manualClaimDetail = {
                    claimNumber: resp.claimNumber ? resp.claimNumber : '',
                    memberNumber: memberNumRaw.substr(0, Math.min(memberNumRaw.length, 9)),
                    lastName: mem.memberDetails.memberName.lastName ? mem.memberDetails.memberName.lastName : '',
                    firstName: mem.memberDetails.memberName.firstName ? mem.memberDetails.memberName.firstName : '',
                    gender: mem.memberDetails.gender,
                    serviceDate: this.serviceStartDate.value,
                    serviceEndDate: this.serviceEndDate.value ? this.serviceEndDate.value : undefined
                  };
                  const manualClaimUpload: ManualClaimUploadVO = {
                    manualClaimDetail: manualClaimDetail,
                    filename: this.localFileLocation === 'No file chosen' ? undefined : this.localFileLocation,
                    application: 'Standard SHIP',
                    documentBinary: this.imageAsBinary,
                    documentFile: 'base64.pdf'
                  };
                  if (this.doesImageExist.value === 'false') {
                    this.uploadDetailText = 'Uploading claim image...';
                    this.uploadSub = (this.docMgmtApi.uploadManualClaim(manualClaimUpload, uuid(), 'events', true).subscribe(mcuRes => {
                      if (mcuRes && mcuRes.type === HttpEventType.UploadProgress && mcuRes.total) {
                        this.progressBarValue = Math.round(20 + (79 * (mcuRes.loaded / mcuRes.total)));
                      } else if (mcuRes instanceof HttpResponse && mcuRes.body) {
                        this.dcn = mcuRes.body.dcn;
                        if (this.isCancelled && this.dcn) {
                          this.manualClaimApi.deleteManualClaim(manualClaimDetail.claimNumber, uuid()).subscribe();
                          this.isCancelled = false;
                        } else {
                          this.manualClaimUploadResponse = mcuRes.body;
                          this.manualClaimUploadResponse.memberNumber = this.selectedMember;
                          this.manualClaimService.add(mcuRes.body);
                          this.dcn = mcuRes.body.dcn;
                          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathManualClaimReceipt]);
                        }
                      }
                    }, () => {
                      this.isContinuing = false;
                      this.messageBoxService.reset();
                      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'An error occurred attaching the document/image.  Please try again.');
                      window.scroll(0, 0);
                    }));
                  } else if (this.doesImageExist.value === 'true') {
                    this.uploadDetailText = 'Creating claim...';
                    const docVo: DocumentVO = {
                      docControlNumber: this.userProvided,
                      claim: {claimNumber: +manualClaimDetail.claimNumber},
                      documentType: 'DT2',
                      member: {
                        accountNumber: +manualClaimDetail.memberNumber,
                        firstName: manualClaimDetail.firstName,
                        lastName: manualClaimDetail.lastName,
                        gender: manualClaimDetail.gender
                      }
                    };
                    if (this.imageSource === 'fastrieve') {
                      this.docMetaApi.createDocumentMetadata(docVo, uuid()).subscribe(cdmResp => {
                      });
                    }
                    if (this.imageSource === 'fox') {
                      this.docMetaApi.updateDocumentMetadata(this.userProvided, docVo, uuid()).subscribe(cdmResp => {
                      });
                    }
                    const manualClaimVo: ManualClaimIntakeVO = {
                      dcn: this.userProvided,
                      claimNumber: manualClaimDetail.claimNumber,
                      memberNumber: manualClaimDetail.memberNumber,
                      lastName: manualClaimDetail.lastName,
                      firstName: manualClaimDetail.firstName,
                      gender: manualClaimDetail.gender,
                      serviceDate: manualClaimDetail.serviceDate,
                      serviceEndDate: manualClaimDetail.serviceEndDate,
                      createdBy: manualClaimDetail.createdBy
                    };
                    this.manualClaimApi.createManualClaim(manualClaimVo, uuid()).subscribe(mccRes => {
                      this.progressBarValue = 100;
                      this.manualClaimService.clear();
                      this.manualClaimService.data.createdBy = mccRes.createdBy;
                      this.manualClaimService.data.serviceEndDate = mccRes.serviceEndDate;
                      this.manualClaimService.data.serviceDate = mccRes.serviceDate;
                      this.manualClaimService.data.gender = mccRes.gender;
                      this.manualClaimService.data.firstName = mccRes.firstName;
                      this.manualClaimService.data.lastName = mccRes.lastName;
                      this.manualClaimService.data.memberNumber = mccRes.memberNumber;
                      this.manualClaimService.data.claimNumber = mccRes.claimNumber;
                      this.manualClaimService.data.dcn = mccRes.dcn;
                      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathManualClaimReceipt]);
                    });
                  }
                }
              }, () => {
                this.isContinuing = false;
                this.messageBoxService.reset();
                this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'An error occurred while calling claim number assignment api.  Please try again.');
                window.scroll(0, 0);
              });
            }
          }));
        } else {
          this.isContinuing = false;
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'The member account is locked by another user.');
          window.scroll(0, 0);
          this.manualClaimIntakeFormGroup.reset();
          this.localFileLocation = 'No file chosen';
          this.isFileSelected = false;
          this.filesArray = null;
          this.fileInput.nativeElement.value = '';
          this.onFileChange(null);
          this.selectedMember = '';
          this.memberListResultSet = undefined;
        }
      }));
    } else {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Functionality is disabled');
    }
  }

  cancelSubs(): void {
    this.isCancelled = true;
    this.subs.forEach(sub => sub.unsubscribe());
    this.isContinuing = false;
  }

  endDateValidator(ctl: AbstractControl): ValidationErrors | null {
    const startDate = ctl.get('serviceDateStart');
    const endDate = ctl.get('serviceDateEnd');

    const startDateMoment = moment(startDate!.value, 'MM/DD/YYYY');
    const endDateMoment = moment(endDate!.value, 'MM/DD/YYYY');

    if (startDateMoment.isAfter(endDateMoment) && endDate) {
      const obj = {};
      obj['endDateBeforeStartDate'] = 'End Date cannot be before start date';
      endDate.setErrors(obj);
      return obj;
    }
    return null;
  }

  openMemberSearch(): void {
    window.open('../../#/' + this.memberSearchUrl);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.innerWidth = event.target.innerWidth;
  }

}
