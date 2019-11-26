import {TooltipMenuSettingsBase} from './tooltip-menu-settings-base';
import {TooltipTemplates} from '../fox-tooltip-enums/tooltip-menu-templates.enums';
import {TooltipMenuOption} from './tooltip-menu-option';

export class TooltipMenuSettings extends TooltipMenuSettingsBase {
  templateType?: TooltipTemplates;
  widthText?: string;
  paddingText?: string;
  text?: string;
  dynamicOptions?(): TooltipMenuOption[];
  dynamicText?(): string;
  dynamicWidthText?(): string;
}
