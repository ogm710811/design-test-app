import {Component, Input, OnInit} from '@angular/core';
import {TooltipTemplates} from '../fox-tooltip-enums/tooltip-menu-templates.enums';
import {TooltipMenuBase} from '../fox-tooltip-models/tooltip-menu-base';
import {TooltipMenuOption} from '../fox-tooltip-models/tooltip-menu-option';
import {TooltipMenuSettings} from '../fox-tooltip-models/tooltip-menu-settings';

@Component({
  selector: 'fox-tooltip',
  templateUrl: './fox-tooltip.component.html',
  styleUrls: ['./fox-tooltip.component.css']
})
export class FoxTooltipComponent extends TooltipMenuBase implements OnInit {
  public static readonly tooltipMenuSettingsDefault: TooltipMenuSettings = {
    templateType: TooltipTemplates.content,
    widthText: '',
    paddingText: '15',
    text: '',
    title: '',
    container: '',
    triggers: '',
    placement: '',
  };

  tooltipTemplates = TooltipTemplates;
  options: TooltipMenuOption[] = [];
  tooltipLabels: string[] = [];

  private _toolMenuParams: TooltipMenuSettings = new TooltipMenuSettings();
  @Input()
  set toolMenuParams(tooltipMenuParams: TooltipMenuSettings) {
    this._toolMenuParams = {
      ...FoxTooltipComponent.tooltipMenuSettingsDefault,
      ...tooltipMenuParams
    };
  }

  get toolMenuParams(): TooltipMenuSettings {
    return this._toolMenuParams;
  }

  get displayText(): string {
    if (typeof this.toolMenuParams.dynamicText === 'function') {
      return this.toolMenuParams.dynamicText();
    } else {
      return  this.toolMenuParams.text ? this.toolMenuParams.text : '';
    }
  }

  get widthText(): string {
    if (typeof this.toolMenuParams.dynamicWidthText === 'function') {
      return this.toolMenuParams.dynamicWidthText();
    } else {
      return this.toolMenuParams.widthText ? this.toolMenuParams.widthText : '';
    }
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.menuSetup();
  }

  currentTemplate(template: TooltipTemplates): boolean {
    return this.toolMenuParams.templateType === template;
  }

  onActionButtonClick(e: MouseEvent): void {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (typeof this.toolMenuParams.dynamicOptions === 'function') {
      this.options = this.toolMenuParams.dynamicOptions();
    }
    if (this.tooltip) {
      this.tooltip.show();
    }
  }

  private menuSetup(): void {
    if (typeof this.toolMenuParams.dynamicOptions === 'function') {
      this.options = this.toolMenuParams.dynamicOptions();
      this.tooltipLabels = [];
      this.options.forEach(o => {
        this.tooltipLabels.push(o.label);
      });
    }
  }

}
