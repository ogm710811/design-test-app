import {CommunicationCommarea, Dfhcommarea} from '@fox/shared';
import {CompasReplyArea} from './compas-reply-area.model';
import {EligibilityIoArea} from './eligibility-io-area.model';
import {Endcmnct} from './endcmnct.model';
import {L5o46DependentData} from './l5o46-dependent-data.model';
import {PreviousSpouseData} from './previous-spouse-data.model';
import {Rpd05o46StartArea} from './rpd05o46-start-area.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Rpd07O41Container
 * Path: screenbean/commcontrolendcomm
 * Model: com::uhc::aarp::fox::domain::screenbean::commcontrolendcomm::Rpd07O41Container
 */
export class Rpd07O41Container {
  workStorage = new WorkStorage();
  rpdmb55 = new Endcmnct();
  compasReplyArea = new CompasReplyArea();
  commonArea = new CommunicationCommarea();
  rpd05o46StartArea = new Rpd05o46StartArea();
  l5o46DependentData = new L5o46DependentData();
  previousSpouseData = new PreviousSpouseData();
  eligibilityIoArea = new EligibilityIoArea();
  comErrorMessage = '';
  dfhCommArea = new Dfhcommarea();
}
