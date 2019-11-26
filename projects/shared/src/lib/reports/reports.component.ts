import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReportDetailVO} from '@fox/rest-clients';

@Component({
  selector: 'fox-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  @Input() reportModalVisible: boolean = false;
  @Output() reportModalVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() msReports: ReportDetailVO[] = [];
  @Input() nasReports: ReportDetailVO[] = [];
  @Output() cancelReportModal: EventEmitter<false> = new EventEmitter<false>();
  @Output() abortOrConfirmCancellation: EventEmitter<'abort' | 'confirm'> = new EventEmitter<'abort' | 'confirm'>();
  reportType: string = 'ms';
  model: any;

  constructor() {
  }

  onCancelPressed(): void {
    this.cancelReportModal.emit(false);
    this.abortOrConfirmCancellation.emit('abort');
  }

  onNavigation(): void {
    this.reportType = 'ms';
    this.changeVisible(false);
    window.open(this.model, '_blank');
  }

  changeVisible(visible: boolean): void {
    this.reportModalVisible = visible;
    this.reportModalVisibleChange.emit(this.reportModalVisible);
  }

}
