import { describe, it, expect } from 'vitest';
import { CodeStrategy } from '../../src/strategies/CodeStrategy.js';

describe('CodeStrategy', () => {
  it('CODE TEST-1 ลด 7%', () => {
    const strategy = new CodeStrategy('TEST-1');
    expect(strategy.apply(1000)).toBe(70);
  });

  it('CODE TEST-2 ลด 15%', () => {
    const strategy = new CodeStrategy('TEST-2');
    expect(strategy.apply(1000)).toBe(150);
  });

  it('CODE ไม่ถูกต้อง คืนค่า 0', () => {
    const strategy = new CodeStrategy('INVALID');
    expect(strategy.apply(1000)).toBe(0);
  });

  it('describe() แสดงข้อมูลที่ถูกต้อง', () => {
    const strategy = new CodeStrategy('TEST-1');
    expect(strategy.describe()).toBe('ได้รับส่วนลดจาก Code TEST-1 ลด 7%');
  });
});
