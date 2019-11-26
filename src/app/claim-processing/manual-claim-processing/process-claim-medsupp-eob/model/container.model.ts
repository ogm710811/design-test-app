import {Dfhcommarea} from '@fox/shared';
import {MedSuppEobMap} from './med-supp-eob-map.model';

/**
 * Model class Container
 * Path: screenbean/procclmmedsuppartbeob
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmmedsuppartbeob::Container
 */
export class Container {
  screen = new MedSuppEobMap();
  dfhCommArea = new Dfhcommarea();
}
