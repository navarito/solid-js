import { describe, it, expect } from 'vitest';
import { PercentageStrategy } from '../../src/strategies/PercentageStrategy.js';

describe('PercentageStrategy', () => {
  it('คำนวณส่วนลด 10% ได้ถูกต้อง', () => {
    const strategy = new PercentageStrategy(10);
    expect(strategy.apply(1000)).toBe(100);
  });

  it('คำนวณส่วนลด 0% ได้ถูกต้อง', () => {
    const strategy = new PercentageStrategy(0);
    expect(strategy.apply(1000)).toBe(0);
  });

  it('คำนวณส่วนลด 100% ได้ถูกต้อง', () => {
    const strategy = new PercentageStrategy(100);
    expect(strategy.apply(500)).toBe(500);
  });

  it('describe() คืน string ที่ถูกต้อง', () => {
    const strategy = new PercentageStrategy(15);
    expect(strategy.describe()).toBe('ลด 15%');
  });
});
