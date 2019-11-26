import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {PDFDocumentProxy} from 'pdfjs-dist';
import {FeatureFlagService} from '../feature-flag-service/feature-flag.service';
import {PdfUtil} from './pdf-util';

@Component({
  selector: 'fox-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnChanges {
  @Input() pdf: string | ArrayBuffer | object = {};
  @Input() downloadLink?: string;
  @Input() pdfHeightOffset?: number;

  @Output() totalPagesChange = new EventEmitter<number>();

  pdfInternal: string | ArrayBuffer | object = {};
  currentPage: number = 1;
  totalPages: number = 1;
  pdfHeight: number = 0;
  pageInputValue: number = 1;
  currentRotation: number = 0;
  currentZoomScale: number = 1;

  constructor(
    private featureFlagSvc: FeatureFlagService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pdf) {
      if (this.pdf) {
        // check if it's object or string
        if (typeof this.pdf === 'string') {
          // string's a url; is it a data url?
          if (this.pdf.startsWith('data:application/pdf;base64,')) {
            // when it's a base64 encoded data url, we want to convert it to an ArrayBuffer to avoid IE11's bizarre blob handling issues
            this.pdfInternal = PdfUtil.base64DataUrlToArrayBuffer(this.pdf);
            // anything else just sets the interal rep to the passed argument, but we will break out these conditions for ease of future code
          } else {
            // when it's an external URL pass it to the plugin
            this.pdfInternal = this.pdf;
          }
        } else if (typeof this.pdf === 'object') {
          // object is either instance of arraybuffer or config object
          if (this.pdf instanceof ArrayBuffer) {
            // we got passed an arraybuffer
            // --  just pass it through
            this.pdfInternal = this.pdf;
          } else {
            // we got passed a settings config object
            // --  just pass it through
            this.pdfInternal = this.pdf;
          }
        } else {
          // if the pdf is an unexpected type, we'll set it to an empty arraybuffer, since we know that degrades gracefully
          const emptyByteArray = new Uint8Array(0);
          this.pdfInternal = emptyByteArray.buffer;
        }
      } else {
        // if the pdf is falsey, we'll set it to an empty arraybuffer, since we know that degrades gracefully
        const emptyByteArray = new Uint8Array(0);
        this.pdfInternal = emptyByteArray.buffer;
      }
    }
  }

  onLoad(pdfProxy: PDFDocumentProxy): void {
    this.totalPages = pdfProxy.numPages;
    this.totalPagesChange.emit(this.totalPages);
    const pdfContainerHeight = document.getElementById('something')!.offsetHeight;
    pdfProxy.getPage(this.currentPage).then((page) => {
      this.pdfHeight = page.getViewport({scale: 1}).height;
      if (this.pdfHeightOffset) {
        this.currentZoomScale = pdfContainerHeight / (this.pdfHeight - this.pdfHeightOffset);
      } else {
        this.currentZoomScale = pdfContainerHeight / (this.pdfHeight + 429);
      }
    });
  }

  onFirstPageClicked(): void {
    this.currentPage = 1;
    this.pageInputValue = this.currentPage;
  }

  onLastPageClicked(): void {
    this.currentPage = this.totalPages;
    this.pageInputValue = this.currentPage;
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.keyCode && event.keyCode === 13) {
      if (this.pageInputValue <= this.totalPages) {
        this.currentPage = this.pageInputValue;
      } else {
        this.onLastPageClicked();
      }
    }
  }

  onPreviousClicked(): void {
    this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : this.currentPage;
    this.pageInputValue = this.currentPage;
  }

  onNextClicked(): void {
    this.currentPage = this.currentPage < this.totalPages ? this.currentPage + 1 : this.currentPage;
    this.resetParameters();
    this.pageInputValue = this.currentPage;
  }

  // Added To fix the issue of loading in ie browser from page 2 in pdf viewer.
  resetParameters(): void {
    this.currentZoomScale = (this.currentZoomScale - .000001);
  }

  onRotateLeftClicked(): void {
    this.currentRotation = (this.currentRotation - 90) % 360;
  }

  onRotateRightClicked(): void {
    this.currentRotation = (this.currentRotation + 90) % 360;
  }

  onZoomOutClicked(): void {
    this.currentZoomScale = (this.currentZoomScale * (2 / 3));
  }

  onZoomInClicked(): void {
    this.currentZoomScale = (this.currentZoomScale * 1.5);
  }

}
