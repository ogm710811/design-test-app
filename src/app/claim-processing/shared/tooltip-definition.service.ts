import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TooltipDefinitionService {

  tooltipDescription: string = '';
  tooltipHeader: string = '';

  public getToolTipStatusDescr(data: string): string {

    switch (data) {
      case 'D':
        this.tooltipDescription = 'DISBURSED';
        break;
      case 'M':
        this.tooltipDescription = 'MOVED';
        break;
      case 'P':
        this.tooltipDescription = 'PURGED';
        break;
      case 'R':
        this.tooltipDescription = 'POINT OF SALE';
        break;
      case 'S':
        this.tooltipDescription = 'SUSPENDED';
        break;
      case 'X':
        this.tooltipDescription = 'DELETED';
        break;
      case 'Q':
        this.tooltipDescription = 'QUALITY';
        break;
      case '1':
        this.tooltipDescription = 'ABORTED';
        break;
      case '2':
        this.tooltipDescription = 'NOT FOUND';
        break;
      case '3':
        this.tooltipDescription = 'RESOLVED';
        break;
      case '4':
        this.tooltipDescription = 'NUMBER';
        break;
      default:
        this.tooltipDescription = '';
    }

    return this.tooltipDescription;
  }

  public getToolTipCombinedIndDescr(data: string): string {

    switch (data) {
      case 'I':
        this.tooltipDescription = 'Insured’s EOB combined, and has been released';
        break;
      case '*I':
        this.tooltipDescription = 'Insured’s EOB waiting to be combined and is currently waiting to be released';
        break;
      case 'P':
        this.tooltipDescription = 'Provider’s RA combined, and has been released';
        break;
      case '*P':
        this.tooltipDescription = 'Provider’s RA waiting to be combined and is currently waiting to be released';
        break;
      case 'I/P':
        this.tooltipDescription = 'Insured’s EOB and Provider’s RA have both been combined and have both been released';
        break;
      case '*I/P':
        this.tooltipDescription = 'Insured’s EOB waiting to be combined and is currently waiting to be released; Provider’s RA combined and has been released';
        break;
      case 'I/*P':
        this.tooltipDescription = 'Insured’s EOB combined and has been released; and Provider’s RA waiting to be combined and is currently waiting to be released';
        break;
      case '*I/*P':
        this.tooltipDescription = 'Insured’s EOB and Provider’s RA are both waiting to be combined and both are waiting to be released';
        break;
      default:
        this.tooltipDescription = '';
    }

    return this.tooltipDescription;
  }

  public getToolTipServiceIndDescr(data: string): string {

    switch (data) {
      case 'H1':
        this.tooltipHeader = 'Inpatient Hospital';
        this.tooltipDescription = 'w/ Surgery';
        break;
      case 'H2':
        this.tooltipHeader = 'Inpatient Hospital';
        this.tooltipDescription = 'w/o Surgery';
        break;
      case 'H3':
        this.tooltipHeader = 'Inpatient Hospital';
        this.tooltipDescription = 'ICU days';
        break;
      case 'H4':
        this.tooltipHeader = 'Inpatient Hospital';
        this.tooltipDescription = 'Discharge Ben/Added Ben';
        break;
      case 'H7':
        this.tooltipHeader = 'Inpatient Hospital';
        this.tooltipDescription = 'LTR days';
        break;
      case 'H9':
        this.tooltipHeader = 'Inpatient Hospital';
        this.tooltipDescription = 'Mental Health';
        break;
      case 'H5':
        this.tooltipHeader = 'Outpatient Hospital/ASC';
        this.tooltipDescription = 'w/o Surgery';
        break;
      case 'H6':
        this.tooltipHeader = 'Outpatient Hospital/ASC';
        this.tooltipDescription = 'w/ Surgery';
        break;
      case 'H0':
        this.tooltipHeader = 'Outpatient Hospital/ASC';
        this.tooltipDescription = 'accidential injury';
        break;
      case 'H8':
        this.tooltipHeader = 'Residential Treatment';
        this.tooltipDescription = 'Alcohol & Drug Dependency';
        break;
      case 'W0':
        this.tooltipHeader = 'Inpatient Nursing Facility';
        this.tooltipDescription = 'SNF';
        break;
      case 'W1':
        this.tooltipHeader = 'Inpatient Nursing Facility';
        this.tooltipDescription = 'Medicare SNF';
        break;
      case 'W2':
        this.tooltipHeader = 'Inpatient Nursing Facility';
        this.tooltipDescription = 'Nursing Home';
        break;
      case 'W3':
        this.tooltipHeader = 'Inpatient Nursing Facility';
        this.tooltipDescription = 'Post Op Nursing Home';
        break;
      case 'W4':
        this.tooltipHeader = 'Inpatient Nursing Facility';
        this.tooltipDescription = 'Intermediate Care';
        break;
      case 'W5':
        this.tooltipHeader = 'Inpatient Nursing Facility';
        this.tooltipDescription = 'Non-Cert SNF';
        break;
      case 'W6':
        this.tooltipHeader = 'Inpatient Nursing Facility';
        this.tooltipDescription = 'WI Standardized Plans';
        break;
      case 'Q0':
        this.tooltipHeader = 'Inpatient Nursing Facility';
        this.tooltipDescription = 'Ext. Hospital (SNF Ben B & R/V Series Plans)';
        break;
      case 'B1':
        this.tooltipHeader = 'Part B Ben- MS and Wrap Plans';
        this.tooltipDescription = 'Inpatient';
        break;
      case 'B2':
        this.tooltipHeader = 'Part B Ben- MS and Wrap Plans';
        this.tooltipDescription = 'Outpatient';
        break;
      case 'B3':
        this.tooltipHeader = 'Part B Ben- MS and Wrap Plans';
        this.tooltipDescription = 'Inpat/Outpatient';
        break;
      case 'B4':
        this.tooltipHeader = 'Part B Ben- MS and Wrap Plans';
        this.tooltipDescription = 'Deductible';
        break;
      case 'B5':
        this.tooltipHeader = 'Part B Ben- MS and Wrap Plans';
        this.tooltipDescription = 'Balance Bill';
        break;
      case 'B6':
        this.tooltipHeader = 'Part B Ben- MS and Wrap Plans';
        this.tooltipDescription = 'Psych';
        break;
      case 'B7':
        this.tooltipHeader = 'Part B Ben- MS and Wrap Plans';
        this.tooltipDescription = 'Rental';
        break;
      case 'B8':
        this.tooltipHeader = 'Part B Ben- MS and Wrap Plans';
        this.tooltipDescription = 'Manual Calc';
        break;
      case 'B9':
        this.tooltipHeader = 'Part B Ben- MS and Wrap Plans';
        this.tooltipDescription = 'All Charges Pd @ 100%';
        break;
      case 'M1':
        this.tooltipHeader = 'Medical Care- Non-Med Sup Plans';
        this.tooltipDescription = 'In-Hos Visit';
        break;
      case 'M2':
        this.tooltipHeader = 'Medical Care- Non-Med Sup Plans';
        this.tooltipDescription = 'Office Visit';
        break;
      case 'M3':
        this.tooltipHeader = 'Medical Care- Non-Med Sup Plans';
        this.tooltipDescription = 'Home Visit';
        break;
      case 'M4':
        this.tooltipHeader = 'Medical Care- Non-Med Sup Plans';
        this.tooltipDescription = 'Nursing Hm Visit';
        break;
      case 'M5':
        this.tooltipHeader = 'Medical Care- Non-Med Sup Plans';
        this.tooltipDescription = 'In-Hos Consult';
        break;
      case 'M6':
        this.tooltipHeader = 'Medical Care- Non-Med Sup Plans';
        this.tooltipDescription = 'Outpatient Consult';
        break;
      case 'R0':
        this.tooltipHeader = 'Prescription Drug';
        this.tooltipDescription = 'Other';
        break;
      case 'R1':
        this.tooltipHeader = 'Prescription Drug';
        this.tooltipDescription = 'AARP Pharm (no longer)';
        break;
      case 'R2':
        this.tooltipHeader = 'Prescription Drug';
        this.tooltipDescription = 'MN Outpatient';
        break;
      case 'R3':
        this.tooltipHeader = 'Prescription Drug';
        this.tooltipDescription = 'Medco (POS Trans)';
        break;
      case 'R4':
        this.tooltipHeader = 'Prescription Drug';
        this.tooltipDescription = 'Canadian Pharm';
        break;
      case 'R5':
        this.tooltipHeader = 'Prescription Drug';
        this.tooltipDescription = 'Foreign Pharm (not canadian)';
        break;
      case 'D1':
        this.tooltipHeader = 'Home Health';
        this.tooltipDescription = 'RN/LPN/LVN Visit';
        break;
      case 'D2':
        this.tooltipHeader = 'Home Health';
        this.tooltipDescription = 'Home Hlth Aide/Cert Nurse Aide Visit';
        break;
      case 'D3':
        this.tooltipHeader = 'Home Health';
        this.tooltipDescription = 'RN Assess';
        break;
      case 'D4':
        this.tooltipHeader = 'Home Health';
        this.tooltipDescription = 'Therapist';
        break;
      case 'D5':
        this.tooltipHeader = 'Home Health';
        this.tooltipDescription = 'Adult Day Care';
        break;
      case 'D6':
        this.tooltipHeader = 'WI Home Health';
        this.tooltipDescription = 'Supply & Lab Svs';
        break;
      case 'D7':
        this.tooltipHeader = 'WI Home Health';
        this.tooltipDescription = 'Drugs';
        break;
      case 'D8':
        this.tooltipHeader = 'WI Home Health';
        this.tooltipDescription = 'Nutritional Counsel';
        break;
      case 'C1':
        this.tooltipHeader = 'MN Home Health';
        this.tooltipDescription = 'RN/LPN/LVN Visit';
        break;
      case 'C2':
        this.tooltipHeader = 'MN Home Health';
        this.tooltipDescription = 'Home Hlth Aide/Cert. Nurses’ Aide/Personal Care Aide Visit';
        break;
      case 'B0':
        this.tooltipHeader = 'MA, MN, WI Req Bene';
        this.tooltipDescription = 'Non-Medicare eligible Med Exp';
        break;
      case 'A1':
        this.tooltipHeader = 'Assist Surgery';
        this.tooltipDescription = 'Inpatient';
        break;
      case 'E1':
        this.tooltipHeader = 'Supp Medical Plans';
        this.tooltipDescription = 'Emergency Rm';
        break;
      case 'E2':
        this.tooltipHeader = 'Supp Medical Plans';
        this.tooltipDescription = 'Wellness Prgm';
        break;
      case 'E3':
        this.tooltipHeader = 'Supp Medical Plans';
        this.tooltipDescription = 'Complimentary Med';
        break;
      case 'E4':
        this.tooltipHeader = 'MAP Plan';
        this.tooltipDescription = 'Outpatient Hosp';
        break;
      case 'E5':
        this.tooltipHeader = 'MAP Plan';
        this.tooltipDescription = 'Lab/Path Svs';
        break;
      case 'F1':
        this.tooltipHeader = 'Foreign Cov';
        this.tooltipDescription = 'Inpatient Svs';
        break;
      case 'F2':
        this.tooltipHeader = 'Foreign Cov';
        this.tooltipDescription = 'Outpatient Svs';
        break;
      case 'L0':
        this.tooltipHeader = 'Long Term Care';
        this.tooltipDescription = 'Nursing Home (retired)';
        break;
      case 'P1':
        this.tooltipHeader = 'Long Term Care';
        this.tooltipDescription = 'LTC waiver (UW only)';
        break;
      case 'G0':
        this.tooltipHeader = 'Long Term Care';
        this.tooltipDescription = 'Respite Care- Nurse only';
        break;
      case 'G1':
        this.tooltipHeader = 'Long Term Care';
        this.tooltipDescription = 'Respite Care- Home Health';
        break;
      case 'G2':
        this.tooltipHeader = 'Long Term Care';
        this.tooltipDescription = 'Respite Care- Adult Day Cr';
        break;
      case 'N1':
        this.tooltipHeader = 'No Pay Clm';
        this.tooltipDescription = 'Med Svs';
        break;
      case 'N2':
        this.tooltipHeader = 'No Pay Clm';
        this.tooltipDescription = 'Pharm';
        break;
      case 'N3':
        this.tooltipHeader = 'No Pay Clm';
        this.tooltipDescription = 'Misc Items (i.e. POA Docs)';
        break;
      case 'N4':
        this.tooltipHeader = 'No Pay Clm';
        this.tooltipDescription = 'Request for Info';
        break;
      case 'S1':
        this.tooltipHeader = 'Surgery';
        this.tooltipDescription = 'Inpatient';
        break;
      case 'S2':
        this.tooltipHeader = 'Surgery';
        this.tooltipDescription = 'Outpatient';
        break;
      case 'S4':
        this.tooltipHeader = 'Surgery';
        this.tooltipDescription = '2nd Opinion Confirm';
        break;
      case 'S5':
        this.tooltipHeader = 'Surgery';
        this.tooltipDescription = '2nd Opinion Unconfirm';
        break;
      case 'S6':
        this.tooltipHeader = 'Surgery';
        this.tooltipDescription = '2nd Opinion Confirm/Unconfirm';
        break;
      case 'S7':
        this.tooltipHeader = 'Surgery';
        this.tooltipDescription = '3rd Opinion Confirm';
        break;
      case 'S8':
        this.tooltipHeader = 'Surgery';
        this.tooltipDescription = '3rd Opinion Unconfirm';
        break;
      case 'S9':
        this.tooltipHeader = 'Surgery';
        this.tooltipDescription = '3rd Opinion Confirm/Unconfirm';
        break;
      case 'T0':
        this.tooltipHeader = 'Out of Hospital';
        this.tooltipDescription = 'Blood';
        break;
      case 'T1':
        this.tooltipHeader = 'Out of Hospital';
        this.tooltipDescription = 'X-Ray/Lab';
        break;
      case 'T2':
        this.tooltipHeader = 'Out of Hospital';
        this.tooltipDescription = 'Med Supplies';
        break;
      case 'T3':
        this.tooltipHeader = 'Out of Hospital';
        this.tooltipDescription = 'Alcohol & Drug Dep (Outpatient)';
        break;
      case 'T4':
        this.tooltipHeader = 'Out of Hospital';
        this.tooltipDescription = 'Outpatient Mental Hlth Care';
        break;
      case 'T5':
        this.tooltipHeader = 'Out of Hospital';
        this.tooltipDescription = 'Immunization';
        break;
      case 'T7':
        this.tooltipHeader = 'Out of Hospital';
        this.tooltipDescription = 'Hospice';
        break;
      case 'T8':
        this.tooltipHeader = 'Out of Hospital';
        this.tooltipDescription = 'Preventative Care';
        break;
      case 'T9':
        this.tooltipHeader = 'Out of Hospital';
        this.tooltipDescription = 'Cancer Screen (inpatient/outpatient)';
        break;
      case 'X1':
        this.tooltipHeader = 'Private Duty Nurse';
        this.tooltipDescription = 'Inpatient RN';
        break;
      case 'X2':
        this.tooltipHeader = 'Private Duty Nurse';
        this.tooltipDescription = 'Inpatient  LPN/LNV';
        break;
      case 'X3':
        this.tooltipHeader = 'Private Duty Nurse';
        this.tooltipDescription = 'Outpatient RN';
        break;
      case 'X4':
        this.tooltipHeader = 'Private Duty Nurse';
        this.tooltipDescription = 'Home Nursing RN';
        break;
      case 'X5':
        this.tooltipHeader = 'Private Duty Nurse';
        this.tooltipDescription = 'Home Nursing LPN/LNV';
        break;
      case 'Y1':
        this.tooltipHeader = 'BUW';
        this.tooltipDescription = 'Withheld Amt from Provider';
        break;
      case 'Y2':
        this.tooltipHeader = 'BUW';
        this.tooltipDescription = 'Refund BUW wthhld amt for a tax exempt Prov or a provider incorrectly place on BUW status in our provider file';
        break;
      case 'Y3':
        this.tooltipHeader = 'BUW';
        this.tooltipDescription = 'Refund any interest amt withheld on an orig BUW claim';
        break;
      case 'Z':
        this.tooltipHeader = '';
        this.tooltipDescription = 'Interest';
        break;
      case 'Y4':
        this.tooltipHeader = '';
        this.tooltipDescription = 'IRS Withheld';
        break;
      default:
        this.tooltipHeader = '';
        this.tooltipDescription = '';
    }

    return this.tooltipHeader + '|' + this.tooltipDescription;
  }

}
