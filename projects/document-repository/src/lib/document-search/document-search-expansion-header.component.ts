import {Component, Input} from '@angular/core';
import {ResourceOfDocumentVO} from '@fox/rest-clients';
import {DocumentSearchParameterModel} from './model/document-search-parameter.model';

@Component({
  selector: 'fox-document-search-expansion-header',
  templateUrl: './document-search-expansion-header.component.html',
  styleUrls: ['./document-search.component.css']
})
export class DocumentSearchExpansionHeaderComponent {

  @Input() searchResult: Array<ResourceOfDocumentVO> = [];
  @Input() showEnteredParameters = false;
  @Input() parametersUsed: DocumentSearchParameterModel[] = [];

}
