/**
 * Model class EcClaimNo
 * Path: screenbean/procclmaddrverf
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmaddrverf::EcClaimNo
 * Legacy Mapping: EC-CLAIM-NO
 */
export class EcClaimNo {
  ecClaimSite = 0;

  public isElectClaimSite(): boolean {
    let electClaimSite = false;
    let cEnableValue_0 = 0;
    let cEnableValue_1 = 0;
    let cEnableValue_2 = 0;
    let cEnableValue_3 = 0;
    let cEnableValue_4 = 0;
    let cEnableValue_5 = 0;
    cEnableValue_0 = Number(3);
    cEnableValue_1 = Number(4);
    cEnableValue_2 = Number(5);
    cEnableValue_3 = Number(6);
    cEnableValue_4 = Number(7);
    cEnableValue_5 = Number(9);
    electClaimSite = (cEnableValue_0 === this.ecClaimSite || cEnableValue_1 === this.ecClaimSite || cEnableValue_2 === this.ecClaimSite || cEnableValue_3 === this.ecClaimSite || cEnableValue_4 === this.ecClaimSite || cEnableValue_5 === this.ecClaimSite);
    return electClaimSite;
  }

  public setElectClaimSite(): void {
    let initValue: number;
    initValue = Number(3);
    this.ecClaimSite = initValue;
  }

  public isPaperClaimSite(): boolean {
    let paperClaimSite = false;
    let cMin = 0;
    let cMax = 0;
    cMin = Number(0);
    cMax = Number(2);
    paperClaimSite = (cMin <= this.ecClaimSite && cMax >= this.ecClaimSite);
    return paperClaimSite;
  }

  public setPaperClaimSite(): void {
    let initValue: number;
    initValue = Number(0);
    this.ecClaimSite = initValue;
  }
}
