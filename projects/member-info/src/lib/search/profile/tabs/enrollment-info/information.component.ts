import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResourceOfGetMemberVO} from '@fox/rest-clients';

@Component({
  selector: 'fox-member-enrollment-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  @Input() membershipNumber: string = '';
  @Input() memberProfile: ResourceOfGetMemberVO = new ResourceOfGetMemberVO();
  @Input() isSpecialHCUpdated: boolean = false;
  @Output() specialHandlingCode: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() insuredNoteNotFound: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  displayActiveMsg(e: any): void {
    this.specialHandlingCode.emit(true);
  }

  displayInsuredNoteNotFoundMsg(e: any): void {
    this.insuredNoteNotFound.emit(true);
  }

}
