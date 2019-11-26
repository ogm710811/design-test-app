import {animate, style, transition, trigger} from '@angular/animations';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {HotkeyDirective} from '../hotkey/hotkey.directive';
import * as tabbableNS from 'tabbable';
import {CLOSE, ModalState, OPEN} from '@fox/state-management';

const tabbable = tabbableNS;

export type ModalResult<T> = 'function' | 'esc' | 'x' | 'cancel' | 'overlay' | 'ok' | T;

const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0}),
    animate('400ms ease-in-out', style({opacity: 1}))
  ]),
  transition(':leave', [
    style({opacity: 1}),
    animate('400ms ease-in-out', style({opacity: 0}))
  ])
]);

@Component({
  selector: 'fox-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
  animations: [fadeInOut]
})
export class ModalComponent<T> implements OnChanges, AfterViewChecked, OnDestroy {
  @Input() modalTitle: string = '';
  @Input() enableContentPadding = true;
  @Input() closable: boolean = true;
  @Input() visible: boolean = false;
  @Input() hideBorder: boolean = false;
  @Input() showPdfLink: boolean = false;
  @Input() isMinWidth: boolean = false;
  @Input() largerMaxWidth: boolean = false;
  @Input() noHorizontalScroll: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() opened: EventEmitter<'opened'> = new EventEmitter<'opened'>();
  @Output() closed: EventEmitter<ModalResult<T>> = new EventEmitter<ModalResult<T>>();

  private visibilityChanged: boolean = false;
  private closeHotkey?: Hotkey;
  private tabForwardHotkey?: Hotkey;
  private tabBackwardHotkey?: Hotkey;
  private readonly styleTag: HTMLStyleElement;

  constructor(private elementRef: ElementRef, private hotkeysSvc: HotkeysService, private modalStore: Store<ModalState>) {
    this.styleTag = this.buildStyleElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.visible) {
      if (changes.visible.currentValue) {
        this.disableWindowScrolling();
      } else {
        this.enableWindowScrolling();
      }
    }

    if (changes.hasOwnProperty('visible')) {
      const visibleChanges = changes['visible'];
      this.visibilityChanged = visibleChanges !== undefined;
      return;
    }

    this.visibilityChanged = false;
    return;
  }

  ngAfterViewChecked(): void {
    if (this.visibilityChanged && this.visible) {
      const tabbableChildren = tabbable(this.elementRef.nativeElement);
      if (tabbableChildren && tabbableChildren.length) {
        tabbableChildren[0].focus();
      }
      this.registerHotkeys();
      this.modalStore.dispatch({type: OPEN});
    } else if (this.visibilityChanged && !this.visible) {
      this.deRegisterHotkeys();
      this.modalStore.dispatch({type: CLOSE});
    }
    this.visibilityChanged = false;
  }

  ngOnDestroy(): void {
    this.deRegisterHotkeys();
    this.enableWindowScrolling();
  }

  openModal(): void {
    this.visible = true;
    this.disableWindowScrolling();
    this.visibleChange.emit(this.visible);
    this.opened.emit('opened');
  }

  closeModal(emitValue: ModalResult<T> = 'function'): void {
    this.visible = false;
    this.enableWindowScrolling();
    this.visibleChange.emit(this.visible);
    this.closed.emit(emitValue);
  }

  // disable the scrolling feature on the main viewport.
  private disableWindowScrolling(): void {
    document.body.appendChild(this.styleTag);
  }

  // enable the scrolling feature on the main viewport.
  private enableWindowScrolling(): void {
    if (document.body.contains(this.styleTag)) {
      document.body.removeChild(this.styleTag);
    }
  }

  private registerHotkeys(): void {
    this.registerCloseHotkey();
    this.registerTabForwardHotkey();
    this.registerTabBackwardHotkey();
  }

  private deRegisterHotkeys(): void {
    if (this.closeHotkey) {
      this.hotkeysSvc.remove(this.closeHotkey);
    }
    if (this.tabForwardHotkey) {
      this.hotkeysSvc.remove(this.tabForwardHotkey);
    }
    if (this.tabBackwardHotkey) {
      this.hotkeysSvc.remove(this.tabBackwardHotkey);
    }
  }

  private registerCloseHotkey(): void {
    this.closeHotkey = HotkeyDirective.registerHotkey(this.hotkeysSvc, 'esc', (): boolean => {
      if (this.closable) {
        this.closeModal('esc');
      }
      // return false to prevent event bubbling
      return false;
    }, undefined);

  }

  private registerTabForwardHotkey(): void {
    this.tabForwardHotkey = HotkeyDirective.registerHotkey(this.hotkeysSvc, 'tab', () => {
      const tabbableChildren = tabbable(this.elementRef.nativeElement);
      if (tabbableChildren && tabbableChildren.length) {
        const forwardChildren = tabbableChildren.filter(child => {
          const currentFocus = document.activeElement ? document.activeElement : document.body;
          /* tslint:disable */
          const nodeConnected = !(currentFocus.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_DISCONNECTED);
          const nodeIsChild = !!(this.elementRef.nativeElement.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_CONTAINED_BY);
          const nodeIsAfterCurrent = !!(currentFocus.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_FOLLOWING);
          /* tslint:enable */
          return nodeConnected && nodeIsChild && nodeIsAfterCurrent;
        });
        if (forwardChildren && forwardChildren.length) {
          forwardChildren[0].focus();
        } else {
          tabbableChildren[0].focus();
        }
      }
      // return false to prevent event bubbling
      return false;
    }, undefined);

  }

  private registerTabBackwardHotkey(): void {
    this.tabBackwardHotkey = HotkeyDirective.registerHotkey(this.hotkeysSvc, 'shift+tab', () => {
      const tabbableChildren = tabbable(this.elementRef.nativeElement);
      if (tabbableChildren && tabbableChildren.length) {
        const backwardChildren = tabbableChildren.filter(child => {
          const currentFocus = document.activeElement ? document.activeElement : document.body;
          /* tslint:disable */
          return /* it is not disconnected */ !(currentFocus.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_DISCONNECTED) &&
            /* it is a child node of the modal */ !!(this.elementRef.nativeElement.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_CONTAINED_BY) &&
            /* it is after the current focused item */ !!(currentFocus.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_PRECEDING);
          /* tslint:enable */
        });
        if (backwardChildren && backwardChildren.length) {
          backwardChildren[backwardChildren.length - 1].focus();
        } else {
          tabbableChildren[tabbableChildren.length - 1].focus();
        }
      }

      // return false to prevent event bubbling
      return false;
    }, undefined);
  }

  // build and return a Style element that will prevent scrolling on the body.
  private buildStyleElement(): HTMLStyleElement {
    const bodyStyle = document.createElement('style');

    bodyStyle.type = 'text/css';
    bodyStyle.setAttribute('data-debug', 'Injected by Modal Class.');
    bodyStyle.textContent = ` body { overflow: hidden; } `;
    return (bodyStyle);
  }
}
