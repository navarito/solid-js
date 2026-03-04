import { IRepository } from '../interfaces/IRepository.js';

export class ProductService {
  /**
   * @param {IRepository} repository
   * @param {import('../interfaces/ILogger.js').ILogger} logger
   */
  constructor(repository, logger) {
    this.repository = repository;
    this.logger = logger;
  }

  /** @param {import('../models/Product.js').Product} product */
  addProduct(product) {
    return this.repository.save(product);
  }

  /** @param {string} id */
  getProduct(id) {
    const product = this.repository.findById(id);
    if (!product) {
      return null;
    }
    return product;
  }

  getAll() {
    return this.repository.findAll();
  }
}
