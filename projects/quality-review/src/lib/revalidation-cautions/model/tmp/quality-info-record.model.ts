import { StringUtils } from '../../../services/string-utils.service';
import { QirClaimInformation } from './qir-claim-information.model';
import { QirMaintInformation } from './qir-maint-information.model';
import { QirQualityInformation } from './qir-quality-information.model';
import { QirRevalInformation } from './qir-reval-information.model';

/**
 * Model class QualityInfoRecord
 * Path: screenbean/qltyrvwrvldcauti/tmp
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::tmp::QualityInfoRecord
 * Legacy Mapping: QUALITY-INFO-RECORD
 */
export class QualityInfoRecord {
  qirClaimInformation = new QirClaimInformation();
  qirQualityInformation = new QirQualityInformation();
  qirRevalInformation = new QirRevalInformation();
  qirMaintInformation = new QirMaintInformation();
  qirDenialMsgIndicator = '';
  filler79 = '';

  public isQirNoDenialMessage(): boolean {
    let qirNoDenialMessage = false;
    let initValue: string = '';
    //
    initValue = ' ';
    //
    qirNoDenialMessage = StringUtils.trim(this.qirDenialMsgIndicator) === initValue;
    return qirNoDenialMessage;
  }

  public setQirNoDenialMessage(): void {
    let initValue: string = '';
    //
    initValue = ' ';
    //
    this.qirDenialMsgIndicator = initValue;
  }

  public isQirSystemGenerated(): boolean {
    let qirSystemGenerated = false;
    let initValue: string = '';
    //
    initValue = 'S';
    //
    qirSystemGenerated = StringUtils.trim(this.qirDenialMsgIndicator) === initValue;
    return qirSystemGenerated;
  }

  public setQirSystemGenerated(): void {
    let initValue: string = '';
    //
    initValue = 'S';
    //
    this.qirDenialMsgIndicator = initValue;
  }

  public isQirExaminerPromptY(): boolean {
    let qirExaminerPromptY = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    qirExaminerPromptY = StringUtils.trim(this.qirDenialMsgIndicator) === initValue;
    return qirExaminerPromptY;
  }

  public setQirExaminerPromptY(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.qirDenialMsgIndicator = initValue;
  }

  public isQirExaminerPromptN(): boolean {
    let qirExaminerPromptN = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    qirExaminerPromptN = StringUtils.trim(this.qirDenialMsgIndicator) === initValue;
    return qirExaminerPromptN;
  }

  public setQirExaminerPromptN(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.qirDenialMsgIndicator = initValue;
  }
}
