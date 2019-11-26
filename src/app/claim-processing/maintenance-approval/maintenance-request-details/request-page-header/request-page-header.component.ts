import {Component, Input} from '@angular/core';
import {RequestResultSet} from '../../maintenance-approval-models/maintenance-request-result.model';

@Component({
  selector: 'fox-request-page-header',
  templateUrl: './request-page-header.component.html',
  styleUrls: ['./request-page-header.component.css']
})

export class RequestPageHeaderComponent {

  @Input() isApproved: boolean;
  @Input() isPending: boolean;
  @Input() isDeny: boolean;
  @Input() statusText: string;
  @Input() pageTitle: string;
  @Input() reqInfo: RequestResultSet;
}
