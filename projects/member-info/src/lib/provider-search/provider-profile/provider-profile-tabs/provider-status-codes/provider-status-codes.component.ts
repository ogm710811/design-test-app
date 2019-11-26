import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProviderSearchResultDetailsService} from '../../provider-profile.service';

@Component({
  selector: 'fox-provider-status-codes',
  templateUrl: './provider-status-codes.component.html',
  styleUrls: ['./provider-status-codes.component.css']
})

export class ProviderStatusCodesComponent {

  @Input() detailsService?: ProviderSearchResultDetailsService;

  @Input() isDesc: boolean = false;
  @Input() column: string = '';

  @Output() isDescChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() columnChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.isDescChange.emit(this.isDesc);

    this.column = property;
    this.columnChange.emit(this.column);
  }
}
