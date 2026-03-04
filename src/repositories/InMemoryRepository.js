import { IRepository } from '../interfaces/IRepository.js';

export class InMemoryRepository extends IRepository {
  constructor() {
    super();
    /** @type {Map<string, object>} */
    this._store = new Map();
  }

  save(entity) {
    this._store.set(entity.id, entity);
    return entity;
  }

  findById(id) {
    return this._store.get(id) ?? null;
  }

  findAll() {
    return Array.from(this._store.values());
  }

  delete(id) {
    this._store.delete(id);
  }
}
