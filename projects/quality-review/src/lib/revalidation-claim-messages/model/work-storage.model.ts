import {
  BLTempStorQueue,
  HdrMessageSegPO,
  Oprec1Record,
  ProviderInfoLnkArea,
  QualityReviewRecord
} from '@fox/shared';
// import { HdrMessageSegPO } from '../../common/pos/hdr-message-seg-po.model';
// import { ProviderInfoLnkArea } from '../rtrvprovinfo/provider-info-lnk-area.model';
import {WsPgmTsqRec} from './ws-pgm-tsq-rec.model';

/**
 * Model class WorkStorage
 * Path: screenbean/qltyrvwrvldclmmsg
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvldclmmsg::WorkStorage
 * Legacy Mapping: WS-PGM-TSQ-REC
 */
export class WorkStorage {
  tsqSub = 0;
  wsTsqItemno = 0;
  wsFldAtr = false;
  bLTempStorQueue = new BLTempStorQueue();
  hdrMessageSeg = new HdrMessageSegPO();
  wsR78Termid = '';
  commandEnteredInd = '';
  claimLevelMsgInd = '';
  doneSw = '';
  firstTimeTroughSw = '';
  sub3 = 0;
  setDenialPrompInd = '';
  suba = 0;
  subb = 0;
  sub1 = 0;
  sub2 = 0;
  ws69609Cnt = 0;
  ws69600Sub = 0;
  ws69609Sub = 0;
  ws69600Cnt = 0;
  wsCursorPosInd = '';
  wsDataEnteredInd = '';
  wsErrInd = '';
  wsInvalidKeyInd = '';
  wsReturnPgm = '';
  wsTempCnt = 0;
  wsPgmTsqRec = new WsPgmTsqRec();
  wsValidPgm = '';
  tsqNumitems = 0;
  wsTsqEobTermid = '';
  wsTsqEobScreen = '';
  wsPgmTsqTermid = '';
  wsPgmId = '';
  wsR56Termid = '';
  wsTempText2 = '';
  wsTempText3 = '';
  wsTempText1 = '';
  wsTempText4 = '';
  wsPpNumbers: number[] = [];
  qualityReviewRecord = new QualityReviewRecord();
  wsCharIn = '';
  wsPatIdEdit = '';
  wsPatId = '';
  wsCharOut = '';
  wsTempSysGenInd = '';
  wsTempPpId = 0;
  wsTempSmInd = '';
  t2SysGenInd: string[] = [];
  t2Sub = 0;
  t2PpId: number[] = [];
  t2SmInd: number[] = [];
  m78PpIdA1 = false;
  m78PpIdA2 = false;
  m78PpIdA3 = false;
  m78PpIdA4 = false;
  m78PpIdA5 = false;
  m78PpIdA6 = false;
  m78PpIdA7 = false;
  m78Cmnda = false;
  m78Mem1a = false;
  m78Mem2a = false;
  m78Mem3a = false;
  m78Cno1a = false;
  m78Cno2a = false;
  m78Cno3a = false;
  m78Cno4a = false;
  m78Cno5a = false;
  m78Cno6a = false;
  m78Com1a = false;
  m78Com2a = false;
  m78ClaimIdA = false;
  m78ScrnHdrA = false;
  m78QnumA = false;
  m78PatntIdA = false;
  m78PpSel01A = false;
  m78PpSel02A = false;
  m78ClmNoteA = false;
  m78MbrIdA = false;
  m78MbrNameA = false;
  m78MbrStA = false;
  m78ProvNameA = false;
  m78ProvAddr1A = false;
  m78ProvAddr2A = false;
  m78ProvAddr3A = false;
  m78TinIdA = false;
  m78InpIdA = false;
  m78AsgnHdrA = false;
  m78AccptCdA = false;
  m78Err1A = false;
  m78PpIdA = false;
  m78Sm1TextA1 = false;
  m78Sm1TextA2 = false;
  m78Sm1TextA3 = false;
  m78Sm1TextA4 = false;
  m78Sm2TextA1 = false;
  m78Sm2TextA2 = false;
  m78Sm2TextA3 = false;
  m78Sm2TextA4 = false;
  m78Err1Msg = false;
  wsTempSmNum = 0;
  wsTempNumPp = 0;
  dfhenter = false;
  dfhpf1 = false;
  providerInfoLnkArea = new ProviderInfoLnkArea();
  dfhpf6 = false;
  oprec1Record = new Oprec1Record();

  public isSetDenialPromp(): boolean {
    let setDenialPromp = false;
    //
    setDenialPromp = 'Y' === this.setDenialPrompInd.trim();
    return setDenialPromp;
  }

  public isFirstTimeTrough(): boolean {
    let firstTimeTrough = false;
    //
    firstTimeTrough = 'Y' === this.firstTimeTroughSw.trim();
    return firstTimeTrough;
  }

  public isClaimLevelMsgFound(): boolean {
    let claimLevelMsgFound = false;
    //
    claimLevelMsgFound = 'Y' === this.claimLevelMsgInd.trim();
    return claimLevelMsgFound;
  }

  public isDone(): boolean {
    let done = false;
    //
    done = 'Y' === this.doneSw.trim();
    return done;
  }

  public isSpotFound(): boolean {
    let spotFound = false;
    //
    spotFound = 'F' === this.wsCursorPosInd.trim();
    return spotFound;
  }

  public setFirstTimeTrough(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.firstTimeTroughSw = initValue;
  }

  public setDone(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.doneSw = initValue;
  }

  public setSetDenialPromp(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.setDenialPrompInd = initValue;
  }

  public setSpotFound(): void {
    let initValue: string = '';
    //
    initValue = 'F';
    //
    this.wsCursorPosInd = initValue;
  }

  public setClaimLevelMsgFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.claimLevelMsgInd = initValue;
  }

  public setValidPgm(): void {
    let initValue: string = '';
    //
    initValue = 'RPD06O54';
    //
    this.wsValidPgm = initValue;
  }

  public isValidPgm(): boolean {
    let validPgm = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    let cEnableValue_2 = '';
    let cEnableValue_3 = '';
    //
    cEnableValue_0 = 'RPD06O54';
    //
    cEnableValue_1 = 'RPD06O78';
    //
    cEnableValue_2 = 'RPD06O56';
    //
    cEnableValue_3 = 'RPD06O76';
    //
    validPgm = (cEnableValue_0 === this.wsValidPgm || cEnableValue_1 === this.wsValidPgm || cEnableValue_2 === this.wsValidPgm || cEnableValue_3 === this.wsValidPgm);
    return validPgm;
  }

  public setValidPatChar(): void {
    let initValue: string = '';
    //
    initValue = '0';
    //
    this.wsPatIdEdit = initValue;
  }

  public isValidPatChar(): boolean {
    let validPatChar = false;
    let cEnableValue_0_cMin = '';
    let cEnableValue_0_cMax = '';
    let cEnableValue_1_cMin = '';
    let cEnableValue_1_cMax = '';
    let cEnableValue_2_cMin = '';
    let cEnableValue_2_cMax = '';
    let cEnableValue_3_cMin = '';
    let cEnableValue_3_cMax = '';
    let cEnableValue_4_cMin = '';
    let cEnableValue_4_cMax = '';
    let cEnableValue_5_cMin = '';
    let cEnableValue_5_cMax = '';
    let cEnableValue_6_cMin = '';
    let cEnableValue_6_cMax = '';
    let cEnableValue_7 = '';
    let cEnableValue_8 = '';
    let cEnableValue_9 = '';
    let cEnableValue_10 = '';
    let cEnableValue_11 = '';
    let cEnableValue_12 = '';
    let cEnableValue_13 = '';
    let cEnableValue_14 = '';
    let cEnableValue_15 = '';
    let cEnableValue_16 = '';
    let cEnableValue_17 = '';
    let cEnableValue_18 = '';
    let cEnableValue_19 = '';
    let cEnableValue_20 = '';
    let cEnableValue_21 = '';
    let cEnableValue_22 = '';
    let cEnableValue_23 = '';
    let cEnableValue_24 = '';
    let cEnableValue_25 = '';
    let cEnableValue_26 = '';
    let cEnableValue_27 = '';
    let cEnableValue_28 = '';
    let cEnableValue_29 = '';
    let cEnableValue_30 = '';
    let cEnableValue_31 = '';
    let cEnableValue_32 = '';
    let cEnableValue_33 = '';
    let cEnableValue_34 = '';
    let cEnableValue_35 = '';
    let cEnableValue_36 = '';
    let cEnableValue_37 = '';
    let cEnableValue_38 = '';
    let cEnableValue_39 = '';
    //
    cEnableValue_0_cMin = '0';
    //
    cEnableValue_0_cMax = '9';
    //
    cEnableValue_1_cMin = 'A';
    //
    cEnableValue_1_cMax = 'I';
    //
    cEnableValue_2_cMin = 'J';
    //
    cEnableValue_2_cMax = 'R';
    //
    cEnableValue_3_cMin = 'S';
    //
    cEnableValue_3_cMax = 'Z';
    //
    cEnableValue_4_cMin = 'a';
    //
    cEnableValue_4_cMax = 'i';
    //
    cEnableValue_5_cMin = 'j';
    //
    cEnableValue_5_cMax = 'r';
    //
    cEnableValue_6_cMin = 's';
    //
    cEnableValue_6_cMax = 'z';
    //
    cEnableValue_7 = ' ';
    //
    cEnableValue_8 = '!';
    //
    cEnableValue_9 = '"';
    //
    cEnableValue_10 = '&';
    //
    cEnableValue_11 = 'QUOTE';
    //
    cEnableValue_12 = ')';
    //
    cEnableValue_13 = '(';
    //
    cEnableValue_14 = '*';
    //
    cEnableValue_15 = '+';
    //
    cEnableValue_16 = ',';
    //
    cEnableValue_17 = '-';
    //
    cEnableValue_18 = '.';
    //
    cEnableValue_19 = '/';
    //
    cEnableValue_20 = ':';
    //
    cEnableValue_21 = ';';
    //
    cEnableValue_22 = '?';
    //
    cEnableValue_23 = '=';
    //
    cEnableValue_24 = '%';
    //
    cEnableValue_25 = '~';
    //
    cEnableValue_26 = '@';
    //
    cEnableValue_27 = '�';
    //
    cEnableValue_28 = '?';
    //
    cEnableValue_29 = '_';
    //
    cEnableValue_30 = '{';
    //
    cEnableValue_31 = '}';
    //
    cEnableValue_32 = '\\';
    //
    cEnableValue_33 = '|';
    //
    cEnableValue_34 = '>';
    //
    cEnableValue_35 = '<';
    //
    cEnableValue_36 = '�';
    //
    cEnableValue_37 = '`';
    //
    cEnableValue_38 = '#';
    //
    cEnableValue_39 = '$';
    //
    validPatChar = ((cEnableValue_0_cMin <= this.wsPatIdEdit && cEnableValue_0_cMax >= this.wsPatIdEdit) || (cEnableValue_1_cMin <= this.wsPatIdEdit && cEnableValue_1_cMax >= this.wsPatIdEdit) || (cEnableValue_2_cMin <= this.wsPatIdEdit && cEnableValue_2_cMax >= this.wsPatIdEdit) || (cEnableValue_3_cMin <= this.wsPatIdEdit && cEnableValue_3_cMax >= this.wsPatIdEdit) || (cEnableValue_4_cMin <= this.wsPatIdEdit && cEnableValue_4_cMax >= this.wsPatIdEdit) || (cEnableValue_5_cMin <= this.wsPatIdEdit && cEnableValue_5_cMax >= this.wsPatIdEdit) || (cEnableValue_6_cMin <= this.wsPatIdEdit && cEnableValue_6_cMax >= this.wsPatIdEdit) || cEnableValue_7 === this.wsPatIdEdit || cEnableValue_8 === this.wsPatIdEdit || cEnableValue_9 === this.wsPatIdEdit || cEnableValue_10 === this.wsPatIdEdit || cEnableValue_11 === this.wsPatIdEdit || cEnableValue_12 === this.wsPatIdEdit || cEnableValue_13 === this.wsPatIdEdit || cEnableValue_14 === this.wsPatIdEdit || cEnableValue_15 === this.wsPatIdEdit || cEnableValue_16 === this.wsPatIdEdit || cEnableValue_17 === this.wsPatIdEdit || cEnableValue_18 === this.wsPatIdEdit || cEnableValue_19 === this.wsPatIdEdit || cEnableValue_20 === this.wsPatIdEdit || cEnableValue_21 === this.wsPatIdEdit || cEnableValue_22 === this.wsPatIdEdit || cEnableValue_23 === this.wsPatIdEdit || cEnableValue_24 === this.wsPatIdEdit || cEnableValue_25 === this.wsPatIdEdit || cEnableValue_26 === this.wsPatIdEdit || cEnableValue_27 === this.wsPatIdEdit || cEnableValue_28 === this.wsPatIdEdit || cEnableValue_29 === this.wsPatIdEdit || cEnableValue_30 === this.wsPatIdEdit || cEnableValue_31 === this.wsPatIdEdit || cEnableValue_32 === this.wsPatIdEdit || cEnableValue_33 === this.wsPatIdEdit || cEnableValue_34 === this.wsPatIdEdit || cEnableValue_35 === this.wsPatIdEdit || cEnableValue_36 === this.wsPatIdEdit || cEnableValue_37 === this.wsPatIdEdit || cEnableValue_38 === this.wsPatIdEdit || cEnableValue_39 === this.wsPatIdEdit);
    return validPatChar;

  }
}
