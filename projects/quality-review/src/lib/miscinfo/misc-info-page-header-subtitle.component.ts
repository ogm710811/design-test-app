import {Component, Input} from '@angular/core';
import {PageHeaderSubtitleComponent} from '@fox/shared';

@Component({
  templateUrl: './misc-info-page-header-subtitle.component.html',
  styleUrls: ['./misc-info-page-header-subtitle.component.css'],
})

export class MiscInfoPageHeaderSubtitleComponent implements PageHeaderSubtitleComponent {
  @Input() data: any;

}
