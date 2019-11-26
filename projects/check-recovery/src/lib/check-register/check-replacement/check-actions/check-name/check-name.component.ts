import {
  Component, Input, OnInit
} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {CheckDetailState} from '../../check-detail.state';

export interface ValidationSettings  {
  messageText: string;
  maxCharacters: string;
  correctFormat: string;
}

@Component({
  selector: 'fox-check-name',
  templateUrl: './check-name.component.html',
  styleUrls: ['./check-name.component.css']
})
export class CheckNameComponent implements OnInit {
  hasCheckFirstNameFocus: boolean = false;
  hasCheckLastNameFocus: boolean = false;
  hasFullPayeeNameFocus: boolean = false;
  hasMiddleNameFocus: boolean = false;
  hasCheckSuffixNameFocus: boolean = false;
  errorMessage: any = {
    checkFirstName: '',
    checkLastName: '',
    checkMiddleName: '',
    checkSuffixName: '',
    fullPayeeName: ''
  };

  @Input() parent: FormGroup = this.fb.group({});
  @Input()
  set isInstitution(e) {
    this._isInstitution = e;
  }
  get isInstitution(): boolean {
    return this._isInstitution;
  }
  private _isInstitution = false;
  private _validationSetting: Map<string, ValidationSettings> = new Map<string, ValidationSettings>([
    ['fullPayeeName',
      {
        messageText: 'Full Payee Name',
        maxCharacters: '34',
        correctFormat: 'letters, and/or special characters of (-  ,   /  \'  &)'
      }
    ],
    ['checkFirstName',
      {
        messageText: 'First Name',
        maxCharacters: '13',
        correctFormat: 'letters, and/or special characters of (-  ,   /  \'  &)'
      }
    ],
    ['checkLastName',
      {
        messageText: 'Last Name',
        maxCharacters: '20',
        correctFormat: 'letters, and/or special characters of (-  ,   /  \'  &)'
      }
    ],
    ['checkMiddleName',
      {
        messageText: 'Middle Initial',
        maxCharacters: '1',
        correctFormat: 'letters'
      }
    ],
    ['checkSuffixName',
      {
        messageText: 'Suffix',
        maxCharacters: '3',
        correctFormat: 'letters'
      }
    ]
  ]);

  constructor(
    public state: CheckDetailState,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onInputFocus(formControlName: string): void {
    if (formControlName === 'checkFirstName') {
      this.hasCheckFirstNameFocus = true;
    } else if (formControlName === 'checkLastName') {
      this.hasCheckLastNameFocus = true;
    } else if (formControlName === 'fullPayeeName') {
      this.hasFullPayeeNameFocus = true;
    } else if (formControlName === 'checkMiddleName') {
      this.hasMiddleNameFocus = true;
    } else if (formControlName === 'checkSuffixName') {
      this.hasCheckSuffixNameFocus = true;
    }
  }

  onInputBlur(formControlName: string): void {
    if (formControlName === 'checkFirstName') {
      this.hasCheckFirstNameFocus = false;
    } else if (formControlName === 'checkLastName') {
      this.hasCheckLastNameFocus = false;
    } else if (formControlName === 'fullPayeeName') {
      this.hasFullPayeeNameFocus = false;
    } else if (formControlName === 'checkMiddleName') {
      this.hasMiddleNameFocus = false;
    } else if (formControlName === 'checkSuffixName') {
      this.hasCheckSuffixNameFocus = false;
    }
  }

  getInstitutionValue(): string {
    if (!this.state.checkDetails) {
      return 'No';
    }
    return this.state.checkDetails.payee ? 'Yes' : 'No';
  }

  displayValidation(formControl?: string): boolean {
    if (formControl) {
      const validationSettings = this.getValidationSettings(formControl);
      if (this.parent.get(`checkName.${formControl}`)!.hasError('required') && this.parent.get(`checkName.${formControl}`)!.touched) {
        this.errorMessage[`${formControl}`] = `${validationSettings!.messageText} is required`;
        return true;
      } else if (this.parent.get(`checkName.${formControl}`)!.hasError('pattern')) {
        this.errorMessage[`${formControl}`] = `${validationSettings!.messageText} incorrect format. Please use: ${validationSettings!.correctFormat}.`;
        return true;
      } else if (this.parent.get(`checkName.${formControl}`)!.hasError('maxlength')) {
        this.errorMessage[`${formControl}`] = `${validationSettings!.messageText} max length of ${validationSettings!.maxCharacters} characters allowed.`;
        return true;
      }
    }
    return false;
  }

  getValidationSettings(setting: string): ValidationSettings | undefined {
    if (this._validationSetting) {
      return this._validationSetting.get(setting);
    }
  }
}
