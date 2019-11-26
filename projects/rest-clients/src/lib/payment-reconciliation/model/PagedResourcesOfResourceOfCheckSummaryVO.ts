import {PageMetadataVO} from '../../PageMetadataVO';
import {ResourcesListOfResourceOfCheckSummaryVO} from './ResourcesListOfResourceOfCheckSummaryVO';

export interface PagedResourcesOfResourceOfCheckSummaryVO {
  _embedded?: ResourcesListOfResourceOfCheckSummaryVO;

  _links?: { [key: string]: { [key: string]: string; }; };

  page?: PageMetadataVO;
}
