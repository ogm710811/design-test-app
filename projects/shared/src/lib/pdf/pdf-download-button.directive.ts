import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import {LoginService} from '../login-service/login.service';
import {Observable, of} from 'rxjs';
import * as uuidNS from 'uuid';

const uuid = uuidNS;

@Directive({
  selector: '[foxPdfDownloadUrl], [foxPdfDownloadUrls]'
})
export class PdfDownloadButtonDirective {
  @Input() foxPdfDownloadUrl?: string;
  @Input() foxPdfDownloadUrls?: string[];
  @Output() downloadClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(private elementRef: ElementRef, private http: HttpClient, private loginService: LoginService) {
  }

  downloadSingle(pdfUrl: string): void {
    if (pdfUrl) {

      let headers = new HttpHeaders();
      headers = headers.set('RequestCorrelationId', uuid());
      headers = headers.set('Authorization', 'Bearer ' + this.loginService.loginState.access_token);

     const blobservable: Observable<Blob | undefined> =
       pdfUrl ? this.http.get(pdfUrl, {
         responseType: 'blob',
         observe: 'body',
         headers: headers,
       }) : of(undefined);
     blobservable.subscribe(
       (theBlob?: Blob) => {
         if (theBlob) {
           if (window.navigator.msSaveOrOpenBlob) {
             window.navigator.msSaveOrOpenBlob(theBlob, 'fox-document.pdf');
        } else {
             const downloadLink = document.createElement('a');
             downloadLink.href = window.URL.createObjectURL(theBlob);
             downloadLink.download = 'fox-pdf.pdf';
             document.body.appendChild(downloadLink);
             downloadLink.click();
             // cleanup
             downloadLink.remove();
           }
         }
       }
       );
    }
  }

  @HostListener('click')
  onDownloadClicked(): void {
    const downloadUrls = this.foxPdfDownloadUrls && this.foxPdfDownloadUrls.length ? this.foxPdfDownloadUrls : [];
    if (this.foxPdfDownloadUrl) {
      downloadUrls.push(this.foxPdfDownloadUrl);
    }
    downloadUrls.forEach((url => this.downloadSingle(url)));
  }
}
