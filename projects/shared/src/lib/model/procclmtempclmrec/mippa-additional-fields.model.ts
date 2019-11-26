import {MippaBillLine} from './mippa-bill-line.model';

/**
 * Model class MippaAdditionalFields
 * Path: bean/procclmtempclmrec
 * Model: com::uhc::aarp::fox::domain::bean::procclmtempclmrec::MippaAdditionalFields
 * Legacy Mapping: MIPPA-ADDITIONAL-FIELDS
 */
export class MippaAdditionalFields {
  mippaBillLines: MippaBillLine[] = [];
  lnpPlanInds: String[] = [];
}
