import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CheckoutService } from '../../src/services/CheckoutService.js';
import { ProductService } from '../../src/services/ProductService.js';
import { PromotionService } from '../../src/services/PromotionService.js';
import { MemberService } from '../../src/services/MemberService.js';
import { InMemoryRepository } from '../../src/repositories/InMemoryRepository.js';
import { Product } from '../../src/models/Product.js';
import { Member, MemberType } from '../../src/models/Member.js';
import { CartItem } from '../../src/models/CartItem.js';
import { Promotion } from '../../src/models/Promotion.js';
import { PercentageStrategy } from '../../src/strategies/PercentageStrategy.js';
import { ItemSetStrategy, PromotionItemSet } from '../../src/strategies/PromotionStrategy.js';

const mockLogger = { log: vi.fn(), error: vi.fn() };

const setupServices = () => {
  const productService = new ProductService(new InMemoryRepository(), mockLogger);
  const promotionService = new PromotionService(new InMemoryRepository());
  const memberService = new MemberService(new InMemoryRepository());
  const checkoutService = new CheckoutService(promotionService, productService, mockLogger);
  return { productService, promotionService, memberService, checkoutService };
};

describe('CheckoutService', () => {
  let productService, promotionService, memberService, checkoutService;

  beforeEach(() => {
    mockLogger.log.mockClear();
    ({ productService, promotionService, memberService, checkoutService } = setupServices());

    productService.addProduct(new Product('P001', 'Red set', 50));
    productService.addProduct(new Product('P002', 'Green set', 40));
    productService.addProduct(new Product('P005', 'Pink set', 80));
    productService.addProduct(new Product('P007', 'Orange set', 120));
  });

  it('checkout ลูกค้าทั่วไปไม่มีโปรโมชัน', () => {
    const cartItems = [new CartItem(productService.getProduct('P001'), 2)];
    const invoice = checkoutService.checkout(cartItems, null);
    expect(invoice.subtotal).toBe(100);
    expect(invoice.totalDiscount).toBe(0);
    expect(invoice.total).toBe(100);
    expect(invoice.customer.type).toBe('GUEST');
  });

  it('checkout ใช้ส่วนลด member 10%', () => {
    const member = new Member('M001', 'นายเอ', 'a@mail.com', MemberType.MEMBER);
    const cartItems = [new CartItem(productService.getProduct('P001'), 2)];
    const invoice = checkoutService.checkout(cartItems, member);
    expect(invoice.subtotal).toBe(100);
    expect(invoice.memberDiscount.discountAmount).toBe(10);
    expect(invoice.total).toBe(90);
  });

  it('checkout ใช้โปรโมชัน SET_A', () => {
    promotionService.addPromotion(
      new Promotion('PR01', 'SET_A 2 ชิ้น ลด 5%', new ItemSetStrategy(PromotionItemSet.SET_A, 2, 5))
    );
    const cartItems = [
      new CartItem(productService.getProduct('P002'), 1), // P002 อยู่ใน SET_A
      new CartItem(productService.getProduct('P005'), 1), // P005 อยู่ใน SET_A
    ];
    const invoice = checkoutService.checkout(cartItems, null);
    // subtotal = 40+80 = 120, ลด 5% = 6
    expect(invoice.subtotal).toBe(120);
    expect(invoice.appliedPromotions).toHaveLength(1);
    expect(invoice.appliedPromotions[0].discountAmount).toBe(6);
    expect(invoice.total).toBe(114);
  });

  it('checkout ใช้ code discount', () => {
    const cartItems = [new CartItem(productService.getProduct('P007'), 1)];
    const invoice = checkoutService.checkout(cartItems, null, 'TEST-1');
    // subtotal = 120, TEST-1 ลด 7% = 8.4
    expect(invoice.subtotal).toBe(120);
    expect(invoice.codeDiscount.discountAmount).toBe(8.4);
    expect(invoice.total).toBe(111.6);
  });

  it('checkout ใช้ทั้ง member + code', () => {
    const member = new Member('M001', 'นายเอ', 'a@mail.com', MemberType.MEMBER);
    const cartItems = [new CartItem(productService.getProduct('P007'), 1)];
    const invoice = checkoutService.checkout(cartItems, member, 'TEST-2');
    // subtotal = 120, member ลด 10% = 12, TEST-2 ลด 15% = 18
    expect(invoice.subtotal).toBe(120);
    expect(invoice.memberDiscount.discountAmount).toBe(12);
    expect(invoice.codeDiscount.discountAmount).toBe(18);
    expect(invoice.total).toBe(90);
  });

  it('checkout ตะกร้าว่างเปล่า — log และไม่คืน invoice', () => {
    const result = checkoutService.checkout([], null);
    expect(mockLogger.log).toHaveBeenCalledWith('ตะกร้าสินค้าว่างเปล่า');
    expect(result).toBeUndefined();
  });

  it('checkout สินค้าที่ไม่มีในระบบ — log และไม่คืน invoice', () => {
    const fakeProduct = new Product('P999', 'Fake', 100);
    const result = checkoutService.checkout([new CartItem(fakeProduct, 1)], null);
    expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('P999'));
    expect(result).toBeUndefined();
  });

  it('invoice มี items ถูกต้อง', () => {
    const cartItems = [new CartItem(productService.getProduct('P001'), 3)];
    const invoice = checkoutService.checkout(cartItems, null);
    expect(invoice.items).toHaveLength(1);
    expect(invoice.items[0].name).toBe('Red set');
    expect(invoice.items[0].qty).toBe(3);
    expect(invoice.items[0].lineTotal).toBe(150);
  });
});
