import {CommonModule} from '@angular/common';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {InputComponent} from './input.component';
import {TextInputDirective} from './text-input.directive';

@Component({
  selector: 'fox-required-input-fc-text',
  template: `
    <form>
      <fox-input [formControl]="fc"></fox-input>
      <button type="submit" #btn></button>
    </form>`
})
class RequiredTextInputWithFormControlComponent {
  @ViewChild(InputComponent) foxInput?: InputComponent;
  @ViewChild('btn') btn: ElementRef;
  fc: FormControl;

  constructor(private fb: FormBuilder) {
    this.fc = fb.control(null, {validators: [Validators.required], updateOn: 'blur'});
  }
}

@Component({
  selector: 'fox-required-input-ngm-text',
  template: `
    <form>
      <fox-input name="test" required [(ngModel)]="value"></fox-input>
      <button type="submit" #btn></button>
    </form>`
})
class RequiredTextInputWithNgModelComponent {
  @ViewChild(InputComponent) foxInput?: InputComponent;
  @ViewChild('btn') btn: ElementRef;
  value?: string;

  constructor(private fb: FormBuilder) {
  }
}

describe('InputComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        TextInputDirective,
        RequiredTextInputWithFormControlComponent,
        RequiredTextInputWithNgModelComponent,
        InputComponent,
      ],
      providers: [
        FormBuilder
      ]
    }).compileComponents();
  });

  function testValidatorRequiredInitThenBlur<T>(fixture: ComponentFixture<RequiredTextInputWithNgModelComponent | RequiredTextInputWithFormControlComponent>): void {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // Make sure everything is there, and there are no errors
      expect(fixture.componentInstance.foxInput).toBeTruthy();
      const fIn: InputComponent = fixture.componentInstance.foxInput!;
      expect(fixture.componentInstance.btn).toBeTruthy();
      const btn = fixture.componentInstance.btn!.nativeElement;
      expect(fIn.errorKeys.length).toBeTruthy();
      for (const ek of fIn.errorKeys) {
        expect(fIn.showErrors(ek)).toBeNull();
      }
      expect(btn).toBeTruthy();
      expect(fIn.inputField).toBeTruthy();
      // Focus the input
      fIn.inputField!.nativeElement.focus();
      fixture.whenStable().then(() => {
        // Make sure everything is there, and there are no errors
        expect(fIn.errorKeys.length).toBeTruthy();
        for (const ek of fIn.errorKeys) {
          expect(fIn.showErrors(ek)).toBeNull();
        }
        expect(fIn.inputField).toBeTruthy();
        expect(btn).toBeTruthy();
        // Move focus away from the input
        btn!.focus();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          // Since blur event was fired, we should see errors now
          expect(fIn.errorKeys.length).toBeTruthy();
          for (const ek of fIn.errorKeys) {
            console.log('error key', ek);
            console.log('error shown', fIn.showErrors(ek));
            expect(fIn.showErrors(ek)).toBeTruthy();
          }
          expect(fIn.errorKeys[0]).toBe('required');
          expect(fIn.showErrors(fIn.errorKeys[0])).toBe('Field is required');
        });
      });
    });
  }

  it('Should initially hide, then show after blur, the "required" validation error message: TextInputDirective with FormControl', () => {
    testValidatorRequiredInitThenBlur(TestBed.createComponent(RequiredTextInputWithFormControlComponent));
  });

  it('Should initially hide, then show after blur, the "required" validation error message: TextInputDirective with NgModel', () => {
    testValidatorRequiredInitThenBlur(TestBed.createComponent(RequiredTextInputWithNgModelComponent));
  });

});
