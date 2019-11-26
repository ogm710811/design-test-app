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
  selector: 'fox-check-provider-modal',
  templateUrl: './provider-modal.component.html',
  styleUrls: ['./provider-modal.component.css']
})
export class ProviderModalComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort?: MatSort;
  dataSource = new MatTableDataSource();
  displayedColumns = ['isSelected', 'providerType', 'name', 'address', 'city', 'state', 'zip', 'tin', 'npi'];
  loadingStatus: ButtonStatus = ButtonStatus.DISABLED;
  providerSubscription?: Subscription;
  selectedProvider?: CheckRegisterMemberVO;

  constructor(
    public state: CheckDetailState
  ) { }

  ngOnInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.providerSubscription = this.state.modalBehaviorSubject.subscribe((val: boolean) => {
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
     if (this.providerSubscription) {
       this.providerSubscription.unsubscribe();
     }
   }

   memberSelected(row: CheckRegisterMemberVO): void {
     this.dataSource.data = this.dataSource.data.map((item: CheckRegisterMemberVO) => {
       item.isSelected = false;
       return item;
     });
     row.isSelected = true;
     this.selectedProvider = row;
     this.loadingStatus = ButtonStatus.SUBMIT;
   }

   enterEventClick(): void {
     // Emit enter event click
     this.state.modalIsVisible = false;
     this.state.selectedMember = this.selectedProvider;
     this.state.memberSelectedBehaviorSubject.next(true);
   }

   clearEventClick(): void {
    this.state.modalIsVisible = false;
    this.selectedProvider = new CheckRegisterMemberVO();
   }
}
