import {Component, Input} from '@angular/core';

@Component({
  selector: 'fox-deposit-image-accordion',
  templateUrl: './deposit-image-accordion.component.html',
  styleUrls: ['./deposit-image-accordion.component.css']
})

export class DepositImageAccordionComponent {
  @Input() base64: string = '';
  @Input() downloadLink: string = '';
}
