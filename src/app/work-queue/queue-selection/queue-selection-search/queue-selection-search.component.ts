import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {
  CategoryVO,
  PagedResourcesOfResourcesOfWorkQueueVO,
  ReferenceValueVO,
  WorkQueueApi,
  WorkQueueReferencesApi
} from '@fox/rest-clients';
import {LoginService, ProgressContextService} from '@fox/shared';
import * as uuid from 'uuid';
import {QueueSelectionService} from '../queue-selection.service';

@Component({
  selector: 'fox-queue-selection-search',
  templateUrl: './queue-selection-search.component.html',
  styleUrls: ['./queue-selection-search.component.css']
})
export class QueueSelectionSearchComponent implements OnChanges, OnInit {

  @Input() pageNumber?: number;
  @Input() pageSize?: number;

  @Output() searchResults = new EventEmitter<PagedResourcesOfResourcesOfWorkQueueVO>();

  workTypeOptions: ReferenceValueVO[] = [];
  categoryOptions: CategoryVO[] = [];
  queueTypeOptions: ReferenceValueVO[] = [];

  showMisMailQ: boolean = false;
  lastWorkType?: string;
  shouldReloadCategories: string = '';
  shouldReloadQueueResults: string = '';
  lastCategory?: string;
  lastQueueType?: string;
  loadButtonClicked: boolean = false;

  get searchControl(): FormGroup {
    return this.queueSelectionService.searchControl;
  }

  set searchControl(fg: FormGroup) {
    this.queueSelectionService.searchControl = this.searchControl;
  }

  constructor(private wqSvc: WorkQueueApi,
              private refSvc: WorkQueueReferencesApi,
              private progressSvc: ProgressContextService,
              private queueSelectionService: QueueSelectionService,
              private activatedRoute: ActivatedRoute,
              private loginSvc: LoginService) {
  }

  ngOnInit(): void {
    this.refSvc.workqueueReference('WORK_TYPE', uuid()).subscribe((refVals) => {
      this.workTypeOptions = refVals;
      this.lastWorkType = '';
    });
    this.shouldReloadCategories = this.activatedRoute.snapshot.queryParamMap.get('reloadCategories') || '';
    if (this.shouldReloadCategories === 'true') {
      this.categoryOptions = this.queueSelectionService.getCategoryOptionList();
    }
    this.refSvc.workqueueReference('QUEUE_TYPE', uuid()).subscribe((refVals) => {
      this.queueTypeOptions = refVals;
      this.lastCategory = '';
      this.lastQueueType = '';
    });

    this.shouldReloadQueueResults = this.activatedRoute.snapshot.queryParamMap.get('reloadQueueResults') || '';
    if (this.shouldReloadQueueResults === 'true') {
      this.queueSelectionService.results = {};
      this.onSubmitSearch();
    }
  }

  onSubmitSearch(): void {
    this.lastWorkType = this.searchControl.value.workType || '';
    this.lastCategory = this.searchControl.value.category || '';
    this.lastQueueType = this.searchControl.value.queueType || '';
    this.pageNumber = 0;
    this.pageSize = 10;
    this.loadButtonClicked = true;
    if (this.loginSvc.hasOptumCSSRole) {
      this.showMisMailQ = true;
      const obs = this.wqSvc.findQueues(uuid(), this.lastWorkType, this.lastCategory, this.lastQueueType, undefined, this.pageSize, 0, this.showMisMailQ);
      if (obs) {
        this.progressSvc.forTag('queue-results').watch(obs)
          .subscribe(wqs => this.searchResults.emit(wqs), err => this.searchResults.emit(undefined));
      }
    } else {
      const obs = this.wqSvc.findQueues(uuid(), this.lastWorkType, this.lastCategory, this.lastQueueType, undefined, this.pageSize, 0, this.showMisMailQ);
      if (obs) {
        this.progressSvc.forTag('queue-results').watch(obs)
          .subscribe(wqs => this.searchResults.emit(wqs), err => this.searchResults.emit(undefined));
      }
    }
  }

  changeWorkType(): void {
    this.refreshCategoryOptions();
  }

  refreshCategoryOptions(): void {
    if (this.lastWorkType) {
      this.refSvc.getCategoriesByWorkType(this.lastWorkType, uuid()).subscribe((resp) => {
        this.categoryOptions = resp;
        this.queueSelectionService.setCategoryOptionList(this.categoryOptions);
        this.lastCategory = '';
      });
    } else {
      this.categoryOptions = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.pageNumber && !(changes.pageNumber.isFirstChange())) && !(this.loadButtonClicked && this.pageNumber === 0) ||
      (changes.pageSize && !(changes.pageSize.isFirstChange())) && !(this.loadButtonClicked && this.pageSize === 10)) {
      this.progressSvc.forTag('queue-results')
        .watch(
          this.wqSvc.findQueues(uuid(), this.lastWorkType, this.lastCategory, this.lastQueueType, undefined, this.pageSize, this.pageNumber)
        ).subscribe(
        wqs => this.searchResults.emit(wqs),
        err => this.searchResults.emit(undefined));
    }
    if (changes.pageNumber && this.loadButtonClicked) {
      this.loadButtonClicked = false;
    }
  }
}
