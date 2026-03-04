import { describe, it, expect } from 'vitest';
import { CartItem } from '../../src/models/CartItem.js';
import { Product } from '../../src/models/Product.js';

const mockProduct = new Product('P001', 'Test Product', 100);

describe('CartItem', () => {
  it('สร้าง CartItem ได้ถูกต้อง', () => {
    const item = new CartItem(mockProduct, 2);
    expect(item.product).toBe(mockProduct);
    expect(item.quantity).toBe(2);
  });

  it('คำนวณ lineTotal ได้ถูกต้อง', () => {
    const item = new CartItem(mockProduct, 3);
    expect(item.lineTotal).toBe(300);
  });

  it('throw error เมื่อ quantity เป็น 0', () => {
    expect(() => new CartItem(mockProduct, 0)).toThrow('Quantity must be positive');
  });

  it('throw error เมื่อ quantity ติดลบ', () => {
    expect(() => new CartItem(mockProduct, -1)).toThrow('Quantity must be positive');
  });

  it('throw error เมื่อ product เป็น null', () => {
    expect(() => new CartItem(null, 1)).toThrow('Product cannot be null');
  });
});
