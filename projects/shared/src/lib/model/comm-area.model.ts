import {Pcbasich} from './pcbasich.model';
import {Pcsubhdr} from './pcsubhdr.model';

/**
 * Model class CommArea
 * Path: bean
 * Model: com::uhc::aarp::fox::domain::bean::CommArea
 * Legacy Mapping: ICOMA
 */
export class CommArea {
  icoffcde = '';
  icofftyp = '';
  icsrho = '';
  icprho = '';
  icopid = '';
  icpmode = '';
  icacdata = '';
  icltrans = '';
  icmsgtyp = '';
  icswap = '';
  icsysct2 = '';
  icuserct = '';
  icdlind = '';
  icoaf = '';
  icsysctl = '';
  idccontl = '';
  idcsqtid = '';
  icpcpmi = '';
  pcsysfd1 = '';
  iuoffcde = '';
  iuofftyp = '';
  prtctuaa = 0;
  startxt1 = '';
  icexprss = '';
  icctind = '';
  icclntrn = '';
  icpic = '';
  icidms = '';
  pcbasich = new Pcbasich();
  pcsubhdr = new Pcsubhdr();
}
