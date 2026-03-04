import { describe, it, expect } from 'vitest';
import { Member, MemberType } from '../../src/models/Member.js';

describe('Member', () => {
  it('สร้าง Member ประเภท MEMBER ได้ถูกต้อง', () => {
    const member = new Member('M001', 'นายเอ', 'a@mail.com', MemberType.MEMBER);
    expect(member.id).toBe('M001');
    expect(member.name).toBe('นายเอ');
    expect(member.email).toBe('a@mail.com');
    expect(member.memberType).toBe('MEMBER');
  });

  it('ค่าเริ่มต้น memberType เป็น NORMAL', () => {
    const member = new Member('M002', 'นายบี', 'b@mail.com');
    expect(member.memberType).toBe('NORMAL');
  });

  it('isNormal() คืน true เมื่อเป็น NORMAL', () => {
    const member = new Member('M003', 'นายซี', 'c@mail.com', MemberType.NORMAL);
    expect(member.isNormal()).toBe(true);
    expect(member.isMember()).toBe(false);
  });

  it('isMember() คืน true เมื่อเป็น MEMBER', () => {
    const member = new Member('M004', 'นายดี', 'd@mail.com', MemberType.MEMBER);
    expect(member.isMember()).toBe(true);
    expect(member.isNormal()).toBe(false);
  });
});
