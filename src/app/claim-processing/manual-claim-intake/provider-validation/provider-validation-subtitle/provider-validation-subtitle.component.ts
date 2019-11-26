import {Component, Input} from '@angular/core';
import {PageHeaderSubtitleComponent} from '@fox/shared';

@Component({
  templateUrl: './provider-validation-subtitle.component.html',
  styleUrls: ['./provider-validation-subtitle.component.css'],
})

export class ProviderValidationSubtitleComponent implements PageHeaderSubtitleComponent {
  @Input() data: any;

}
