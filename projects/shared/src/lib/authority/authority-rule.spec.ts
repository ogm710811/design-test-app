import {AuthorityRule, both, either, has, hasAllOf, hasAnyOf, not} from './authority-rule';
import {OP} from './op';

describe('A Rule That A Single Granted Authority Must Be Present', () => {
  const hasEditDocAuthRule = has(OP.EDIT_DOCUMENT);
  it('Should fail if tested against an empty list of granted authorities', () => {
    expect(hasEditDocAuthRule.isObeyed([])).toBeFalsy();
  });
  it('Should fail if tested against a list that does not have the authroity', () => {
    expect(hasEditDocAuthRule.isObeyed([OP.AUTHORIZE_PAYMENT_ACTION, OP.MAINTAIN_STD_WQ])).toBeFalsy();
  });
  it('Should pass if tested against a list that has only the authroity', () => {
    expect(hasEditDocAuthRule.isObeyed([OP.EDIT_DOCUMENT])).toBeTruthy();
  });
  it('Should pass if tested against a list that has the authroity', () => {
    expect(hasEditDocAuthRule.isObeyed([OP.MAINTAIN_PAYMENT, OP.EDIT_DOCUMENT])).toBeTruthy();
  });
});

describe('A Rule That Any Single Granted Authority In A List Of Granted Authorities Must Be Present', () => {
  const hasAnyWqAuthRule = hasAnyOf([
    OP.MAINTAIN_STD_WQ, OP.MAINTAIN_CSS_WQ, OP.MAINTAIN_SIU_WQ, OP.MAINTAIN_EH_WQ, OP.MAINTAIN_WORKQUEUE
  ]);
  it('Should fail if tested against an empty list of granted authorities', () => {
    expect(hasAnyWqAuthRule.isObeyed([])).toBeFalsy();
  });
  it('Should fail if tested against a list that does not have any of the authroities', () => {
    expect(hasAnyWqAuthRule.isObeyed([OP.AUTHORIZE_PAYMENT_ACTION, OP.EDIT_DOCUMENT])).toBeFalsy();
  });
  it('Should pass if tested against any list that has a single of the allowed authroities', () => {
    expect(hasAnyWqAuthRule.isObeyed([OP.MAINTAIN_WORKQUEUE])).toBeTruthy();
    expect(hasAnyWqAuthRule.isObeyed([OP.MAINTAIN_EH_WQ])).toBeTruthy();
    expect(hasAnyWqAuthRule.isObeyed([OP.MAINTAIN_STD_WQ])).toBeTruthy();
    expect(hasAnyWqAuthRule.isObeyed([OP.MAINTAIN_CSS_WQ])).toBeTruthy();
    expect(hasAnyWqAuthRule.isObeyed([OP.MAINTAIN_SIU_WQ])).toBeTruthy();
  });
  it('Should pass if tested against a list that has all of the authroities', () => {
    expect(hasAnyWqAuthRule.isObeyed([
      OP.MAINTAIN_STD_WQ, OP.MAINTAIN_CSS_WQ, OP.MAINTAIN_SIU_WQ, OP.MAINTAIN_EH_WQ, OP.MAINTAIN_WORKQUEUE
    ])).toBeTruthy();
  });
  it('Should pass if tested against a list that has all of the allowed authroities and a non-allowed authority', () => {
    expect(hasAnyWqAuthRule.isObeyed([
      OP.MAINTAIN_STD_WQ, OP.MAINTAIN_CSS_WQ, OP.MAINTAIN_SIU_WQ, OP.MAINTAIN_EH_WQ, OP.MAINTAIN_WORKQUEUE, OP.MEMBER_PROFILE
    ])).toBeTruthy();
  });
  it('Should pass if tested against a list that has a single allowed authroity and a non-allowed authority', () => {
    expect(hasAnyWqAuthRule.isObeyed([
      OP.MAINTAIN_CSS_WQ, OP.MEMBER_PROFILE, OP.AUTHORIZE_PAYMENT_ACTION
    ])).toBeTruthy();
  });
});

describe('A Rule That All Granted Authorities In A List Of Granted Authorities Must Be Present', () => {
  const hasAllWqAuthRule = hasAllOf([
    OP.MAINTAIN_STD_WQ, OP.MAINTAIN_CSS_WQ, OP.MAINTAIN_SIU_WQ, OP.MAINTAIN_EH_WQ, OP.MAINTAIN_WORKQUEUE
  ]);
  it('Should fail if tested against an empty list of granted authorities', () => {
    expect(hasAllWqAuthRule.isObeyed([])).toBeFalsy();
  });
  it('Should fail if tested against a list that does not have any of the authroities', () => {
    expect(hasAllWqAuthRule.isObeyed([OP.AUTHORIZE_PAYMENT_ACTION, OP.EDIT_DOCUMENT])).toBeFalsy();
  });
  it('Should fail if tested against any list that has a single of the allowed authroities', () => {
    expect(hasAllWqAuthRule.isObeyed([OP.MAINTAIN_WORKQUEUE])).toBeFalsy();
    expect(hasAllWqAuthRule.isObeyed([OP.MAINTAIN_EH_WQ])).toBeFalsy();
    expect(hasAllWqAuthRule.isObeyed([OP.MAINTAIN_STD_WQ])).toBeFalsy();
    expect(hasAllWqAuthRule.isObeyed([OP.MAINTAIN_CSS_WQ])).toBeFalsy();
    expect(hasAllWqAuthRule.isObeyed([OP.MAINTAIN_SIU_WQ])).toBeFalsy();
  });
  it('Should pass if tested against a list that has all of the authroities', () => {
    expect(hasAllWqAuthRule.isObeyed([
      OP.MAINTAIN_STD_WQ, OP.MAINTAIN_CSS_WQ, OP.MAINTAIN_SIU_WQ, OP.MAINTAIN_EH_WQ, OP.MAINTAIN_WORKQUEUE
    ])).toBeTruthy();
  });
  it('Should pass if tested against a list that has all of the allowed authroities and a non-allowed authority', () => {
    expect(hasAllWqAuthRule.isObeyed([
      OP.MAINTAIN_STD_WQ, OP.MAINTAIN_CSS_WQ, OP.MAINTAIN_SIU_WQ, OP.MAINTAIN_EH_WQ, OP.MAINTAIN_WORKQUEUE, OP.MEMBER_PROFILE
    ])).toBeTruthy();
  });
  it('Should fail if tested against a list that has a single allowed authroity and a non-allowed authority', () => {
    expect(hasAllWqAuthRule.isObeyed([
      OP.MAINTAIN_CSS_WQ, OP.MEMBER_PROFILE, OP.AUTHORIZE_PAYMENT_ACTION
    ])).toBeFalsy();
  });
});

class TrueRule implements AuthorityRule {
  isObeyed(grantedAuthorities: OP[]): boolean {
    return true;
  }
}

class FalseRule implements AuthorityRule {
  isObeyed(grantedAuthorities: OP[]): boolean {
    return false;
  }
}

describe('A Rule That Passes When Either Of Two Other Rules Is True', () => {
  it('Should fail if both child rules fail', () => {
    const bothFalseRule = either(new FalseRule(), new FalseRule());
    expect(bothFalseRule.isObeyed([])).toBeFalsy();
  });
  it('Should pass if one child rule passes', () => {
    const oneFalseRule = either(new TrueRule(), new FalseRule());
    const oneTrueRule = either(new FalseRule(), new TrueRule());
    expect(oneFalseRule.isObeyed([])).toBeTruthy();
    expect(oneTrueRule.isObeyed([])).toBeTruthy();
  });
  it('Should pass if both child rules pass', () => {
    const oneFalseRule = either(new TrueRule(), new TrueRule());
    expect(oneFalseRule.isObeyed([])).toBeTruthy();
  });
});

describe('A Rule That Passes When Both Of Two Other Rules Is True', () => {
  it('Should fail if both child rules fail', () => {
    const bothFalseRule = both(new FalseRule(), new FalseRule());
    expect(bothFalseRule.isObeyed([])).toBeFalsy();
  });
  it('Should fail if one child rule fails', () => {
    const oneFalseRule = both(new TrueRule(), new FalseRule());
    const oneTrueRule = both(new FalseRule(), new TrueRule());
    expect(oneFalseRule.isObeyed([])).toBeFalsy();
    expect(oneTrueRule.isObeyed([])).toBeFalsy();
  });
  it('Should pass if both child rules pass', () => {
    const oneFalseRule = both(new TrueRule(), new TrueRule());
    expect(oneFalseRule.isObeyed([])).toBeTruthy();
  });
});

describe('A Rule That Inverts Another Rule\'s Results', () => {
  it('Should fail if child rule passes', () => {
    const notTrueRule = not(new TrueRule());
    expect(notTrueRule.isObeyed([])).toBeFalsy();
  });
  it('Should pass if child rule fails', () => {
    const notFalseRule = not(new FalseRule());
    expect(notFalseRule.isObeyed([])).toBeTruthy();
  });
});
