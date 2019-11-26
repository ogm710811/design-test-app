import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {SectionService} from '../section/section.service';
import {HotkeyDirective} from '../hotkey/hotkey.directive';
import {MatSelectChange} from '@angular/material/typings/select';

@Component({
  selector: 'fox-paginator',
  templateUrl: 'paginator.component.html',
  styleUrls: ['paginator.component.css']

})
export class PaginatorComponent implements OnChanges, OnDestroy {
  @Input() paginatorInput?: MatPaginator;
  @Output() paginatorChange: EventEmitter<MatPaginator> = new EventEmitter<MatPaginator>();
  @Input() pageSizeInput = 5;
  @Input() dataLengthInput = 0;
  pageTotal = 0;
  lastPageNumber = 6;
  thirdPageNumber = 3;
  fourthPageNumber = 4;
  dottedSecondPageIndicator: boolean = false;
  dottedFifthPageIndicator: boolean = false;
  pages: number[] = [];
  currentPage = 0;
  pageSizeOption = [5, 10, 20];
  pageSize = 5;
  startPageIndex = 1;
  lastPageIndex = 0;
  decrementHotkey?: Hotkey;
  incrementHotkey?: Hotkey;

  constructor(private hotkeysService: HotkeysService, private sectionSvc: SectionService) {
    this.lastPageIndex = this.pageSizeInput;

    // Decrement page
    this.decrementHotkey = HotkeyDirective.registerHotkey(this.hotkeysService, 'alt+pageup', (): boolean => {
      if (this.checkIfTableHasFocus()) {
        this.previousPaginator();
      }

      // return false to prevent event bubbling
      return false;
    }, 'decrement on the page');

    // Increment page
    this.incrementHotkey = HotkeyDirective.registerHotkey(this.hotkeysService, 'alt+pagedown', (): boolean => {
      if (this.checkIfTableHasFocus()) {
        this.nextPaginator();
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

  ngOnChanges(): void {
    this.setPages();
    this.setPaginatorValues();
  }

  ngOnDestroy(): void {
    this.hotkeysService.remove(this.decrementHotkey);
    this.hotkeysService.remove(this.incrementHotkey);
  }

  switchPageIndex(i: number): void {
    this.currentPage = i;
    if (this.paginatorInput && this.paginatorInput._pageIndex > i) {
      for (let j = this.paginatorInput._pageIndex; j > i; j--) {
        this.paginatorInput.previousPage();
      }
    } else if (this.paginatorInput) {
      for (let j = this.paginatorInput._pageIndex; j < i; j++) {
        this.paginatorInput.nextPage();
      }
    }
    this.setPageRange();
    this.setPaginatorValues();
  }

  nextPaginator(): void {
    if (this.paginatorInput && this.paginatorInput.pageIndex === 3) {
      this.dottedSecondPageIndicator = true;
    }
    if (this.paginatorInput) {
      this.currentPage = this.paginatorInput.pageIndex + 1;
    }
    if (this.paginatorInput) {
      this.paginatorInput.nextPage();
    }
    this.paginatorChange.emit(this.paginatorInput);
    this.setPageRange();
    if (this.pageTotal > 6 && this.dottedSecondPageIndicator && this.dottedFifthPageIndicator) {
      this.fourthPageNumber = this.fourthPageNumber + 1;
      this.thirdPageNumber = this.thirdPageNumber + 1;
    }
  }

  previousPaginator(): void {
    if (this.paginatorInput && this.paginatorInput.pageIndex === (this.pageTotal - 4)) {
      this.dottedFifthPageIndicator = true;
    }
    if (this.paginatorInput) {
      this.currentPage = this.paginatorInput.pageIndex - 1;
      this.paginatorInput.previousPage();
    }
    this.paginatorChange.emit(this.paginatorInput);
    this.setPageRange();
    if (this.pageTotal > 6 && this.dottedSecondPageIndicator && this.dottedFifthPageIndicator) {
      this.fourthPageNumber = this.fourthPageNumber - 1;
      this.thirdPageNumber = this.thirdPageNumber - 1;
    }
  }

  changePageSize(i: MatSelectChange): void {
    if (this.paginatorInput) {
      this.paginatorInput._changePageSize(i.value);
    }
    this.pageSizeInput = i.value;
    this.setPages();
    this.paginatorChange.emit(this.paginatorInput);
    this.setPageRange();
    this.setPaginatorValues();
  }

  setPageRange(): void {
    if (this.paginatorInput) {
      this.startPageIndex = this.paginatorInput._pageIndex * this.paginatorInput.pageSize + 1;
      this.lastPageIndex = (this.paginatorInput._pageIndex + 1) * (this.paginatorInput.pageSize);
    }
    if (this.dataLengthInput < this.lastPageIndex) {
      this.lastPageIndex = this.dataLengthInput;
    }
  }

  setPaginatorValues(): void {
    if (this.pageTotal > 6) {
      this.lastPageNumber = this.pageTotal;
      if (this.currentPage === (this.pageTotal - 1)) {
        this.thirdPageNumber = this.pageTotal - 3;
        this.fourthPageNumber = this.pageTotal - 2;
      }
      if (this.currentPage === 0) {
        this.thirdPageNumber = 3;
        this.fourthPageNumber = 4;
      }
      if (!(this.fourthPageNumber === this.pageTotal - 2)) {
        this.dottedFifthPageIndicator = true;
      } else {
        this.dottedFifthPageIndicator = false;
      }
      if (!(this.fourthPageNumber === 4)) {
        this.dottedSecondPageIndicator = true;
      } else {
        this.dottedSecondPageIndicator = false;
      }
    }
  }

  setPages(): void {
    this.pages = [];
    const maxLength = Math.ceil(this.dataLengthInput / this.pageSizeInput);
    this.pageTotal = maxLength;
    for (let i = 0; i < maxLength; i++) {
      this.pages.push(i);
    }
  }

  dottedPreviousPage(): void {
    if (this.pageTotal > 6) {
      this.fourthPageNumber = this.fourthPageNumber - 1;
      this.thirdPageNumber = this.thirdPageNumber - 1;
    }
    this.switchPageIndex(this.thirdPageNumber - 1);
  }

  dottedNextPage(): void {
    if (this.pageTotal > 6) {
      this.fourthPageNumber = this.fourthPageNumber + 1;
      this.thirdPageNumber = this.thirdPageNumber + 1;
    }
    this.switchPageIndex(this.fourthPageNumber - 1);
  }

}
