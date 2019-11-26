import {fromEvent, Observable} from 'rxjs';
import {first, flatMap, map} from 'rxjs/operators';

export namespace PdfUtil {

  export function blobservableToDataUrl(blobservable: Observable<Blob>): Observable<string> {
    return blobservable.pipe(flatMap((blob: Blob) => { return blobToDataUrl(blob); }));
  }

  export function blobToDataUrl(blob: Blob): Observable<string> {

    const fr = new FileReader();
    const dataUrlObs: Observable<string> = fromEvent(fr, 'loadend')
      .pipe(
        map((ev: Event) => {
            return <string>fr.result;
          }
        ),
      );
    const firstDataUrl = dataUrlObs.pipe(first());
    fr.readAsDataURL(blob);
    return firstDataUrl;
  }

  export function base64DataUrlToArrayBuffer(base64: string): ArrayBuffer {
    const convertMe = base64.replace(/^data:[^,]+,/, '');
    const binaryString = atob(convertMe);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
