import { describe, it, expect, beforeEach } from 'vitest';
import { ProductService } from '../../src/services/ProductService.js';
import { InMemoryRepository } from '../../src/repositories/InMemoryRepository.js';
import { Product } from '../../src/models/Product.js';

const mockLogger = { log: () => {}, error: () => {} };

describe('ProductService', () => {
  let service;

  beforeEach(() => {
    service = new ProductService(new InMemoryRepository(), mockLogger);
  });

  it('addProduct() บันทึกสินค้าได้', () => {
    const product = new Product('P001', 'Red set', 50);
    service.addProduct(product);
    expect(service.getProduct('P001')).toBe(product);
  });

  it('getProduct() คืน null เมื่อไม่พบสินค้า', () => {
    expect(service.getProduct('NONE')).toBeNull();
  });

  it('getAll() คืนสินค้าทั้งหมด', () => {
    service.addProduct(new Product('P001', 'Red set', 50));
    service.addProduct(new Product('P002', 'Green set', 40));
    expect(service.getAll()).toHaveLength(2);
  });
});
