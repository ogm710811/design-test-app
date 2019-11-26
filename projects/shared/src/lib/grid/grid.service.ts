import {EventEmitter, Injectable} from '@angular/core';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {GridItemDirective} from './grid-item.directive';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  activeGrid?: (GridItemDirective | null)[][] = undefined;
  activeGridBlur: EventEmitter<'blur'> = new EventEmitter<'blur'>();

  private namedGrids: {[key: string]: (GridItemDirective | null)[][]} = {};
  private hotkey?: Hotkey = undefined;

  constructor(
    private readonly hotkeyService: HotkeysService
  ) {
  }

  setHotkeyForActiveGrid(): void {
    if (this.hotkey) {
      this.hotkeyService.remove(this.hotkey);
    }
    this.hotkey = new Hotkey(
      'alt+k',
      (keyEvent, combo) => {
        console.log('got the ctrl+l event');
        for (const column of this.getActiveGrid() || []) {
          for (const row of column) {
            console.log('checking table cell');
            if (row && (
              (row.foxInput && row.foxInput.inputField && row.foxInput.inputField.nativeElement === document.activeElement) ||
              (row.elementRef && row.elementRef.nativeElement === document.activeElement))) {
              console.log('cell matched');
              row.copyDown();
            }
          }
        }
        return false;
      },
      ['input', 'textarea'],
      'Fills table column with the value from the row directly above the currently selected input');
    this.hotkeyService.add(this.hotkey);
  }

  setActiveGrid(name?: string): void {
    this.activeGrid = this.getGrid(name || '');
    this.setHotkeyForActiveGrid();
  }

  unsetActiveGrid(): void {
    this.activeGrid = undefined;
    this.activeGridBlur.emit('blur');
    if (this.hotkey) {
      this.hotkeyService.remove(this.hotkey);
    }
  }

  getActiveGrid(): undefined | (GridItemDirective | null)[][] {
    return this.activeGrid;
  }

  getNumGridCols(name?: string): number {
    return this.getGrid(name || '').length;
  }

  getNumGridRows(name?: string): number {
    return this.getGrid(name || '').map(lst => lst.length)
      .reduce((prev, curr) => prev > curr ? prev : curr, 0);
  }

  register(item: GridItemDirective, col: number, row: number): void {
    const grid = this.getGrid(item.gridName);
    // Extend the number of columns if necessary
    if (col >= grid.length) {
      for (let i = grid.length; i <= col; i++) {
        grid[i] = [];
      }
    }

    // Extend the number of rows if necessary
    for (let i = 0; i < grid.length; i++) {
      const items: (GridItemDirective | null)[] = grid[i];
      if (row >= items.length) {
        for (let j = items.length; j <= row; j++) {
          grid[i].push(null);
        }
      }
    }

    grid[col][row] = item;
  }

  itemAt(name: string, col: number, row: number): GridItemDirective | null {
    const grid = this.getGrid(name);
    if (col >= grid.length) {
      return null;
    } else if (row >= grid[col].length) {
      return null;
    }
    return grid[col][row];
  }

  itemAtOffsetFrom(item: GridItemDirective, colOffset: number, rowOffset: number, colWrap = false, rowWrap = false): (GridItemDirective | null) {
    const grid = this.getGrid(item.gridName);
    if (!item.col || !item.row || !grid) {
      return null;
    }
    const rawCol = item.col + colOffset;
    const rawRow = item.row + rowOffset;
    const adjustedCol = colWrap ?
      (rawCol < 0 ? grid.length + rawCol : rawCol) % grid.length :
      rawCol < 0 ? 0 : (rawCol >= grid.length ? grid.length - 1 : rawCol);
    const adjustedRow = rowWrap ?
      (rawRow < 0 ? grid[adjustedCol].length + rawRow : rawRow) % grid[adjustedCol].length :
      rawRow < 0 ? 0 : (rawRow >= grid[adjustedCol].length ? grid[adjustedCol].length - 1 : rawRow);
    return grid[adjustedCol][adjustedRow];
  }

  private getGrid(name: string): (GridItemDirective | null)[][] {
    if (name in this.namedGrids && this.namedGrids[name]) {
      return this.namedGrids[name];
    } else {
      this.namedGrids[name] = [];
      return this.namedGrids[name];
    }
  }
}
