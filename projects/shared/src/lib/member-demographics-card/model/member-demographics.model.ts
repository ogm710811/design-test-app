/**
 * Model class memberDemogModel
 * Path: screenbean
 * Model: com::uhc::aarp::fox::domain::screenbean::memberDemogModel
 * Legacy Mapping:
 */
export class MemberDmg {
  // name
  m22nam = '';
  // member number
  m22memn = '';
  // address
  m22addr  = '';
  // city
  m22city = '';
  // date of birth
  m22dob = '';
  // active plans
  activePlans = '';
  // service date
  m22srv1 = '';
  // plan 1 name
  m22pln1 = '';
  // plan 1 effective date
  m22eff1 = '';
  // plan 1 termination date and reason
  m22trm1 = '';
  // plan 1 disabled flag
  m22pln1Disabled = '';
  // plan name, plan effective date, plan termination date and reason, plan disabled flag ( for plans from 2 - 9 and a - f below)
  m22pln2 = '';
  m22eff2 = '';
  m22trm2 = '';
  m22pln2Disabled = '';
  m22pln3 = '';
  m22eff3 = '';
  m22trm3 = '';
  m22pln3Disabled = '';
  m22pln4 = '';
  m22eff4 = '';
  m22trm4 = '';
  m22pln4Disabled = '';
  m22pln5 = '';
  m22eff5 = '';
  m22trm5 = '';
  m22pln5Disabled = '';
  m22pln6 = '';
  m22eff6 = '';
  m22trm6 = '';
  m22pln6Disabled = '';
  m22pln7 = '';
  m22eff7 = '';
  m22trm7 = '';
  m22pln7Disabled = '';
  m22pln8 = '';
  m22eff8 = '';
  m22trm8 = '';
  m22pln8Disabled = '';
  m22pln9 = '';
  m22eff9 = '';
  m22trm9 = '';
  m22pln9Disabled = '';
  m22plna = '';
  m22effa = '';
  m22trma = '';
  m22plnaDisabled = '';
  m22plnb = '';
  m22effb = '';
  m22trmb = '';
  m22plnbDisabled = '';
  m22plnc = '';
  m22effc = '';
  m22trmc = '';
  m22plncDisabled = '';
  m22plnd = '';
  m22effd = '';
  m22trmd = '';
  m22plndDisabled = '';
  m22plne = '';
  m22effe = '';
  m22trme = '';
  m22plneDisabled = '';
  m22plnf = '';
  m22efff = '';
  m22trmf = '';
  m22plnfDisabled = '';
}

export class MemberPln {
  validators = [
    {
      plan : 'm22pln1',
      effDate: 'm22eff1',
      termDateR: 'm22trm1',
      adress: 'm22addr' + 'm22addr',
      status: 'm22pln1Disabled'
    },
    {
      plan : 'm22pln2',
      effDate: 'm22eff2',
      termDateR: 'm22trm2',
      status: 'm22pln2Disabled'
    },
    {
      plan : 'm22pln3',
      effDate: 'm22eff3',
      termDateR: 'm22trm3',
      status: 'm22pln3Disabled'
    },
    {
      plan : 'm22pln4',
      effDate: 'm22eff4',
      termDateR: 'm22trm4',
      status: 'm22pln4Disabled'
    },
    {
      plan : 'm22pln5',
      effDate: 'm22eff5',
      termDateR: 'm22trm5',
      status: 'm22pln5Disabled'
    },
    {
      plan : 'm22pln6',
      effDate: 'm22eff6',
      termDateR: 'm22trm6',
      status: 'm22pln6Disabled'
    },
    {
      plan : 'm22pln7',
      effDate: 'm22eff7',
      termDateR: 'm22trm7',
      status: 'm22pln7Disabled'
    },
    {
      plan : 'm22pln8',
      effDate: 'm22eff8',
      termDateR: 'm22trm8',
      status: 'm22pln8Disabled'
    },
    {
      plan : 'm22pln9',
      effDate: 'm22eff9',
      termDateR: 'm22trm9',
      status: 'm22pln9Disabled'
    },
    {
      plan : 'm22plna',
      effDate: 'm22effa',
      termDateR: 'm22trma',
      status: 'm22plnaDisabled'
    },
    {
      plan : 'm22plnb',
      effDate: 'm22effb',
      termDateR: 'm22trmb',
      status: 'm22plnbDisabled'
    },
    {
      plan : 'm22plnc',
      effDate: 'm22effc',
      termDateR: 'm22trmc',
      status: 'm22plncDisabled'
    },
    {
      plan : 'm22plnd',
      effDate: 'm22effd',
      termDateR: 'm22trmd',
      status: 'm22plndDisabled'
    },
    {
      plan : 'm22plne',
      effDate: 'm22effe',
      termDateR: 'm22trme',
      status: 'm22plneDisabled'
    },
    {
      plan : 'm22plnf',
      effDate: 'm22efff',
      termDateR: 'm22trmf',
      status: 'm22plnfDisabled'
    }
  ];
}
