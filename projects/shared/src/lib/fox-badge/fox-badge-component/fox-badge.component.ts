import {Component, Input, OnInit} from '@angular/core';
import {BadgeColors} from '../fox-badge-enums/badge-colors.enum';
import {BadgeIconPositions} from '../fox-badge-enums/badge-icon-positions.enum';
import {BadgeIcons} from '../fox-badge-enums/badge-icons.enum';
import {BadgeTemplates} from '../fox-badge-enums/badge-templates.enum';
import {BadgeTextDescriptions} from '../fox-badge-enums/badge-text-descriptions.enum';
import {BadgeSettings} from '../fox-badge-models/badge-settings';

@Component({
  selector: 'fox-badge',
  templateUrl: './fox-badge.component.html',
  styleUrls: ['./fox-badge.component.css']
})
export class FoxBadgeComponent implements OnInit {
  public static readonly badgeSettingsDefault: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.requestApproved,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.requestApproved,
    iconClasses: [BadgeIcons.requestApproved],
    iconPosition: BadgeIconPositions.before
  };

  badgeTemplates = BadgeTemplates;
  badgeClasses?: string[];

  @Input()
  set badgeParams(badgeParams: BadgeSettings) {
    this._badgeParams = {
      ...FoxBadgeComponent.badgeSettingsDefault,
      ...badgeParams
    };
  }

  get badgeParams(): BadgeSettings {
    return this._badgeParams;
  }

  get showIconBefore(): boolean {
    return this.badgeParams.iconPosition === BadgeIconPositions.before;
  }

  get showIconAfter(): boolean {
    return this.badgeParams.iconPosition === BadgeIconPositions.after;
  }

  get displayText(): string {
    let text: string = '';
    if (typeof this.badgeParams.dynamicText === 'function') {
      return this.badgeParams.dynamicText();
    } else if (this.badgeParams.text) {
      text = this.badgeParams.text.toString();
    }
    return text;
  }

  private _badgeParams: BadgeSettings = {
    ...FoxBadgeComponent.badgeSettingsDefault
  };

  constructor() {
  }

  ngOnInit(): void {
    if (this.badgeParams.badgeClasses && this.badgeParams.backgroundColor) {
      this.badgeClasses = this.badgeParams.badgeClasses
        .concat(this.badgeParams.backgroundColor.toString());
    }
  }

  currentTemplate(template: BadgeTemplates): boolean {
    return this.badgeParams.templateType === template;
  }

}
