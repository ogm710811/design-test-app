import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HotkeyOptions, HotkeysService} from 'angular2-hotkeys';
import {HotkeyDirective} from '../hotkey/hotkey.directive';
import {ButtonComponent} from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ButtonComponent, HotkeyDirective],
        providers: [HotkeysService,
          {provide: HotkeyOptions, useValue: {}}
        ],
      })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
