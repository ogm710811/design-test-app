import {OP} from './op';

export interface AuthorityRule {
  isObeyed(grantedAuthorities: OP[]): boolean;
}

export class HasAuthorityRule implements AuthorityRule {
  constructor(public requiredAuthority: OP) {
  }

  isObeyed(grantedAuthorities: OP[]): boolean {
    return !!grantedAuthorities && !!(grantedAuthorities.length) &&
      !!(grantedAuthorities.filter(x => (x === this.requiredAuthority)).length);
  }
}

export function has(requiredAuthority: OP): AuthorityRule {
  return new HasAuthorityRule(requiredAuthority);
}

export class HasAnyPermittedAuthoritiesRule implements AuthorityRule {
  constructor(public permittedAuthorities: OP[]) {
  }

  isObeyed(grantedAuthorities: OP[]): boolean {
    for (let i = 0; i < grantedAuthorities.length; i++) {
      for (let j = 0; j < this.permittedAuthorities.length; j++) {
        if (grantedAuthorities[i] === this.permittedAuthorities[j]) {
          return true;
        }
      }
    }
    return false;
  }
}

export function hasAnyOf(permittedAuthorities: OP[]): AuthorityRule {
  return new HasAnyPermittedAuthoritiesRule(permittedAuthorities);
}

export class HasAllRequiredAuthoritiesRule implements AuthorityRule {
  constructor(public requiredAuthorities: OP[]) {
  }

  isObeyed(grantedAuthorities: OP[]): boolean {
    return this.requiredAuthorities.map(ga => grantedAuthorities.includes(ga)).reduce((prev, curr) => prev && curr, true);
  }
}

export function hasAllOf(requiredAuthorities: OP[]): AuthorityRule {
  return new HasAllRequiredAuthoritiesRule(requiredAuthorities);
}

export class EitherRule implements AuthorityRule {
  constructor(public firstRule: AuthorityRule, public secondRule: AuthorityRule) {
  }

  isObeyed(grantedAuthorities: OP[]): boolean {
    return this.firstRule.isObeyed(grantedAuthorities) || this.secondRule.isObeyed(grantedAuthorities);
  }
}

export function either(rule1: AuthorityRule, rule2: AuthorityRule): AuthorityRule {
  return new EitherRule(rule1, rule2);
}

export class BothRule implements AuthorityRule {
  constructor(public firstRule: AuthorityRule, public secondRule: AuthorityRule) {
  }

  isObeyed(grantedAuthorities: OP[]): boolean {
    return this.firstRule.isObeyed(grantedAuthorities) && this.secondRule.isObeyed(grantedAuthorities);
  }
}

export function both(rule1: AuthorityRule, rule2: AuthorityRule): AuthorityRule {
  return new BothRule(rule1, rule2);
}

export class NotRule implements AuthorityRule {
  constructor(public ruleToNegate: AuthorityRule) {
  }

  isObeyed(grantedAuthorities: OP[]): boolean {
    return !this.ruleToNegate.isObeyed(grantedAuthorities);
  }
}

export function not(rule: AuthorityRule): AuthorityRule {
  return new NotRule(rule);
}
