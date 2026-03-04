export class Product {
  /**
   * @param {string} id
   * @param {string} name
   * @param {number} price
   * @param {string} is_active
   */
  constructor(id, name, price, isActive = 'active') {
    this.id = id;
    this.name = name;
    this.price = price;
    this.is_active = isActive
  }

  isAvailable(status = 'active') {
    return this.is_active === status;
  }
}
