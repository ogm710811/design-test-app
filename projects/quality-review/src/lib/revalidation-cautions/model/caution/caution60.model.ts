
/**
 * Model class Caution60
 * Path: screenbean/qltyrvwrvldcauti/caution
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::caution::Caution60
 * Legacy Mapping: CAUTION-60
 */
export class Caution60 {
  filler1 = '';
  c60State = '';
  filler2 = '';
  c60Month1 = '';
  c60Slash1 = '';
  c60Year1 = '';
  c60Dash = '';
  c60Month2 = '';
  c60Slash2 = '';
  c60Year2 = '';
  c60MoreInd1 = '';
  c60MoreSt = '';
  c60MoreInd2 = '';

  public toString(): string {
    let str = '';
    str = this.filler1 + this.c60State + this.filler2 + this.c60Month1 + this.c60Slash1 + this.c60Year1 + this.c60Dash + this.c60Month2 + this.c60Slash2 + this.c60Year2 + this.c60MoreInd1 + this.c60MoreSt + this.c60MoreInd2;
    return str;
  }
}
