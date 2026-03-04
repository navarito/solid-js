import { describe, it, expect, beforeEach } from 'vitest';
import { PromotionService } from '../../src/services/PromotionService.js';
import { InMemoryRepository } from '../../src/repositories/InMemoryRepository.js';
import { Promotion } from '../../src/models/Promotion.js';
import { FixedAmountStrategy } from '../../src/strategies/FixedAmountStrategy.js';

describe('PromotionService', () => {
  let service;

  beforeEach(() => {
    service = new PromotionService(new InMemoryRepository());
  });

  it('addPromotion() บันทึกโปรโมชันได้', () => {
    const promo = new Promotion('PR01', 'ลด 50 บาท', new FixedAmountStrategy(50));
    service.addPromotion(promo);
    expect(service.getAll()).toHaveLength(1);
  });

  it('getApplicable() คืนโปรโมชันที่ใช้ได้กับ subtotal', () => {
    service.addPromotion(new Promotion('PR01', 'ลด 50 บาท', new FixedAmountStrategy(50)));
    const applicable = service.getApplicable(200);
    expect(applicable).toHaveLength(1);
  });

  it('getApplicable() ไม่คืนโปรโมชันเมื่อ subtotal = 0', () => {
    service.addPromotion(new Promotion('PR01', 'ลด 50 บาท', new FixedAmountStrategy(50)));
    const applicable = service.getApplicable(0);
    expect(applicable).toHaveLength(0);
  });
});
