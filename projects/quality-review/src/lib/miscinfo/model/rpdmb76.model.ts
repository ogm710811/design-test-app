/**
 * Model class Rpdmb76
 * Path: screenbean/qltyrvwrvldmiscinfo
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvldmiscinfo::Rpdmb76
 */
export class Rpdmb76 {
  [key: string]: any;
  m76cmnd = '';
  m76mem1 = '';
  m76mem2 = '';
  m76mem3 = '';
  m76cno1 = '';
  m76cno2 = '';
  m76cno3 = '';
  m76cno4 = '';
  m76cno5 = '';
  m76cno6 = '';
  m76com1 = '';
  m76com2 = '';
  m76cn = '';
  m76qlit = '';
  m76qn = '';
  // Member Number
  m76mem = '';
  // Name
  m76ins1 = '';
  m76pln1 = '';
  // Street Address
  m76ins2 = '';
  m76pln2 = '';
  // City, State, Zip
  m76ins3 = '';
  m76pln3 = '';
  m76ins4 = '';
  m76pln4 = '';
  m76ins5 = '';
  m76pln5 = '';
  m76ddl = '';
  m76dead = '';
  m76spal = '';
  m76spa = '';
  m76exam = '';
  m76appl = '';
  m76appr = '';
  m76blsm = '';
  m76clsm = '';
  m76assg = '';
  m76blms = '';
  m76clms = '';

  // Quality Errors
  m76ero1 = '';
  m76ero2 = '';
  m76ero3 = '';
  m76ero4 = '';
  m76ero5 = '';

  // Most Recent
  m76err1 = '';
  m76err2 = '';
  m76err3 = '';
  m76err4 = '';
  m76err5 = '';

  // Quality Reasons
  m76rea1 = '';
  m76rea2 = '';
  m76rea3 = '';
  m76rea4 = '';
  m76rea5 = '';
  m76rea6 = '';
  // Insured Note (1 & 2 ???)
  m76in1 = '';
  m76in2 = '';
  // Quality Reply
  m76repa = '';
  m76repl = '';
  m76elit = '';
  // QR Error Codes 1-5
  m76qer1 = '';
  m76qer2 = '';
  m76qer3 = '';
  m76qer4 = '';
  m76qer5 = '';
  // Quality Date
  m76qdat = '';
  // Location
  m76qloc = '';
  // Quality Number
  m76qnum = '';
  // IONs ID
  m76qion = '';
  m76erml = '';
  // Error Removal
  m76erem = '';
  m76line = '';
  m76err = '';
  m76pfs = '';
  m76pf1 = '';
  m76pf2 = '';
  m76pf3 = '';
  m76pf5 = '';
  m76pf7 = '';
  m76pf8 = '';
  m76pf9 = '';

  public setErrCustom(string: string, index: number): void {
    /*

    check index and set value into the error corresponding to the index
    */
    switch (index) {
      case 1:
        this.m76err1 = string;
        break;
      case 2:
        this.m76err2 = string;
        break;

      case 3:
        this.m76err3 = string;
        break;

      case 4:
        this.m76err4 = string;
        break;
      case 5:
        this.m76err5 = string;
        break;
      default:
        break;
    }
  }

  public getErrCustom(index: number): string {
    let ret = '';
    /*

    check index and return  value of the error corresponding to the index
    */

    switch (index) {
      case 1:
        ret = this.m76err1;
        break;
      case 2:
        ret = this.m76err2;
        break;
      case 3:
        ret = this.m76err3;
        break;
      case 4:
        ret = this.m76err4;
        break;
      case 5:
        ret = this.m76err5;
        break;
      default:
        ret = '';
        break;
    }

    return ret;
  }

  public setQErrCustom(string: string, index: number): void {
    /*

    check index and set value into the error corresponding to the index
    */
    switch (index) {
      case 1:
        this.m76qer1 = string;
        break;
      case 2:
        this.m76qer2 = string;
        break;
      case 3:
        this.m76qer3 = string;
        break;
      case 4:
        this.m76qer4 = string;
        break;
      case 5:
        this.m76qer5 = string;
        break;
      default:
        break;
    }
  }

  public getQErrCustom(index: number): string {
    let ret = '';
    /*

    check index and return  value of the error corresponding to the index
    */

    switch (index) {
      case 1:
        ret = this.m76qer1;
        break;
      case 2:
        ret = this.m76qer2;
        break;

      case 3:
        ret = this.m76qer3;
        break;
      case 4:
        ret = this.m76qer4;
        break;
      case 5:
        ret = this.m76qer5;
        break;
      default:
        ret = '';
        break;
    }

    return ret;
  }

  public setReasonCustom(string: string, index: number): void {
    switch (index) {
      case 1:
        this.m76rea1 = string;
        break;
      case 2:
        this.m76rea2 = string;
        break;
      case 3:
        this.m76rea3 = string;
        break;
      case 4:
        this.m76rea4 = string;
        break;
      case 5:
        this.m76rea5 = string;
        break;
      case 6:
        this.m76rea6 = string;
        break;
      default:
        break;
    }
  }

  public getReasonCustom(index: number): string {
    let ret = '';

    switch (index) {
      case 1:
        ret = this.m76rea1;
        break;
      case 2:
        ret = this.m76rea2;
        break;
      case 3:
        ret = this.m76rea3;
        break;
      case 4:
        ret = this.m76rea4;
        break;
      case 5:
        ret = this.m76rea5;
        break;
      case 6:
        ret = this.m76rea6;
        break;
      default:
        ret = '';
        break;
    }
    return ret;
  }

  public setEroCustom(string: string, index: number): void {
    switch (index) {
      case 1:
        this.m76ero1 = string;
        break;
      case 2:
        this.m76ero2 = string;
        break;
      case 3:
        this.m76ero3 = string;
        break;
      case 4:
        this.m76ero4 = string;
        break;
      case 5:
        this.m76ero5 = string;
        break;
      default:
        break;
    }
  }

  public getEroCustom(index: number): string {
    let ret = '';

    switch (index) {
      case 1:
        ret = this.m76ero1;
        break;
      case 2:
        ret = this.m76ero2;
        break;
      case 3:
        ret = this.m76ero3;
        break;
      case 4:
        ret = this.m76ero4;
        break;
      case 5:
        ret = this.m76ero5;
        break;
      default:
        ret = '';
        break;
    }
    return ret;
  }
}
