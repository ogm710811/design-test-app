import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  BadgeColors,
  BadgeIconPositions,
  BadgeIcons,
  BadgeSettings,
  BadgeTemplates,
  BadgeTextDescriptions,
  Data,
  DataService,
  Menu,
  MenuKind,
  TooltipMenuSettings,
  TooltipTemplates
} from '@fox/shared';
import {TooltipDefinitionService} from '../../claim-processing/shared/tooltip-definition.service';

@Component({
  selector: 'fox-components-demo',
  templateUrl: './fox-components-demo.component.html',
  styleUrls: ['./fox-components-demo.component.css']
})
export class FoxComponentsDemoComponent implements OnInit, OnDestroy {
  toggle = true;
  selectDropdownDataSource: Data[];
  basicSelectedItemsSelectAll: Data[] = [];
  selectedItemsSelectAll: Data[] = [];
  hiddenItemsSelected: Data[] = [];
  selectedItems: string[];
  buttonStatus: string = 'Submit';

  // Data button configuration
  selectedMenu: string;
  title = 'Link Here';
  preIcon = 'gear-black.svg';
  selectable: boolean = true;

  items = [
    {id: 1, label: 'Yes'},
    {id: 2, label: 'No'},
    {id: 3, label: 'Maybe'},
    {id: 4, label: 'Totally'},
    {id: 5, label: 'Of course'}
  ];
  showSelected;
  showSelected1;
  showSelected2;

  menus: Menu[] = [
    {
      key: 'menu1',
      title: 'Menu 1',
      kind: MenuKind.MenuItem,
      isVisible: true,
      isDisabled: false
    },
    {
      key: 'divider1',
      kind: MenuKind.Divider,
      isVisible: true
    },
    {
      key: 'menu2',
      title: 'Menu 2',
      kind: MenuKind.MenuItem,
      visible: () => {
        return true;
      },
      disabled: () => {
        return true;
      }
    }
  ];
  // Data Button Configuration ends

  default = {
    closeOnSelect: false,
    placeholder: 'select value',
    hideSelected: false,
    hasAllSelectCheckbox: false
  };

  selectAll = {
    closeOnSelect: false,
    placeholder: 'select value',
    hideSelected: false,
    hasAllSelectCheckbox: true
  };

  hideSelected = {
    closeOnSelect: false,
    placeholder: 'select value',
    hideSelected: true,
    hasAllSelectCheckbox: false
  };

  recordLocked: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.recordLocked,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.recordLocked,
    iconClasses: [BadgeIcons.recordLocked],
    iconPosition: BadgeIconPositions.before
  };

  recordLockedIcon: BadgeSettings = {
    templateType: BadgeTemplates.icon,
    backgroundColor: BadgeColors.recordLocked,
    badgeClasses: ['bd-chip-icon', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.recordLocked,
    iconClasses: [BadgeIcons.recordLocked]
  };

  queue: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.queue,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.queue,
    iconClasses: [BadgeIcons.queue],
    iconPosition: BadgeIconPositions.before
  };

  paperClaimIcon: BadgeSettings = {
    templateType: BadgeTemplates.icon,
    backgroundColor: BadgeColors.paperClaim,
    badgeClasses: ['bd-chip-icon', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.paperClaim,
    iconClasses: [BadgeIcons.paperClaim]
  };

  specialHandlingCode: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.specialHC,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.specialHC,
    iconClasses: [BadgeIcons.specialHC],
    iconPosition: BadgeIconPositions.before
  };

  requestDenied: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.requestDenied,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.requestDenied,
    iconClasses: [BadgeIcons.requestDenied],
    iconPosition: BadgeIconPositions.before
  };

  maintPending: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.maintPending,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.maintPending,
    iconClasses: [BadgeIcons.maintPending],
    iconPosition: BadgeIconPositions.before
  };

  paperClaim: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.paperClaim,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.paperClaim,
    iconClasses: [BadgeIcons.paperClaim],
    iconPosition: BadgeIconPositions.before
  };

  pendingApproval: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.pendingApproval,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.pendingApproval,
    iconClasses: [BadgeIcons.pendingApproval],
    iconPosition: BadgeIconPositions.before
  };

  memberMigrated: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.memberMigrated,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.memberMigrated,
    iconClasses: [BadgeIcons.memberMigrated],
    iconPosition: BadgeIconPositions.before
  };

  iconAfterTextDescription: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.memberMigrated,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.memberMigrated,
    iconClasses: [BadgeIcons.memberMigrated],
    iconPosition: BadgeIconPositions.after
  };

  noIcon: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.queue,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.queue,
    iconClasses: [BadgeIcons.queue],
    iconPosition: BadgeIconPositions.none
  };

  dynamicText: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.paperClaim,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    dynamicText: () => {
      if (this.toggle) {
        return 'dynamic text';
      } else {
        return 'dynamic text changed';
      }
    },
    iconClasses: [BadgeIcons.paperClaim],
    iconPosition: BadgeIconPositions.before
  };

  id = setInterval(() => {
    this.setDynamicText();
  }, 1000);

  widthFinder = {
    width: '',
    find: (status: string): string => {
      const statusResult = this.toolTip.getToolTipStatusDescr(status);
      const numberOfChar = statusResult.length;
      this.widthFinder.width = (numberOfChar + 82).toString();
      return statusResult;
    }
  };

  hasStatus: boolean;

  get infoToolMenuTop(): any {
    return this._tooltipMenu.get('infoTop');
  }

  get infoToolMenuRight(): any {
    return this._tooltipMenu.get('infoRight');
  }

  get infoToolMenuBottom(): any {
    return this._tooltipMenu.get('infoBottom');
  }

  get infoToolMenuLeft(): any {
    return this._tooltipMenu.get('infoLeft');
  }

  get infoToolIconContent(): any {
    return this._tooltipMenu.get('infoIconContent');
  }

  get infoToolIconContentDisable(): any {
    return this._tooltipMenu.get('infoIconContentDisable');
  }

  get infoBottomHelp(): any {
    return this._tooltipMenu.get('infoBottomHelp');
  }

  get infoToolDynamicText(): any {
    return this._tooltipMenu.get('infoToolDynamicText');
  }

  get infoToolDynamicTextWithAutoWidth(): any {
    return this._tooltipMenu.get('infoToolDynamicTextWithAutoWidth');
  }

  get infoTopHelp(): any {
    return this._tooltipMenu.get('infoTopHelp');
  }

  private _tooltipMenu: Map<string, TooltipMenuSettings> = new Map<string, TooltipMenuSettings>([
    [
      'infoToolDynamicText',
      {
        templateType: TooltipTemplates.content,
        placement: 'top',
        dynamicText: () => {
          return this.hasStatus ? this.toolTip.getToolTipStatusDescr('D') : this.toolTip.getToolTipStatusDescr('M');
        },
        paddingText: '3',
        dynamicWidthText: () => {
          return this.setDynamicWidthText();
        },
      }
    ],
    [
      'infoToolDynamicTextWithAutoWidth',
      {
        templateType: TooltipTemplates.content,
        placement: 'top',
        dynamicText: () => {
          this.setDynamicWidthText();
          return this.hasStatus ? this.toolTip.getToolTipStatusDescr('D') : this.toolTip.getToolTipStatusDescr('M');
        },
        paddingText: '6',
      }
    ],
    [
      'infoTop',
      {
        templateType: TooltipTemplates.content,
        placement: 'top',
        text:
          'This tooltip template is to give user information. The content of the element can change depending of the user needs',
        widthText: '159'
      }
    ],
    [
      'infoRight',
      {
        templateType: TooltipTemplates.content,
        placement: 'right',
        text:
          'This tooltip template is to give user information. The content of the element can change depending of the user needs',
        widthText: '159'
      }
    ],
    [
      'infoBottom',
      {
        templateType: TooltipTemplates.content,
        placement: 'bottom',
        text:
          'This tooltip template is to give user information. The content of the element can change depending of the user needs',
        widthText: '159'
      }
    ],
    [
      'infoLeft',
      {
        templateType: TooltipTemplates.content,
        placement: 'left',
        text:
          'This tooltip template is to give user information. The content of the element can change depending of the user needs',
        widthText: '159'
      }
    ],
    [
      'infoBottomHelp',
      {
        templateType: TooltipTemplates.content,
        placement: 'bottom',
        text:
          'Help Information',
        widthText: '97'
      }
    ],
    [
      'infoTopHelp',
      {
        templateType: TooltipTemplates.content,
        placement: 'top',
        text: 'Member Information',
        widthText: '97'
      }
    ],
    [
      'infoIconContent',
      {
        templateType: TooltipTemplates.iconContent,
        placement: 'right',
        title: 'Action unavailable',
        dynamicOptions: () => {
          return [
            {
              icon: 'bullet-round-00bcd6.svg',
              label: 'Member is locked',
              action: () => {
              }
            },
            {
              icon: 'bullet-round-00bcd6.svg',
              label: 'Quality code active',
              action: () => {
              }
            },
            {
              icon: 'bullet-round-00bcd6.svg',
              label: 'Member not migrated',
              action: () => {
              }
            },
            {
              icon: 'bullet-round-00bcd6.svg',
              label: 'Special Handling Code',
              action: () => {
              }
            }
          ];
        }
      }
    ],
    [
      'infoIconContentDisable',
      {
        templateType: TooltipTemplates.iconContent,
        placement: 'left',
        title: 'Action unavailable',
        dynamicOptions: () => {
          return [
            {
              icon: 'bullet-round-FFAA25.svg',
              label: 'Member is locked',
              action: () => {
              }
            },
            {
              icon: 'bullet-round-FFAA25.svg',
              label: 'Quality code active',
              action: () => {
              }
            },
            {
              icon: 'bullet-round-FFAA25.svg',
              label: 'Member not migrated',
              action: () => {
              }
            },
            {
              icon: 'bullet-round-FFAA25.svg',
              label: 'Special Handling Code',
              action: () => {
              }
            }
          ];
        }
      }
    ]
  ]);

  constructor(
    private dataService: DataService,
    private toolTip: TooltipDefinitionService
  ) {
  }

  ngOnInit(): void {
    this.dataService.getPlans()
      .pipe()
      .subscribe((res) => {
        this.selectDropdownDataSource = res;
        this.selectedItems = [this.selectDropdownDataSource[0].id];
      });
  }

  setDynamicText(): void {
    this.toggle = !this.toggle;
  }

  setDynamicWidthText(): string {
    if (this.toggle) {
      this.widthFinder.find('D');
      this.hasStatus = true;
      return this.widthFinder.width;
    } else {
      this.widthFinder.find('M');
      this.hasStatus = false;
      return this.widthFinder.width;
    }
  }

  ngOnDestroy(): void {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  onSelectedItemsSelectAll(items: Data[]): void {
    this.selectedItemsSelectAll = items;
  }

  onBasicSelectedItemsSelectAll(items: Data[]): void {
    this.basicSelectedItemsSelectAll = items;
  }

  onHiddenItemsSelected(items: Data[]): void {
    this.hiddenItemsSelected = items;
  }

  menuClicked(menuData): void {
    const clickedMenu = menuData.menu;
    if (clickedMenu) {
      this.selectedMenu = clickedMenu.title || clickedMenu.key;
    }
  }

  btnClick(event): void {
    this.buttonStatus = 'Working...';
    setTimeout(() => {
        this.buttonStatus = 'Success!';
        this.resetState();
      },
      5500);
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }
}
