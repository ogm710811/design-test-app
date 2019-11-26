import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatSelectModule} from '@angular/material';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationEnd, Router} from '@angular/router';
import {HotkeyOptions, HotkeysService} from 'angular2-hotkeys';
import {SectionService} from '../section/section.service';
import {PaginatorNonMaterialComponent} from './paginator-non-material.component';

describe('Paginator Component', () => {

  function onNavigationEnd(fn): void {
    router = TestBed.get(Router);
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        fixture.detectChanges();
        fn();
      }
    });
  }

  let component: PaginatorNonMaterialComponent;
  let fixture: ComponentFixture<PaginatorNonMaterialComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatorNonMaterialComponent],
      imports: [MatSelectModule, NoopAnimationsModule],
      providers: [SectionService,
        HotkeysService,
        {provide: HotkeyOptions, useValue: {}}]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(PaginatorNonMaterialComponent);
      component = fixture.componentInstance;
    });
  }));

  it('displays the empty state paginator', () => {
    const paginator = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.page-link-left-grey'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.paginator-active'))).toBeFalsy();
    expect(fixture.debugElement.queryAll(By.css('.page-link')).length).toEqual(2);
    expect(fixture.debugElement.query(By.css('.page-link-right'))).toBeTruthy();
  });

  it('displays a 25 item list at 5 per page with 5 buttons', () => {
    const paginator = fixture.componentInstance;
    paginator.dataLengthInput = 25;
    paginator.pageTotal = 5;
    paginator.currentPage = 0;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.page-link-left-grey'))).toBeTruthy();
    expect(fixture.debugElement.queryAll(By.css('.page-link')).length).toEqual(7);
    expect(fixture.debugElement.query(By.css('.page-link-right'))).toBeTruthy();
  });

  it('displays a 50 item list at 5 per page with 6 buttons (2 dotted)', () => {
    const paginator = fixture.componentInstance;
    paginator.dataLengthInput = 50;
    paginator.pageTotal = 10;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.page-link-left-grey'))).toBeTruthy();
    expect(fixture.debugElement.queryAll(By.css('.page-link')).length).toEqual(8);
    expect(fixture.debugElement.query(By.css('.page-link-right'))).toBeTruthy();
  });
});
