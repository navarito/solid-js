import { describe, it, expect } from 'vitest';
import { Product } from '../../src/models/Product.js';

describe('Product', () => {
  it('สร้าง Product ได้ถูกต้อง', () => {
    const product = new Product('P001', 'Red set', 50);
    expect(product.id).toBe('P001');
    expect(product.name).toBe('Red set');
    expect(product.price).toBe(50);
    expect(product.is_active).toBe('active');
  });

  it('กำหนด isActive เองได้', () => {
    const product = new Product('P002', 'Blue set', 30, 'inactive');
    expect(product.is_active).toBe('inactive');
  });

  it('isAvailable() คืน true เมื่อ status ตรงกัน', () => {
    const product = new Product('P001', 'Red set', 50);
    expect(product.isAvailable()).toBe(true);
    expect(product.isAvailable('active')).toBe(true);
  });

  it('isAvailable() คืน false เมื่อ status ไม่ตรง', () => {
    const product = new Product('P001', 'Red set', 50, 'inactive');
    expect(product.isAvailable()).toBe(false);
  });
});
