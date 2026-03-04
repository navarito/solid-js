import { CodeStrategy } from '../strategies/CodeStrategy.js';
import { MemberTierStrategy } from '../strategies/MemberTierStrategy.js';

export class CheckoutService {
  /**
   * @param {import('./PromotionService.js').PromotionService} promotionService
   * @param {import('./ProductService.js').ProductService} productService
   * @param {import('../interfaces/ILogger.js').ILogger} logger
   */
  constructor(promotionService, productService, logger) {
    this.promotionService = promotionService;
    this.productService = productService;
    this.logger = logger;
  }

  /**
   * @param {import('../models/CartItem.js').CartItem[]} cartItems
   * @param {import('../models/Member.js').Member | null} member
   * @returns {Invoice}
   */
  checkout(cartItems, member, code) {
    if (!cartItems?.length || !Array.isArray(cartItems)) {
      return this.logger.log('ตะกร้าสินค้าว่างเปล่า');
    }
    const notFoundProduct = cartItems.find(
      (item) => !this.productService.getProduct(item.product.id)
    );
    if (notFoundProduct) {
      return this.logger.log(`สินค้า ID "${notFoundProduct.product.id}" ไม่พบในระบบ`);
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

    // apply promotions
    const applicablePromos = this.promotionService.getApplicable(subtotal);
    const appliedPromotions = applicablePromos
      .map((promo) => ({
        name: promo.name,
        discountAmount: round(promo.strategy.apply(subtotal, cartItems)),
      }))
      .filter((p) => p.discountAmount > 0);
    const promoTotal = appliedPromotions.reduce((sum, p) => sum + p.discountAmount, 0);

    // apply member tier discount
    let memberDiscount = null;
    if (member) {
      const strategy = new MemberTierStrategy(member);
      const discountAmount = strategy.apply(subtotal);
      if (discountAmount > 0) {
        memberDiscount = { name: strategy.describe(), discountAmount: round(discountAmount) };
      }
    }

    let codeDiscount = null
    if (code) {
      console.log('code :>> ', code);
      const strategy = new CodeStrategy(code);
      const discountAmount = strategy.apply(subtotal);
      if (discountAmount > 0) {
        codeDiscount = { name: strategy.describe(), discountAmount: round(discountAmount) };
      }
    }

    const totalDiscount = promoTotal + (memberDiscount?.discountAmount ?? 0) + (codeDiscount?.discountAmount ?? 0);

    const total = round(Math.max(0, subtotal - totalDiscount));

    const customer = member
      ? { name: member.name, type: member.memberType }
      : { name: 'ลูกค้าทั่วไป', type: 'GUEST' };

    const invoice = {
      customer,
      items: cartItems.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        qty: item.quantity,
        lineTotal: item.lineTotal,
      })),
      subtotal,
      appliedPromotions,
      memberDiscount,
      totalDiscount: round(totalDiscount),
      total,
      codeDiscount
    };

    this.logger.log(`Checkout — subtotal: ฿${subtotal} | discount: ฿${invoice.totalDiscount} | total: ฿${total}`);
    return invoice;
  }
}

const round = (n) => Math.round(n * 100) / 100;
