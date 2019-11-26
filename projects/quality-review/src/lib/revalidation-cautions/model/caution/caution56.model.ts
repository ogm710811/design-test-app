import { C56AllPlansTable } from './c56-all-plans-table.model';
import { C56PlansTable } from './c56-plans-table.model';

/**
 * Model class Caution56
 * Path: screenbean/qltyrvwrvldcauti/caution
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::caution::Caution56
 * Legacy Mapping: CAUTION-56
 */
export class Caution56 {
  filler = '';
  c56AllPlansTable = new C56AllPlansTable();

  public toString(): string {
    let str = '';
    str = this.filler;
    this.c56AllPlansTable.c56PlansTables.forEach((c56PlansTable) => {
      str += c56PlansTable.c56Plan + ' ';
    });
    return str;
  }
}
