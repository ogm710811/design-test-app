import {PageMetadataVO} from '../../PageMetadataVO';
import {ResourcesListOfResourceOfCheckVO} from './ResourcesListOfResourceOfCheckVO';

export interface PagedResourcesOfResourceOfCheckVO {
  _embedded?: ResourcesListOfResourceOfCheckVO;

  _links?: { [key: string]: { [key: string]: string; }; };

  page?: PageMetadataVO;
}
