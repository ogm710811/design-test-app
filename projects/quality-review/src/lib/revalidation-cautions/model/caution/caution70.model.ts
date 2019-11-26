
/**
 * Model class Caution70
 * Path: screenbean/qltyrvwrvldcauti/caution
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::caution::Caution70
 * Legacy Mapping: CAUTION-70
 */
export class Caution70 {
  filler = '';
  c70Plan = '';
  c70Aggregate = '';

  public toString(): string {
    let str = '';
    str = this.filler + this.c70Plan + this.c70Aggregate;
    return str;
  }
}
