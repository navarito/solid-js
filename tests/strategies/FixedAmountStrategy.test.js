import { describe, it, expect } from 'vitest';
import { FixedAmountStrategy } from '../../src/strategies/FixedAmountStrategy.js';

describe('FixedAmountStrategy', () => {
  it('ลดราคาตามจำนวนที่กำหนด', () => {
    const strategy = new FixedAmountStrategy(100);
    expect(strategy.apply(500)).toBe(100);
  });

  it('ไม่ลดเกิน subtotal', () => {
    const strategy = new FixedAmountStrategy(300);
    expect(strategy.apply(200)).toBe(200);
  });

  it('describe() คืน string ที่ถูกต้อง', () => {
    const strategy = new FixedAmountStrategy(50);
    expect(strategy.describe()).toBe('ลด ฿50');
  });
});
