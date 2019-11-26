import {Component, Input} from '@angular/core';

@Component({
  selector: 'fox-stat-box',
  templateUrl: 'stat-box.component.html',
  styleUrls: ['stat-box.component.css']
})
export class StatBoxComponent {
  @Input() statBoxTitle?: string;
  @Input() statBoxSubtitle?: string;
  @Input() statBoxValue?: string;
  @Input() hasSupervisorRole?: boolean;
  @Input() bypassBoxValue?: string;
}
