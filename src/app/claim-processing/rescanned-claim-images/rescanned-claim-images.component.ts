import {MessageBoxService, MessageBoxType} from '@fox/shared';
import {Component, OnInit} from '@angular/core';
import {
  DocumentManagementApi,
  ImportDetailVO,
  ImportSummaryVO,
  RescanRequestVO,
  RescanResponseVO
} from '@fox/rest-clients';
import * as uuid from 'uuid';

@Component({
  selector: 'fox-rescanned-claim-images',
  templateUrl: './rescanned-claim-images.component.html',
  styleUrls: ['./rescanned-claim-images.component.css']
})
export class RescannedClaimImagesComponent implements OnInit {

  localFileLocation: string = 'No file chosen';
  isFileSelected: boolean = false;
  filesArray?: FileList | null;
  imageAsBinary: string;
  isUploading: boolean;
  progressBarColor: string = 'primary';
  progressBarMode: string = 'determinant';
  progressBarValue: number;
  progressBarBufferValue: number;
  uploadDetailText: string = 'Message describing current state to user …';
  isCancelled: boolean = false;
  isUploadConfirmed: boolean = false;
  fileDownloadUrl: string;
  importDetailsSwitch: boolean = false;
  rescanResponse: RescanResponseVO;
  importSummary?: ImportSummaryVO;
  importDetails?: ImportDetailVO[];
  succeeded: number;
  failed: number;

  constructor(private messageBoxService: MessageBoxService, private docMgmtApi: DocumentManagementApi) {
  }

  ngOnInit(): void {
    this.fileDownloadUrl = '../../../assets/csv/csv-excel-example-file.csv';
  }

  onFileChange(files: FileList | null): void {
    if (files) {
      this.filesArray = files;
      const reader = new FileReader();
      if (files && files.length > 0) {
        const file = files[0];
        if (file.size > 10 * 1024 * 1024) {
          this.messageBoxService.reset();
          this.messageBoxService.addMessageBox('Incorrect file size selected', MessageBoxType.ERROR, 'Maximum file size of 10 megabytes (MB) can be imported. Please select a different file and try again.');
          window.scrollTo(0, 0);
        } else if (!this.validateFile(files[0].name)) {
          this.messageBoxService.reset();
          this.messageBoxService.addMessageBox('Incorrect file type selected', MessageBoxType.ERROR, 'Only .CSV files can be imported. Please select a different file and try again.');
          window.scrollTo(0, 0);
        } else {
          reader.onload = () => {
            this.imageAsBinary = reader.result!.toString().split(',')[1];
          };
          reader.readAsDataURL(file);
          this.localFileLocation = files[0].name;
          this.isFileSelected = true;
        }
      }
    }
  }

  onClickConfirm(): void {
    this.isUploadConfirmed = true;
  }

  onClickUpload(): void {
    this.isUploadConfirmed = false;
    this.progressBarValue = 100;
    this.isUploading = true;
    this.uploadDetailText = 'The file is being uploaded to FOX …';
    if (this.progressBarValue === 100) {
      this.isUploadConfirmed = false;
      this.isUploading = false;
      this.messageBoxService.reset();
      const rescanDoc: RescanRequestVO = {
        inputFile: this.imageAsBinary
      };
      this.docMgmtApi.ingestRescannedDocuments(uuid(), rescanDoc, 'body', true).subscribe((rescanRes: RescanResponseVO) => {
        window.scrollTo(0, 0);
        this.importDetailsSwitch = true;
        this.rescanResponse = rescanRes;
        this.importSummary = rescanRes.importSummary;
        this.importDetails = rescanRes.importDetails;
      });
    }
  }

  cancelUpload(): void {
    this.isUploadConfirmed = false;
    this.isCancelled = true;
    this.isUploading = false;
  }

  validateFile(name: String): boolean {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    return ext.toLowerCase() === 'csv';
  }
}
