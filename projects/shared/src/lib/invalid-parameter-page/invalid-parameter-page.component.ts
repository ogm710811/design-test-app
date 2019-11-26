import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalService} from '../modal/modal.service';
import {TransferSrvService} from '../service/transfer-srv.service';

@Component({
  selector: 'fox-invalid-param-page',
  templateUrl: './invalid-parameter-page.component.html',
  styleUrls: ['./invalid-parameter-page.component.css']
})
export class InvalidParameterPageComponent implements OnInit {
  paramType: string = '';
  paramInputValue: string = '';
  commandInput: string = '';
  constructor( private activatedRoute: ActivatedRoute, private router: Router, private modalService: ModalService, private transferSrvService: TransferSrvService) {
  }

  ngOnInit(): void {
    this.modalService.routeValidationModalVisible = false;
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      if (params['command']) {
        this.commandInput = params['command'];
      }
      if (params['memberid']) {
        this.paramType = 'Member #';
        this.paramInputValue = params['memberid'];
      } else if (params['commId']) {
        this.paramType = 'Communication #';
        this.paramInputValue = params['commId'];
      } else {
        this.paramType = 'N/A';
        this.paramInputValue = params['N/A'];
      }
    });
  }

  pf1EventClick (): void {
    const previousPage = this.transferSrvService.previousUrl;
    const url = previousPage.split('?');
    if (url) {
      this.router.navigate([url[0]]);
    } else {
      this.router.navigate([previousPage]);
    }
  }
}
