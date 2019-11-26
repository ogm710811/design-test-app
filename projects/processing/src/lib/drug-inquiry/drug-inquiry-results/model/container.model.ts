import {Dfhcommarea} from '@fox/shared';
import {DrugAccessLnkArea} from './drug-access-lnk-area.model';
import {DrugInquiryResults} from './drug-inquiry-results.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/druginquiryresults
 * Model: com::uhc::aarp::fox::domain::screenbean::druginquiryresults::Container
 */
export class Container {
  dfhCommArea = new Dfhcommarea();
  drugInquiryResults = new DrugInquiryResults();
  workStorage = new WorkStorage();
  drugAccessLnkArea = new DrugAccessLnkArea();
}
