import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[foxLink]'
})
export class LinkDirective implements OnInit {

  @Input() foxLink: boolean = true;
  @Output() linkPressed: EventEmitter<KeyboardEvent | MouseEvent> = new EventEmitter<KeyboardEvent | MouseEvent>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', '0');
  }

  @HostListener('keypress', ['$event'])
  onKeypress($event: KeyboardEvent): void {
    if ($event && ($event.keyCode === 13 || $event.charCode === 13 || $event.keyCode === 32 || $event.charCode === 32)) {
      this.linkPressed.emit($event);
      $event.preventDefault();
    }
  }

  @HostListener('click', ['$event'])
  onMouseClick($event: MouseEvent): void {
    this.linkPressed.emit($event);
    $event.preventDefault();
  }

}
