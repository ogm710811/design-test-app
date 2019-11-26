import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClaimHistoryApi, ClaimNoteIndicatorVO, ClaimNoteVO} from '@fox/rest-clients';
import * as uuid from 'uuid';

@Component({
  selector: 'fox-delete-claim-modal',
  templateUrl: './delete-claim-modal.component.html',
  styleUrls: ['./delete-claim-modal.component.css']
})

export class DeleteClaimModalComponent {

  @Input() deleteClaimModalVisible: boolean;
  @Input() claimNumber: string;
  @Input() noteContent: string;
  @Input() validateNoteContent: string;
  @Input() claimNoteDetails: ClaimNoteVO;

  @Output() deleteModalVisibleChange = new EventEmitter<boolean>();
  @Output() cancelDeleteClaim: EventEmitter<'cancel'> = new EventEmitter<'cancel'>();
  @Output() confirmDeleteClaim: EventEmitter<'confirm'> = new EventEmitter<'confirm'>();
  @Output() responseMsg = new EventEmitter<string>();
  @Output() deleteClmSuccessMsg = new EventEmitter<boolean>();
  @Output() deleteClmFailMsg = new EventEmitter<boolean>();
  @Output() responseVal = new EventEmitter<string>();

  statusCode: string = 'X';
  noteUpdateIndicator: ClaimNoteIndicatorVO.NoteUpdateIndicatorEnum;

  constructor(private claimHistorySearchApi: ClaimHistoryApi) {
  }

  cancelDeleteModal(): void {
    this.cancelDeleteClaim.emit('cancel');
    this.noteContent = '';
  }

  deleteClaim(): void {
    if (this.claimNoteDetails !== undefined && this.claimNoteDetails.claimNoteId !== 0) {
      if (this.noteContent !== this.validateNoteContent) {
        this.claimNoteDetails.claimNote = this.noteContent;
        this.noteUpdateIndicator = ClaimNoteIndicatorVO.NoteUpdateIndicatorEnum.Y;
      } else {
        this.noteUpdateIndicator = ClaimNoteIndicatorVO.NoteUpdateIndicatorEnum.N;
      }
    } else {
      this.claimNoteDetails = {
        claimNoteId: 0,
        claimNote: this.noteContent
      };
      if (this.noteContent !== undefined && this.noteContent.trim().length > 0) {
        this.noteUpdateIndicator = ClaimNoteIndicatorVO.NoteUpdateIndicatorEnum.Y;
        this.claimNoteDetails.claimNote = this.noteContent;
      } else {
        this.noteUpdateIndicator = ClaimNoteIndicatorVO.NoteUpdateIndicatorEnum.N;
      }
    }

    if (this.claimNumber) {
      const clmNumber: number = +this.claimNumber;
      if (!isNaN(clmNumber)) {
        const resp = this.claimHistorySearchApi.deleteClaim(uuid(), clmNumber, this.noteUpdateIndicator, this.claimNoteDetails, 'response');
        resp.subscribe(response => {
          if (response.status === 200) {
            const msg = response.headers.get('message');
            if (msg !== null) {
              this.responseMsg.emit(msg);
            }
            this.deleteClmSuccessMsg.emit(true);
            this.confirmDeleteClaim.emit('confirm');
            this.responseVal.emit(this.statusCode);
            this.noteContent = '';
          }

        }, (e) => {
          this.noteContent = '';
          const msg = e.headers.get('message');
          if (msg !== null) {
            this.responseMsg.emit(msg);
          }
          this.deleteClmFailMsg.emit(true);
          this.confirmDeleteClaim.emit('confirm');
        });
      }
      }
    }
  }
