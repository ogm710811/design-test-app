import {ProcClmHospChrgMapLines1} from './proc-clm-hosp-chrg-map-lines1.model';
import {ProcClmHospChrgMapLines2} from './proc-clm-hosp-chrg-map-lines2.model';
import {ProcClmHospChrgLatestBen} from './proc-clm-hosp-chrg-latest-ben.model';
import {ProcClmHospChrgRelatedLines} from './proc-clm-hosp-chrg-related-lines.model';
import {ProcClmHospChrgDateOfAccidentLine} from './proc-clm-hosp-chrg-date-of-accident-line.model';

export class ProcClmHospChrg {
  icd = '';
  icd2 = '';
  icd3 = '';
  filler2 = '';
  mapLines1s: ProcClmHospChrgMapLines1[] = [];
  filler8 = '';
  mapLines2s: ProcClmHospChrgMapLines2[] = [];
  hdg1 = '';
  hg1 = '';
  filler17 = '';
  hdg2 = '';
  hg2 = '';
  filler18 = '';
  latestBens = new ProcClmHospChrgLatestBen();
  m23err = '';
  m23err1 = '';
  m23err2 = '';
  m23cmnd = '';
  m23mem1 = '';
  m23mem2 = '';
  m23mem3 = '';
  m23cno1 = '';
  m23cno2 = '';
  m23cno3 = '';
  m23cno4 = '';
  m23cno5 = '';
  m23cno6 = '';
  m23com1 = '';
  m23com2 = '';
  m23med = '';
  m23name = '';
  m23pln1 = '';
  m23eff1 = '';
  m23trm1 = '';
  m23memn = '';
  m23assc = '';
  m23insc = '';
  m23pln2 = '';
  m23eff2 = '';
  m23trm2 = '';
  m23dob = '';
  m23pln3 = '';
  m23eff3 = '';
  m23trm3 = '';
  latestRealtedLines = new ProcClmHospChrgRelatedLines();
  latestDoas = new ProcClmHospChrgDateOfAccidentLine();
  m23hdh1 = '';
  m23dil1 = '';
  m23hdh2 = '';
  m23hdgs = '';
  m23dil2 = '';
  m23ihd1 = '';
  m23ho21 = '';
  m23ho61 = '';
  m23hog1 = '';
  m23ltr1 = '';
  m23chg1 = '';
  m23opt1 = '';
  m23sn11 = '';
  m23sn21 = '';
  m23sng1 = '';
  m23ex11 = '';
  m23ex21 = '';
  m23dis1 = '';
  m23np1 = '';
  m23pl1 = '';
  m23ihd2 = '';
  m23ho22 = '';
  m23ho62 = '';
  m23hog2 = '';
  m23ltr2 = '';
  m23chg2 = '';
  m23opt2 = '';
  m23sn12 = '';
  m23sn22 = '';
  m23sng2 = '';
  m23ex12 = '';
  m23ex22 = '';
  m23dis2 = '';
  m23np2 = '';
  m23pl2 = '';
  m23hdg1 = '';
  m23hg1a = '';
  m23hdg2 = '';
  m23hg2a = '';
  m23lne1 = '';
  m23res1 = '';
  m23ln1a = '';
  m23lne2 = '';
  m23res2 = '';
  m23ln2a = '';
  m23lne3 = '';
  m23res3 = '';
  m23ln3a = '';
  m23lne4 = '';
  m23res4 = '';
  m23ln4a = '';
  m23lne5 = '';
  m23res5 = '';
  m23ln5a = '';
  m23lne6 = '';
  m23res6 = '';
  m23ln6a = '';
  isOnload = true;
}
