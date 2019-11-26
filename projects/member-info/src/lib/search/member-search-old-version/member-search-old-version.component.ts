import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  MemberApi,
  MemberIdentifiersVO,
  PageMetadataVO,
  ResourceOfSearchMemberVO
} from '@fox/rest-clients';
import {
  CommonService,
  memberInformationUrlPrefixMemberProfile,
  MessageBoxService,
  MessageBoxType,
  PaginatorNonMaterialComponent,
  StatusAndAction
} from '@fox/shared';
import {MemberInformationService} from '../../shared/member-information.service';

@Component({
  selector: 'fox-member-search-old-version',
  templateUrl: './member-search-old-version.component.html',
  styleUrls: ['./member-search-old-version.component.css']
})
export class MemberSearchOldVersionComponent implements AfterViewInit {

  memberSearchFormGroup: FormGroup = this.fb.group({});
  memberDataSource: ResourceOfSearchMemberVO[] = [];
  isDataDisplay: boolean = false;
  nameRegex = /^[A-Za-z][A-Za-z '-]*$/;
  memberNumberRegex = /^[0-9]*$/;
  showMemberSearch: string = '';

  memberSearchPageSize = 5;
  memberSearchResultsDataLengthInput?: number = 0;
  memberSearchPageTotal = 0;
  currentMemberSearchPage = 0;
  memberResult: ResourceOfSearchMemberVO[] = [];

  column = 'memberAccountNo';
  direction = -1;
  isDesc = false;

  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;
  @Output() statusChange = new EventEmitter<StatusAndAction>();

  constructor(
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
      this.memberDataSource = this.memberBackApi.savedMemberSearchResult;
      this.memberResult = this.memberBackApi.savedMemberSearchResult.slice();
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

  memberSearchForm(): void {
    this.memberSearchFormGroup = this.fb.group({
      memberFormControl: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(11), Validators.pattern(this.memberNumberRegex)]],
      memberFirstNameFormControl: ['', [Validators.minLength(1), Validators.maxLength(25), Validators.pattern(this.nameRegex)]],
      memberLastNameFormControl: ['', [Validators.minLength(1), Validators.maxLength(35), Validators.pattern(this.nameRegex)]]
    });
    this.showMemberSearch = this.activatedRoute.snapshot.queryParamMap.get('showMemberSearch') || '';
  }

  // Search Fields Validation Conditions
  searchFieldsValidation(form: FormGroup): void {
    const valuesMemberId = form.value.memberFormControl;
    const valuesMemeberFirstName = form.value.memberFirstNameFormControl;
    const valuesMemeberLastName = form.value.memberLastNameFormControl;
    if (valuesMemberId !== '') {
      this.memberSearchFormGroup!.controls['memberFirstNameFormControl'].setValidators([Validators.minLength(1), Validators.maxLength(25), Validators.pattern(this.nameRegex)]);
      this.memberSearchFormGroup!.controls['memberFirstNameFormControl'].updateValueAndValidity();

      this.memberSearchFormGroup!.controls['memberLastNameFormControl'].setValidators([Validators.minLength(1), Validators.maxLength(35), Validators.pattern(this.nameRegex)]);
      this.memberSearchFormGroup!.controls['memberLastNameFormControl'].updateValueAndValidity();
    }
    if (valuesMemberId === '' && valuesMemeberFirstName !== '') {
      this.memberSearchFormGroup!.controls['memberLastNameFormControl'].setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(35), Validators.pattern(this.nameRegex)]);
      this.memberSearchFormGroup!.controls['memberLastNameFormControl'].updateValueAndValidity();

      this.memberSearchFormGroup!.controls['memberFormControl'].setValidators([Validators.minLength(9), Validators.maxLength(11), Validators.pattern(this.memberNumberRegex)]);
      this.memberSearchFormGroup!.controls['memberFormControl'].updateValueAndValidity();
    }
    if (valuesMemberId === '' && valuesMemeberLastName !== '') {
      this.memberSearchFormGroup!.controls['memberFirstNameFormControl'].setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(25), Validators.pattern(this.nameRegex)]);
      this.memberSearchFormGroup!.controls['memberFirstNameFormControl'].updateValueAndValidity();

      this.memberSearchFormGroup!.controls['memberFormControl'].setValidators([Validators.minLength(9), Validators.maxLength(11), Validators.pattern(this.memberNumberRegex)]);
      this.memberSearchFormGroup!.controls['memberFormControl'].updateValueAndValidity();
    }
  }

  memberResultTable(): void {
    const values = this.memberSearchFormGroup.value;
    const membershipNumber = values.memberFormControl;
    const firstName = values.memberFirstNameFormControl;
    const lastName = values.memberLastNameFormControl;

    this.currentMemberSearchPage = 0;
    this.memberSearchPageSize = 5;

    this.memberBackApi.memberSearchPageSize = 5;
    this.memberBackApi.currentMemberSearchPage = 0;

    if (values.memberFormControl || (values.memberFormControl && values.memberFirstNameFormControl) || (values.memberFormControl && values.memberLastNameFormControl) || (values.memberFormControl && values.memberFirstNameFormControl && values.memberLastNameFormControl) || (values.memberFirstNameFormControl && values.memberLastNameFormControl)) {
      this.memberSvc.searchMember('1', membershipNumber, firstName, lastName, this.memberSearchPageSize.toString(), this.currentMemberSearchPage.toString()).subscribe(searchResult => {
        if (searchResult && searchResult._embedded && searchResult._embedded.items) {
          this.memberBackApi.savedMemberSearchResult = [];
          this.memberResult = [];
          const memberData = searchResult._embedded.items;
          if (memberData.length > 0) {
            for (let i = 0; i < memberData.length; i++) {
              const memberItem = this.getMemberItem(memberData, i);
              if (memberItem.isActive === true) {
                memberItem.isActive = 'Active';
              }
              if (memberItem.isActive === false) {
                memberItem.isActive = 'Inactive';
              }
              this.memberResult.push(memberItem);
              this.memberBackApi.savedMemberSearchResult.push(memberItem);
            }

            this.isDataDisplay = true;
          }

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
            this.memberDataSource = this.memberResult.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
            this.memberSearchPageTotal = Math.ceil(this.memberResult.length / this.paginator.pageSize);
          }
          this.messageBoxService.reset();
        }
      }, (e) => {
        if (e.status === 404) {
          this.messageBoxService.addMessageBox('No Members Found', MessageBoxType.ERROR,
            'Valid search criteria include: Member #; First and Last Name');
        }
        this.isDataDisplay = false;
      });
    }

  }

  calculateResults(): void {
    if (this.paginator) {
      this.memberDataSource = this.memberResult.slice(this.paginator.currentPage * this.paginator.pageSize,
        (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.memberSearchPageTotal = Math.ceil(this.memberResult.length / this.paginator.pageSize);
    }
  }

  getMemberItem(memberData: any, i: number): any {
    return {
      'aarpMembershipNumber': memberData[i].identifiers!.aarpMembershipNumber,
      'aarpAssociationId': memberData[i].identifiers!.aarpAssociationId,
      'memberAccountNo': memberData[i].identifiers!.aarpMembershipNumber + `` + memberData[i].identifiers!.aarpAssociationId + `` + memberData[i].identifiers!.aarpInsuredCd,
      'medicareId': memberData[i].identifiers!.medicareId,
      'lastName': memberData[i].name!.lastName,
      'firstName': memberData[i].name!.firstName,
      'middleName': memberData[i].name!.middleName!,
      'dateOfBirth': memberData[i].name!.dateOfBirth,
      'isActive': memberData[i].isActive,
      'mdmRecordNumber': memberData[i].identifiers!.mdmRecordNumber
    };
  }

  getUrlForMember(memberProfile: MemberIdentifiersVO): string {
    let url = '';
    if (memberProfile) {
      const membershipNumber = memberProfile.memberAccountNo;
      url = memberInformationUrlPrefixMemberProfile + membershipNumber;
    }
    return url;
  }

  onSort(col: string): void {
    this.column = col;
    this.isDesc = !this.isDesc;
    this.direction = this.isDesc ? 1 : -1;
  }
}
