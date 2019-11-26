import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'fox-keyboard-shortcuts',
  templateUrl: './keyboard-shortcuts.component.html',
  styleUrls: ['./keyboard-shortcuts.component.css']
})
export class KeyboardShortcutsComponent {

  showPdfLink = true;

  globalShortcuts: ShortCut[] = [
    {name: 'Next Field', modifier: '', key: 'Tab'},
    {name: 'Previous Field', modifier: 'Shift', key: 'Tab'},
    {name: 'Next Container', modifier: 'Alt', key: 'W'},
    {name: 'Previous Container', modifier: 'Alt', key: 'Q'},
    {name: 'Exit Modal', modifier: '', key: 'Escape'},
    {name: 'Submit Form', modifier: '', key: 'Enter'},
    {name: 'Change Active Page Tab', modifier: 'Alt', key: '(1-9)'},
    {name: 'Hide/Show Navigation', modifier: 'Alt', key: '`'},
    {name: 'Move To Command Bar', modifier: '', key: 'Home'},
    {name: 'Move To Command Bar and Clear', modifier: '', key: 'Pause'},
    {name: 'Move to End of Page', modifier: '', key: 'End'},
    {name: 'Complete & Get Next (Work Queues Only)', modifier: 'Alt', key: 'G'},
  ];

  pageSpecificShortcuts: ShortCut[] = [
    {name: 'Submit/Search', modifier: 'Alt', key: 'S'},
    {name: 'Clear', modifier: 'Alt', key: 'R'},
    {name: 'Browse', modifier: 'Alt', key: 'B'},
    {name: 'Next Result', modifier: 'Alt', key: 'I'},
    {name: 'Previous Result', modifier: 'Alt', key: 'J'},
    {name: 'Continue/Proceed', modifier: 'Alt', key: 'L'},
    {name: 'Upload', modifier: 'Alt', key: 'U'},
  ];

  @Input() visibleModal: boolean = false;
  @Output() visibleModalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  onCancel(): void {
    this.visibleModal = false;
    this.visibleModalEmitter.emit(this.visibleModal);
  }
}

interface ShortCut {
  name: string;
  modifier: string;
  key: string;
}
