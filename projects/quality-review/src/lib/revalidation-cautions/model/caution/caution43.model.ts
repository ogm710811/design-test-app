
/**
 * Model class Caution43
 * Path: screenbean/qltyrvwrvldcauti/caution
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::caution::Caution43
 * Legacy Mapping: CAUTION-43
 */
export class Caution43 {
  filler1 = '';
  c43StartDate = new Date();
  filler2 = '';
  c43StopDate = new Date();

  public toString(): string {
    let str = '';
    str = this.filler1 + this.c43StartDate + this.filler2 + this.c43StopDate;
    return str;
  }
}
