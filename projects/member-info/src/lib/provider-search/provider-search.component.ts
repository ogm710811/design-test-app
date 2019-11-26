import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MatExpansionPanel} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {PagedResourcesOfResourceOfProviderVO, ProviderApi, ReferencesApi} from '@fox/rest-clients';
import {LoginService, PaginatorNonMaterialComponent, ProgressContextService} from '@fox/shared';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {ProviderSearchDropdownModel} from './provider-search-dropdown.model';
import {ProviderSearchResultSet} from './provider-search-result.model';
import {ProviderSearchService} from './provider-search.service';
import {ProviderSearchParameterModel} from './provider-serach-parameter.model';

@Component({
  selector: 'fox-provider-search',
  templateUrl: './provider-search.component.html',
  styleUrls: ['./provider-search.component.css']
})

export class ProviderSearchComponent implements OnInit, AfterViewInit {

  isDataDisplay: boolean = false;
  showNoProviderAlert: boolean = false;
  showTooManyProviderAlert: boolean = false;
  invalidSearchAlert: boolean = false;
  validationAlert: boolean = false;

  provSearchFormGrp: FormGroup = this.fb.group({});
  number_regex = /^[0-9]+$/;
  name_regex = /^[a-zA-Z](?:[ '\-a-zA-Z]*[a-zA-Z])?$/;

  tinInput: string = '';
  npiInput: string = '';
  bizNameInput: string = '';
  firstNameInput: string = '';
  lastNameInput: string = '';
  cityInput: string = '';
  stateInput: string = '';
  zipInput: string = '';
  provTypeInput: string = '';

  showEnteredParameters = false;

  parametersUsed: ProviderSearchParameterModel[] = [];
  providerSearchResults: ProviderSearchResultSet[] = [];
  providerSearchResultsView: ProviderSearchResultSet[] = [];
  stateDropdownValues: ProviderSearchDropdownModel[] = [];
  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;

  providerPageSize = 10;
  providerDataLengthInput = 0;
  providerPageTotal = 0;
  currentProviderPage = 0;

  providerResultIsDesc: boolean = false;
  providerResultSortColumn: string = 'providerNpi';

  @ViewChild('matExpansionPanel') matExpansionPanel?: MatExpansionPanel;

  constructor(private fb: FormBuilder,
              private referenceApi: ReferencesApi,
              private activatedRoute: ActivatedRoute,
              private providerSearchApi: ProviderApi,
              private router: Router,
              private providerSearchService: ProviderSearchService,
              private progressSvc: ProgressContextService) {
    this.getFormProvSearch();
    // Commented as these services are not available in release env as per Jhasper
    // this.getDropdownValues();
  }

  static removeWhitespace(sourceString: string): string | null {
    if (sourceString) {
      return sourceString.trim();
    } else {
      return null;
    }
  }

  ngAfterViewInit(): void {
    if (this.providerSearchResults.length > 0) {
      this.calculateResults();
    }
  }

  ngOnInit(): void {
    this.providerSearchResults = this.providerSearchService.savedProviderSearchResult;
    this.parametersUsed = this.providerSearchService.parametersUsed;
    if (this.providerSearchResults.length > 0) {
      this.isDataDisplay = true;
      this.currentProviderPage = this.providerSearchService.currentProviderPage;
      this.providerPageTotal = this.providerSearchService.providerPageTotal;
      this.providerPageSize = this.providerSearchService.providerPageSize;
      this.providerDataLengthInput = this.providerSearchService.providerDataLengthInput;
    }

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['tin'] && params['npi']) {
        this.tinInput = params['tin'];
        this.npiInput = params['npi'];
      }
    });
  }

  searchData(formControl: FormGroup): void {

    this.resetAlert();
    if (formControl.valid) {
      this.getProvider();
    } else {
      this.validationAlert = true;
    }
  }

  getProvider(): void {
    const res = this.providerSearchApi.findProvider(uuid(),
      this.tinInput != null && this.tinInput.length > 0 ? +this.tinInput : undefined, this.npiInput != null && this.npiInput.length > 0 ? +this.npiInput : undefined, this.bizNameInput, this.firstNameInput, this.lastNameInput,
      this.provTypeInput, this.cityInput, this.stateInput, this.zipInput, this.providerPageSize, this.currentProviderPage);

    this.showNoProviderAlert = false;
    this.progressSvc.forTag('provider-result').watch(res).subscribe(providerResult => {
      if (providerResult && providerResult.page && providerResult.page.totalElements && providerResult.page.totalElements <= 100) {
        this.processProviderSearchResult(providerResult);
      } else {
        this.isDataDisplay = false;
        this.showTooManyProviderAlert = true;
      }
    }, (e) => {
      if (e.status === 404) {
        this.showNoProviderAlert = true;
        this.providerSearchResults = [];
      }
    });
  }

  processProviderSearchResult(providerResult: PagedResourcesOfResourceOfProviderVO): void {
    if (providerResult && providerResult._embedded && providerResult._embedded.items && providerResult.page &&
      providerResult.page.number !== undefined && providerResult.page.size && providerResult.page.totalPages) {
      this.currentProviderPage = 0;

      this.providerSearchResults = [];
      this.providerSearchService.savedProviderSearchResult = [];
      providerResult._embedded.items.forEach(item => {

        const mappedItem: ProviderSearchResultSet = new ProviderSearchResultSet();
        mappedItem.providerId = item.providerId ? (item.providerId.idNumber ? item.providerId.idNumber : '') : '';
        mappedItem.providerNpi = item.providerNpi ? (item.providerNpi.idNumber ? item.providerNpi.idNumber : '') : '';
        mappedItem.tin = item.providerTin ? (item.providerTin.tin ? item.providerTin.tin : '') : '';
        mappedItem.businessName = item.providerName ? (item.providerName.businessName ? item.providerName.businessName : '') : '';
        mappedItem.lastName = item.providerName ? (item.providerName.lastName ? item.providerName.lastName : '') : '';
        mappedItem.firstName = item.providerName ? (item.providerName.firstName ? item.providerName.firstName : '') : '';

        mappedItem.addressLine1 = '';
        mappedItem.addressLine2 = '';
        mappedItem.city = '';
        mappedItem.state = '';
        mappedItem.zip = '';

        if (item.providerAddress && item.providerAddress[0]) {
          const addressLine1 = item.providerAddress![0].addressLine1 ? item.providerAddress![0].addressLine1 : '';
          mappedItem.addressLine1 = addressLine1 ? addressLine1 : '';

          const addressLine2 = item.providerAddress![0].addressLine2 ? item.providerAddress![0].addressLine2 : '';
          mappedItem.addressLine2 = addressLine2 ? addressLine2 : '';

          const city = item.providerAddress![0].city ? item.providerAddress![0].city : '';
          mappedItem.city = city ? city : '';

          const state = item.providerAddress![0].state ? item.providerAddress![0].state : '';
          mappedItem.state = state ? state : '';

          const zip = item.providerAddress![0].postalCode ? item.providerAddress![0].postalCode : '';
          mappedItem.zip = zip ? this.splitZipCode(zip) : '';
        }

        this.providerSearchResults.push(mappedItem);

        this.providerSearchService.savedProviderSearchResult.push(mappedItem);
      });

      this.providerDataLengthInput = this.providerSearchResults.length;
      this.currentProviderPage = providerResult.page.number;
      this.providerPageTotal = providerResult.page.totalPages;

      this.getFormValues();
      this.parametersUsed = this.providerSearchService.parametersUsed.slice(0, 3);
      if (this.matExpansionPanel) {
        this.matExpansionPanel.toggle();
      }

      this.isDataDisplay = true;

      this.providerSearchService.providerDataLengthInput = this.providerDataLengthInput;
      this.providerSearchService.currentProviderPage = this.currentProviderPage;
      this.providerSearchService.providerPageTotal = this.providerPageTotal;
      this.providerSearchService.providerPageSize = this.providerPageSize;

      this.providerSearchResultsView = this.providerSearchResults.slice(this.currentProviderPage * this.providerPageSize, (this.currentProviderPage * this.providerPageSize) + this.providerPageSize);
      this.providerPageTotal = Math.ceil(this.providerSearchResults.length / this.providerPageSize);
    }
  }

  calculateResults(): void {
    let currPage = 1;
    let pageSize = 10;

    if (this.paginator != null) {
      currPage = this.paginator.currentPage;
      pageSize = this.paginator.pageSize;
    }

    this.providerSearchResultsView = this.providerSearchResults.slice(currPage * pageSize, (currPage * pageSize) + pageSize);
    this.providerPageTotal = Math.ceil(this.providerSearchResults.length / pageSize);
  }

  getFormProvSearch(): void {
    this.provSearchFormGrp = this.fb.group({
      tin: ['', [Validators.minLength(9), Validators.pattern(this.number_regex)]],
      npi: ['', [Validators.minLength(10), Validators.pattern(this.number_regex)]],
      firstName: ['', [Validators.pattern(this.name_regex)]],
      lastName: ['', [Validators.pattern(this.name_regex)]],
      businessName: ['', [Validators.pattern(this.name_regex)]],
      provType: [''],
      city: ['', [Validators.pattern(this.name_regex)]],
      state: [''],
      zip: ['']
    });
  }

  resetForm(): void {
    this.resetAlert();
    this.provSearchFormGrp.reset();
    this.tinInput = '';
    this.npiInput = '';
    this.bizNameInput = '';
    this.firstNameInput = '';
    this.lastNameInput = '';
    this.cityInput = '';
    this.stateInput = '';
    this.zipInput = '';
    this.provTypeInput = '';
    this.resetService();
  }

  resetAlert(): void {
    this.showNoProviderAlert = false;
    this.showTooManyProviderAlert = false;
    this.isDataDisplay = false;
    this.validationAlert = false;
    this.invalidSearchAlert = false;
  }

  resetService(): void {
    this.providerSearchService.savedProviderSearchResult = [];
    this.providerSearchService.parametersUsed = [];
    this.providerSearchService.providerPageSize = 10;
    this.providerSearchService.providerDataLengthInput = 2;
    this.providerSearchService.providerPageTotal = 5;
    this.providerSearchService.currentProviderPage = 0;
    this.parametersUsed = this.providerSearchService.parametersUsed;
  }

  checkIfFormFilled(): boolean {
    const values = this.provSearchFormGrp.value;
    return !!(ProviderSearchComponent.removeWhitespace(values.tin) ||
      ProviderSearchComponent.removeWhitespace(values.npi) ||
      ProviderSearchComponent.removeWhitespace(values.businessName) ||
      (ProviderSearchComponent.removeWhitespace(values.firstName) && (ProviderSearchComponent.removeWhitespace(values.lastName))));
  }

  getDropdownValues(): void {
    this.referenceApi.listCategoryCodes('DOCUMENT_PAGE_REFERENCES', uuid()).subscribe(resp => {
      let groupName: string;
      let dropdownItem: ProviderSearchDropdownModel;

      resp.forEach(record => {
        if (record.id === 0) {
          groupName = record.description || '';
        } else {
          dropdownItem = {
            dropdownItemValue: record.code || '',
            dropdownItemDesc: record.description || '',
            dropdownItemGroup: groupName || ''
          };

          if (groupName === 'MEMBER_STATE') {
            this.stateDropdownValues.push(dropdownItem);
          }
        }
      });
    });
  }

  expandPanel(matExpansionPanel: MatExpansionPanel, event: Event): void {
    event.stopPropagation(); // Preventing event bubbling

    if (event.target) {
      if (!this._isExpansionIndicator(event.target)) {
        matExpansionPanel.toggle();
      }
    }

  }

  splitZipCode(data: string): string {
    const zipCode = data;
    let result = '';
    if (zipCode.length > 5) {
      const state = zipCode.slice(0, 5);
      const geoSegment = zipCode.slice(5, 9);
      result = state + '-' + geoSegment;
    } else {
      result = zipCode;
    }
    return result;
  }

  getFormValues(): void {
    this.providerSearchService.parametersUsed = [];
    if (!!this.provSearchFormGrp) {
      if (this.tinInput) {
        this.providerSearchService.parametersUsed.push({
          paramName: 'TIN',
          paramValue: this.tinInput
        });
      }
      if (this.npiInput) {
        this.providerSearchService.parametersUsed.push({
          paramName: 'NPI',
          paramValue: this.npiInput
        });
      }
      if (this.lastNameInput) {
        this.providerSearchService.parametersUsed.push({
          paramName: 'Last Name',
          paramValue: this.lastNameInput
        });
      }
      if (this.firstNameInput) {
        this.providerSearchService.parametersUsed.push({
          paramName: 'First Name',
          paramValue: this.firstNameInput
        });
      }
      if (this.bizNameInput) {
        this.providerSearchService.parametersUsed.push({
          paramName: 'Business Name',
          paramValue: this.bizNameInput
        });
      }
      if (this.provTypeInput) {
        this.providerSearchService.parametersUsed.push({
          paramName: 'Provider Type',
          paramValue: this.provTypeInput
        });
      }
      if (this.cityInput) {
        this.providerSearchService.parametersUsed.push({
          paramName: 'City',
          paramValue: this.cityInput
        });
      }
      if (this.stateInput) {
        this.providerSearchService.parametersUsed.push({
          paramName: 'State',
          paramValue: this.stateInput
        });
      }
      if (this.zipInput) {
        this.providerSearchService.parametersUsed.push({
          paramName: 'Zip',
          paramValue: this.zipInput
        });
      }
    }
  }

  private _isExpansionIndicator(eTarget: EventTarget): boolean {
    const expansionIndicatorClass = 'mat-expansion-indicator';
    const target = eTarget as HTMLInputElement;
    return (target.classList && target.classList.contains(expansionIndicatorClass));
  }

  private populateSearchParam(parametersUsed: ProviderSearchParameterModel[]): void {
    parametersUsed.forEach(param => {
      if (param.paramName === 'TIN') {
        this.tinInput = param.paramValue;
      }
      if (param.paramName === 'NPI') {
        this.npiInput = param.paramValue;
      }
      if (param.paramName === 'Last Name') {
        this.lastNameInput = param.paramValue;
      }
      if (param.paramName === 'First Name') {
        this.firstNameInput = param.paramValue;
      }
      if (param.paramName === 'Business Name') {
        this.bizNameInput = param.paramValue;
      }
      if (param.paramName === 'Provider Type') {
        this.provTypeInput = param.paramValue;
      }
      if (param.paramName === 'City') {
        this.cityInput = param.paramValue;
      }
      if (param.paramName === 'State') {
        this.stateInput = param.paramValue;
      }
      if (param.paramName === 'Zip') {
        this.zipInput = param.paramValue;
      }
    });
  }

}
