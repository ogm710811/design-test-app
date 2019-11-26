import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClaimNoteApi, ClaimNoteVO} from '@fox/rest-clients';
import {FeatureFlagService, LoginService, MessageBoxService, MessageBoxType} from '@fox/shared';
import * as uuid from 'uuid';
import {ClaimHistorySearchService} from '../../../shared/claim-history-search.service';

@Component({
  selector: 'fox-claim-details-notes',
  templateUrl: './claim-details-notes.component.html',
  styleUrls: ['../../claim-history.component.css']
})

export class ClaimDetailsNotesComponent implements OnInit {

  @Input() claimNoteDetails: ClaimNoteVO;
  @Input() isClaimNote: boolean = false;
  @Input() claimNumber: string;
  @Input() claimNote: string = '';
  @Input() isLocked: boolean = false;

  @Output() claimNoteIdEvent = new EventEmitter<number>();

  isAddition: boolean = false;
  isEdit: boolean = false;
  isDeleteModal: boolean = false;
  canViewNote: boolean = false;
  canEditNote: boolean = false;

  claimNoteId: number;
  noteContent: string = '';
  updateNote: ClaimNoteVO;

  constructor(private claimNoteApi: ClaimNoteApi, private claimSvc: ClaimHistorySearchService,
              private messageBoxService: MessageBoxService, private loginSvc: LoginService,
              private featureFlagService: FeatureFlagService) {
  }

  ngOnInit(): void {
    this.canViewNote = this.loginSvc.hasOpViewClaimNoteRole;
    this.canEditNote = this.loginSvc.hasOpMaintainClaimNoteRole;
  }

  addNote(): void {
    this.isAddition = true;
    this.noteContent = '';
  }

  cancelNote(): void {
    this.isAddition = false;
    this.isEdit = false;
    this.noteContent = '';
  }

  editNote(): void {
    this.noteContent = (this.claimNoteDetails.claimNote !== undefined) ? this.claimNoteDetails.claimNote : '';
    this.claimNoteId = (this.claimNoteDetails.claimNoteId !== undefined) ? this.claimNoteDetails.claimNoteId : 0;
    this.isEdit = true;
  }

  saveAddNote(): void {
    let note: ClaimNoteVO;
    note = {
      claimNote: this.noteContent
    };
    const res = this.claimNoteApi.createClaimNote(+this.claimNumber, note, uuid());
    res.subscribe(claimNotesResult => {
      if (claimNotesResult) {
        this.claimNoteDetails = claimNotesResult;
        this.claimNote = (this.claimNoteDetails.claimNote !== undefined) ? this.claimNoteDetails.claimNote.replace(/\n/g, '<br />') : '';
        this.isClaimNote = true;
        this.isEdit = false;
        this.claimNoteIdEvent.emit(this.claimNoteDetails.claimNoteId ? this.claimNoteDetails.claimNoteId : 0);
      } else {
        this.isClaimNote = false;
        this.isEdit = false;
      }
    }, (e) => {
      this.isClaimNote = false;
      this.isEdit = false;
    });
  }

  saveEditNote(): void {
    this.updateNote = this.claimNoteDetails;
    this.updateNote.claimNote = this.noteContent;
    const res = this.claimNoteApi.updateClaimNote(this.claimNoteId, this.updateNote, uuid());
    res.subscribe(claimNotesResult => {
      if (claimNotesResult) {
        this.getClaimNotes();
      } else {
        this.isEdit = false;
      }
    }, (e) => {
      this.isEdit = false;
    });
  }

  getClaimNotes(): void {
    this.claimSvc.getClaimNotes(this.claimNoteId).subscribe(response => {
      this.claimNoteDetails = response;
      this.claimNote = (this.claimNoteDetails.claimNote !== undefined) ? this.claimNoteDetails.claimNote.replace(/\n/g, '<br />') : '';
    }, (e) => {
      this.isEdit = false;
    });
    this.isEdit = false;
  }

  deleteNote(): void {
    this.claimNoteId = (this.claimNoteDetails.claimNoteId !== undefined) ? this.claimNoteDetails.claimNoteId : 0;
    this.isDeleteModal = true;
  }

  cancelDeleteNote(): void {
    this.isDeleteModal = false;
  }

  confirmDeleteNote(): void {
    this.messageBoxService.reset();

    if (this.claimNoteId) {
      const clmNum: number = +this.claimNoteId;
      if (!isNaN(clmNum)) {
        const res = this.claimNoteApi.deleteClaimNote(clmNum, uuid(), 'response');
        res.subscribe(response => {
          if (response.status !== 204) {
            this.isDeleteModal = false;
            this.messageBoxService.addMessageBox('Note not deleted', MessageBoxType.ERROR, 'The Note was not deleted successfully');
          } else {
            this.isDeleteModal = false;
            this.noteContent = '';
            this.messageBoxService.addMessageBox('Note deleted', MessageBoxType.SUCCESS, 'The Note was deleted successfully', 3000);
            this.isAddition = false;
            this.isEdit = false;
            this.isClaimNote = false;
            this.claimNoteIdEvent.emit(0);
          }
        }, (e) => {
          this.isDeleteModal = false;
          this.isEdit = false;
        });
      }
    }
  }

  get toggleClaimNoteEditFeature(): boolean {
    return !this.featureFlagService.isFeatureDisabled('F3514');
  }
}
