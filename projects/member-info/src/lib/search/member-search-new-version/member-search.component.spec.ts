import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule, MatSelectModule} from '@angular/material';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {BootstrapApi, MemberApi} from '@fox/rest-clients';
import {
  CommonService,
  FilterPipe,
  FormatMemberPipe,
  FoxBadgeComponent,
  FoxTooltipComponent,
  GridItemDirective,
  IconItemFormatTableComponent,
  InputComponent,
  LinkDirective,
  LoginService,
  MemberProfileFormatTableComponent,
  MessageBoxComponent,
  MessageBoxService,
  OrderByPipe,
  PaginatorComponent,
  PaginatorNonMaterialComponent,
  SectionComponent,
  SectionService,
  SectionTitleComponent,
  TableComponent,
  TableExpandRowComponent,
  TableHeaderSortComponent
} from '@fox/shared';
import {
  loginReducer,
  modalReducer,
  snackbarReducer
} from '@fox/state-management';
import {NgSelectModule} from '@ng-select/ng-select';
import {StoreModule} from '@ngrx/store';
import {HotkeyOptions, HotkeysService} from 'angular2-hotkeys';
import {TooltipModule} from 'ngx-bootstrap';
import {MemberInformationService} from '../../shared/member-information.service';
import {MemberSearchComponent} from './member-search.component';

describe('MemberSearchComponent', () => {
  let comp: MemberSearchComponent;
  let fixture: ComponentFixture<MemberSearchComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MemberSearchComponent,
        MessageBoxComponent,
        SectionTitleComponent,
        SectionComponent,
        PaginatorComponent,
        PaginatorNonMaterialComponent,
        LinkDirective,
        TableHeaderSortComponent,
        PaginatorNonMaterialComponent,
        OrderByPipe,
        MessageBoxComponent,
        InputComponent,
        TableComponent,
        FoxBadgeComponent,
        FilterPipe,
        GridItemDirective,
        MemberProfileFormatTableComponent,
        TableExpandRowComponent,
        IconItemFormatTableComponent,
        FormatMemberPipe,
        FoxTooltipComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatMenuModule,
        NgSelectModule,
        StoreModule.forRoot({
          message: snackbarReducer,
          loggedIn: loginReducer,
          modalActive: modalReducer,
        }),
        TooltipModule.forRoot()
      ],
      providers: [
        LoginService,
        CommonService,
        MemberInformationService,
        BootstrapApi,
        MemberApi,
        MessageBoxService,
        SectionService,
        HotkeysService,
        {provide: HotkeyOptions, useValue: {}}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MemberSearchComponent);

      comp = fixture.componentInstance; // Component test instance
      // query for the title <h1> by CSS element selector
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));

  it(`should be member search page size`, async(() => {
    expect(comp.memberSearchPageSize).toEqual(expect.any(Number));
  }));

  it(`should set form to be valid on name input`, async(() => {
    comp.memberSearchFormGroup.controls['memberFirstNameFormControl'].setValue('joe');
    comp.memberSearchFormGroup.controls['memberLastNameFormControl'].setValue('smith');
    el = fixture.debugElement.query(By.css('.txtbox-fn')).nativeElement;
    const keyupEvent = new KeyboardEvent('keyup', {code: 'a'});
    el.dispatchEvent(keyupEvent);

    expect(comp.memberSearchFormGroup.valid).toBeTruthy();
  }));

  it(`form should be invalid`, async(() => {
    el = fixture.debugElement.query(By.css('.txtbox-member-no')).nativeElement;
    const keyupEvent = new KeyboardEvent('keyup', {code: '4324324'});
    el.dispatchEvent(keyupEvent);
    expect(comp.memberSearchFormGroup.valid).toBeFalsy();
  }));
});
