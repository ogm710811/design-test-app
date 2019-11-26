import { C65AllPlansTable } from './c65-all-plans-table.model';
import { C65PlansTable } from './c65-plans-table.model';

/**
 * Model class Caution65
 * Path: screenbean/qltyrvwrvldcauti/caution
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::caution::Caution65
 * Legacy Mapping: CAUTION-65
 */
export class Caution65 {
  filler1 = '';
  c65AllPlansTable = new C65AllPlansTable();
  filler2 = '';
  c65Type = '';

  public toString(): string {
    let str = '';
    str = this.filler1;
    this.c65AllPlansTable.c65PlansTables.forEach((c65PlansTable) => {
      str += c65PlansTable.c65Plan + ' ';
    });
    str += this.filler2 + this.c65Type;
    return str;
  }
}
