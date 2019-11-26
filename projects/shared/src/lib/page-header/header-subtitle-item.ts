import {ComponentFactoryResolver, Injector, Type} from '@angular/core';

export class HeaderSubtitleItem {
  constructor(public component: Type<any>, public data: any, public componentFactoryResolver: ComponentFactoryResolver, public injector: Injector) {}
}
