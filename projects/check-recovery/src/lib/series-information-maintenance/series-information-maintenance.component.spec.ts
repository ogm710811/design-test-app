import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SeriesInformationMaintenanceComponent} from './series-information-maintenance.component';

describe('SeriesInformationMaintenanceComponent', () => {
  let component: SeriesInformationMaintenanceComponent;
  let fixture: ComponentFixture<SeriesInformationMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesInformationMaintenanceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesInformationMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
