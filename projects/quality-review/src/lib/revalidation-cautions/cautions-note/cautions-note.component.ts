import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild
} from '@angular/core';
import {PaginatorNonMaterialComponent, TableColumn} from '@fox/shared';

@Component({
  selector: 'fox-cautions-note',
  templateUrl: './cautions-note.component.html',
  styleUrls: ['./cautions-note.component.css']
})

export class CautionsNoteComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() headerColumn: any = '';
  @Input() columnData: any[] = [];
  @Input() data: any[] = [];

  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;

  pageSizeSelected = 5;
  dataLengthInput = 0;
  pageTotal = 0;
  currentPage = 0;
  viewData: any[] = [];
  headers: TableColumn[] = [];
  columnDataSortDirection: any;
  columnDataCurrentSortKey: any;

  ngOnChanges(): void {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {

    setTimeout(() => {
      if (this.data && this.data.length > 0 && this.headerColumn && this.headerColumn.length > 0) {
        this.headers = this.headerColumn.map((key: string, idx: number) => {
          return {
            key: key,
            header: key,
            border: idx === 1 || idx === 2,
            sortKey: key
          };
        });
        this.columnDataCurrentSortKey =  this.headers[0].sortKey;
        if (this.paginator) {
          this.viewData = this.data.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
          this.pageTotal = Math.ceil(this.data.length / this.paginator.pageSize);
        }
        this.columnDataSortDirection = 1;
        this.dataLengthInput = this.viewData.length;
      }
    }, 1000);
  }

  calculateNewPage(): void {
    if (this.paginator) {
      this.viewData = this.data.slice (this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.data.length / this.paginator.pageSize);
    }
    this.dataLengthInput = this.viewData.length;
  }
}
