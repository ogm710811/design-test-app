import {AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {TableExpandRowDirective} from './table-expand-row.directive';
import {TableRowComponent} from './table-row.component';

@Component({
  selector: 'fox-table-expand-row',
  templateUrl: './table-expand-row.component.html',
  styleUrls: ['./table-expand-row.component.css']
})
export class TableExpandRowComponent implements AfterViewInit {

  @Input() component: any;
  @Input() data: any;

  @ViewChild(TableExpandRowDirective) expandedRow?: TableExpandRowDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngAfterViewInit(): void {
    if (this.expandedRow) {
      const viewContainerRef = this.expandedRow.viewContainerRef;
      viewContainerRef.clear();

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<TableRowComponent>componentRef.instance).data = this.data;
    }
  }

}
