import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fox-icon-item-format-table',
  templateUrl: './icon-item-format-table.component.html',
  styleUrls: ['./icon-item-format-table.component.css']
})
export class IconItemFormatTableComponent implements OnInit {
  @Input() itemToFormat: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
