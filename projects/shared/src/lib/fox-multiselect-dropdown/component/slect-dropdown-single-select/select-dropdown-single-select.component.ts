import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'fox-select-single',
  templateUrl: './select-dropdown-single-select.component.html',
  styleUrls: ['./select-dropdown-single-select.component.css']
})
export class SelectDropdownSingleSelectComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() bindLabel: string = 'label';
  @Input() bindValue: string = '';
  @Input() clearable = true;
  @Input() selected: any;
  @Input() hideSelected: boolean = true;
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
  @Input() clearOnBackspace: boolean = true;

  @Output() selectEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.onChange();
  }

  onChange(): void {
    this.selectEmitter.emit(this.selected);
  }
}
