import { IRepository } from '../interfaces/IRepository.js';

export class PromotionService {
  /** @param {IRepository} repository */
  constructor(repository) {
    this.repository = repository;
  }

  /** @param {import('../models/Promotion.js').Promotion} promotion */
  addPromotion(promotion) {
    return this.repository.save(promotion);
  }

  getAll() {
    return this.repository.findAll();
  }

  /**
   * @param {number} subtotal
   * @returns {import('../models/Promotion.js').Promotion[]}
   */
  getApplicable(subtotal) {
    return this.repository.findAll().filter((p) => p.isApplicable(subtotal));
  }
}
