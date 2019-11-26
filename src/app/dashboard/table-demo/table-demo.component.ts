import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
  billLineTableData,
  dropDownOptions,
  hospitalData,
  iconLinkSrc,
  teamTestData,
  teamTestData1,
  trcs,
  trcsInput
} from '@fox/test-support';
import {TableColumnKind, TableComponent} from '@fox/shared';
import {
  testColumnData,
  testHospitalInputColumns
} from '@fox/shared';

@Component({
  selector: 'fox-table-demo',
  templateUrl: 'table-demo.component.html',
  styleUrls: ['table-demo.component.css']
})
export class TableDemoComponent implements AfterViewInit {
  @ViewChild('inputTable') inputTable: TableComponent;
  @ViewChild('inputTable2') inputTable2: TableComponent;
  @ViewChild('inputTable3') inputTable3: TableComponent;
  lastPressed: number = 0;
  isHospitalTableConstructed: boolean = false;

  headers = Object.keys(teamTestData[0]);
  columns = Object.keys(teamTestData[0]).map((key, idx) => {
    return {
      key: key,
      header: key,
      border: idx === 1 || idx === 2,
      sortKey: key
    };
  });

  columnsHeader =  testColumnData;
  hospitalInputColumns = testHospitalInputColumns;
  result = teamTestData;
  resultCurrentSortKey = this.columns[0].sortKey;
  resultSortDirection: any = 'ASC';
  fixedHeaders = Object.keys(teamTestData1[0]);
  fixedColumns = this.fixedHeaders.map((key, idx) => {
    return {
      key: key,
      header: key,
      border: idx === 1 || idx === 2
    };
  });
  fixedHeaderData = teamTestData1;

  bigHeaders = Object.keys(trcs[0]);
  bigColumns = this.bigHeaders.map((key, idx) => {
    return {
      key: key,
      header: key,
      border: false,
      kind: 0 === idx ?
        TableColumnKind.Link :
        2 === idx ?
          TableColumnKind.Currency :
          TableColumnKind.Text
    };
  });
  bigResult = trcs;
  inputResult = trcsInput;
  inputResult2 = trcsInput;
  hospitalTableData = hospitalData;

  iconHeaders = Object.keys(iconLinkSrc[0]);
  iconColumns = this.iconHeaders.map((key, idx) => {
    return {
      key: key,
      header: key,
      border: false,
      preImage: 0 === idx ? 'member-blue.svg' : null,
      kind:
          0 === idx ?
          TableColumnKind.MemberItem :
          5 === idx ?
              TableColumnKind.Date :
          6 === idx ?
              TableColumnKind.IconItem :
              TableColumnKind.Text
    };
  });
  iconResult = iconLinkSrc;

  billLineTableResult = billLineTableData;
  billLineTableHeaders = Object.keys(billLineTableData[0]);
  billLineTableColumns = this.billLineTableHeaders.map((key, idx) => {
    return {
      key: key,
      header: key,
      border: false,
      kind:
        1 === idx ?
          TableColumnKind.Input :
          4 === idx ?
            TableColumnKind.Date :
            5 === idx ?
              TableColumnKind.Currency :
              TableColumnKind.Text,
      inputType: 'textarea',
      sortKey: 1 !== idx ? key : null
    };
  });

  billLineTableSortKey = this.billLineTableColumns[0].sortKey;
  billLineTableSortDirection: any = 'ASC';

  selectedIndex: number[] = [];
  selectedIndex1: number[] = [];
  selectedIndex2: number[] = [];

  inputHeaders = Object.keys(trcsInput[0]);
  inputColumns = this.inputHeaders.map((key, idx) => {
    return {
      key: key,
      header: key,
      border: false,
      kind: TableColumnKind.Input,
      inputType: idx === 0 ? 'fox-dropdown' : key === 'treasuryReconciliationAmount' ? 'fox-currency' : key === 'dateCreated' ? 'fox-date' : 'text',
      dropDownOptions: dropDownOptions
    };
  });
  outputJson = '';

  inputHeaders2 = Object.keys(trcsInput[0]);
  inputColumns2 = this.inputHeaders2.map((key, idx) => {
    return {
      key: key,
      header: key,
      border: false,
      kind:  key === 'dropDownOption' || key === 'treasuryReconciliationAmount' || key === 'dateCreated' || key === 'createdBy' ? TableColumnKind.Input : TableColumnKind.Text,
      inputType: idx === 0 ? 'fox-dropdown' : key === 'treasuryReconciliationAmount' ? 'fox-currency' : key === 'dateCreated' ? 'fox-date' : 'text',
      dropDownOptions: idx === 0 ? dropDownOptions : null,
      dropDownClearable: idx === 0,
      dropDownLabel: idx === 0 ? 'value' : null
    };
  });
  outputJson2 = '';
  outputJson3 = '';

  @ViewChild('selectableTable') selectableTable: TableComponent;
  @ViewChild('selectableTable1') selectableTable1: TableComponent;
  @ViewChild('selectableTable2') selectableTable2: TableComponent;

  ngAfterViewInit(): void {
    this.outputJson = JSON.stringify(this.inputTable.tableFormGroup.value, null, 2);
    this.inputTable.tableFormGroup.valueChanges.subscribe((x) => {
      this.outputJson = JSON.stringify(this.inputTable.tableFormGroup.value, null, 2);
    });

    this.outputJson2 = JSON.stringify(this.inputTable2.tableFormGroup.value, null, 2);
    this.inputTable2.tableFormGroup.valueChanges.subscribe((x) => {
      this.outputJson2 = JSON.stringify(this.inputTable2.tableFormGroup.value, null, 2);
    });
    this.inputTable3.tableFormGroup.valueChanges.subscribe((x) => {
      this.outputJson3 = JSON.stringify(this.inputTable3.tableFormGroup.value, null, 2);
    });

    if (!this.isHospitalTableConstructed) {
      this.tableHospitalColumnWidth();
      const headerParent0 = document.getElementById('headerParent0');
      if (headerParent0) {
        this.isHospitalTableConstructed = true;
      }
    }
  }

  changePosition(position: number): void {
    this.lastPressed = position;
  }

  onSelectionChanged(row): void {
    if (row.isAll) {
      this.selectedIndex = [];
      if (row.isChecked) {
        this.selectedIndex = Array.from(this.result.keys());
      }
    } else {
      const selectedDcnIndex: number = this.selectedIndex.indexOf(row.index);
      if (selectedDcnIndex > -1) {
        this.selectedIndex.splice(selectedDcnIndex, 1);
      } else {
        this.selectedIndex.push(row.index);
      }
    }
  }

  onSelectionHeaderChanged(row): void {
    if (row.isAll) {
      this.selectedIndex1 = [];
      if (row.isChecked) {
        this.selectedIndex1 = Array.from(this.result.keys());
      }
    } else {
      const selectedDcnIndex: number = this.selectedIndex1.indexOf(row.index);
      if (selectedDcnIndex > -1) {
        this.selectedIndex1.splice(selectedDcnIndex, 1);
      } else {
        this.selectedIndex1.push(row.index);
      }
    }
  }

  onSelectionColumnChanged(row): void {
    if (row.isAll) {
      this.selectedIndex2 = [];
      if (row.isChecked) {
        this.selectedIndex2 = Array.from(this.fixedHeaderData.keys());
      }
    } else {
      const selectedDcnIndex: number = this.selectedIndex2.indexOf(row.index);
      if (selectedDcnIndex > -1) {
        this.selectedIndex2.splice(selectedDcnIndex, 1);
      } else {
        this.selectedIndex2.push(row.index);
      }
    }
  }

  clearSelectionTable(): void {
    this.selectedIndex = [];
    this.selectableTable.clearSelection();
  }

  clearSelectionHeaderTable(): void {
    this.selectedIndex1 = [];
    this.selectableTable1.clearSelection();
  }

  clearSelectionColumnTable(): void {
    this.selectedIndex2 = [];
    this.selectableTable2.clearSelection();
  }

  private tableHospitalColumnWidth(): void {
    const headerParent0 = document.getElementById('headerParent0');
    if (headerParent0) {
      headerParent0.style.minWidth = '500px';
    }
    const headerParent1 = document.getElementById('headerParent1');
    if (headerParent1) {
      headerParent1.style.minWidth = '150px';
    }
    const headerParent2 = document.getElementById(
      'headerParent2');
    if (headerParent2) {
      headerParent2.style.minWidth = '120px';
    }
    const headerParent3 = document.getElementById('headerParent3');
    if (headerParent3) {
      headerParent3.style.minWidth = '300px';
    }
    const headerParent4 = document.getElementById('headerParent4');
    if (headerParent4) {
      headerParent4.style.minWidth = '150px';
    }
    const headerParent5 = document.getElementById('headerParent5');
    if (headerParent5) {
      headerParent5.style.minWidth = '120px';
    }
    const headerParent6 = document.getElementById('headerParent6');
    if (headerParent6) {
      headerParent6.style.minWidth = '120px';
    }
    const headerParent7 = document.getElementById('headerParent7');
    if (headerParent7) {
      headerParent7.style.minWidth = '120px';
    }
  }

}
