import { QltyRvwRvldClmMsg } from './qlty-rvw-rvld-clm-msg.model';

/**
 * Model class WsPgmTsqRec
 * Path: screenbean/qltyrvwrvldclmmsg
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvldclmmsg::WsPgmTsqRec
 * Legacy Mapping: WS-PGM-TSQ-REC
 */
export class WsPgmTsqRec {
  t1CallingPgm = '';
  t1UctranstSaved = 0;
  t1Pf1Confirm = '';
  t1ScrnCngInd = '';
  t1MbrId = '';
  t1ClaimId = '';
  t1LinkLen = 0;
  t1ReturnPgm = '';
  t1PatientNumber = '';
  t1ProcessingInd = '';
  t1Sub1 = 0;
  t1BlPpCnt = 0;
  t1ClPpCnt = 0;
  t1BlNum = 0;
  t1ClmPpSmCnt = 0;
  t1PpId: number[] = [];
  t1PpIdAtr: boolean[] = [];
  t1SysGenPp: string[] = [];
  t1PpSource: string[] = [];
  t1SaveScreen = new QltyRvwRvldClmMsg();
  t1Sm1PpEntryNum = 0;
  t1Sm2PpEntryNum = 0;

  public isT1ScrnChanged(): boolean {
    let t1ScrnChanged = false;
    let initValue: string = '';

    initValue = 'Y';

    t1ScrnChanged = initValue === this.t1ScrnCngInd.trim();
    return t1ScrnChanged;
  }

  public setT1ScrnChanged(): void {
    let initValue: string = '';

    initValue = 'Y';

    this.t1ScrnCngInd = initValue;
  }
}
