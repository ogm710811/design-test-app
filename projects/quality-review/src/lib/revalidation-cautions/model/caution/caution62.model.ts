
/**
 * Model class Caution62
 * Path: screenbean/qltyrvwrvldcauti/caution
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::caution::Caution62
 * Legacy Mapping: CAUTION-62
 */
export class Caution62 {
  filler1 = '';
  c62CommunDate = 0;
  c62CommunDash = '';
  c62CommunSeqNo = 0;
  filler2 = '';
  c62CommunReason = '';

  public toString(): string {
    let str = '';
    str = this.filler1 + this.c62CommunDate + this.c62CommunDash + this.c62CommunSeqNo + this.filler2 + this.c62CommunReason;
    return str;
  }
}
