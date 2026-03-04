// [S] Single Responsibility — จัดการข้อมูลสมาชิกเท่านั้น
// [D] Dependency Inversion — depend บน IRepository

import { IRepository } from '../interfaces/IRepository.js';

export class MemberService {
  /** @param {IRepository} repository */
  constructor(repository) {
    this.repository = repository;
  }

  /** @param {import('../models/Member.js').Member} member */
  register(member) {
    return this.repository.save(member);
  }

  /** @param {string} id */
  getMember(id) {
    return this.repository.findById(id) ?? null;
  }

  getAll() {
    return this.repository.findAll();
  }
}
