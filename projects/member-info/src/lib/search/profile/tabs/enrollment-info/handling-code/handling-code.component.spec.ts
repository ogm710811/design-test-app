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
  MessageBoxComponent,
  MessageBoxService,
  PaginatorComponent,
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
import {MemberInformationService} from '../../../../../shared/member-information.service';
import {HandlingCodeComponent} from './handling-code.component';

describe('HandlingCodeComponent', () => {
  let comp: HandlingCodeComponent;
  let fixture: ComponentFixture<HandlingCodeComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HandlingCodeComponent,
        MessageBoxComponent,
        SectionTitleComponent,
        SectionComponent,
        PaginatorComponent,
        PaginatorNonMaterialComponent
      ],
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
        MemberInformationService,
        BootstrapApi,
        MemberApi,
        MessageBoxService,
        ClaimsMemberApi
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HandlingCodeComponent);

      comp = fixture.componentInstance; // Component test instance
      // query for the title <h1> by CSS element selector
      de = fixture.debugElement.query(By.css('form'));
    });
  }));

  it(`should be Array type`, async(() => {
    expect(comp.handlingDataSource).toEqual(expect.any(Array));
  }));

});
