import {EventEmitter, Injectable} from '@angular/core';
import {BootstrapApi} from '@fox/rest-clients';
import * as uuidNS from 'uuid';

const uuid = uuidNS;
@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {

  enabledFeatures: string[] = [];
  enabledFeaturesChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  enabledFeaturesFromServer: string[] = [];
  disabledFeatures: string[] = [];
  disabledFeaturesChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  disabledFeaturesFromServer: string[] = [];

  constructor(
    private bootstrapSvc: BootstrapApi
  ) {
    bootstrapSvc.getBootstrap(uuid()).subscribe(resp => {
      if (resp.enabledFeatures) {
        this.enabledFeatures = resp.enabledFeatures;
        this.enabledFeaturesFromServer = resp.enabledFeatures;
        this.enabledFeaturesChange.emit(this.enabledFeatures);
      }

      if (resp.disabledFeatures) {
        this.disabledFeatures = resp.disabledFeatures;
        this.disabledFeaturesFromServer = resp.disabledFeatures;
        this.disabledFeaturesChange.emit(this.disabledFeatures);
      }
    });
  }

  addToDisabledList(feature: string): void {
    this.disabledFeatures.push(feature);
    this.disabledFeaturesChange.emit(this.disabledFeatures);
  }

  removeFromDisabledList(feature: string): void {
    this.disabledFeatures = this.disabledFeatures.filter(x => {
      return x !== feature;
    });
    this.disabledFeaturesChange.emit(this.disabledFeatures);
  }

  resetDisabled(): void {
    this.disabledFeatures = Array.from(this.disabledFeaturesFromServer);
    this.disabledFeaturesChange.emit(this.disabledFeatures);
  }

  addToEnabledList(feature: string): void {
    this.enabledFeatures.push(feature);
    this.enabledFeaturesChange.emit(this.enabledFeatures);
  }

  removeFromEnabledList(feature: string): void {
    this.enabledFeatures = this.enabledFeatures.filter(x => {
      return x !== feature;
    });
    this.enabledFeaturesChange.emit(this.enabledFeatures);
  }

  resetEnabled(): void {
    this.enabledFeatures = Array.from(this.enabledFeaturesFromServer);
    this.enabledFeaturesChange.emit(this.enabledFeatures);
  }

  isFeatureDisabled(name: string): boolean {
    if (this.disabledFeatures.find(feature => feature === name)) {
      return true;
    }
    return false;
  }

  isFeatureEnabled(name: string): boolean {
    if (this.enabledFeatures.find(feature => feature === name)) {
      return true;
    }
    return false;
  }
}
