import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BypassManagementRow} from '../bypass-management-row.model';

@Component({
  selector: 'fox-ui-bypassqueue-custom-table-dropdown',
  templateUrl: 'bypass-queue-table.component.html',
  styleUrls: ['./bypass-queue-table.component.css']

})
export class FoxUiCustomTableComboComponent {
  @Input() colHeads: [string];
  @Input() data: BypassManagementRow[];
  @Input() keys: [string];
  @Input() dropdownKeyName: [string];
  @Input() usersList: string[];
  @Output() selectedAssigner: EventEmitter<any> = new EventEmitter<any>();
  @Output() assignToClick: EventEmitter<BypassManagementRow> = new EventEmitter<BypassManagementRow>();

  selectedOption(item: string, dat: BypassManagementRow): void {
    dat.selectedName = item;
    this.selectedAssigner.emit(item);
  }

  valueByKey(dat: BypassManagementRow, key: string): any {
    return dat[key];
  }

  action(selectedValue: BypassManagementRow): void {
    if (!selectedValue.selectedName) {
      selectedValue.selectedName = 'Main Queue';
    }
    this.assignToClick.emit(selectedValue);
  }

  dropdownPopulation(currentUser: string): string[] {
    if (this.usersList) {
      return ['Main Queue'].concat(this.usersList.filter((s: string) => {
        if (currentUser) {
          return currentUser !== s;
        } else {
          return false;
        }
      }));
    } else {
      return ['Main Queue'];
    }
  }

}
