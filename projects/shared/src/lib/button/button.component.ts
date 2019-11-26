import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ButtonStatus} from './button.enum';

@Component({
  selector: 'fox-loading-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})

export class ButtonComponent implements OnChanges {
  @Input() buttonStatus?: string;
  @Input() buttonValue?: string;
  @Input() typeValue?: string;
  @Input() foxHotKeyValue?: string;
  @Input() hasChevron: boolean = false;
  @Input() useSmallerWidth: boolean = false;
  @Output() buttonClick = new EventEmitter<any>();
  buttonStatusValue?: string;
  buttonClass?: string;
  iconImg?: string;
  loader?: boolean;
  disable?: boolean;
  isHidden?: boolean;
  isNormalText: boolean = true;

  constructor() {
  }

  onClickButton(event: Event): void {
    this.buttonClick.emit(event);
  }

  resetState(): void {
    setTimeout(() => {
      this.buttonStatus = ButtonStatus.SUBMIT;
      this.buttonStatusValue = this.buttonValue ? this.buttonValue : ButtonStatus.SUBMIT;
      this.buttonValue = this.buttonValue ? this.buttonValue : ButtonStatus.SUBMIT;
      this.buttonClass = 'btn btn-primary';
      this.iconImg = '';
      this.disable = false;
      this.loader = false;
      this.isHidden = true;
      this.isNormalText = this.hasChevron;
    }, 2500);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('buttonStatus' in changes) {
      this.buttonStatusValue = this.buttonValue;
      switch (changes.buttonStatus.currentValue) {
        case ButtonStatus.DISABLED:
          this.buttonClass = 'btn btn-primary';
          this.isHidden = true;
          this.disable = true;
          this.isNormalText = this.hasChevron;
          break;
        case ButtonStatus.SUBMIT:
          this.buttonStatusValue = this.buttonValue;
          this.buttonClass = 'btn btn-primary';
          this.iconImg = '';
          this.disable = false;
          this.loader = false;
          this.isHidden = true;
          this.isNormalText = this.hasChevron;
          break;
        case ButtonStatus.WORKING:
          this.buttonStatusValue = 'Working...';
          this.buttonClass = 'btn btn-primary-loading';
          this.iconImg = 'assets/img/Spinner.svg';
          this.disable = true;
          this.loader = true;
          this.isHidden = false;
          this.isNormalText = false;
          break;
        case ButtonStatus.FAILED:
          this.buttonStatusValue = 'Failed';
          this.iconImg = 'assets/img/Deny-white.svg';
          this.buttonClass = 'btn btn-danger';
          this.disable = true;
          this.loader = false;
          this.isHidden = false;
          this.isNormalText = false;
          this.resetState();
          break;
        case ButtonStatus.SUCCESS:
          this.buttonStatusValue = 'Success';
          this.iconImg = 'assets/img/Confirm-white.svg';
          this.buttonClass = 'btn btn-success';
          this.disable = true;
          this.loader = false;
          this.isHidden = false;
          this.isNormalText = false;
          this.resetState();
          break;
        case ButtonStatus.OUTLINESUBMIT:
          this.buttonStatusValue = this.buttonValue;
          this.buttonClass = 'btn btn-secondary';
          this.iconImg = '';
          this.disable = false;
          this.loader = false;
          this.isHidden = true;
          this.isNormalText = this.hasChevron;
          break;
        case ButtonStatus.OUTLINEWORKING:
          this.buttonStatusValue = 'Working...';
          this.buttonClass = 'btn btn-secondary-loading';
          this.iconImg = 'assets/img/Spinner-blue.svg';
          this.disable = true;
          this.loader = true;
          this.isHidden = false;
          this.isNormalText = false;
          break;
        case ButtonStatus.OUTLINEFAILED:
          this.buttonStatusValue = 'Failed';
          this.iconImg = 'assets/img/deny-red-button.svg';
          this.buttonClass = 'btn btn-secondary-failed';
          this.disable = true;
          this.loader = false;
          this.isNormalText = false;
          this.resetState();
          break;
        case ButtonStatus.OUTLINESUCCESS:
          this.buttonStatusValue = 'Success!';
          this.iconImg = 'assets/img/confirm-green-button.svg';
          this.buttonClass = 'btn btn-secondary-success';
          this.disable = true;
          this.loader = false;
          this.isHidden = false;
          this.isNormalText = false;
          this.resetState();
          break;
        default:
          this.buttonStatusValue = 'Submit';
          this.buttonClass = 'btn btn-primary';
          this.iconImg = '';
          this.disable = false;
          this.loader = false;
          this.isHidden = true;
          this.isNormalText = this.hasChevron;
      }
      if (this.useSmallerWidth) {
        this.buttonClass += ' smaller-width';
      }
    }
  }
}
