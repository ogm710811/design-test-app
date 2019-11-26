import {Component, Input} from '@angular/core';
import {ProviderSearchResultDetailsService} from '../../provider-profile.service';

@Component({
  selector: 'fox-provider-notes',
  templateUrl: './provider-notes.component.html',
  styleUrls: ['./provider-notes.component.css']
})

export class ProviderNotesComponent {

  @Input() detailsService?: ProviderSearchResultDetailsService;

  constructor() {
  }
}
