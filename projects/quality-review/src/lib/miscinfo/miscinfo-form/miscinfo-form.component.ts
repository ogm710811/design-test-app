import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material';
import {ButtonStatus} from '@fox/shared';
import {Rpdmb76} from '../model/rpdmb76.model';

@Component({
  selector: 'fox-miscinfo-form',
  templateUrl: './miscinfo-form.component.html',
  styleUrls: ['./miscinfo-form.component.css']
})
export class MiscinfoFormComponent implements OnChanges {

  @Input() screenBean: Rpdmb76 = new Rpdmb76();
  @Input() isReval: boolean = false;
  @Input() loadingStatus: string = ButtonStatus.SUBMIT;
  @Input() useLoadingButton: boolean = false;
  @Output() submit: EventEmitter<Rpdmb76> = new EventEmitter<Rpdmb76>();
  @Output() clear: EventEmitter<Rpdmb76> = new EventEmitter<Rpdmb76>();
  public pillOptions: string[] = ['Approve', 'Express', 'Suspend', ' Bypass'];
  public selectedPill: string = '';
  @ViewChild('matSelect') public selectDropdown?: MatSelect;
  errRemoval = [
    {id: 0, label: ''}, {id: 1, label: 'No'}, {id: 2, label: 'Yes'}
  ];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('screenBean' in changes) {
      if (this.screenBean) {
        for (const key in this.screenBean) {
          if (this.screenBean[key] && typeof this.screenBean[key] === 'string') {
            this.screenBean[key] = this.screenBean[key].trim();
          }
        }
      }
    }
  }

  pillSelected(val: string): void {
    this.selectedPill = val;
    this.screenBean.m76repa = (+val + 1).toString();
  }

  submitClicked(): void {
    this.submit.emit(this.screenBean);
  }

  clearEventClick(): void {
    this.clear.emit(this.screenBean);
    this.selectedPill = '-1';
  }

}
