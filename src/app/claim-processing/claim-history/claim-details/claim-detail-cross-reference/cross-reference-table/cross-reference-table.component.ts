import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ResourceOfCrossReferenceVO} from '@fox/rest-clients';

@Component({
  selector: 'fox-claim-cross-reference-table',
  templateUrl: './cross-reference-table.component.html',
  styleUrls: ['../../claim-details.component.css']
})

export class CrossReferenceTableComponent {

  @Input() crossReferenceResultSet: ResourceOfCrossReferenceVO[] = [];

  @Input() isCrossRefDataDisplay: boolean = false;
  @Input() crossRefLength: number;
  @Input() claimNumber: string;
  @Input() isLocked: boolean = false;
  @Input() isToggleClaimNoteEditFeature: boolean = false;

  @Output() crossReferenceNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output() crossReferecnceId: EventEmitter<number> = new EventEmitter<number>();
  @Output() isDeleteModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  get dataKeys(): string[] {
    return Object.keys(this.crossReferenceResultSet[0]);
  }

  deleteCrossReference(crossReferenceId, crossReferenceNumber): void {
    this.crossReferenceNumber.emit(crossReferenceNumber);
    this.crossReferecnceId.emit(crossReferenceId);
    this.isDeleteModal.emit(true);
  }
}
