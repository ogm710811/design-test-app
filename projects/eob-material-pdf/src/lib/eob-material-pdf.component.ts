import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MaterialsApi} from '@fox/rest-clients';
import {PdfUtil} from '@fox/shared';

@Component({
  selector: 'fox-eob-material-pdf',
  templateUrl: './eob-material-pdf.component.html',
  styleUrls: ['./eob-material-pdf.component.css']
})
export class EobMaterialPdfComponent implements OnInit {

  memberQuery: string | null = '';
  memberNumber = '';
  materialID = '';
  pdfData = '';
  dataLink = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private materialApi: MaterialsApi
  ) {
  }

  ngOnInit(): void {

    this.memberQuery = this.activateRoute.snapshot.queryParamMap.get('memberQuery');
    if (this.memberQuery) {
      this.memberNumber = this.memberQuery.split(' ')[0];
      this.materialID = this.memberQuery.split(' ')[1];
    }
    this.dataLink = 'api/materials/EOB/' + this.memberNumber + '/' + this.materialID;

    PdfUtil.blobservableToDataUrl(this.materialApi.getEOB(this.memberNumber, this.materialID)).subscribe(
      (data) => {
        this.pdfData = data;
      }
    );
  }

}
