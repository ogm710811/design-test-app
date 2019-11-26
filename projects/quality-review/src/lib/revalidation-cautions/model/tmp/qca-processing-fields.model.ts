import { StringUtils } from '../../../services/string-utils.service';
import { QcaAllErrors } from './qca-all-errors.model';

/**
 * Model class QcaProcessingFields
 * Path: screenbean/qltyrvwrvldcauti/tmp
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::tmp::QcaProcessingFields
 * Legacy Mapping: QCA-PROCESSING-FIELDS
 */
export class QcaProcessingFields {
  qcaCommand = '';
  qcaProcessingInd = '';
  qcaQualityClaimNo = 0;
  qcaClaimRrdsRrn = 0;
  qcaClaimSub = 0;
  qcaErrorMessageFor75 = '';
  qcaLockedDb = '';
  qcaUpdateRequest = '';
  qcaAllErrors = new QcaAllErrors();
  filler49 = '';

  public isQualityCommand(): boolean {
    let qualityCommand = false;
    let initValue: string = '';
    //
    initValue = 'QR';
    //
    qualityCommand = StringUtils.trim(this.qcaCommand) === initValue;
    return qualityCommand;
  }

  public setQualityCommand(): void {
    let initValue: string = '';
    //
    initValue = 'QR';
    //
    this.qcaCommand = initValue;
  }

  public isRevalCommand(): boolean {
    let revalCommand = false;
    let initValue: string = '';
    //
    initValue = 'QQ';
    //
    revalCommand = StringUtils.trim(this.qcaCommand) === initValue;
    return revalCommand;
  }

  public setRevalCommand(): void {
    let initValue: string = '';
    //
    initValue = 'QQ';
    //
    this.qcaCommand = initValue;
  }

  public isQualityReview(): boolean {
    let qualityReview = false;
    let initValue: string = '';
    //
    initValue = 'Q';
    //
    qualityReview = StringUtils.trim(this.qcaProcessingInd) === initValue;
    return qualityReview;
  }

  public setQualityReview(): void {
    let initValue: string = '';
    //
    initValue = 'Q';
    //
    this.qcaProcessingInd = initValue;
  }

  public isRevalidation(): boolean {
    let revalidation = false;
    let initValue: string = '';
    //
    initValue = 'R';
    //
    revalidation = StringUtils.trim(this.qcaProcessingInd) === initValue;
    return revalidation;
  }

  public setRevalidation(): void {
    let initValue: string = '';
    //
    initValue = 'R';
    //
    this.qcaProcessingInd = initValue;
  }

  public isQualityErrorCorrection(): boolean {
    let qualityErrorCorrection = false;
    let initValue: string = '';
    //
    initValue = 'E';
    //
    qualityErrorCorrection = StringUtils.trim(this.qcaProcessingInd) === initValue;
    return qualityErrorCorrection;
  }

  public setQualityErrorCorrection(): void {
    let initValue: string = '';
    //
    initValue = 'E';
    //
    this.qcaProcessingInd = initValue;
  }

  public isRevalErrorCorrection(): boolean {
    let revalErrorCorrection = false;
    let initValue: string = '';
    //
    initValue = 'V';
    //
    revalErrorCorrection = StringUtils.trim(this.qcaProcessingInd) === initValue;
    return revalErrorCorrection;
  }

  public setRevalErrorCorrection(): void {
    let initValue: string = '';
    //
    initValue = 'V';
    //
    this.qcaProcessingInd = initValue;
  }

  public isApprove(): boolean {
    let approve = false;
    let initValue: string = '';
    //
    initValue = 'A';
    //
    approve = StringUtils.trim(this.qcaUpdateRequest) === initValue;
    return approve;
  }

  public setApprove(): void {
    let initValue: string = '';
    //
    initValue = 'A';
    //
    this.qcaUpdateRequest = initValue;
  }

  public isSuspend(): boolean {
    let suspend = false;
    let initValue: string = '';
    //
    initValue = 'S';
    //
    suspend = StringUtils.trim(this.qcaUpdateRequest) === initValue;
    return suspend;
  }

  public setSuspend(): void {
    let initValue: string = '';
    //
    initValue = 'S';
    //
    this.qcaUpdateRequest = initValue;
  }

  public isBypass(): boolean {
    let bypass = false;
    let initValue: string = '';
    //
    initValue = 'B';
    //
    bypass = StringUtils.trim(this.qcaUpdateRequest) === initValue;
    return bypass;
  }

  public setBypass(): void {
    let initValue: string = '';
    //
    initValue = 'B';
    //
    this.qcaUpdateRequest = initValue;
  }

  public isExpress(): boolean {
    let express = false;
    let initValue: string = '';
    //
    initValue = 'E';
    //
    express = StringUtils.trim(this.qcaUpdateRequest) === initValue;
    return express;
  }

  public setExpress(): void {
    let initValue: string = '';
    //
    initValue = 'E';
    //
    this.qcaUpdateRequest = initValue;
  }

  public isPf1Return(): boolean {
    let pf1Return = false;
    let initValue: string = '';
    //
    initValue = 'R';
    //
    pf1Return = StringUtils.trim(this.qcaUpdateRequest) === initValue;
    return pf1Return;
  }

  public setPf1Return(): void {
    let initValue: string = '';
    //
    initValue = 'R';
    //
    this.qcaUpdateRequest = initValue;
  }

  public isRevalApprove(): boolean {
    let revalApprove = false;
    let initValue: string = '';
    //
    initValue = 'V';
    //
    revalApprove = StringUtils.trim(this.qcaUpdateRequest) === initValue;
    return revalApprove;
  }

  public setRevalApprove(): void {
    let initValue: string = '';
    //
    initValue = 'V';
    //
    this.qcaUpdateRequest = initValue;
  }

  public isRevalSuspend(): boolean {
    let revalSuspend = false;
    let initValue: string = '';
    //
    initValue = 'P';
    //
    revalSuspend = StringUtils.trim(this.qcaUpdateRequest) === initValue;
    return revalSuspend;
  }

  public setRevalSuspend(): void {
    let initValue: string = '';
    //
    initValue = 'P';
    //
    this.qcaUpdateRequest = initValue;
  }
}
