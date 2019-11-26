import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  DocumentManagementApi,
  DocumentVO,
  SeparateDocumentRequestVO,
  WorkItemApi,
  WorkProcessApi
} from '@fox/rest-clients';
import * as uuidNS from 'uuid';

const uuid = uuidNS;

@Component({
  selector: 'fox-document-detail-separate-modal',
  templateUrl: 'document-detail-separate-modal.component.html',
  styleUrls: ['document-detail-separate-modal.component.css']
})
export class DocumentDetailSeparateCancelModalComponent {
  @Input() documentVO: DocumentVO = {};
  @Input() separateModalVisible: boolean = false;
  @Output() separateModalVisibleChange = new EventEmitter<boolean>();
  @Output() abortSeparation: EventEmitter<'abort'> = new EventEmitter<'abort'>();
  @Output() separateDocumentSuccessfulMsg = new EventEmitter<string[]>();
  @Output() separateDocumentUnsuccessfulMsg = new EventEmitter<string>();

  page: number = 0;
  sepReq: SeparateDocumentRequestVO = {};
  docSeparateFormGroup: FormGroup;

  constructor(private docManagementApi: DocumentManagementApi, private fb: FormBuilder, private wqiSvc: WorkItemApi, private wProcessApi: WorkProcessApi) {
    this.docSeparateFormGroup = this.fb.group({
      pageNo: [
        '',
        [
          Validators.min(2)
        ]
      ],
    });
  }

  onSeparatelModalCancelPressed(): void {
    this.abortSeparation.emit('abort');
    this.separateModalVisible = false;
  }

  checkIfFormFilled(): boolean {
    return !!(this.removeWhitespace(this.page.toString()));
  }

  removeWhitespace(sourceString: string): string | null {
    if (sourceString) {
      return sourceString.trim();
    } else {
      return null;
    }
  }

  onSubmit(): void {
    const docSeparateForm = this.docSeparateFormGroup.value;
    const pageNo = docSeparateForm.pageNo;
    this.sepReq = {
      document: this.documentVO,
      separationPages: pageNo,
      filename: 'placeholder.pdf',
      uploadDate: new Date()
    };

    if (pageNo) {
      this.docManagementApi.manageDocumentSeparation(this.sepReq, uuid(), 'response').subscribe(resp => {
        if (resp.status > 299) {
          this.separateDocumentUnsuccessfulMsg.emit('Bad response code');
        } else {
          if (resp.body) {
            if (resp.body.docControlNumberList) {
              const dcnList: string[] = resp.body.docControlNumberList;
              this.separateDocumentSuccessfulMsg.emit(dcnList);
              if (this.documentVO.docControlNumber) {
                // If we get a response from this, and it has a process ID, it completes the item.
                // Otherwise it will have to be subject to cleanup at a later date, because this is
                // the best that the UI can do.
                this.wqiSvc.retrieveQueueProcessByBusinessType(this.documentVO.docControlNumber.toString(), '1', uuid())
                  .subscribe(resp2 => {
                    if (resp2.processId) {
                      this.wProcessApi.completeWQItem(resp2.processId, uuid()).subscribe(() => {});
                    }
                  });
              }
            } else {
              this.separateDocumentUnsuccessfulMsg.emit('No DCN list');
            }
          } else {
            this.separateDocumentUnsuccessfulMsg.emit('No body in separate response');
          }
        }
      }, e => {
        this.separateDocumentUnsuccessfulMsg.emit('Call failed');
      });
    }
  }
}
