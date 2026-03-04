import { Product } from './src/models/Product.js';
import { Member, MemberType } from './src/models/Member.js';
import { Promotion } from './src/models/Promotion.js';
import { CartItem } from './src/models/CartItem.js';

import { InMemoryRepository } from './src/repositories/InMemoryRepository.js';

import { ItemSetStrategy, PromotionItemSet } from './src/strategies/PromotionStrategy.js';

import { ConsoleLogger } from './src/loggers/ConsoleLogger.js';

import { ProductService } from './src/services/ProductService.js';
import { MemberService } from './src/services/MemberService.js';
import { PromotionService } from './src/services/PromotionService.js';
import { CheckoutService } from './src/services/CheckoutService.js';
import { CodeSet, CodeStrategy } from './src/strategies/CodeStrategy.js';

const sep = (title) => console.log(`\n${'═'.repeat(55)}\n  ${title}\n${'═'.repeat(55)}`);

const logger = new ConsoleLogger();

const productService = new ProductService(new InMemoryRepository(), logger);
const memberService = new MemberService(new InMemoryRepository());
const promotionService = new PromotionService(new InMemoryRepository());
const checkoutService = new CheckoutService(promotionService, productService, logger);

sep('Mock Data — สินค้า');
[
  new Product('P001', 'Red set', 50),
  new Product('P002', 'Green set', 40),
  new Product('P003', 'Blue set', 30),
  new Product('P004', 'Yellow set', 50),
  new Product('P005', 'Pink set', 80),
  new Product('P006', 'Purple set', 90),
  new Product('P007', 'Orange set', 120),
].forEach((p) => productService.addProduct(p));

productService.getAll().forEach((p) =>
  console.log(`  [${p.id}] ${p.name.padEnd(25)} ฿${p.price}`)
);

sep('Mock Data — สมาชิก');
[
  new Member('M001', 'นายเอ', 'a@mail.com', MemberType.MEMBER),
  new Member('M002', 'นายบี', 'b@mail.com', MemberType.MEMBER),
].forEach((m) => memberService.register(m));

memberService.getAll().forEach((m) =>
  console.log(`  [${m.id}] ${m.name.padEnd(20)} ระดับ: ${m.memberType}`)
);

sep('Mock Data — โปรโมชัน');
[
  new Promotion('PR01', 'ซื้อสินค้า SET_A 2 ชิ้นขึ้นไป ลด 5%', new ItemSetStrategy(PromotionItemSet.SET_A, 2, 5)),
  new Promotion('PR02', 'ส่วนลดจาก Code : TEST-1 ลด 7%', new CodeStrategy(CodeSet['TEST-1']))
].forEach((pr) => promotionService.addPromotion(pr));

promotionService.getAll().forEach((pr) =>
  console.log(`  [${pr.id}] ${pr.name.padEnd(35)}`)
);

// ── Checkout ────────────────────────────────────────────
const printInvoice = (invoice) => {
  if (!invoice) return;
  const customerTag = `${invoice.customer.name} [${invoice.customer.type}]`;
  console.log(`\n  🧾 ${customerTag}`);
  console.log('  ' + '─'.repeat(45));
  invoice.items.forEach((i) =>
    console.log(`  ${i.name.padEnd(28)} ฿${i.price} x${i.qty} = ฿${i.lineTotal}`)
  );
  console.log('  ' + '─'.repeat(45));
  console.log(`  ยอดรวม (subtotal)        ฿${invoice.subtotal}`);
  invoice.appliedPromotions.forEach((p) =>
    console.log(`  โปร: ${p.name.padEnd(28)} -฿${p.discountAmount}`)
  );
  if (invoice.memberDiscount) {
    console.log(`  ${invoice.memberDiscount.name.padEnd(33)} -฿${invoice.memberDiscount.discountAmount}`);
  }
  if (invoice.codeDiscount) {
    console.log(`  ${invoice.codeDiscount.name.padEnd(33)} -฿${invoice.codeDiscount.discountAmount}`);

  }
  console.log(`  ส่วนลดรวม               -฿${invoice.totalDiscount}`);
  console.log(`  ยอดสุทธิ                 ฿${invoice.total}`);
};

const p = (id) => {
  const product = productService.getProduct(id);
  if (!product) {
    console.log(`  ⚠️  สินค้า ID ${id} ไม่พบ`);
    return { id, name: 'Unknown Product', price: 0 };
  }
  return product;
};

sep('Case 1 — ลูกค้าทั่วไป ซื้อ red and green');
printInvoice(checkoutService.checkout(
  [new CartItem(p('P001'), 1), new CartItem(p('P002'), 1)],
  null
));

sep('Case 2 — ลูกค้าทั่วไป ซื้อ SET_A 1 ชิ้น');
printInvoice(checkoutService.checkout(
  [new CartItem(p('P001'), 1), new CartItem(p('P007'), 1)],
  null
));

sep('Case 3 — สมาชิก ซื้อสินค้าทั่วไป (ได้ส่วนลด member)');
printInvoice(checkoutService.checkout(
  [new CartItem(p('P003'), 2), new CartItem(p('P004'), 1)],
  memberService.getMember('M001')
));

sep('Case 4 — สมาชิก ซื้อ SET_A 2 ชิ้น ได้ทั้งสองส่วนลด');
printInvoice(checkoutService.checkout(
  [new CartItem(p('P002'), 1), new CartItem(p('P005'), 1), new CartItem(p('P001'), 1)],
  memberService.getMember('M002')
));

sep('Case 5: ซื้อ orange 2 ')
printInvoice(checkoutService.checkout([new CartItem(p('P007'), 2)]));

sep('Case 6: ไม่มีสินค้าในตระกร้า')
printInvoice(checkoutService.checkout());

sep('Case 7: ไม่มีสินค้าในระบบ')
printInvoice(checkoutService.checkout([new CartItem(p('P009'), 1)]));

sep('Case 8: ใช้ code + member')
printInvoice(checkoutService.checkout([new CartItem(p('P007'), 1,)], memberService.getMember('M002'), 'TEST-1'));

sep('Done!');
