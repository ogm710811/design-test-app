import {
  ClaimNoInputDirective,
  CurrencyInputDirective,
  DateInputDirective,
  FilterPipe,
  FormatMemberPipe,
  FoxBadgeComponent,
  FoxTooltipComponent,
  GridItemDirective,
  IconItemFormatTableComponent,
  InputComponent,
  LinkDirective,
  MemberInfoComponent,
  MemberNoInputDirective,
  MemberProfileFormatTableComponent,
  MessageBoxComponent,
  SectionComponent,
  SectionSubheaderComponent,
  SectionTitleComponent,
  TableComponent,
  TableExpandRowComponent,
  TableExpandRowDirective,
  TableHeaderSortComponent,
  TextInputDirective
} from '@fox/shared';
import {MiscinfoFormComponent} from '@fox/quality-review';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {action} from '@storybook/addon-actions';
import {boolean, number, select, text, withKnobs} from '@storybook/addon-knobs';
import {withNotes} from '@storybook/addon-notes';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {HotkeyModule} from 'angular2-hotkeys';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {SharedModule} from '../app/shared/shared.module';

storiesOf('FOX UI|Message Boxes', module)
  .addDecorator(
    moduleMetadata({imports: [CommonModule, BrowserAnimationsModule], declarations: [MessageBoxComponent]})
  )
  .addDecorator(withKnobs)
  .add('Error message', ({}) => ({
    template: `<fox-message-box [(visible)]="visible" [closable]="closable"
                                [messageType]="messageType" [messageBoxTitle]="messageBoxTitle"
                                [timeOutLength]="timeOutLength">
                                {{messageBoxBody}}
                                </fox-message-box>`,
    props: {
      visible: boolean('Visible', true),
      closable: boolean('Close Button', true),
      messageType: select('Message Type', {
        Error: 'error',
        Info: 'active',
        Success: 'success'
      }, 'error'),
      messageBoxTitle: text('Title', 'Once upon a time...'),
      messageBoxBody: text('Body', 'There was a new app called storybook that looked pretty neat'),
      timeOutLength: number('Timeout Milliseconds', 0)
    }
  }))
  .add('Info message', ({}) => ({
    template: `<fox-message-box [(visible)]="visible" [closable]="closable" [messageType]="messageType" [messageBoxTitle]="messageBoxTitle"> {{messageBoxBody}} </fox-message-box>`,
    props: {
      visible: boolean('Visible', true),
      closable: boolean('Close Button', true),
      messageType: select('Message Type', {
        Error: 'error',
        Info: 'active',
        Success: 'success'
      }, 'active'),
      messageBoxTitle: text('Title', 'Once upon a time...'),
      messageBoxBody: text('Body', 'There was a new app called storybook that looked pretty neat'),
      timeOutLength: number('Timeout Milliseconds', 0)
    }
  }))
  .add('Info message', ({}) => ({
    template: `<fox-message-box [(visible)]="visible" [closable]="closable" [messageType]="messageType" [messageBoxTitle]="messageBoxTitle"> {{messageBoxBody}} </fox-message-box>`,
    props: {
      visible: boolean('Visible', true),
      closable: boolean('Close Button', true),
      messageType: select('Message Type', {
        Error: 'error',
        Info: 'active',
        Success: 'success'
      }, 'success'),
      messageBoxTitle: text('Title', 'Once upon a time...'),
      messageBoxBody: text('Body', 'There was a new app called storybook that looked pretty neat'),
      timeOutLength: number('Timeout Milliseconds', 0)
    }
  }));

storiesOf('FOX UI|Input Fields/Default (Text)/No Binding', module)
  .addDecorator(moduleMetadata({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
    declarations: [ClaimNoInputDirective, MemberNoInputDirective, DateInputDirective, CurrencyInputDirective, TextInputDirective, InputComponent]
  }))
  .addDecorator(withKnobs)
  .add('No Attributes', () => ({
    template: `<fox-input></fox-input>`
  }))
  .add('ID Attribute', () => ({
    template: `<fox-input [id]="myId"></fox-input>`,
    props: {
      myId: text('ID', 'input-my-id')
    }
  }))
  .add('Label Attribute', () => ({
    template: `<fox-input [labelText]="label"></fox-input>`,
    props: {
      label: text('Label', 'My Label\'s Text')
    }
  }))
  .add('Label Extra Attribute', () => ({
    template: `<fox-input [labelExtraText]="labelExtra"></fox-input>`,
    props: {
      labelExtra: text('Label Extra', 'My Extra Text')
    }
  }))
  .add('Placeholder Attribute', () => ({
    template: `<fox-input [placeholder]="placeholder"></fox-input>`,
    props: {
      placeholder: text('Placeholder', 'Sample Text')
    }
  }))
  .add('Assistive Text Attribute', () => ({
    template: `<fox-input [assistiveText]="assistiveText"></fox-input>`,
    props: {
      assistiveText: text('Assistive Text', 'A brief description')
    }
  }))
  .add('Size Attribute', () => ({
    template: `<fox-input [size]="size"></fox-input>`,
    props: {
      size: number('Size', 50)
    }
  }))
  .add('Pre Icon Attribute', () => ({
    template: `<fox-input [preIconUrl]="preIcon"></fox-input>`,
    props: {
      preIcon: text('Pre Icon', 'assets/img/information.svg')
    }
  }))
  .add('Post Icon Attribute', () => ({
    template: `<fox-input [postIconUrl]="postIcon"></fox-input>`,
    props: {
      postIcon: text('Post Icon', 'assets/img/document.svg')
    }
  }))
  .add('All Attributes', () => ({
    template: `<fox-input [id]="myId"
                          [size]="size"
                          [placeholder]="placeholder"
                          [labelText]="label"
                          [labelExtraText]="labelExtra"
                          [assistiveText]="assistiveText"
                          [preIconUrl]="preIcon"
                          [postIconUrl]="postIcon"></fox-input>`,
    props: {
      myId: text('ID', 'input-my-id'),
      label: text('Label', 'My Label\'s Text'),
      labelExtra: text('Label Extra', 'My Extra Text'),
      placeholder: text('Placeholder', 'Sample Text'),
      assistiveText: text('Assistive Text', 'A brief description'),
      size: number('Size', 50),
      preIcon: text('Pre Icon', 'assets/img/information.svg'),
      postIcon: text('Post Icon', 'assets/img/document.svg')
    }
  }));

storiesOf('FOX UI|Input Fields/Text/No Binding', module)
  .addDecorator(moduleMetadata({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
    declarations: [ClaimNoInputDirective, MemberNoInputDirective, DateInputDirective, CurrencyInputDirective, TextInputDirective, InputComponent]
  }))
  .addDecorator(withKnobs)
  .add('No Attributes', () => ({
    template: `<fox-input type="text"></fox-input>`
  }))
  .add('ID Attribute', () => ({
    template: `<fox-input type="text" [id]="myId"></fox-input>`,
    props: {
      myId: text('ID', 'input-my-id')
    }
  }))
  .add('Label Attribute', () => ({
    template: `<fox-input type="text" [labelText]="label"></fox-input>`,
    props: {
      label: text('Label', 'My Label\'s Text')
    }
  }))
  .add('Label Extra Attribute', () => ({
    template: `<fox-input type="text" [labelExtraText]="labelExtra"></fox-input>`,
    props: {
      labelExtra: text('Label Extra', 'My Extra Text')
    }
  }))
  .add('Placeholder Attribute', () => ({
    template: `<fox-input type="text" [placeholder]="placeholder"></fox-input>`,
    props: {
      placeholder: text('Placeholder', 'Sample Text')
    }
  }))
  .add('Assistive Text Attribute', () => ({
    template: `<fox-input type="text" [assistiveText]="assistiveText"></fox-input>`,
    props: {
      assistiveText: text('Assistive Text', 'A brief description')
    }
  }))
  .add('Size Attribute', () => ({
    template: `<fox-input type="text" [size]="size"></fox-input>`,
    props: {
      size: number('Size', 50)
    }
  }))
  .add('Pre Icon Attribute', () => ({
    template: `<fox-input type="text" [preIconUrl]="preIcon"></fox-input>`,
    props: {
      preIcon: text('Pre Icon', 'assets/img/information.svg')
    }
  }))
  .add('Post Icon Attribute', () => ({
    template: `<fox-input type="text" [postIconUrl]="postIcon"></fox-input>`,
    props: {
      postIcon: text('Post Icon', 'assets/img/document.svg')
    }
  }))
  .add('All Attributes', () => ({
    template: `<fox-input type="text"
                          [id]="myId"
                          [size]="size"
                          [placeholder]="placeholder"
                          [labelText]="label"
                          [labelExtraText]="labelExtra"
                          [assistiveText]="assistiveText"
                          [preIconUrl]="preIcon"
                          [postIconUrl]="postIcon"></fox-input>`,
    props: {
      myId: text('ID', 'input-my-id'),
      label: text('Label', 'My Label\'s Text'),
      labelExtra: text('Label Extra', 'My Extra Text'),
      placeholder: text('Placeholder', 'Sample Text'),
      assistiveText: text('Assistive Text', 'A brief description'),
      size: number('Size', 50),
      preIcon: text('Pre Icon', 'assets/img/information.svg'),
      postIcon: text('Post Icon', 'assets/img/document.svg')
    }
  }));
storiesOf('FOX UI|Input Fields/Default (Text)/NgModel Binding', module)
  .addDecorator(moduleMetadata({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
    declarations: [ClaimNoInputDirective, MemberNoInputDirective, DateInputDirective, CurrencyInputDirective, TextInputDirective, InputComponent]
  }))
  .addDecorator(withKnobs)
  .add('A Text Input with no `type` and a Label', () => ({
    template: `<fox-input labelText="My Label Text" [(ngModel)]="myValue" (ngModelChange)="onModelChange($event)"></fox-input>`,
    props: {
      myValue: text('Text Value', 'Some very large text that takes up a lot of space but says absolutely nothing'),
      onModelChange: action('onModelChange')
    }
  }))
  .add('A Text Input (No Type Specified)', () => ({
    template: `<fox-input labelText="Text" labelExtraText="Extra" size="10" [(ngModel)]="myValue" (ngModelChange)="onModelChange($event)"></fox-input>`,
    props: {
      myValue: 'effervescent buoyancy',
      onModelChange: action('onModelChange')
    }
  }));
storiesOf('FOX UI|Input Fields/Date/NgModel Binding', module)
  .addDecorator(moduleMetadata({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
    declarations: [ClaimNoInputDirective, MemberNoInputDirective, DateInputDirective, CurrencyInputDirective, TextInputDirective, InputComponent]
  }))
  .addDecorator(withKnobs)
  .add('A Date Input with a Valid Value', () => ({
    template: `<fox-input type="fox-date" [labelText]="labelText" labelExtraText="Extra" size="30" [(ngModel)]="myValue" [ngModelOptions]="{updateOn: 'blur'}" (ngModelChange)="onModelChange($event)"></fox-input>`,
    props: {
      inputType: 'fox-date',
      labelText: text('Label Text', 'Label'),
      myValue: text('Date in ISO', '2017-12-23'),
      onModelChange: action('onModelChange')
    }
  }))
  .add('A Date Input with an Invalid Value', () => ({
    template: `<fox-input type="fox-date" labelText="Label" labelExtraText="Extra" size="30" [(ngModel)]="myValue" [ngModelOptions]="{updateOn: 'blur'}" (ngModelChange)="onModelChange($event)"></fox-input>`,
    props: {
      myValue: '181-18-33',
      onModelChange: action('onModelChange')
    }
  }));
storiesOf('FOX UI|Input Fields/Currency/NgModel Binding', module)
  .addDecorator(moduleMetadata({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
    declarations: [ClaimNoInputDirective, MemberNoInputDirective, DateInputDirective, CurrencyInputDirective, TextInputDirective, InputComponent]
  }))
  .addDecorator(withKnobs)
  .add('A Currency Input with a Valid Value', () => ({
    template: `<fox-input type="fox-currency" labelText="Label" [(ngModel)]="myValue" [ngModelOptions]="{updateOn: 'blur'}" (ngModelChange)="onModelChange($event)"></fox-input>`,
    props: {
      myValue: 9999.99,
      onModelChange: action('onModelChange')
    }
  }));
storiesOf('FOX UI|Input Fields/Member Number/NgModel Binding', module)
  .addDecorator(moduleMetadata({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ClaimNoInputDirective, MemberNoInputDirective, DateInputDirective, CurrencyInputDirective, TextInputDirective, InputComponent]
  }))
  .addDecorator(withKnobs)
  .add('Member Number Input with a Valid Value', () => ({
    template: `<fox-input type="fox-membership" labelText="Member No" [(ngModel)]="myValue" [ngModelOptions]="{updateOn: 'blur'}" (ngModelChange)="onModelChange($event)"></fox-input>`,
    props: {
      myValue: '11111111123',
      onModelChange: action('onModelChange')
    }
  }));
storiesOf('FOX UI|Input Fields/Claim Number/NgModel Binding', module)
  .addDecorator(moduleMetadata({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ClaimNoInputDirective, MemberNoInputDirective, DateInputDirective, CurrencyInputDirective, TextInputDirective, InputComponent]
  }))
  .addDecorator(withKnobs)
  .addDecorator(withNotes)
  .add('Claim Number Input with a Valid Value', () => ({
      template: `<fox-input type="fox-claim" labelText="Claim No" [(ngModel)]="myValue"  [ngModelOptions]="{updateOn: 'blur'}" (ngModelChange)="onModelChange($event)"></fox-input>`,
      props: {
        myValue: '111112222223',
        onModelChange: action('onModelChange')
      }
    }),
    {
      notes: 'This is a note about a Claim Number input field that uses [(ngModel)] for binding'
    });
storiesOf('FOX UI|QR Miscellaneous Information', module)
  .addDecorator(moduleMetadata({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HotkeyModule.forRoot(), SharedModule.forRoot(), BrowserAnimationsModule],
    declarations: [MiscinfoFormComponent]
  }))
  .addDecorator(withKnobs)
  .add('Default State', () => ({
    template: `
<div class="container">
    <div class="row">
        <fox-miscinfo-form  class="col-xs-8" [screenBean]="miscInfoTsc"></fox-miscinfo-form>
    </div>
</div>`,
    props: {}
  }));

storiesOf('FOX UI|Member Information', module)
  .addDecorator(moduleMetadata({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatMenuModule, TooltipModule.forRoot(), RouterModule],
    declarations: [
      MemberInfoComponent,
      SectionComponent,
      SectionTitleComponent,
      SectionSubheaderComponent,
      TableComponent,
      TableHeaderSortComponent,
      FoxBadgeComponent,
      FoxTooltipComponent,
      LinkDirective,
      FilterPipe,
      InputComponent,
      MemberProfileFormatTableComponent,
      IconItemFormatTableComponent,
      GridItemDirective,
      TableExpandRowDirective,
      TableExpandRowComponent,
      FormatMemberPipe
    ]
  }))
  .addDecorator(withKnobs)
  .add('Default State', () => ({
    template: `
<div class="container">
    <div class="row">
        <fox-member-info class="col-xs-12 col-sm-5 col-md-4"></fox-member-info>
    </div>
</div>`,
    props: {}
  }));
