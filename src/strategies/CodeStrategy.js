import { IDiscountStrategy } from '../interfaces/IDiscountStrategy.js';

export const CodeSet = {
    'TEST-1': 7,
    'TEST-2': 15
};

export class CodeStrategy extends IDiscountStrategy {
    /** @param {string} code  */
    constructor(code) {
        super();
        this.code = code;
    }

    apply(subtotal) {
        const discountPercent = CodeSet[this.code];
        if (!discountPercent) {
            return 0;  // ไม่มี code = ไม่มีส่วนลด
        }

        const discountAmount = (subtotal * discountPercent) / 100;
        return discountAmount;  // คืนค่า "จำนวนลด"
    }

    describe() {
        return `ได้รับส่วนลดจาก Code ${this.code} ลด ${CodeSet[this.code]}%`;
    }


}