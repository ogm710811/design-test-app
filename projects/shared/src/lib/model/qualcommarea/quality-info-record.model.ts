/**
 * Model class QualityInfoRecord
 * Path: bean/qualcommarea
 * Model: com::uhc::aarp::fox::domain::bean::qualcommarea::QualityInfoRecord
 * Legacy Mapping: QUALITY-INFO-RECORD
 */
export class QualityInfoRecord {
  denialMsgIndicator = '';
  revalIons = 0;
  revalLocation = 0;
  dateToReval = 0;
  dateFromReval = 0;
  maintIons = 0;
  maintDate = 0;
  qqOrigLocation = 0;
  qqRecIons = 0;
  qqRecLocation = 0;
  dateToQuality = 0;
  locationToQuality = 0;
  seqnoToQuality = 0;
  qqOrigIons = 0;
  dateCompleted2 = 0;
  claimNumber2 = 0;
  origRevalErrors: string[] = [];
  recRevalErrors: string[] = [];
  dateProcessed = 0;
  dateSuspended = 0;
  origLocation = 0;
  origElevatedQuality = '';
  origActualLevel = 0;
  recIons = 0;
  recLocation = 0;
  origIons = 0;
  dateCompleted = 0;
  claimNumber = 0;
  origQualityReasons: number[] = [];
  origQualityErrors: string[] = [];
  recQualityReasons: number[] = [];
  recQualityErrors: string[] = [];
}
