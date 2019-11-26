import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'fox-tile-box',
  templateUrl: 'tile-box.component.html',
  styleUrls: ['tile-box.component.css']
})
export class TileBoxComponent {
  @Input() statBoxTitle?: string;
  @Input() linksInformations: any;
  @Input() icon?: string;

  @Input() link?: string;
  @Input() module?: string;

  constructor(private router: Router) {
  }
}
