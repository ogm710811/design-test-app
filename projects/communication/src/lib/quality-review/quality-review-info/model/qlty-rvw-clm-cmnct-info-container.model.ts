import {CommunicationCommarea} from '@fox/shared';
import {QltyRvwClmCmnctInfo} from './qlty-rvw-clm-cmnct-info.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class QltyRvwClmCmnctInfoContainer
 * Path: screenbean/qltyrvwclmcmnctinfo
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwclmcmnctinfo::QltyRvwClmCmnctInfoContainer
 */
export class QltyRvwClmCmnctInfoContainer {
  commonArea = new CommunicationCommarea();
  workStorage = new WorkStorage();
  screen = new QltyRvwClmCmnctInfo();
}
