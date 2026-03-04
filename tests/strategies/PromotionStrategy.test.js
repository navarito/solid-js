import { describe, it, expect } from 'vitest';
import { ItemSetStrategy, PromotionItemSet } from '../../src/strategies/PromotionStrategy.js';
import { CartItem } from '../../src/models/CartItem.js';
import { Product } from '../../src/models/Product.js';

const makeItem = (id, price, qty) => new CartItem(new Product(id, `Product ${id}`, price), qty);

describe('ItemSetStrategy', () => {
  it('ซื้อสินค้าใน SET_A ครบ minCount ได้รับส่วนลด', () => {
    const strategy = new ItemSetStrategy(PromotionItemSet.SET_A, 2, 5);
    const cartItems = [
      makeItem('P002', 40, 1),
      makeItem('P005', 80, 1),
    ];
    // subtotal = 120, ลด 5% = 6
    expect(strategy.apply(120, cartItems)).toBe(6);
  });

  it('ซื้อสินค้าใน SET_A ไม่ครบ minCount ไม่ได้ส่วนลด', () => {
    const strategy = new ItemSetStrategy(PromotionItemSet.SET_A, 2, 5);
    const cartItems = [makeItem('P002', 40, 1)];
    expect(strategy.apply(40, cartItems)).toBe(0);
  });

  it('ไม่มีสินค้าใน SET_A เลย ไม่ได้ส่วนลด', () => {
    const strategy = new ItemSetStrategy(PromotionItemSet.SET_A, 2, 5);
    const cartItems = [makeItem('P001', 50, 2)];
    expect(strategy.apply(100, cartItems)).toBe(0);
  });

  it('นับจำนวนสินค้าจาก quantity ด้วย', () => {
    const strategy = new ItemSetStrategy(PromotionItemSet.SET_A, 2, 10);
    const cartItems = [makeItem('P002', 40, 2)];
    // P002 อยู่ใน SET_A, qty=2 >= minCount=2
    expect(strategy.apply(80, cartItems)).toBe(8);
  });

  it('describe() คืน string ที่ถูกต้อง', () => {
    const strategy = new ItemSetStrategy(PromotionItemSet.SET_A, 2, 5);
    expect(strategy.describe()).toBe('ซื้อสินค้าในเซ็ต 2 ชิ้นขึ้นไป ลด 5%');
  });
});
