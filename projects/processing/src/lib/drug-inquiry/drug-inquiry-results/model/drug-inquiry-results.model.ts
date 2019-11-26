import { SearchRsltList } from './search-rslt-list.model';

/**
 * Model class DrugInquiryResults
 * Path: screenbean/druginquiryresults
 * Model: com::uhc::aarp::fox::domain::screenbean::druginquiryresults::DrugInquiryResults
 */
export class DrugInquiryResults {
  command = '';
  mem1 = '';
  mem2 = '';
  mem3 = '';
  cno1 = '';
  cno2 = '';
  cno3 = '';
  cno4 = '';
  cno5 = '';
  cno6 = '';
  com1 = '';
  com2 = '';
  searchRsltNum = '';
  multiBenExist = '';
  errMsg = '';
  searchRsltList: SearchRsltList[] = [];
}
