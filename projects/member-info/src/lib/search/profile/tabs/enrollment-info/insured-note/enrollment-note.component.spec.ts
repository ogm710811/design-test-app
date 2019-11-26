import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {BrowserModule, By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {BootstrapApi, ClaimsMemberApi, MemberApi} from '@fox/rest-clients';
import {
  CommonService,
  LoginService,
  MessageBoxService,
  ModalComponent,
  PaginatorNonMaterialComponent,
  SectionComponent,
  SectionTitleComponent
} from '@fox/shared';
import {
  loginReducer,
  modalReducer,
  snackbarReducer
} from '@fox/state-management';
import {StoreModule} from '@ngrx/store';
import {HotkeyOptions, HotkeysService} from 'angular2-hotkeys';
import {MemberInformationService} from '../../../../../shared/member-information.service';
import {EnrollmentNoteComponent} from './enrollment-note.component';

describe('MaintenanceComponent', () => {
  let comp: EnrollmentNoteComponent;
  let fixture: ComponentFixture<EnrollmentNoteComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentNoteComponent, SectionTitleComponent, PaginatorNonMaterialComponent, ModalComponent, SectionComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatSortModule,
        MatRadioModule,
        MatTabsModule,
        MatGridListModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatMenuModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          message: snackbarReducer,
          loggedIn: loginReducer,
          modalActive: modalReducer
        })
      ],
      providers: [
        LoginService,
        CommonService,
        BootstrapApi,
        ClaimsMemberApi,
        HotkeysService,
        MemberInformationService,
        MemberApi,
        MessageBoxService,
        {provide: HotkeyOptions, useValue: {}}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(EnrollmentNoteComponent);

      comp = fixture.componentInstance; // Component test instance
      // query for the title <h1> by CSS element selector
      de = fixture.debugElement.query(By.css('form'));
    });
  }));

  it(`should be boolean type`, async(() => {
    expect(comp.notePageSize).toEqual(expect.any(Number));
  }));

});
