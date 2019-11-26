import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {FeatureFlagService} from '../feature-flag-service/feature-flag.service';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'fox-feature-flag-modal',
  templateUrl: './feature-flag-modal.component.html',
  styleUrls: ['./feature-flag-modal.component.css']
})
export class FeatureFlagModalComponent implements AfterViewInit {
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('modal') modal?: ModalComponent<any>;

  newDisabledFeature: string = '';
  newEnabledFeature: string = '';
  selectedDisabledFeatures: string | string[] = [];
  selectedEnabledFeatures: string | string[] = [];

  constructor(public featureFlagService: FeatureFlagService) {
  }

  ngAfterViewInit(): void {
    if (this.modal) {
      this.modal.visibleChange.subscribe((x: boolean) => this.visibleChange.emit(x));
    }
  }

  removeDisableSelection(): void {
    let feats: string[] = [];
    if (typeof this.selectedDisabledFeatures === 'string') {
      feats = [this.selectedDisabledFeatures];
    } else {
      feats = this.selectedDisabledFeatures;
    }

    feats.forEach(feature => {
      this.featureFlagService.removeFromDisabledList(feature);
    });
  }

  removeEnableSelection(): void {
    let feats: string[] = [];
    if (typeof this.selectedEnabledFeatures === 'string') {
      feats = [this.selectedEnabledFeatures];
    } else {
      feats = this.selectedEnabledFeatures;
    }

    feats.forEach(feature => {
      this.featureFlagService.removeFromEnabledList(feature);
    });
  }
}
