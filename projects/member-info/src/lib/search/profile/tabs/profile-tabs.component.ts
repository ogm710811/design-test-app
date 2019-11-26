import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FeatureFlagService} from '@fox/shared';

@Component({
  selector: 'fox-member-profile-tabs',
  templateUrl: './profile-tabs.component.html',
  styleUrls: ['./profile-tabs.component.css']
})
export class ProfileTabsComponent {
  @Input() membershipNumber: string = '';
  @Input() isSpecialHCUpdated: boolean = false;
  @Output() specialHandlingCode: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() insuredNoteNotFound: EventEmitter<boolean> = new EventEmitter<boolean>();
  lastPressed: number = 0;
  foxHotKey: string = '';
  tabNumber: string = '';

  constructor(
    private featureFlagSvc: FeatureFlagService
  ) {
  }

  get hasFeatureEnableTabs(): boolean {
    const isEnabled = !this.featureFlagSvc.isFeatureDisabled('F2279');
    this.foxHotKey = (isEnabled) ? 'alt+5' : 'alt+3';
    this.tabNumber = (isEnabled) ? '5' : '3';
    return isEnabled;
  }

  changePosition(position: number): void {

    this.lastPressed = position;
  }

  displayActiveMsg(e: any): void {
    this.specialHandlingCode.emit(true);
  }

  displayInsuredNoteNotFoundMsg(e: any): void {
    this.insuredNoteNotFound.emit(true);
  }
}
