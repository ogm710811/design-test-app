import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HotkeysService} from 'angular2-hotkeys';
import {
  AccountMembershipResponseVO,
  ClaimsMemberApi,
  CreateInsuredNoteVO,
  PagedResourcesOfResourceOfInsuredNotesVO
} from '@fox/rest-clients';
import {Subscription} from 'rxjs/Subscription';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {FeatureFlagService} from '@fox/shared';
import {MemberInformationService} from '../../../../../shared/member-information.service';
import {InsuredNoteVO} from './InsuredNoteVO';
import { MatMenu, MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'fox-member-enrollment-info-insured-note',
  templateUrl: './enrollment-note.component.html',
  styleUrls: ['./enrollment-note.component.css']
})
export class EnrollmentNoteComponent implements OnInit, OnDestroy {

  insuredNote: InsuredNoteVO[] = [];
  maxNotationText: number = 200;
  addNewNoteForm = new FormGroup({
    addNewPost: new FormControl()
  });
  hideEditItemNote: boolean = false;
  displayAddNoteblock: boolean = false;
  showDeleteDialog: boolean = false;
  confirmIndexedNote: number = 0;
  displayAddNoteButton: boolean = true;
  displayActionButton: boolean = true;

  notePageSize: number = 5;
  noteDataLengthInput: number | undefined;
  notePageTotal: number = 0;
  currentNotePage: number = 0;

  addNoteToggler = false;

  @Input() membershipNumber: string = '';
  memberProfile: AccountMembershipResponseVO = new AccountMembershipResponseVO();
  mProfileSubscription: Subscription = new Subscription();
  @Output() insuredNoteNotFound: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('matMenu') menu?: MatMenu;

  constructor(private insuredNotApi: ClaimsMemberApi,
              private hotKeyApi: HotkeysService,
              private memberInformationService: MemberInformationService,
              private featureFlagService: FeatureFlagService,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {

    this.addNoteToggler = this.featureFlagService.isFeatureDisabled('F3513');

    this.mProfileSubscription = this.memberInformationService.memberProfileChanges$.subscribe(
      mProfile => {
        this.memberProfile = mProfile;
        this.getDisplayNotes();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.mProfileSubscription) {
      this.mProfileSubscription.unsubscribe();
    }
  }

  // get Display Notes
  getDisplayNotes(): void {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.householdId && this.memberProfile.memberDetails.householdId.length > 0) {
      this.membershipNumber = (this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + this.memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + this.memberProfile.memberDetails.householdId[0].insuredCode);
      this.insuredNotApi.insuredNotes(this.membershipNumber, uuid(), this.notePageSize, this.currentNotePage, 'DSC').subscribe((res: PagedResourcesOfResourceOfInsuredNotesVO) => {
        if (res && res._embedded && res._embedded.items) {
          this.insuredNote = res._embedded.items;
        }
        this.processInsuredNotesSearchResult(res);
      });
    }
  }

  // Pagination for Insured Notes
  processInsuredNotesSearchResult(res: PagedResourcesOfResourceOfInsuredNotesVO): void {
    if (res && res.page && res.page.number !== undefined && res.page.size && res.page.totalPages) {
      this.notePageTotal = res.page.totalPages;
      this.noteDataLengthInput = res.page.totalElements;
      this.currentNotePage = res.page.number;
    }
  }

  // display note area
  displayAddNote(): void {
    this.displayAddNoteblock = true;
    this.displayAddNoteButton = true;
    this.addNewNoteForm.controls['addNewPost'].setValue('');
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          document.getElementById('addNote')!.focus();
        });
      }, 0);
    });
  }

  // Add note
  add(): void {
    const data = <CreateInsuredNoteVO>{
      insuredNote: '',
      createdBy: ''
    };
    data.insuredNote = this.addNewNoteForm.get('addNewPost')!.value;
    this.insuredNotApi.insuredNotesCreate(this.membershipNumber, data, uuid()).subscribe(res => {
      this.insuredNote.unshift(res);
      this.getDisplayNotes();
    }, (e) => {
      if (e.status === 404) {
        this.insuredNoteNotFound.emit(true);
        window.scrollTo(0, 0);
      }
    });
    this.addNewNoteForm.controls['addNewPost'].setValue('');
    this.displayAddNoteblock = false;
    this.displayAddNoteButton = false;
    this.hideEditItemNote = false;
  }

  // Cancel the Note area
  cancel(): void {
    this.displayAddNoteblock = false;
    this.displayAddNoteButton = false;
  }

  // Edit the Posted note
  editItemNote(index: number): void {
    this.insuredNote[index].hideEditItemNote = true;
    this.displayAddNoteblock = false;
    this.displayAddNoteButton = true;
    this.displayActionButton = false;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          document.getElementById('editNote-' + index)!.focus();
          const textareaVal = document.getElementById('editNote-' + index)!.innerHTML;
          document.getElementById('editNote-' + index)!.innerHTML = '';
          document.getElementById('editNote-' + index)!.innerHTML = textareaVal;
        });
      }, 0);
    });
  }

  // Save edited note
  updateNote(index: number): void {
    this.insuredNote[index].hideEditItemNote = false;
    const data = <CreateInsuredNoteVO>{
      insuredNote: this.insuredNote[index].updatedContent,
      createdBy: this.insuredNote[index].createdBy,
      lastModifiedBy: this.insuredNote[index].lastModifiedBy
    };
    const insuredId = this.insuredNote[index].insuredNoteKey || '';
    this.insuredNotApi.insuredNotesUpdate(insuredId, data, uuid()).subscribe(res => {
      this.insuredNote[index] = res;
    });
    this.displayAddNoteButton = false;
    this.displayActionButton = true;
  }

  // Open Delete confirmation modal
  deleteItemNote(index: number): void {
    this.showDeleteDialog = true;
    this.confirmIndexedNote = index;
  }

  // Delete a record
  confirmDeleteNote(): void {
    const insuredId = this.confirmIndexedNote.toString();
    this.insuredNotApi.insuredNotesDelete(insuredId, uuid()).subscribe(res => {
      if (this.insuredNote.length > 1) {
        this.insuredNote.splice(this.confirmIndexedNote, 1);
        this.getDisplayNotes();
      } else {
        this.insuredNote.pop();
      }
    });
    this.showDeleteDialog = false;
  }

  // Cancel Delete Confirmation Modal
  cacelDeletedialog(): void {
    this.showDeleteDialog = !this.showDeleteDialog;
  }

  // Save/Update the edited note
  contentValueChange(e: any, index: number): void {
    this.insuredNote[index].updatedContent = e.target.value;
  }

  // Cancel Edit Note
  cancelEditNote(index: number): void {
    this.insuredNote[index].updatedContent = this.insuredNote[index].insuredNote;
    this.insuredNote[index].hideEditItemNote = false;
    this.displayAddNoteButton = false;
    this.displayActionButton = true;
  }
}
