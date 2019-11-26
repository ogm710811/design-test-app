import {Directive} from '@angular/core';
import {ProgressContextService} from './progress-context.service';

@Directive({
  selector: '[foxProgressAware]'
})
export class ProgressAwareDirective {

  constructor(public progressCtx: ProgressContextService) {
  }

}
