import { describe, it, expect, beforeEach } from 'vitest';
import { MemberService } from '../../src/services/MemberService.js';
import { InMemoryRepository } from '../../src/repositories/InMemoryRepository.js';
import { Member, MemberType } from '../../src/models/Member.js';

describe('MemberService', () => {
  let service;

  beforeEach(() => {
    service = new MemberService(new InMemoryRepository());
  });

  it('register() บันทึกสมาชิกได้', () => {
    const member = new Member('M001', 'นายเอ', 'a@mail.com', MemberType.MEMBER);
    service.register(member);
    expect(service.getMember('M001')).toBe(member);
  });

  it('getMember() คืน null เมื่อไม่พบสมาชิก', () => {
    expect(service.getMember('NONE')).toBeNull();
  });

  it('getAll() คืนสมาชิกทั้งหมด', () => {
    service.register(new Member('M001', 'นายเอ', 'a@mail.com'));
    service.register(new Member('M002', 'นายบี', 'b@mail.com'));
    expect(service.getAll()).toHaveLength(2);
  });
});
