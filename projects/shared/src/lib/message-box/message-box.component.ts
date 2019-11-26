import {animate, style, transition, trigger} from '@angular/animations';
import {Component, EventEmitter, Input, NgZone, OnChanges, Output} from '@angular/core';
import {MessageBoxType} from './message-box-type.enum';

const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0}),
    animate('300ms ease-in-out', style({opacity: 1}))
  ]),
  transition(':leave', [
    style({opacity: 1}),
    animate('200ms ease-in-out', style({opacity: 0}))
  ])
]);

@Component({
  selector: 'fox-message-box',
  templateUrl: 'message-box.component.html',
  styleUrls: ['message-box.component.css'],
  animations: [fadeInOut]
})
export class MessageBoxComponent implements OnChanges {
  @Input() closable = true;
  @Input() visible: boolean = false;
  @Input() messageBoxTitle: string = '';
  @Input() messageType: MessageBoxType = MessageBoxType.ACTIVE;
  @Input() timeOutLength?: number;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closed: EventEmitter<string> = new EventEmitter<string>();

  get closeButtonImage(): string {
    switch (this.messageType) {
      case MessageBoxType.ERROR:
        return 'assets/img/close-red.svg';
      case MessageBoxType.ACTIVE:
        return 'assets/img/close-yellow.svg';
      case MessageBoxType.SUCCESS:
        return 'assets/img/close-green.svg';
      default:
        return 'assets/img/close-red.svg';
    }
  }

  constructor(private ngZone: NgZone) {
  }

  ngOnChanges(): void {
    if (this.timeOutLength) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.ngZone.run(() => {
            this.close();
          });
        }, this.timeOutLength);
      });
    }
  }

  close(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.closed.emit('closed');
  }
}
