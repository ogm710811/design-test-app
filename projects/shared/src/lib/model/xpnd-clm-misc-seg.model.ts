import {XpndClmMiscSegCommunNoPtr} from './xpnd-clm-misc-seg-commun-no-ptr.model';
import {XpndClmMiscSegSuspReasonCodes} from './xpnd-clm-misc-seg-susp-reason-codes.model';

/**
 * Model class XpndClmMiscSeg
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::XpndClmMiscSeg
 * Legacy Mapping: EX-CLAIM-MISC-SEG
 */
export class XpndClmMiscSeg {
  communNoPtrs: XpndClmMiscSegCommunNoPtr[] = [];
  prevPtr = 0;
  basicPtr = 0;
  patientNumber = '';
  crossReferenceNos: number[] = [];
  approvalCode = 0;
  suspenseDate = 0;
  suspReasonCodes = new XpndClmMiscSegSuspReasonCodes();
  icdCodes: string[] = [];
  icd10Ind = '';
  altAddrPtr = 0;
  aarecPtr = 0;
  aftrTrmXcludedIndLs: string[] = [];
  filler = '';
}
