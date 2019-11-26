import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReadOnlyTypeEnum} from './read-only-type.enum';

@Component({
  selector: 'fox-read-only-field',
  templateUrl: './read-only-field.component.html',
  styleUrls: ['./read-only-field.component.css']
})
export class ReadOnlyFieldComponent {

  @Input() type?: string;
  @Input() hasIcon?: boolean;
  @Input() iconUrl?: string;
  @Input() value: any;
  @Input() label?: string;
  @Input() arrayValue?: any[];
  @Input() linkArray?: any[];
  @Input() horizontal?: boolean;

  date = ReadOnlyTypeEnum.DATE;
  currency = ReadOnlyTypeEnum.CURRENCY;
  member = ReadOnlyTypeEnum.MEMBER;
  claim = ReadOnlyTypeEnum.CLAIM;

  @Output() private linkClicked = new EventEmitter<any>();

  concatArray(arrayInput: any[]): string {
    let outPut = '';
    arrayInput.forEach(val => {
      if (val) {
        if (outPut.length > 0) {
          outPut += ', ' + val;
        } else {
          outPut = val;
        }
      }
    });
    return outPut;
  }

  linkClickEvent(event: any): void {
    this.linkClicked.emit(event);
  }
}
