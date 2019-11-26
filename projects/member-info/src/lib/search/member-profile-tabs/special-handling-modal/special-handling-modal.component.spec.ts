import {DatePipe} from '@angular/common';
import {Component, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClaimsMaterialApi} from '@fox/rest-clients';
import {LoginService, MessageBoxService} from '@fox/shared';
import {MemberInformationService} from '../../../shared/member-information.service';
import {SpecialHandlingModalComponent} from './special-handling-modal.component';

describe('SpecialHandlingModalComponent', () => {

  @Component({
    selector: 'fox-modal',
    template: `<ng-content></ng-content>`
  })
  class ModalStubComponent {
    @Input() modalTitle: string = '';
    @Input() enableContentPadding: any = {};
    @Input() closable: any = {};
    @Input() visible: any = {};
    @Input() hideBorder: any = {};
    @Input() showPdfLink: any = {};
  }

  let fixture: ComponentFixture<SpecialHandlingModalComponent>;
  const mockClaimsMaterialApi = {};
  const mockMessageBoxService = {};
  const mockLoginService = {
    // @ts-ignore
    hasRole: jest.fn()
  };
  const mockDatePipe = {};
  const mockMemberInformationService = {};
  const mockFormGroup = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule
      ],
      declarations: [
        SpecialHandlingModalComponent,
        ModalStubComponent
      ],
      providers: [
        {provide: FormGroup, useValue: mockFormGroup},
        {provide: ClaimsMaterialApi, useValue: mockClaimsMaterialApi},
        {provide: MessageBoxService, useValue: mockMessageBoxService},
        {provide: LoginService, useValue: mockLoginService},
        {provide: DatePipe, useValue: mockDatePipe},
        {provide: MemberInformationService, useValue: mockMemberInformationService},
        FormBuilder
      ]
    });

    fixture = TestBed.createComponent(SpecialHandlingModalComponent);
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {

    it('should code be invalid with S when the user has numeric authority only', () => {
      // @ts-ignore
      mockLoginService.hasRole.mockImplementation((str: string) => {
        return (str === 'OP_SHC_NUM');
      });
      fixture.componentInstance.ngOnInit();
      const comp = fixture.componentInstance;
      comp.specialHandlingCodeForm.controls['codeControl'].setValue('S');
      fixture.componentInstance.onAddSpecialHandlingCodeToggle();
      fixture.detectChanges();
      expect(fixture.componentInstance.specialHandlingCodeForm.controls['codeControl'].invalid).toBe(true);
    });

    it('should code be invalid with S when the user has authority alphanumeric but "S" only', () => {
      // @ts-ignore
      mockLoginService.hasRole.mockImplementation((str: string) => {
        return (str === 'OP_SHC_ANUM');
      });
      fixture.componentInstance.ngOnInit();
      const comp = fixture.componentInstance;
      comp.specialHandlingCodeForm.controls['codeControl'].setValue('S');
      fixture.componentInstance.onAddSpecialHandlingCodeToggle();
      fixture.detectChanges();
      expect(fixture.componentInstance.specialHandlingCodeForm.controls['codeControl'].invalid).toBe(true);
    });

    it('should code be invalid with Z when the user has authority alphanumeric', () => {
      // @ts-ignore
      mockLoginService.hasRole.mockImplementation((str: string) => {
        return (str === 'OP_SHC_NUM');
      });
      fixture.componentInstance.ngOnInit();
      const comp = fixture.componentInstance;
      comp.specialHandlingCodeForm.controls['codeControl'].setValue('Z');
      fixture.componentInstance.onAddSpecialHandlingCodeToggle();
      fixture.detectChanges();
      expect(fixture.componentInstance.specialHandlingCodeForm.controls['codeControl'].invalid).toBe(true);
    });

  });

});
