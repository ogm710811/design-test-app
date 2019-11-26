import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'fox-member-demographics-dependents',
  templateUrl: './dependents.component.html',
  styleUrls: ['./dependents.component.css']
})
export class DependentsComponent implements OnInit {

  displayedMemberColumns = ['memberAccountNo', 'medicareId', 'lastName', 'firstName', 'middleName', 'dateOfBirth', 'isActive'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
