import {Injectable} from '@angular/core';
import {Container} from '../miscinfo/model/container.model';

@Injectable({
  providedIn: 'root'
})
export class QualityReviewMiscService {
  savedQualityReviewResult: Container = new Container();
  qualityReviewFlag: boolean = false;
}
