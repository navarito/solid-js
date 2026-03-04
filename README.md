# Checkout System — SOLID Principles Demo

**Stack:** JavaScript (ES Modules) · Node.js v18+ · Vitest

---

## Run

```bash
npm start        # demo scenarios
npm test         # unit tests (58 tests)
npm run test:watch
```

---

## SOLID Principles Applied

| | Principle | Implementation |
|---|---|---|
| **S** | Single Responsibility | `ProductService` / `MemberService` / `CheckoutService` — แยกความรับผิดชอบชัดเจน |
| **O** | Open/Closed | เพิ่ม Strategy ใหม่ได้โดยไม่แก้ class เดิม |
| **L** | Liskov Substitution | ทุก Strategy implement `IDiscountStrategy` และสลับกันได้ |
| **I** | Interface Segregation | `IRepository` / `ILogger` / `IDiscountStrategy` — แยกตามหน้าที่ |
| **D** | Dependency Inversion | Service รับ dependency ผ่าน constructor injection |

---

## Architecture

```
index.js
   ├── ProductService   ──► InMemoryRepository  (IRepository)
   ├── MemberService    ──► InMemoryRepository
   ├── PromotionService ──► InMemoryRepository
   └── CheckoutService  ──► PromotionService · ProductService · ConsoleLogger (ILogger)
                               ├── ItemSetStrategy    (IDiscountStrategy)
                               ├── MemberTierStrategy (IDiscountStrategy)
                               └── CodeStrategy       (IDiscountStrategy)
```

---

## Discount Strategies

| Strategy | เงื่อนไข |
|---|---|
| `PercentageStrategy` | ลด X% จาก subtotal |
| `FixedAmountStrategy` | ลดคงที่ ไม่เกิน subtotal |
| `MemberTierStrategy` | NORMAL = 0%, MEMBER = 10% |
| `CodeStrategy` | TEST-1 = 7%, TEST-2 = 15% |
| `ItemSetStrategy` | ซื้อสินค้าใน SET_A ≥ N ชิ้น ลด X% |

---

## Demo Scenarios (`npm start`)

| # | Scenario |
|---|---|
| 1 | Guest — ไม่มีส่วนลด |
| 2 | Guest — ซื้อ SET_A ไม่ครบ ไม่ได้โปรโมชัน |
| 3 | Member — ได้ส่วนลดสมาชิก 10% |
| 4 | Member — ซื้อ SET_A ครบ ได้ทั้งโปรโมชัน + สมาชิก |
| 5 | Guest — ซื้อ Orange 2 ชิ้น |
| 6 | ตะกร้าว่าง — error |
| 7 | สินค้าไม่มีในระบบ — error |
| 8 | Member + Coupon Code |

---

## Unit Tests (Vitest · 58 tests)

| Suite | Coverage |
|---|---|
| `models/` | CartItem validation, lineTotal, Member type, Product availability |
| `strategies/` | ทุก strategy รวม edge cases (code ไม่ถูกต้อง, SET_A ไม่ครบ) |
| `repositories/` | save, findById, findAll, delete, overwrite |
| `services/` | CheckoutService ทุก scenario รวม member + code + promo |
