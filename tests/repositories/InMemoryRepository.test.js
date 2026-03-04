import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryRepository } from '../../src/repositories/InMemoryRepository.js';

describe('InMemoryRepository', () => {
  let repo;

  beforeEach(() => {
    repo = new InMemoryRepository();
  });

  it('save() และ findById() ทำงานถูกต้อง', () => {
    const entity = { id: '1', name: 'Test' };
    repo.save(entity);
    expect(repo.findById('1')).toEqual(entity);
  });

  it('findById() คืน null เมื่อไม่พบ', () => {
    expect(repo.findById('NOT_EXIST')).toBeNull();
  });

  it('findAll() คืนรายการทั้งหมด', () => {
    repo.save({ id: '1', name: 'A' });
    repo.save({ id: '2', name: 'B' });
    expect(repo.findAll()).toHaveLength(2);
  });

  it('findAll() คืน array ว่างเมื่อไม่มีข้อมูล', () => {
    expect(repo.findAll()).toEqual([]);
  });

  it('save() ที่ id ซ้ำจะ overwrite ของเดิม', () => {
    repo.save({ id: '1', name: 'Old' });
    repo.save({ id: '1', name: 'New' });
    expect(repo.findById('1').name).toBe('New');
    expect(repo.findAll()).toHaveLength(1);
  });

  it('delete() ลบข้อมูลออกจาก store', () => {
    repo.save({ id: '1', name: 'Test' });
    repo.delete('1');
    expect(repo.findById('1')).toBeNull();
    expect(repo.findAll()).toHaveLength(0);
  });
});
