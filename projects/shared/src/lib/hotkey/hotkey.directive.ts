import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import * as uuidNS from 'uuid';

const uuid = uuidNS;

@Directive({
  selector: '[foxHotkey]'
})
export class HotkeyDirective implements AfterViewInit, OnDestroy {

  @Input() foxHotkey: string = '';
  @Input() hotkeyDescription?: string;
  @Input() hotkeyAction: 'focus' | 'click' | 'emit' = 'focus';
  @Input() hotkeyStringToEmit: string;
  @Output() hotkeyPressed: EventEmitter<string> = new EventEmitter<string>();

  private uuid: string = uuid();
  private hotkey?: Hotkey;

  constructor(private elementRef: ElementRef, private hotkeysService: HotkeysService) {
      this.hotkeyStringToEmit = this.uuid;
  }

  static registerHotkey(service: HotkeysService, combo: string, callback: () => boolean, description?: string): Hotkey | undefined {
    if (combo) {
      const existingHotkeyForCombo: Hotkey | Hotkey[] = service.get(combo);
      if (existingHotkeyForCombo) {
        service.remove(existingHotkeyForCombo);
      }
      const newHotkey: Hotkey = new Hotkey(combo, callback, ['INPUT', 'SELECT', 'TEXTAREA'], description);

      service.add(newHotkey);
      return newHotkey;
    }
  }

  ngAfterViewInit(): void {
    this.hotkey = HotkeyDirective.registerHotkey(this.hotkeysService, this.foxHotkey, (): boolean => {
      switch (this.hotkeyAction) {
        case 'focus':
          if (this.elementRef && this.elementRef.nativeElement) {
            this.elementRef.nativeElement.focus();
          }
          break;
        case 'click':
          if (this.elementRef && this.elementRef.nativeElement) {
            this.elementRef.nativeElement.click();
          }
          break;
        case 'emit':
          this.hotkeyPressed.emit(this.hotkeyStringToEmit);
          break;
        default:
          const nope: never = this.hotkeyAction;
      }

      // return false to prevent event bubbling
      return false;
    }, this.hotkeyDescription);
  }

  ngOnDestroy(): void {
    if (this.hotkey) {
      this.hotkeysService.remove(this.hotkey);
    }
  }

}
