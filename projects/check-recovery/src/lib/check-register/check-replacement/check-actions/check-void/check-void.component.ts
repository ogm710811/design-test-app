import {
  Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'fox-check-void',
  templateUrl: './check-void.component.html',
  styleUrls: ['./check-void.component.css']
})
export class CheckVoidComponent implements OnInit {
  dropdownOptionsForReplaceReason = [
    {value: 1, label: '1. Lost Check'},
    {value: 2, label: '2. Deceased insured'},
    {value: 3, label: '3. Account Paid in Full'},
    {value: 4, label: '4. Stale-dated'},
    {value: 5, label: '5. Incorrect payee'},
    {value: 6, label: '6. Overpayment'},
    {value: 7, label: '7. Incorrect Address'},
    {value: 8, label: '8. Wrong provider'},
    {value: 9, label: '9. Damaged check'},
    {value: 10, label: '10. Assignment of Benefits Received'},
    {value: 11, label: '11. Survey Letter'},
    {value: 12, label: '12. Other'}
  ];
  dropdownOptionsForCheck = [
    {value: 1, label: 'No'},
    {value: 2, label: 'Yes'},
  ];

  @Input() parent: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
}
