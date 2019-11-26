import {
  FeatureFlagService,
  HotkeyDirective,
  MessageBoxService,
  MessageBoxType,
  ModalService
} from '@fox/shared';
import {animate, state, style, transition, trigger} from '@angular/animations';
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
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {DocMetaApi, DocumentVO, ReferenceValueVO} from '@fox/rest-clients';
import * as tabbableNS from 'tabbable';
import * as uuidNS from 'uuid';
import {CLOSE, ModalState, OPEN} from '@fox/state-management';
import {DocumentSearchService} from './document-search.service';

const tabbable = tabbableNS;

const uuid = uuidNS;

@Component({
  selector: 'fox-document-quick-edit',
  templateUrl: 'document-quick-edit.component.html',
  styleUrls: ['document-quick-edit.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class QuickEditModalComponent implements OnChanges, AfterViewChecked, OnDestroy {
  @Input() closable = true;
  @Input() visible: boolean = false;
  @Input() dcn: string = '';
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  modalStore: Store<ModalState>;
  docMetaFormGroup: FormGroup;
  documentVO: DocumentVO = {};

  memberStates = this.documentSearchService.memberStateDropdownValues;
  genders = this.documentSearchService.genderDropdownValues;
  planTypes = this.documentSearchService.planTypeDropdownValues;
  queueInformations = this.documentSearchService.queueInfoDropdownValues;
  feedbackInformations = this.documentSearchService.feedbackInfoDropdownValues;
  documentTypes = this.documentSearchService.docTypeDropdownValues;
  formTypes = this.documentSearchService.formTypeDropdownValues;
  fekPullReasons = this.documentSearchService.fekPullReasonDropdownValues;
  rnfStatuses = this.documentSearchService.rnfStatusDropdownValues;
  overpaymentCollectionTypes: Array<ReferenceValueVO> = [];

  matchedIndicatorValue: any;
  menuState: string = 'out';
  dirtyCount: number = 0;
  isF4914Enabled = true;

  private visibilityChanged: boolean = false;
  private closeHotkey?: Hotkey;
  private tabForwardHotkey?: Hotkey;
  private tabBackwardHotkey?: Hotkey;

  constructor(
    private elementRef: ElementRef,
    private hotkeysSvc: HotkeysService,
    private docMetaApi: DocMetaApi,
    modalStore: Store<ModalState>,
    private documentSearchService: DocumentSearchService,
    private messageBoxService: MessageBoxService,
    private featurFlagService: FeatureFlagService,
    private modalService: ModalService
  ) {
    this.modalStore = modalStore;
    this.docMetaFormGroup = this.documentSearchService.createDocMetaFormGroup();
    this.isF4914Enabled = !this.featurFlagService.isFeatureDisabled('F4914');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.visible) {
      if (changes.visible.currentValue) {
        this.modalService.disableMainContentScrolling();
      } else {
        this.modalService.enableMainContentScrolling();
      }

      if (changes.visible.currentValue && this.dcn) {
        this.getDocMeta(this.dcn);
      }
    }

    if (changes.hasOwnProperty('visible')) {
      this.menuState = this.visible ? 'in' : 'out';
      const visibleChanges = changes['visible'];
      this.visibilityChanged = visibleChanges !== undefined;
      return;
    } else {
      this.visibilityChanged = false;
      return;
    }

  }

  ngAfterViewChecked(): void {
    if (this.visibilityChanged && this.visible) {
      const tabbableChildren = tabbable(this.elementRef.nativeElement);
      if (tabbableChildren && tabbableChildren.length) {
        tabbableChildren[0].focus();
      }
      this.deRegisterHotkeys();
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
  }

  getDocMeta(dcn: string): void {
    this.docMetaFormGroup = this.documentSearchService.createDocMetaFormGroup();
    const getDocumentMetadataSubs = this.docMetaApi.getDocumentMetadata(dcn, uuid()).subscribe(docMeta => {
      if (docMeta) {
        this.docMetaFormGroup.patchValue(<DocumentVO>docMeta);
        this.documentVO = docMeta;
        this.documentSearchService.markFormGroupTouched(this.docMetaFormGroup);

        const member = this.docMetaFormGroup.get('member');

        if (member) {
          if (member.get('matchedIndicator')) {
            const matchedIndicator = member.get('matchedIndicator');
            this.matchedIndicatorValue = matchedIndicator ? matchedIndicator.value : 'Y';
            this.matchedIndicatorValue = this.matchedIndicatorValue === 'Y' ? 'Yes' : 'No';

            if (this.matchedIndicatorValue === 'Yes') {
              this.docMetaFormGroup!.get('member')!.disable();
            }
          }
        }

      }
      getDocumentMetadataSubs.unsubscribe();
    });
  }

  updateDocMeta(): void {

    const aDoc: DocumentVO = this.documentSearchService.mapFormToVo(this.docMetaFormGroup);

    const updateDocumentMetadataSubs = this.docMetaApi.updateDocumentMetadata(this.dcn, aDoc, uuid()).subscribe(() => {
      this.countDirty(this.docMetaFormGroup);
      this.docMetaFormGroup.markAsPristine();
      const pluralText = this.dirtyCount > 1 ? 's' : '';
      this.messageBoxService.addMessageBox('Attributes Updated', MessageBoxType.SUCCESS,
        'Attributes updated: ' + this.dirtyCount + ' attribute' + pluralText + ' associated to this document has been updated', 3000);
      this.close();
      updateDocumentMetadataSubs.unsubscribe();
      this.documentVO = aDoc;
    }, () => {
      this.messageBoxService.addMessageBox('Attributes were not Updated', MessageBoxType.ERROR, 'There was an error updating the Attributes');
      this.close();
      updateDocumentMetadataSubs.unsubscribe();
    });
  }

  countDirty(group: FormGroup): void {
    this.dirtyCount = 0;
    const controlIdxs: string[] = Object.keys(group.controls);
    for (let i = 0; i < controlIdxs.length; i++) {
      const controlIdx = controlIdxs[i];
      if (controlIdx && group.controls.hasOwnProperty(controlIdx)) {
        const control = group.controls[controlIdx];
        if (control instanceof FormGroup) {
          const childControlIdxs = Object.keys(control.controls);
          for (let j = 0; j < childControlIdxs.length; j++) {
            const childControlIdx = childControlIdxs[j];
            if (control.controls[childControlIdx].dirty) {
              this.dirtyCount++;
            }
          }
        } else if (control instanceof FormControl) {
          if (control.dirty) {
            this.dirtyCount++;
          }
        }
      }
    }
  }

  close(): void {
    this.visible = false;
    this.menuState = 'out';
    this.visibleChange.emit(this.visible);
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
        this.close();
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
}
