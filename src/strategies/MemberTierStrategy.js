import { IDiscountStrategy } from '../interfaces/IDiscountStrategy.js';

const TIER_DISCOUNT = {
  NORMAL: 0,
  MEMBER: 10,
};

export class MemberTierStrategy extends IDiscountStrategy {
  /** @param {import('../models/Member.js').Member} member */
  constructor(member) {
    super();
    this.member = member;
  }

  apply(subtotal) {
    const percent = TIER_DISCOUNT[this.member.memberType] ?? 0;
    return subtotal * (percent / 100);
  }

  describe() {
    const percent = TIER_DISCOUNT[this.member.memberType] ?? 0;
    return `สมาชิก ${this.member.memberType} ลด ${percent}%`;
  }
}
