import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProviderApi} from '@fox/rest-clients';
import {memberInformationUrlPrefixProviderProfile} from '@fox/shared';
import {ProviderSearchResultSet} from '../provider-search-result.model';

@Component({
  selector: 'fox-provider-search-results',
  templateUrl: './provider-result-table.component.html',
  styleUrls: ['../provider-search.component.css']
})

export class ProviderResultTableComponent {

  @Input() providerSearchResults: ProviderSearchResultSet[] = [];
  @Input() isDesc: boolean = false;
  @Input() column: string = '';

  @Output() isDescChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() columnChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectEvent: EventEmitter<string> = new EventEmitter<string>();
  direction: number = 0;

  get dataKeys(): string[] {
    return Object.keys(this.providerSearchResults[0]);
  }

  constructor(private providerSearchApi: ProviderApi) {
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.isDescChange.emit(this.isDesc);

    this.column = property;
    this.columnChange.emit(this.column);
    this.direction = this.isDesc ? 1 : -1;
  }

  getUrlForProvider(id: string): string {
    let url = '';
    if (id) {
      url = memberInformationUrlPrefixProviderProfile + id;
    }
    return url;
  }
}
