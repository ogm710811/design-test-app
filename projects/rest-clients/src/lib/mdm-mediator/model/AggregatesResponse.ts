/**
 * fox-claims

 * Do not edit the class manually.
 */
import {AggregatesVO} from '../../claim-processing/model/AggregatesVO';

export interface AggregatesResponse {
    memberNumber?: string;
    payeeAggregate?: string;
    aggregates?: AggregatesVO[];
}
