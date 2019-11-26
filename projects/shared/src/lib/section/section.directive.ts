import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {SectionService} from './section.service';

@Directive({
  selector: '[foxSection]'
})
export class SectionDirective implements OnDestroy, AfterViewInit {

  constructor(public elementRef: ElementRef, private sectionSvc: SectionService) {
  }

  ngAfterViewInit(): void {
    this.sectionSvc.addSection(this);
  }

  ngOnDestroy(): void {
    this.sectionSvc.removeSection(this);
  }
}
