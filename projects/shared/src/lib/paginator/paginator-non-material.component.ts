import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {SectionService} from '../section/section.service';
import {HotkeyDirective} from '../hotkey/hotkey.directive';
import {MatSelectChange} from '@angular/material';

@Component({
  selector: 'fox-paginator-non-material',
  templateUrl: 'paginator-non-material.component.html',
  styleUrls: ['paginator-non-material.component.css']

})
export class PaginatorNonMaterialComponent implements OnChanges, OnDestroy {
  @Input() dataLengthInput = 0;
  @Input() pageTotal = 0;
  @Input() pageSize = 5;
  @Input() currentPage = 0;
  @Input() pageSizeDropdownOption = [5, 10, 20];
  @Input() childIdBase?: string;
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() currentPageChange: EventEmitter<number> = new EventEmitter<number>();
  lastPageNumber = 6;
  pageButtons = 100;
  decrementHotkey?: Hotkey;
  incrementHotkey?: Hotkey;

  get prevId(): string {
    return 'lnk-pg-prev' + this.childIdSuffix;
  }

  get nextId(): string {
    return 'lnk-pg-next' + this.childIdSuffix;
  }

  get startPageRange(): number {
    return ((this.currentPage || 0) * (this.pageSize || 5)) + 1;
  }

  get lastPageRange(): number {
    const initialCalc = (this.currentPage + 1) * this.pageSize;
    if (initialCalc > this.dataLengthInput) {
      return this.dataLengthInput;
    }
    return initialCalc || 5;
  }

  get pages(): number[] {
    const pgs: number[] = [];
    for (let i = 0; i < ((this.pageTotal < this.pageButtons) ? this.pageTotal : this.pageButtons); i++) {
      pgs.push(i);
    }
    return pgs;
  }

  private get childIdSuffix(): string {
    return this.childIdBase ? ('-' + this.childIdBase) : '';
  }

  constructor(private hotkeysService: HotkeysService, private sectionSvc: SectionService) {

    // Decrement page
    this.decrementHotkey = HotkeyDirective.registerHotkey(this.hotkeysService, 'alt+pageup', (): boolean => {
      if (this.checkIfTableHasFocus()) {
        this.previousPage();
      }

      // return false to prevent event bubbling
      return false;
    }, 'decrement on the page');

    // Increment page
    this.incrementHotkey = HotkeyDirective.registerHotkey(this.hotkeysService, 'alt+pagedown', (): boolean => {
      if (this.checkIfTableHasFocus()) {
        this.nextPage();
      }
      // return false to prevent event bubbling
      return false;
    }, 'increment on the page');

  }

  checkIfTableHasFocus(): boolean {
    return this.sectionSvc._active
      .map(section => section.elementRef.nativeElement)
      .filter(x => x.contains(document.activeElement)).length > 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('pageTotal' in changes) {
      if (this.pageTotal > 6) {
        this.lastPageNumber = this.pageTotal;
      }
    }
  }

  ngOnDestroy(): void {
    this.hotkeysService.remove(this.decrementHotkey);
    this.hotkeysService.remove(this.incrementHotkey);
  }

  pageNumId(pageNumber: number): string {
    return 'lnk-pg-num' + pageNumber.toString() + this.childIdSuffix;
  }

  switchPageIndex(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.currentPageChange.emit(this.currentPage);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.currentPageChange.emit(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pageTotal - 1) {
      this.currentPage++;
      this.currentPageChange.emit(this.currentPage);
    }
  }

  dottedPreviousPage(): void {
    if (this.currentPage > this.pageTotal - 3) {
      this.currentPage = this.pageTotal - 5;
    } else {
      this.currentPage--;
    }
    this.currentPageChange.emit(this.currentPage);
  }

  dottedNextPage(): void {
    if (this.currentPage < 3) {
      this.currentPage = 4;
    } else {
      this.currentPage += 2;
    }
    this.currentPageChange.emit(this.currentPage);
  }

  changePageSize(i: MatSelectChange): void {
    this.pageSize = i.value;
    this.currentPage = 0;
    this.pageSizeChange.emit(i.value);
    this.currentPageChange.emit(this.currentPage);
  }

}
