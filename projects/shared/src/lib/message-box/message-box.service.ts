import {Injectable} from '@angular/core';
import {MessageBoxType} from './message-box-type.enum';

export class MessageBoxModel {
  title: string = '';
  type: MessageBoxType = MessageBoxType.ACTIVE;
  content: string = '';
  timeout?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  private centralMessageBoxes: MessageBoxModel[] = [];

  reset(): void {
    // only resetting the message that are permanent or without timeout
    this.centralMessageBoxes = this.centralMessageBoxes.filter(mb => mb.timeout);
  }

  empty(): void {
    this.centralMessageBoxes = [];
  }

  get(): MessageBoxModel[] {
    return this.centralMessageBoxes;
  }

  removeMessageBox(index: number): void {
    if (this.centralMessageBoxes.length > 0) {
      this.centralMessageBoxes.splice(index, 1);
    }
  }

  addMessageBox(title: string, type: MessageBoxType, content: string, timeout?: number): void {
    const messageBox: MessageBoxModel = new MessageBoxModel();
    messageBox.title = title;
    messageBox.type = type;
    messageBox.timeout = timeout;
    messageBox.content = content;
    this.centralMessageBoxes.push(messageBox);
  }
}
