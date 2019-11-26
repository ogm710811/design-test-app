import {AfterViewChecked, Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ReadOnlyTypeEnum} from '@fox/shared';

@Component({
  selector: 'fox-fox-input-demo',
  templateUrl: './fox-input-demo.component.html',
  styleUrls: ['./fox-input-demo.component.css']
})
export class FoxInputDemoComponent implements AfterViewChecked {

  defaultPlaceholderText = 'Test 123';
  boundLabel = 'Text box with a bound value';
  firstValue = 'Bound to happen';
  secondValue = 'Bound to happen2 - electric boogaloo';
  defaultAssistiveText = 'It\'s tough to go it alone, take this text!';
  defaultExtraText = 'yes, again';
  fc: FormControl;
  datefc: FormControl;
  datestr;
  datestrMMDD;
  currfc: FormControl;
  currstr;
  memfc: FormControl;
  memstr;
  clmfc: FormControl;
  clmstr;
  dateRangeFc: FormControl;
  phone: FormControl;
  zipcode: FormControl;
  checknumber: FormControl;
  inputReadOnly = 0;
  types = ReadOnlyTypeEnum;
  readOnleyObject = {
    field1: {
      label: 'Claim #',
      value: 10234567891
    },
    field2: {
      label: 'Read only long',
      value: 'read only value read only value read only value read only value'
    },
    field3: {
      label: 'Label with Icon',
      value: 'Plan Name',
      plans: ['P1', 'P2', 'P3']
    },
    field4: {
      label: 'Read only long',
      value: 'read only value read only value read only value read only value'
    },
    field5: {
      label: 'Read only date',
      value: '12/12/2012'
    },
    field6: {
      label: 'Read only Currency',
      value: '23,000'
    },
    field7: {
      label: 'Read Number',
      value: 12
    },
    field8: {
      label: 'Member #',
      value: 123456789
    }
};

  constructor(fb: FormBuilder) {
    this.fc = fb.control('I like Star Wars');
    this.datefc = fb.control(null);
    this.currfc = fb.control(355.33);
    this.memfc = fb.control('12345678911');
    this.clmfc = fb.control('123451234561');
    this.dateRangeFc = fb.control(null);
    this.phone = fb.control(null);
    this.zipcode = fb.control(null, [Validators.minLength(5), Validators.maxLength(9)]);
    this.checknumber = fb.control(null);
  }

  ngAfterViewChecked(): void {
    if (this.inputReadOnly === 0) {
      this.inputReadOnly = 3334445;
    }
  }
}
