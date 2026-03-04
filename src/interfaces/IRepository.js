export class IRepository {
  /**
   * @param {object} entity
   * @returns {object}
   */
  save(entity) {
    throw new Error('IRepository.save() must be implemented');
  }

  /**
   * @param {string} id
   * @returns {object|null}
   */
  findById(id) {
    throw new Error('IRepository.findById() must be implemented');
  }

  /**
   * @returns {object[]}
   */
  findAll() {
    throw new Error('IRepository.findAll() must be implemented');
  }

  /**
   * @param {string} id
   */
  delete(id) {
    throw new Error('IRepository.delete() must be implemented');
  }
}
