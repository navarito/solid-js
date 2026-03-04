import { IDiscountStrategy } from '../interfaces/IDiscountStrategy.js';

export const PromotionItemSet = {
  SET_A: ['P002', 'P005', 'P007'],
};

export class ItemSetStrategy extends IDiscountStrategy {
  /**
   * @param {string[]} itemSet — รายการ product ID ในเซ็ต
   * @param {number} minCount  — จำนวนขั้นต่ำที่ต้องซื้อ
   * @param {number} percent   — ส่วนลดเป็นเปอร์เซ็นต์
   */
  constructor(itemSet, minCount, percent) {
    super();
    this.itemSet = itemSet;
    this.minCount = minCount;
    this.percent = percent;
  }

  apply(subtotal, cartItems = []) {
    const count = cartItems.reduce(
      (sum, item) => (this.itemSet.includes(item.product.id) ? sum + item.quantity : sum),
      0
    );
    if (count >= this.minCount) {
      return subtotal * (this.percent / 100);
    }
    return 0;
  }

  describe() {
    return `ซื้อสินค้าในเซ็ต ${this.minCount} ชิ้นขึ้นไป ลด ${this.percent}%`;
  }
}
