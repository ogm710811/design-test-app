import {Component, NgZone, OnInit} from '@angular/core';

@Component({
  selector: 'fox-provider-validation',
  templateUrl: './provider-validation.component.html',
  styleUrls: ['./provider-validation.component.css']
})
export class ProviderValidationComponent implements OnInit {

  isNameCopied: boolean = false;
  isAddrLine1Copied: boolean = false;
  isAddrLine2Copied: boolean = false;
  isCityCopied: boolean = false;
  isStateCopied: boolean = false;
  isZipCopied: boolean = false;
  isTinCopied: boolean = false;
  isNpiCopied: boolean = false;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
  }

  clearCopied(): void {
    this.isAddrLine1Copied = false;
    this.isAddrLine2Copied = false;
    this.isCityCopied = false;
    this.isStateCopied = false;
    this.isZipCopied = false;
    this.isTinCopied = false;
    this.isNpiCopied = false;
  }

  copyName(): void {
    this.isNameCopied = true;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.isNameCopied = false;
        });
      }, 3000);
    });
  }

  copyAddr1(): void {
    this.isAddrLine1Copied = true;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.isAddrLine1Copied = false;
        });
      }, 3000);
    });
  }

  copyAddr2(): void {
    this.isAddrLine2Copied = true;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.isAddrLine2Copied = false;
        });
      }, 3000);
    });
  }

  copyCity(): void {
    this.isCityCopied = true;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.isCityCopied = false;
        });
      }, 3000);
    });
  }

  copyState(): void {
    this.isStateCopied = true;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.isStateCopied = false;
        });
      }, 3000);
    });
  }

  copyZip(): void {
    this.isZipCopied = true;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.isZipCopied = false;
        });
      }, 3000);
    });
  }

  copyTin(): void {
    this.isTinCopied = true;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.isTinCopied = false;
        });
      }, 3000);
    });
  }

  copyNpi(): void {
    this.isNpiCopied = true;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.isNpiCopied = false;
        });
      }, 3000);
    });
  }

}
