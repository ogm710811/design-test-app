import {BadgeColors} from '../fox-badge-enums/badge-colors.enum';
import {BadgeIconPositions} from '../fox-badge-enums/badge-icon-positions.enum';
import {BadgeIcons} from '../fox-badge-enums/badge-icons.enum';
import {BadgeTemplates} from '../fox-badge-enums/badge-templates.enum';
import {BadgeTextDescriptions} from '../fox-badge-enums/badge-text-descriptions.enum';

export class BadgeSettings {
  templateType: BadgeTemplates = BadgeTemplates.icon;
  backgroundColor?: BadgeColors;
  badgeClasses?: string[];
  text?: BadgeTextDescriptions | string;
  iconClasses?: BadgeIcons[];
  iconPosition?: BadgeIconPositions;

  dynamicText?(): string;
}
