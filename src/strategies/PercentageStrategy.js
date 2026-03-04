import { IDiscountStrategy } from '../interfaces/IDiscountStrategy.js';

export class PercentageStrategy extends IDiscountStrategy {
  /** @param {number} percent เช่น 10 = ลด 10% */
  constructor(percent) {
    super();
    this.percent = percent;
  }

  apply(subtotal) {
    return subtotal * (this.percent / 100);
  }

  describe() {
    return `ลด ${this.percent}%`;
  }
}
