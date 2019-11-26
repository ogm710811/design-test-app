import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fox-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent {

  @Input() labels: string[] = [];
  @Input() values: string[] = [];
  @Input() showOneColumn = false;
  @Input() showTwoColumn = false;

  constructor() { }
}
