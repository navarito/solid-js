export class Promotion {
  /**
   * @param {string} id
   * @param {string} name
   * @param {import('../interfaces/IDiscountStrategy.js').IDiscountStrategy} strategy
   */
  constructor(id, name, strategy) {
    this.id = id;
    this.name = name;
    this.strategy = strategy;
  }

  isApplicable(subtotal) {
    return subtotal
  }
}
