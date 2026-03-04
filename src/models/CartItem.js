export class CartItem {
  /**
   * @param {import('./Product.js').Product} product
   * @param {number} quantity
   */
  constructor(product, quantity) {
    if (quantity <= 0) throw new Error('Quantity must be positive');
    if (!product) throw new Error('Product cannot be null');
    this.product = product;
    this.quantity = quantity;
  }

  get lineTotal() {
    return this.product.price * this.quantity;
  }
}
