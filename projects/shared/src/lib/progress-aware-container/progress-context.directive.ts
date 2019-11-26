import {Directive} from '@angular/core';
import {ProgressContextService} from './progress-context.service';

@Directive({
  selector: '[foxProgressContext]',
  providers: [ProgressContextService]
})
export class ProgressContextDirective {

  constructor(public progressCtx: ProgressContextService) {
  }

}
