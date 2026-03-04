export class IDiscountStrategy {
  /**
   * @param {number} subtotal
   * @param {import('../models/CartItem.js').CartItem[]} cartItems
   * @returns {number}
   */
  apply(subtotal, _cartItems = []) {
    throw new Error('IDiscountStrategy.apply() must be implemented');
  }

  /** @returns {string} */
  describe() {
    throw new Error('IDiscountStrategy.describe() must be implemented');
  }
}
