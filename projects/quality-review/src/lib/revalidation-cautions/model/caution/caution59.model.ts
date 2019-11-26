
/**
 * Model class Caution59
 * Path: screenbean/qltyrvwrvldcauti/caution
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::caution::Caution59
 * Legacy Mapping: CAUTION-59
 */
export class Caution59 {
  filler1 = '';
  c59ClaimNo = 0;
  filler2 = '';
  c59EobType = '';
  filler3 = '';
  c59SuspReason = '';
  filler4 = '';
  c59SuspLocation = '';

  public toString(): string {
    let str = '';
    str = this.filler1 + this.c59ClaimNo + this.filler2 + this.c59EobType + this.filler3 + this.c59SuspReason + this.filler4 + this.c59SuspLocation;
    return str;
  }
}
