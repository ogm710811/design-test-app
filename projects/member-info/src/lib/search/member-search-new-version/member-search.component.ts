import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  AarpMembershipNumberVO,
  MemberApi,
  MemberDetailsVO,
  PagedResourcesOfResourceOfSearchMemberVO,
  PageMetadataVO,
  ResourceOfAccountMembershipResponseVO,
  ResourceOfSearchMemberVO
} from '@fox/rest-clients';
import {
  CommonService,
  LoginService,
  memberInformationUrlPrefixMemberProfile,
  MessageBoxService,
  MessageBoxType,
  PaginatorNonMaterialComponent,
  StatusAndAction,
  TableColumnKind
} from '@fox/shared';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {MemberInformationService} from '../../shared/member-information.service';

export enum MemberEndpoints {
  nineDigits,
  memberParams
}

export interface DataTableObject {
  'Member #': string;
  'Medicare #': string;
  'Last Name': string;
  'First Name': string;
  'Middle Name': string;
  'Date of Birth': string;
  'Status': string[];
}

export interface MemberParams {
  membershipNumber?: string;
  firstName?: string;
  lastName?: string;
  state?: string;
  dateOfBirth?: string;
}

export interface MemberDataItem {
  aarpMembershipNumber?: AarpMembershipNumberVO | string;
  aarpAssociationId?: number | string;
  memberAccountNo?: string;
  medicareId?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  dateOfBirth?: string;
  isActive?: boolean;
  mdmRecordNumber?: number | string;
}

export class MemberNumberValidator {
  static checkMemberNumberLength(control: AbstractControl): ValidationErrors | null {
    let valid: boolean = true;
    const membershipNumber = control.value;
    if (membershipNumber) {
      if (membershipNumber.length === 10) {
        valid = false;
      }
    }
    return valid ? null : {'noValidMemberNumber': true};
  }
}

// @ts-ignore
export const checkInputChanges: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  let valid: boolean = true;
  const membershipNumber = control.get('memberFormControl');
  const firstName = control.get('memberFirstNameFormControl');
  const lastName = control.get('memberLastNameFormControl');

  if (membershipNumber && firstName && lastName) {
    if (!membershipNumber.value && !firstName.value && !lastName.value) {
      valid = false;
    }
    if ((firstName.value && !lastName.value) || (!firstName.value && lastName.value)) {
      valid = false;
    }
  }
  return valid ? null : {'noValidForm': true};
};

@Component({
  selector: 'fox-member-search-new-version',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})

export class MemberSearchComponent implements AfterViewInit {
  memberSearchFormGroup: FormGroup = this.fb.group({});
  memberDataSource: DataTableObject[] = [];
  tableColumns: any = {};
  tableColumnCurrentSortKey: string = '';
  tableColumnCurrentSortDirection: string = '';
  isDataDisplay: boolean = false;
  nameRegex = /^[A-Za-z][A-Za-z '-]*$/;
  showMemberSearch: string = '';
  memberSearchPageSize = 5;
  memberSearchResultsDataLengthInput?: number = 0;
  memberSearchPageTotal = 0;
  currentMemberSearchPage = 0;
  paramsMemberResult: MemberDataItem[] = [];
  column = 'memberAccountNo';
  direction = -1;
  isDesc = false;

  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;
  @Output() statusChange = new EventEmitter<StatusAndAction>();

  get memberFormControl(): AbstractControl | null {
    if (this.memberSearchFormGroup) {
      return this.memberSearchFormGroup.get('memberFormControl');
    }
    return null;
  }

  private _memberServiceApi: Map<string, Function> = new Map([
    ['NINE_DIGITS_MEMBER_ENDPOINT', (memberParams: MemberParams): void => {
      if (memberParams && memberParams.membershipNumber) {
        this.memberSvc.getMemberByNineDigitAccountNumber(memberParams.membershipNumber, uuid()).subscribe(searchResult => {
          if (searchResult && searchResult._embedded && searchResult._embedded.items) {
            this.memberBackApi.savedMemberSearchResult = [];
            this.paramsMemberResult = [];
            const memberData: ResourceOfAccountMembershipResponseVO[] = searchResult._embedded.items;
            this.buildParamsMemberResult(memberData, MemberEndpoints.nineDigits);
            this.buildTableAndPaginatorData(searchResult);
          }
        }, e => {
          this.displayErrorMessage(e);
          this.isDataDisplay = false;
        });
      }
    }],
    ['ELEVEN_DIGITS_MEMBER_ENDPOINT', (memberParams: MemberParams): void => {
      if (memberParams) {
        if (memberParams && memberParams.membershipNumber) {
          this.memberSvc.getMemberByMemberNumber(memberParams.membershipNumber, uuid()).subscribe(searchResult => {
            if (searchResult) {
              this.memberBackApi.savedMemberSearchResult = [];
              this.paramsMemberResult = [];
              let memberAccountNo: string;
              const memberData: ResourceOfAccountMembershipResponseVO[] = [];
              const membershipResponse: ResourceOfAccountMembershipResponseVO = {
                memberDetails: searchResult.memberDetails,
                insuredPlan: searchResult.insuredPlan,
                mdmMemHeaderDetails: searchResult.mdmMemHeaderDetails,
                auxiliaryParty: searchResult.auxiliaryParty,
              };
              memberData.push(membershipResponse);
              const memberItem = this.getMemberItemWithDigits(memberData, 0);
              this.paramsMemberResult.push(memberItem);
              this.memberBackApi.savedMemberSearchResult.push(memberItem);

              if (membershipResponse.memberDetails) {
                const memberDetails: MemberDetailsVO = membershipResponse.memberDetails;
                const aarpMembershipNumber = memberDetails.aarpMembershipNumber;
                const householdId = memberDetails.householdId;
                if (aarpMembershipNumber && householdId) {
                  if (aarpMembershipNumber.membershipNumber && aarpMembershipNumber.associationId && householdId[0].insuredCode) {
                    memberAccountNo = aarpMembershipNumber.membershipNumber + aarpMembershipNumber.associationId + householdId[0].insuredCode;
                    this.navigateToMemberProfile(memberAccountNo);
                  }
                }
              }
            }
          }, e => {
            this.displayErrorMessage(e);
            this.isDataDisplay = false;
          });
        }
      }
    }],
    ['PARAMETERS_MEMBER_ENDPOINT', (memberParams: MemberParams): void => {
      if (memberParams && this.memberSearchPageSize && this.currentMemberSearchPage) {
        this.memberSvc.searchMember('1', undefined, memberParams.firstName, memberParams.lastName, this.memberSearchPageSize.toString(), this.currentMemberSearchPage.toString(), undefined, undefined, uuid()).subscribe(searchResult => {
          if (searchResult && searchResult._embedded && searchResult._embedded.items) {
            this.memberBackApi.savedMemberSearchResult = [];
            this.paramsMemberResult = [];
            const memberData: ResourceOfSearchMemberVO[] = searchResult._embedded.items;
            this.buildParamsMemberResult(memberData, MemberEndpoints.memberParams);
            this.buildTableAndPaginatorData(searchResult);
          }
        }, (e) => {
          this.displayErrorMessage(e);
          this.isDataDisplay = false;
        });
      }
    }],
  ]);

  constructor(
    private loginSvc: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonSvc: CommonService,
    private fb: FormBuilder,
    private memberSvc: MemberApi,
    private memberBackApi: MemberInformationService,
    private messageBoxService: MessageBoxService
  ) {
    this.memberSearchForm();
  }

  ngAfterViewInit(): void {
    if (this.memberBackApi.showMemberSearchBoolean) {
      const dataToDisplay = this.memberBackApi.savedMemberSearchResult;
      this.setGlobalDataTableComponent(dataToDisplay);
      this.paramsMemberResult = this.memberBackApi.savedMemberSearchResult.slice();
      this.memberBackApi.showMemberSearchBoolean = false;
    }

    if (this.memberDataSource.length > 0) {
      this.isDataDisplay = true;
      this.currentMemberSearchPage = this.memberBackApi.currentMemberSearchPage;
      this.memberSearchPageTotal = this.memberBackApi.memberSearchPageTotal;
      this.memberSearchPageSize = this.memberBackApi.memberSearchPageSize;
      this.memberSearchResultsDataLengthInput = this.memberBackApi.memberSearchDataLengthInput;
      this.calculateResults();
    }
  }

  resetForm(): void {
    this.memberSearchFormGroup.reset();
  }

  memberSearchForm(): void {
    this.memberSearchFormGroup = this.fb.group({
      memberFormControl: ['', [MemberNumberValidator.checkMemberNumberLength]],
      memberFirstNameFormControl: ['', [Validators.minLength(1), Validators.maxLength(25), Validators.pattern(this.nameRegex)]],
      memberLastNameFormControl: ['', [Validators.minLength(1), Validators.maxLength(35), Validators.pattern(this.nameRegex)]]
    }, {validators: checkInputChanges});

    this.showMemberSearch = this.activatedRoute.snapshot.queryParamMap.get('showMemberSearch') || '';
  }

  memberResultTable(): void {
    const values = this.memberSearchFormGroup.value;
    const membershipNumber = !values.memberFormControl ? '' : values.memberFormControl;
    const firstName = !values.memberFirstNameFormControl ? '' : values.memberFirstNameFormControl;
    const lastName = !values.memberLastNameFormControl ? '' : values.memberLastNameFormControl;
    const memberParamsApi: MemberParams = {
      membershipNumber: membershipNumber,
      firstName: firstName,
      lastName: lastName,
    };

    this.currentMemberSearchPage = 0;
    this.memberSearchPageSize = 5;

    this.memberBackApi.memberSearchPageSize = 5;
    this.memberBackApi.currentMemberSearchPage = 0;

    if (membershipNumber || (membershipNumber && firstName && lastName) || (firstName && lastName)) {
      if (membershipNumber.length > 0 && firstName.length === 0 && lastName.length === 0) {
        this.callMemberServiceApis(membershipNumber, memberParamsApi);
      }
      if (membershipNumber.length > 0 && firstName.length > 0 && lastName.length > 0) {
        this.callMemberServiceApis(membershipNumber, memberParamsApi);
      }
      if (membershipNumber.length === 0 && firstName.length > 0 && lastName.length > 0) {
        const apiCall = this._memberServiceApi.get('PARAMETERS_MEMBER_ENDPOINT');
        if (apiCall) {
          apiCall(memberParamsApi);
        }
      }
    }
  }

  callMemberServiceApis(membershipNumber: string, memberParamsApi: MemberParams): void {
    if (membershipNumber.length === 9) {
      const apiCall = this._memberServiceApi.get('NINE_DIGITS_MEMBER_ENDPOINT');
      if (apiCall) {
        apiCall(memberParamsApi);
      }
    }
    if (membershipNumber.length === 11) {
      const apiCall = this._memberServiceApi.get('ELEVEN_DIGITS_MEMBER_ENDPOINT');
      if (apiCall) {
        apiCall(memberParamsApi);
      }
    }
  }

  buildParamsMemberResult(memberData: ResourceOfSearchMemberVO[] | ResourceOfAccountMembershipResponseVO[], memberEndpoints: MemberEndpoints): void {
    if (memberData.length > 0) {
      for (let i = 0; i < memberData.length; i++) {
        const memberItem = memberEndpoints === MemberEndpoints.nineDigits ? this.getMemberItemWithDigits(memberData, i) : this.getMemberItemWithParams(memberData, i);
        this.paramsMemberResult.push(memberItem);
        this.memberBackApi.savedMemberSearchResult.push(memberItem);
      }
      const memberResultLength = this.paramsMemberResult.length;
      if (memberResultLength > 1) {
        this.isDataDisplay = true;
      }
      if (memberResultLength === 1) {
        const memberDataItem: MemberDataItem = this.paramsMemberResult[0];
        if (memberDataItem.memberAccountNo) {
          const memberAccountNo: string = memberDataItem.memberAccountNo;
          this.navigateToMemberProfile(memberAccountNo);
        }
      }
    }
  }

  buildTableAndPaginatorData(searchResult: PagedResourcesOfResourceOfSearchMemberVO): void {
    if (searchResult.page) {
      const memberSearchPageData: PageMetadataVO = searchResult.page;
      this.memberSearchResultsDataLengthInput = memberSearchPageData.totalElements;
      this.currentMemberSearchPage = memberSearchPageData.number || 0;
      this.memberSearchPageTotal = memberSearchPageData.totalPages || 1;

      this.memberBackApi.memberSearchDataLengthInput = this.memberSearchResultsDataLengthInput ? this.memberSearchResultsDataLengthInput : 0;
      this.memberBackApi.currentMemberSearchPage = this.currentMemberSearchPage;
      this.memberBackApi.memberSearchPageTotal = this.memberSearchPageTotal;
    }
    if (this.paginator) {
      const dataToDisplay = this.paramsMemberResult.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.setGlobalDataTableComponent(dataToDisplay);
      this.memberSearchPageTotal = Math.ceil(this.paramsMemberResult.length / this.paginator.pageSize);
    }
    this.messageBoxService.reset();
  }

  navigateToMemberProfile(memberAccountNo: string): void {
    let url = '';
    if (memberAccountNo) {
      url = memberInformationUrlPrefixMemberProfile + memberAccountNo;
    }
    this.router.navigate([url]);
  }

  setGlobalDataTableComponent(dataToDisplay: MemberDataItem[]): void {
    this.memberDataSource = [];
    dataToDisplay.forEach(data => {
      const dataTableObject: DataTableObject = {
        'Member #': '',
        'Medicare #': '',
        'Last Name': '',
        'First Name': '',
        'Middle Name': '',
        'Date of Birth': '',
        'Status': ['']
      };
      if (data) {
        dataTableObject['Member #'] = data.memberAccountNo ? data.memberAccountNo : '';
        dataTableObject['Medicare #'] = data.medicareId ? data.medicareId : '';
        dataTableObject['Last Name'] = data.lastName ? this.toCapitalize(data.lastName) : '';
        dataTableObject['First Name'] = data.firstName ? this.toCapitalize(data.firstName) : '';
        dataTableObject['Middle Name'] = data.middleName ? this.toCapitalize(data.middleName) : '';
        dataTableObject['Date of Birth'] = data.dateOfBirth ? data.dateOfBirth : '';
        dataTableObject['Status'] = data.isActive ? ['confirm-green.svg', 'Active'] : ['deny-red.svg', 'Inactive'];
      }
      this.memberDataSource.push(dataTableObject);
    });
    const tableHeaders = Object.keys(this.memberDataSource[0]);
    this.tableColumns = tableHeaders.map((key, idx) => {
      return {
        key: key,
        header: key,
        border: false,
        preImage: 0 === idx ? 'member-blue.svg' : null,
        kind:
          0 === idx ? TableColumnKind.MemberItem :
            5 === idx ? TableColumnKind.Date :
              6 === idx ? TableColumnKind.IconItem : TableColumnKind.Text,
        sortKey: key
      };
    });
    this.tableColumnCurrentSortKey = this.tableColumns[0].sortKey;
    this.tableColumnCurrentSortDirection = 'ASC';
  }

  displayErrorMessage(e: any): void {
    if (e.status === 404) {
      this.messageBoxService.addMessageBox('No Members Found', MessageBoxType.ERROR,
        'Valid search criteria include: Member # of 9 or 11 digits; First and Last Name.');
    } else if (e.status === 500) {
      this.messageBoxService.addMessageBox('The request is taking too long', MessageBoxType.ERROR,
        'Please adjust your search criteria by adding Member #, First and Last Name and try again.' +
          'If this issue continues, please contact the help desk.');
    } else if (e.status === 503) {
      this.messageBoxService.addMessageBox('Member MDM is not available', MessageBoxType.ERROR,
        'Please try Member Search again later.');
    }
  }

  toCapitalize(str: string): string {
    if (str) {
      str = str.toLowerCase();
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return '';
    }
  }

  calculateResults(): void {
    if (this.paginator) {
      const dataToDisplay = this.paramsMemberResult.slice(this.paginator.currentPage * this.paginator.pageSize,
        (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.setGlobalDataTableComponent(dataToDisplay);
      this.memberSearchPageTotal = Math.ceil(this.paramsMemberResult.length / this.paginator.pageSize);
    }
  }

  getMemberItemWithDigits(memberData: ResourceOfAccountMembershipResponseVO[], i: number): MemberDataItem {
    const memberResultItem: MemberDataItem = {};
    if (memberData.length > 0 && memberData[i]) {
      const memberDetails = memberData[i].memberDetails;
      const mdmMemHeaderDetails = memberData[i].mdmMemHeaderDetails;

      if (memberDetails && mdmMemHeaderDetails) {
        const aarpMembershipNumber = memberDetails.aarpMembershipNumber;
        const householdId = memberDetails.householdId;
        if (aarpMembershipNumber && householdId) {
          memberResultItem.aarpMembershipNumber = aarpMembershipNumber;
          memberResultItem.aarpAssociationId = aarpMembershipNumber.associationId;
          memberResultItem.memberAccountNo = aarpMembershipNumber.membershipNumber + `` + aarpMembershipNumber.associationId + `` + householdId[0].insuredCode;
          memberResultItem.medicareId = memberDetails.medicareId;
          if (memberDetails.memberName) {
            memberResultItem.lastName = memberDetails.memberName.lastName;
            memberResultItem.firstName = memberDetails.memberName.firstName;
            memberResultItem.middleName = memberDetails.memberName.middleName;
            memberResultItem.dateOfBirth = memberDetails.dateOfBirth;
            memberResultItem.isActive = mdmMemHeaderDetails.memStat === 'A';
            memberResultItem.mdmRecordNumber = mdmMemHeaderDetails.memRecNo;
          }
        }
      }
    }
    return memberResultItem;
  }

  getMemberItemWithParams(memberData: ResourceOfSearchMemberVO[], i: number): MemberDataItem {
    const memberResultItem: MemberDataItem = {};
    if (memberData.length > 0 && memberData[i]) {
      const memberIdentifiers = memberData[i].identifiers;
      const memberName = memberData[i].name;
      const mdmMemHeaderDetails = memberData[i].mdmMemHeaderDetails;

      if (memberIdentifiers && memberName && mdmMemHeaderDetails) {
        memberResultItem.aarpMembershipNumber = memberIdentifiers.aarpMembershipNumber;
        memberResultItem.aarpAssociationId = memberIdentifiers.aarpAssociationId;
        memberResultItem.memberAccountNo = memberIdentifiers.aarpMembershipNumber + `` + memberIdentifiers.aarpAssociationId + `` + memberIdentifiers.aarpInsuredCd;
        memberResultItem.medicareId = memberIdentifiers.medicareId;
        memberResultItem.lastName = memberName.lastName;
        memberResultItem.firstName = memberName.firstName;
        memberResultItem.middleName = memberName.middleName;
        memberResultItem.dateOfBirth = memberName.dateOfBirth;
        memberResultItem.isActive = mdmMemHeaderDetails.memStat === 'A';
        memberResultItem.mdmRecordNumber = memberIdentifiers.mdmRecordNumber;
      }
    }
    return memberResultItem;
  }
}
