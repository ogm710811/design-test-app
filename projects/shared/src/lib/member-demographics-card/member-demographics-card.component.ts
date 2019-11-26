import {Component, Input, OnInit} from '@angular/core';
import {MemberDmg, MemberPln} from './model/member-demographics.model';
import {BehaviorSubject} from 'rxjs';
import * as momentNS from 'moment';
import {TableColumnKind} from '../table/table-column';

const moment = momentNS;

@Component({
  selector: 'fox-member-dmg-card',
  templateUrl: './member-demographics-card.component.html',
  styleUrls: ['./member-demographics-card.component.css']
})
export class MemberDemographicsCardComponent implements OnInit {
  memberDmg = new MemberDmg();
  memberPln = new MemberPln();
  planPicked: any = [];
  showTable: boolean = false;
  headers: string [] = ['Plan', 'Effective Dates', 'Term Reason', 'Active Within DOS'];
  columns: any = [];
  resultCurrentSortKey: string = 'plan';
  resultSortDirection: any = 'ASC';

  @Input() isDisplayed: boolean = true;
  @Input() state: string = '';

  @Input() set screenData(value: {}) {
    this._screenData.next(value);
  }

  private _screenData = new BehaviorSubject<{}>([]);

  ngOnInit(): void {
    this._screenData.subscribe(data => {
      this.setMembDmgValues(data);
      this.setTableData(data);
    });
  }
  /**
   * Method to set values for member demographics section
   */
  setMembDmgValues (memberData: any): void {
    if (memberData) {
      this.memberDmg.m22nam = memberData['m22nam'];
      this.memberDmg.m22memn = memberData['m22memn'];
      this.memberDmg.m22addr = memberData['m22addr'];
      this.memberDmg.m22city = memberData['m22city'];
      this.memberDmg.m22dob = memberData['m22dob'];
      this.memberDmg.m22srv1 = memberData['m22srv1'];
      this.memberDmg.activePlans = this.getActivePlans(memberData);
    }
  }
  /**
   * Method to set values for plan details table
   */
  setTableData (memberData: any): void {
    this.memberPln.validators.forEach((plan) => {
      const tempObj = {
        plan: '',
        effectiveDate: '',
        termReason: '',
        activeStatus: [''],
      };
      if (memberData[plan.plan]) {
        tempObj.plan = memberData[plan.plan];
        tempObj.effectiveDate = this.setEffectiveDate(memberData[plan.effDate], memberData[plan.termDateR]) ;
        tempObj.activeStatus = this.compareDate( memberData[plan.effDate], this.getTermDate(memberData[plan.termDateR]) , this.memberDmg.m22srv1) ? ['confirm-green.svg', 'Active'] : ['deny-red.svg', 'Inactive'];
        tempObj.termReason = this.seTermReason(memberData[plan.termDateR]);
        this.planPicked.push(tempObj);
        this.columns = Object.keys(this.planPicked[0]).map((key, idx) => {
          return {
            key: key,
            header: this.headers[idx],
            headerText: this.headers[idx],
            sortKey: key,
            kind:
              3 === idx ?
                TableColumnKind.IconItem :
                TableColumnKind.Text
          };
        });
      }
    });
  }
  /**
   * Method to set effective date
   */
  setEffectiveDate (effDate: string, termDate: string): string {
    const trimedValue = termDate ? termDate.split('/') : [];
    if (trimedValue.length > 0) {
      const yy = trimedValue[2] ? trimedValue[2].split('-') : [];
      if (yy.length > 0) {
        return effDate + ' - ' + trimedValue[0] + '/' + yy[0];
      } else {
        return effDate + ' - ' + trimedValue[0] + '/' + trimedValue[2];
      }
    } else  {
      return effDate + ' -';
    }
  }

  /**
   * Method to set value for termination reason
   */
  seTermReason (value: string): string {
    const trimedValue = value ? value.split('-') : [];
    if (trimedValue.length > 0) {
      return trimedValue[1];
    } else  {
      return '';
    }
  }
  /**
   * event method to show and hide table
   */
  openPlansTable(isOpen: boolean): void {
    this.showTable = !isOpen;
  }

  /**
   * Method to pick active plans
   */
  getActivePlans (data: any): string {
    if (data['m22nam']) {
      const activePlans: string[] = [];
      this.memberPln.validators.forEach((plan) => {
        if ( this.compareDate( data[plan.effDate], this.getTermDate(data[plan.termDateR]), this.memberDmg.m22srv1) && data[plan.plan] ) {
          const planName: string = data[plan.plan];
          activePlans.push(planName);
        }
      });
      return activePlans.join(', ');
    } else {
      return '';
    }
  }

  compareDate(fromDate: string, toDate: string, checkDate: string): boolean {
    const formattedFromDate = this.getFormatedDate(fromDate);
    const formattedToDate = this.getFormatedDate(toDate);
    const formattedCheckDate = this.getFormatedDate(checkDate);
    return moment(formattedCheckDate).isBetween(formattedFromDate, formattedToDate, 'month', '[]');
  }

  getFormatedDate(date: string): string | undefined {
    let dateFormatted;
    const defDay = '01';
    const dateSplit = '/';
    const dateArray = date.split(dateSplit);
    if (!!date) {
      if (date.length <= 5) {
        if (dateArray && dateArray.length > 1) {
          dateFormatted = dateArray[0] + dateSplit + defDay + dateSplit + this.checkYear(dateArray[1]);
        } else {
          dateFormatted = date.slice(0, 2) + dateSplit + defDay + dateSplit +  this.checkYear(date.slice(2, 4));
        }
      } else if (date.length === 8) {
        dateFormatted = dateArray[0] + dateSplit + dateArray[1] + dateSplit + this.checkYear(dateArray[2]);
      } else {
        if (!dateArray) {
          dateFormatted = date.slice(2, 4) + dateSplit + date.slice(0, 2) + dateSplit +  date.slice(4, 8);
        } else {
          dateFormatted = date;
        }
      }
    } else {
      dateFormatted = undefined;
    }
    return dateFormatted;
  }

  getTermDate (value: string): string {
    const trimedValue = value ? value.split('-') : [];
    if (trimedValue.length > 0) {
      return trimedValue[0];
    } else  {
      return value;
    }
  }

  checkYear (value: string): string {
    if (Number(value) > 80) {
      return '19' + value;
    } else {
      return '20' + value;
    }
  }

}
