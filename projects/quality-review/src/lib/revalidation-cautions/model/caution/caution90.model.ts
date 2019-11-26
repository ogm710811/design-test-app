
/**
 * Model class Caution90
 * Path: screenbean/qltyrvwrvldcauti/caution
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::caution::Caution90
 * Legacy Mapping: CAUTION-90
 */
export class Caution90 {
  filler1 = '';
  c90Plan = '';
  filler2 = '';
  c90Aggregate = 0;

  public toString(): string {
    let str = '';
    str = this.filler1 + this.c90Plan + this.filler2 + this.c90Aggregate;
    return str;
  }
}
