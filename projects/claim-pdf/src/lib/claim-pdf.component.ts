import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClaimApi} from '@fox/rest-clients';
import {LoginService, PdfUtil} from '@fox/shared';

@Component({
  selector: 'fox-claim-pdf',
  templateUrl: './claim-pdf.component.html',
  styleUrls: ['./claim-pdf.component.css']
})
export class ClaimPdfComponent implements OnInit {

  claimQuery: any;
  claimNumber = '';
  pdfData = '';
  dataLink = '';

  constructor(private activateRoute: ActivatedRoute,
              private loginService: LoginService, private claimapi: ClaimApi,
  ) {
  }

  ngOnInit(): void {
    this.claimQuery = this.activateRoute.snapshot.queryParamMap.get('claimQuery');
    this.claimNumber = this.claimQuery;
    this.dataLink = 'api/membervalidation/claim/' + this.claimNumber + '/image?token=' + this.loginService.loginState.access_token;

    PdfUtil.blobservableToDataUrl(this.claimapi.getPDF(this.claimNumber)).subscribe(
      (data) => {
        this.pdfData = data;
      }
    );
  }
}
