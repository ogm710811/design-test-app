import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Menu, MenuKind} from './menu';

@Component({
  selector: 'fox-databutton',
  templateUrl: './databutton.component.html',
  styleUrls: ['./databutton.component.css']
})

export class DatabuttonComponent implements OnInit {

  @Input() title?: string;
  @Input() preIcon?: string;
  @Input() menus?: Menu[];
  @Input() selectable?: boolean;

  @Output() menuClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter<any>();

  MenuItem = MenuKind.MenuItem;
  Divider = MenuKind.Divider;

  constructor() { }

  ngOnInit(): void {
    if (this.menus && this.menus.length) {
      this.menus = this.menus.map(menu => {
        menu.isVisible = menu.visible ? menu.visible() : menu.isVisible;
        menu.isDisabled = menu.disabled ? menu.disabled() : menu.isDisabled;
        return menu;
      });
    }
  }
}
