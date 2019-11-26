import {
  AfterViewInit,
  Directive,
  ElementRef,
  Host,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional
} from '@angular/core';
import {Subscription} from 'rxjs';
import {InputComponent} from '../input/input.component';
import {GridService} from './grid.service';
import {NgSelectComponent} from '@ng-select/ng-select';

@Directive({
  selector: '[foxGridItem], fox-input[foxGridItem]'
})
export class GridItemDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() gridName: string = '';
  @Input() col?: number = undefined;
  @Input() row?: number = undefined;

  private _elementRef?: ElementRef;
  private focusSubs?: Subscription = undefined;
  private blurSubs?: Subscription = undefined;

  constructor(
    @Host() @Optional()
    public ngSelect?: NgSelectComponent,
    @Host() @Optional()
    public foxInput?: InputComponent,
    @Host() @Optional()
    public elementRef?: ElementRef,
    @Optional()
    private gridSvc?: GridService
  ) {
  }

  ngOnInit(): void {
    if (this.gridSvc && this.col && this.row) {
      this.gridSvc.register(this, this.col, this.row);
    }
  }

  ngAfterViewInit(): void {
    if (this.gridSvc) {
      if (this.foxInput) {
        this._elementRef = this.foxInput.inputField;
        this.focusSubs = this.foxInput.focus.subscribe(() => {
          this.onFocus();
        });
        this.blurSubs = this.foxInput.blur.subscribe(() => {
          this.onBlur();
        });
      } else if (this.elementRef) {
        this._elementRef = this.elementRef;
        this.elementRef.nativeElement.onfocus = () => {
          this.onFocus();
        };
        this.elementRef.nativeElement.onblur = () => {
          this.onBlur();
        };
      }
    }
  }

  ngOnDestroy(): void {
    if (this.focusSubs) {
      this.focusSubs.unsubscribe();
    }
    if (this.blurSubs) {
      this.blurSubs.unsubscribe();
    }
  }

  onFocus(): void {
    if (this.gridSvc) {
      const blurSubs = this.gridSvc.activeGridBlur.subscribe(() => {
        if (this.gridSvc && !this.gridSvc.activeGrid) {
          this.gridSvc.setActiveGrid(this.gridName);
          blurSubs.unsubscribe();
        }
      });
      if (!this.gridSvc.activeGrid) {
        this.gridSvc.setActiveGrid(this.gridName);
        blurSubs.unsubscribe();
      }
    }
  }

  onBlur(): void {
    if (this.gridSvc) {
      this.gridSvc.unsetActiveGrid();
    }
  }

  focus(): void {
    if (this.ngSelect) {
      this.ngSelect.focus();
    } else if (this._elementRef) {
      const el = this._elementRef.nativeElement;
      el.focus();
      if (el && el instanceof HTMLInputElement) {
        const input = el as HTMLInputElement;
        input.setSelectionRange(0, input.value.length, 'forward');
      }
    }
  }

  copyDown(): void {
    if (!this.gridSvc || !this.row) {
      return;
    }

    const fieldWithValueToReplicate = this.gridSvc.itemAtOffsetFrom(this, 0, -1, false, false);
    const valueToReplicate = fieldWithValueToReplicate ? (
      fieldWithValueToReplicate.foxInput ? fieldWithValueToReplicate.foxInput.value : (
        fieldWithValueToReplicate.elementRef ? fieldWithValueToReplicate.elementRef.nativeElement.value : undefined
      )
    ) : undefined;
    for (let gridRow = this.row; gridRow < this.gridSvc.getNumGridRows(this.gridName); gridRow++) {
      const gridItem = this.gridSvc.itemAtOffsetFrom(this, 0, gridRow - this.row, false, false);
      if (gridItem && gridItem.foxInput) {
        gridItem.foxInput.value = valueToReplicate;
      } else if (gridItem && gridItem.elementRef && gridItem.elementRef.nativeElement && gridItem.elementRef.nativeElement.hasOwnProperty('value')) {
        gridItem.elementRef.nativeElement.value = valueToReplicate;
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(keydownEvent: KeyboardEvent): void {
    if (this.gridSvc) {
      let targetGridItem;
      if (keydownEvent.key === 'ArrowUp' || keydownEvent.key === 'Up') {
        targetGridItem = this.gridSvc.itemAtOffsetFrom(this, 0, -1, true, true);
      } else if (keydownEvent.key === 'ArrowDown' || keydownEvent.key === 'Down') {
        targetGridItem = this.gridSvc.itemAtOffsetFrom(this, 0, 1, true, true);
      } else if (keydownEvent.key === 'ArrowLeft' || keydownEvent.key === 'Left') {
        targetGridItem = this.gridSvc.itemAtOffsetFrom(this, -1, 0, true, true);
      } else if (keydownEvent.key === 'ArrowRight' || keydownEvent.key === 'Right') {
        targetGridItem = this.gridSvc.itemAtOffsetFrom(this, 1, 0, true, true);
      }

      if (this.ngSelect) {
        this.ngSelect.close();
        keydownEvent.stopPropagation();
      }
      if (targetGridItem) {
        targetGridItem.focus();
        keydownEvent.preventDefault();
      }
    }
  }

  toString(): string {
    return `${this.gridName}(col ${this.col}, row ${this.row})`;
  }
}
