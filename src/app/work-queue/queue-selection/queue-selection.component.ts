import {Component} from '@angular/core';
import {PagedResourcesOfResourcesOfWorkQueueVO} from '@fox/rest-clients';
import {QueueSelectionService} from './queue-selection.service';

@Component({
  selector: 'fox-queue-selection',
  templateUrl: './queue-selection.component.html',
  styleUrls: ['./queue-selection.component.css']
})
export class QueueSelectionComponent {
  currentPage: number = 0;
  dataSize: number = 0;
  pageTotal: number = 0;
  currentPageSize: number = 10;
  searchResults?: PagedResourcesOfResourcesOfWorkQueueVO ;

  get results(): PagedResourcesOfResourcesOfWorkQueueVO | undefined {
    return this.queueSelectionService.results;
  }

  set results(results: PagedResourcesOfResourcesOfWorkQueueVO | undefined) {
    this.queueSelectionService.results = results;
  }

  get pageNumber(): number | undefined {
    return this.queueSelectionService.pageNumber;
  }

  set pageNumber(pageNumber: number | undefined) {
    this.queueSelectionService.pageNumber = pageNumber;
  }

  get pageSize(): number | undefined {
    return this.queueSelectionService.pageSize;
  }

  set pageSize(pageSize: number | undefined) {
    this.queueSelectionService.pageSize = pageSize;
  }

  constructor(private queueSelectionService: QueueSelectionService) {
  }

  setResults (results: PagedResourcesOfResourcesOfWorkQueueVO | undefined): void {
    this.currentPage = results && results.number ? results.number : 0;
    this.currentPageSize = results && results.size ? results.size : 10;
    this.dataSize = results && results.totalElements ? results.totalElements : 0;
    this.pageTotal = results && results.totalPages ? results.totalPages : 0;
    this.searchResults = results;
  }

  setCurrentPage(currentPage: number): void {
    this.currentPage = currentPage;
  }

  setPageSize(pageSize: number): void {
    this.currentPageSize = pageSize;
  }
}
