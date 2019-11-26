import {Dfhcommarea} from '@fox/shared';
import {DrugInquiry} from './drug-inquiry.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/druginquiry
 * Model: com::uhc::aarp::fox::domain::screenbean::druginquiry::Container
 */
export class Container {
  screenBean = new DrugInquiry();
  WorkStorage = new WorkStorage();
  dfhCommArea = new Dfhcommarea();
}
