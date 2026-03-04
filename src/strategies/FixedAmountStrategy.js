import { IDiscountStrategy } from '../interfaces/IDiscountStrategy.js';

export class FixedAmountStrategy extends IDiscountStrategy {
  /** @param {number} amount  */
  constructor(amount) {
    super();
    this.amount = amount;
  }

  apply(subtotal) {
    return Math.min(this.amount, subtotal);
  }

  describe() {
    return `ลด ฿${this.amount}`;
  }
}
