import {MessageBoxService, MessageBoxType} from '@fox/shared';
import {Injectable} from '@angular/core';
import {Container} from './miscinfo/model/container.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QualityReviewService {

  constructor(private httpClient: HttpClient,
              private messageBoxService: MessageBoxService) { }

  /**
   * Back end calls main
   */
  qltyRvwRvldMiscInfoServiceMain(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmiscinfo/qltyrvwrvldmiscinfoservice/main', JSON.stringify(container), options);

  }

  pushAlert(message: string): void {
    if (message) {
      window.scrollTo(0, 0);
      if (message.includes('LAST CLAIM')) {
        this.messageBoxService.addMessageBox('Miscellaneous Information', MessageBoxType.SUCCESS, message);
      } else {
        this.messageBoxService.addMessageBox('Miscellaneous Information', MessageBoxType.ERROR, message);
      }
    }
  }
}
