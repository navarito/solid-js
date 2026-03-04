import { describe, it, expect } from 'vitest';
import { MemberTierStrategy } from '../../src/strategies/MemberTierStrategy.js';
import { Member, MemberType } from '../../src/models/Member.js';

describe('MemberTierStrategy', () => {
  it('สมาชิก MEMBER ได้ส่วนลด 10%', () => {
    const member = new Member('M001', 'นายเอ', 'a@mail.com', MemberType.MEMBER);
    const strategy = new MemberTierStrategy(member);
    expect(strategy.apply(1000)).toBe(100);
  });

  it('สมาชิก NORMAL ไม่ได้ส่วนลด', () => {
    const member = new Member('M002', 'นายบี', 'b@mail.com', MemberType.NORMAL);
    const strategy = new MemberTierStrategy(member);
    expect(strategy.apply(1000)).toBe(0);
  });

  it('describe() แสดงข้อมูลที่ถูกต้อง', () => {
    const member = new Member('M001', 'นายเอ', 'a@mail.com', MemberType.MEMBER);
    const strategy = new MemberTierStrategy(member);
    expect(strategy.describe()).toBe('สมาชิก MEMBER ลด 10%');
  });
});
