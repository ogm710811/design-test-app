import {OutOfPocket} from './OutOfPocket';

/**
 * fox-claims

 * Do not edit the class manually.
 */

export interface AggregateVO {
    plan?: string;
    field?: string;
    effectiveDate?: string;
    currentValue?: string;
    oldValue?: string;
    difference?: string;
    newValue?: string;
    outOfPocket?: OutOfPocket;
    aarpPartBDeductible?: string;
    deductibleCarryover?: string;
    foreignDeductible?: string;
    drugDeductible?: string;
    medicareDeductibleRefund?: string;
    lifeForeignAggregate?: string;
    lifeHospitalDays?: string;
    benefitPeriodLifetimeAggregate?: string;
    lifetimeMentalAggregate?: string;
    erObservationVisitsAggregate?: string;
    drugBenefitAggregate?: string;
    hospitalLifetimeAggregate?: string;
    lifetimeBenefitAggregate?: string;
    healthcareVisits?: string;
    nursingHomeAggregate?: string;
    preventiveCareAggregate?: string;
    visitsAggregate?: string;
    yearlyMentalAggregate?: string;
    homeHealthcareAggregate?: string;
    yearlyHomeHealthcareAggregate?: string;
    outpatientHospitalAggregate?: string;
    planBenefitAggregate?: string;
    fiftyDollarDeductible?: string;
    fiveVisitDeductible?: string;
    twentyFiveDollarDeductible?: string;
    medicalDeductible?: string;
}
