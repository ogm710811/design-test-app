import {MessageBoxService, MessageBoxType} from '@fox/shared';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import {
  DocumentManagementApi,
  DocumentUploadRequestVO,
  DocumentVO,
  ReferencesApi,
  ReferenceValueVO
} from '@fox/rest-clients';
import * as uuidNS from 'uuid';
import {DocumentFormComponent} from '../document-form.component';

const uuid = uuidNS;

@Component({
  selector: 'fox-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  @ViewChild('docForm') docForm?: DocumentFormComponent;
  @ViewChild('fileInput') fileInput?: ElementRef;

  localFileLocation: string = '';
  filesArray?: FileList;

  uploadedDcn: string = '';

  getFormFlag: boolean = false;
  resetFormFlag: boolean = false;
  docQueueDropdownValues: ReferenceValueVO[] = [];
  queueFc: FormControl = new FormControl();

  get docUploadFormGroup(): FormGroup | null {
    const temp = this.docForm ? this.docForm.documentSearchForm || null : null;
    return this.docForm ? this.docForm.documentSearchForm || null : null;
  }

  get formMember(): AbstractControl | null {
    if (this.docForm && this.docForm.documentSearchForm) {
      return this.docForm.documentSearchForm.controls['member'];
    } else {
      return null;
    }
  }

  get formClaim(): AbstractControl | null {
    if (this.docForm && this.docForm.documentSearchForm) {
      return this.docForm.documentSearchForm.controls['claim'];
    } else {
      return null;
    }
  }

  get formCheck(): AbstractControl | null {
    if (this.docForm && this.docForm.documentSearchForm) {
      return this.docForm.documentSearchForm.controls['check'];
    } else {
      return null;
    }
  }

  get formDocument(): AbstractControl | null {
    if (this.docForm && this.docForm.documentSearchForm) {
      return this.docForm.documentSearchForm.controls['document'];
    } else {
      return null;
    }
  }

  constructor(private docMgmtSvc: DocumentManagementApi, private fb: FormBuilder, private msgSvc: MessageBoxService, private refSvc: ReferencesApi) {
  }

  ngOnInit(): void {
    this.refSvc.listCategoryCodes('QUEUE_INFO', uuid()).subscribe((r: ReferenceValueVO[]) => {
      this.docQueueDropdownValues = r;
    });
    this.queueFc = this.fb.control('');
  }

  onFileChange(files: FileList): void {
    this.localFileLocation = files[0].name;
    this.filesArray = files;
  }

  onClickUpload(): void {
    this.uploadedDcn = '';
    this.msgSvc.reset();

    if (this.docForm) {
      this.onFormOutputReceived(this.docForm.getFormValues());
    }
  }

  onFormOutputReceived(docFromForm: DocumentVO): void {
    const theFile = this.filesArray && this.filesArray.length > 0 ? this.filesArray[0] : undefined;
    if (!theFile) {
      this.msgSvc.addMessageBox('Document Upload Unsuccessful', MessageBoxType.ERROR, 'No file was specified');
      return;
    }

    if (!theFile.name.endsWith('.pdf')) {
      this.msgSvc.addMessageBox('Document Upload Unsuccessful', MessageBoxType.ERROR, 'The file is in an incorrect format');
      return;
    }

    if (theFile.size > 3000000) {
      this.msgSvc.addMessageBox('Document Upload Unsuccessful', MessageBoxType.ERROR, 'The file size exceeds the allowable limit');
      return;
    }

    const uploadRequest: DocumentUploadRequestVO = {
      filename: this.localFileLocation,
      document: docFromForm
    };

    const fr = new FileReader();

    fr.onload = (ev: Event) => {
      const fileAsBase64: string = (<string>fr.result).replace(/^data:[^;]*;base64,/, '');
      uploadRequest.application = 'Standard SHIP';
      uploadRequest.documentFile = fileAsBase64;

      (uploadRequest as any)['documentBinary'] = fileAsBase64;
      if (uploadRequest.document) {
        uploadRequest.numberOfPages = 1;
        uploadRequest.document.queueInformation = this.queueFc && this.queueFc.value ? this.queueFc.value : undefined;
      }

      this.docMgmtSvc.manageDocumentUpload(uploadRequest, uuid(), 'body')
        .subscribe(
          (doc: DocumentVO) => {
            if (!doc || !doc.docControlNumber) {
              this.msgSvc.addMessageBox('Document Upload Unsuccessful', MessageBoxType.ERROR, 'The upload failed. Please try again');
              return;
            }
            this.uploadedDcn = doc.docControlNumber;
            this.msgSvc.addMessageBox('Document Upload Successful', MessageBoxType.SUCCESS, 'Document ' + this.uploadedDcn + ' has been successfully uploaded', 3000);
            this.resetFormFlag = true;
            if (this.docForm && this.docForm.documentSearchForm) {
              this.docForm.documentSearchForm.reset();
            }
            this.localFileLocation = '';
            this.filesArray = undefined;
            if (this.fileInput) {
              this.fileInput.nativeElement.value = '';
            }
            this.queueFc = this.fb.control('');
          },
          () => {
            this.msgSvc.addMessageBox('Document Upload Unsuccessful', MessageBoxType.ERROR, 'The upload failed. Please try again');
          }
        );
    };

    fr.onerror = (ev: Event) => {
      this.msgSvc.addMessageBox('Document Upload Unsuccessful', MessageBoxType.ERROR, 'The file could not be read from the local machine');
    };

    fr.readAsDataURL(theFile);
  }
}
