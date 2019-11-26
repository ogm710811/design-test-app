import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {CheckRegisterMemberVO, ButtonStatus} from '@fox/shared';
import {CheckDetailState} from '../../check-detail.state';
import {Subscription} from 'rxjs';

@Component({
  selector: 'fox-check-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.css']
})
export class MemberModalComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort?: MatSort;
  dataSource = new MatTableDataSource();
  displayedColumns = ['isSelected', 'memberNumber', 'name', 'address', 'city', 'state', 'zip', 'addressType', 'personType'];
  loadingStatus: ButtonStatus = ButtonStatus.DISABLED;
  modalSubscription?: Subscription;
  selectedMember?: CheckRegisterMemberVO;

  constructor(
    public state: CheckDetailState
  ) { }

  ngOnInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.modalSubscription = this.state.modalBehaviorSubject.subscribe((val: boolean) => {
      if (val && this.state.modalData && this.state.modalData.length > 0) {
        this.dataSource.data = this.state.modalData;
        setTimeout(() => {
          const selected = document.getElementById('memberNumber');
          if (selected) {
            selected.click();
            selected.click();
            selected.click();
          }
        }, 300);
      }
    });
   }

   ngOnDestroy(): void {
     if (this.modalSubscription) {
       this.modalSubscription.unsubscribe();
     }
   }

   memberSelected(row: CheckRegisterMemberVO): void {
     this.dataSource.data = this.dataSource.data.map((item: CheckRegisterMemberVO) => {
       item.isSelected = false;
       return item;
     });
     row.isSelected = true;
     this.selectedMember = row;
     this.loadingStatus = ButtonStatus.SUBMIT;
   }

   enterEventClick(): void {
     // Emit enter event click
     this.state.modalIsVisible = false;
     this.state.selectedMember = this.selectedMember;
     this.state.memberSelectedBehaviorSubject.next(true);
   }

   clearEventClick(): void {
    this.state.modalIsVisible = false;
    this.selectedMember = new CheckRegisterMemberVO();
   }
}
