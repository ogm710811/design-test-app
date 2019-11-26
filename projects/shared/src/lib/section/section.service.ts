import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import * as tabbableNS from 'tabbable';
import {SectionDirective} from './section.directive';

const tabbable = tabbableNS;

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  active: Subject<HTMLElement[]> = new Subject<HTMLElement[]>();
  lookup: { [key: string]: HTMLElement | undefined } = {};

  get firstElements(): HTMLElement[] {
    return this._active
      .map((section: SectionDirective) => section.elementRef.nativeElement)
      .map(sectionElem => sectionElem ? tabbable(sectionElem) : undefined)
      .map((tabbableInSection: HTMLElement[] | undefined) => (tabbableInSection && tabbableInSection.length) ? tabbableInSection[0] : undefined)
      .filter((firstElem: HTMLElement | undefined): firstElem is HTMLElement => !!firstElem)
      .sort((a: HTMLElement, b: HTMLElement) => {
        /*tslint:disable*/
        // noinspection JSBitwiseOperatorUsage
        if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) {
          return -1;
        } else { // noinspection JSBitwiseOperatorUsage
          if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING) {
            return 1;
          } else {
            return 0;
          }
        }
        /*tslint:enable*/
      });
  }

  _active: SectionDirective[] = [];

  constructor() {
  }

  addSection(sect: SectionDirective): void {
    if (this._active.indexOf(sect) < 0) {
      this._active.push(sect);
    }
    this.active.next(this.firstElements);
  }

  removeSection(sect: SectionDirective): void {
    const sectIdx = this._active.indexOf(sect);
    if (sectIdx >= 0) {
      this._active.splice(sectIdx, 1);
    }
    this.active.next(this.firstElements);
  }
}
