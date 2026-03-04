import { describe, it, expect } from 'vitest';
import { Promotion } from '../../src/models/Promotion.js';
import { FixedAmountStrategy } from '../../src/strategies/FixedAmountStrategy.js';

describe('Promotion', () => {
  it('สร้าง Promotion ได้ถูกต้อง', () => {
    const strategy = new FixedAmountStrategy(50);
    const promo = new Promotion('PR01', 'ลด 50 บาท', strategy);
    expect(promo.id).toBe('PR01');
    expect(promo.name).toBe('ลด 50 บาท');
    expect(promo.strategy).toBe(strategy);
  });

  it('isApplicable() คืน truthy เมื่อ subtotal > 0', () => {
    const promo = new Promotion('PR01', 'ลด 50', new FixedAmountStrategy(50));
    expect(promo.isApplicable(100)).toBeTruthy();
  });

  it('isApplicable() คืน falsy เมื่อ subtotal = 0', () => {
    const promo = new Promotion('PR01', 'ลด 50', new FixedAmountStrategy(50));
    expect(promo.isApplicable(0)).toBeFalsy();
  });
});
