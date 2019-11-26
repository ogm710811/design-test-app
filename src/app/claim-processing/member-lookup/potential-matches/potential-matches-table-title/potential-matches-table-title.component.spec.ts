import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PotentialMatchesTableTitleComponent} from './potential-matches-table-title.component';

describe('PotentialMatchesTableTitleComponent', () => {
  let component: PotentialMatchesTableTitleComponent;
  let fixture: ComponentFixture<PotentialMatchesTableTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PotentialMatchesTableTitleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialMatchesTableTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
