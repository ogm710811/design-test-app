import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MaterialsApi, PagedResourcesOfResourceOfMaterialEOBVO, ResourceOfMaterialEOBVO} from '@fox/rest-clients';
import {LoginService} from '@fox/shared';

@Component({
  selector: 'fox-eob-statements-results',
  templateUrl: './eob-statements-results.component.html',
  styleUrls: ['./eob-statements-results.component.css', '../eob-information.component.css']
})
export class EobStatementsResultsComponent implements OnChanges, AfterViewInit, OnInit {
  eobStatementDataSource = new MatTableDataSource();
  displayedEobStatementColumns = ['statementDate', 'statementType', 'claimNumber', 'pdf'];
  dataLength = 0;
  currentPage = 0;
  lastPageIndex = 0;
  pageSize = 5;
  expanded: boolean [] = [];

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginatorObj: MatPaginator | null = null;
  @Input() eobStatementResults: PagedResourcesOfResourceOfMaterialEOBVO[] = [];

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0; i < this.eobStatementResults.length; i++) {
      this.expanded[i] = false;
    }
  }

  ngAfterViewInit(): void {
    this.eobStatementDataSource.paginator = this.paginatorObj;
  }

  ngOnChanges(): void {
    this.eobStatementDataSource.data = this.eobStatementResults;
    this.dataLength = this.eobStatementResults.length;
    this.eobStatementDataSource.sortingDataAccessor = (item: ResourceOfMaterialEOBVO, property) => {
      if (property === 'statementDate') {
        return new Date(item.statementDate || '');
      } else {
        // @ts-ignore
        return (item[property]);
      }
    };
    this.eobStatementDataSource.sort = this.sort;
  }

  pdfUrlText(memberNo: string, materialId: string): string {
    return 'api/materials/EOB/' + memberNo + '/' + materialId;
  }

  displayLessClaimNumber(claimNumbers: string[], cellIndex: number, claimIndex: number, category: string, isLastIndex: boolean): string {
    let result: string = '';
    if (claimNumbers.length > 10 && !this.expanded[cellIndex]) {
      if (claimIndex <= 9) {
        result = (claimIndex === 9) ? category : category + ',';
      }
    } else {
      if (!this.expanded[cellIndex]) {
        result = (isLastIndex) ? category : category + ',';
      }
    }
    return result;
  }

  displayMoreClaimNumber(claimNumbers: string[], cellIndex: number, category: string, isLastIndex: boolean): string {
    let result: string = '';
    if (claimNumbers.length > 10 && this.expanded[cellIndex]) {
      result = (isLastIndex) ? category : category + ',';
    }
    return result;
  }

  displayClaimNumberToggle(cellIndex: number): boolean {
    return this.expanded[cellIndex] = !this.expanded[cellIndex];
  }

  expandedClaimNumber(cellIndex: number): string {
    return (!this.expanded[cellIndex]) ? '+ more' : '- less';
  }
}
